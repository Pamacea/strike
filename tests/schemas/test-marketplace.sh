#!/bin/bash
# test-marketplace.sh - Test marketplace schema validation
# Part of Strike Plugin v1.7.0 - Cross-Platform Version

set -euo pipefail

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

STRIKE_ROOT="${STRIKE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
echo "🧪 Testing Marketplace Schema Validation..."
echo ""

MARKETPLACE="$STRIKE_ROOT/.claude-plugin/marketplace.json"

# ============================================================================
# JSON Validation Helper Functions
# ============================================================================

# Try Python first (widely available on Windows)
validate_json_python() {
    local file="$1"
    if command -v python &> /dev/null; then
        python -c "import json; json.load(open('$file'))" 2>/dev/null
        return $?
    fi
    return 1
}

# Try node
validate_json_node() {
    local file="$1"
    if command -v node &> /dev/null; then
        node -e "const fs = require('fs'); JSON.parse(fs.readFileSync('$file', 'utf8'))" 2>/dev/null
        return $?
    fi
    return 1
}

# Try jq
validate_json_jq() {
    local file="$1"
    if command -v jq &> /dev/null; then
        jq empty "$file" 2>/dev/null
        return $?
    fi
    return 1
}

# Fallback: basic syntax check (brackets matching)
validate_json_basic() {
    local file="$1"
    local content
    content=$(cat "$file" 2>/dev/null) || return 1

    # Remove all whitespace for simple check
    local no_ws=$(echo "$content" | tr -d '[:space:]')

    # Check starts with { and ends with }
    [[ "$no_ws" == '{'*'}' ]] || return 1

    # Count braces
    local open=$(echo "$content" | tr -cd '{' | wc -c)
    local close=$(echo "$content" | tr -cd '}' | wc -c)
    [ "$open" -eq "$close" ] || return 1

    # Count brackets
    local open_bracket=$(echo "$content" | tr -cd '\[' | wc -c)
    local close_bracket=$(echo "$content" | tr -cd '\]' | wc -c)
    [ "$open_bracket" -eq "$close_bracket" ] || return 1

    # Basic string check - should have "name" and "version"
    echo "$content" | grep -q '"name"' || return 1
    echo "$content" | grep -q '"version"' || return 1

    return 0
}

# Main validation function
validate_json() {
    local file="$1"

    validate_json_python "$file" && return 0
    validate_json_node "$file" && return 0
    validate_json_jq "$file" && return 0
    validate_json_basic "$file" && return 0

    return 1
}

# Extract JSON value using Python
extract_value_python() {
    local file="$1"
    local key="$2"
    if command -v python &> /dev/null; then
        local result
        result=$(python -c "import json; d=json.load(open('$file')); print(d.get('$key', ''))" 2>/dev/null)
        if [ -n "$result" ]; then
            echo "$result"
            return 0
        fi
    fi
    return 1
}

# Extract JSON value using node
extract_value_node() {
    local file="$1"
    local key="$2"
    if command -v node &> /dev/null; then
        local result
        result=$(node -e "const fs = require('fs'); const d = JSON.parse(fs.readFileSync('$file', 'utf8')); console.log(d.$key || '')" 2>/dev/null)
        if [ -n "$result" ]; then
            echo "$result"
            return 0
        fi
    fi
    return 1
}

# Extract JSON value using jq
extract_value_jq() {
    local file="$1"
    local key="$2"
    if command -v jq &> /dev/null; then
        local result
        result=$(jq -r ".$key // empty" "$file" 2>/dev/null)
        if [ -n "$result" ]; then
            echo "$result"
            return 0
        fi
    fi
    return 1
}

# Extract JSON value using grep (fallback)
extract_value_grep() {
    local file="$1"
    local key="$2"
    local result
    # Match "key": "value" pattern and extract value
    result=$(grep -o "\"$key\"[[:space:]]*:[[:space:]]*\"[^\"]*\"" "$file" 2>/dev/null | \
        head -1 | \
        sed 's/.*: *"\([^"]*\)".*/\1/')
    if [ -n "$result" ]; then
        echo "$result"
        return 0
    fi
    return 1
}

# Main extraction function
extract_value() {
    local file="$1"
    local key="$2"

    extract_value_python "$file" "$key" && return 0
    extract_value_node "$file" "$key" && return 0
    extract_value_jq "$file" "$key" && return 0
    extract_value_grep "$file" "$key"
}

# ============================================================================
# Test 1: File exists and is valid JSON
# ============================================================================

echo "Test 1: Validate marketplace.json"

if [ ! -f "$MARKETPLACE" ]; then
    echo -e "${RED}✗ FAIL${NC} - marketplace.json not found at $MARKETPLACE"
    exit 1
fi

if validate_json "$MARKETPLACE"; then
    echo -e "${GREEN}✓ PASS${NC} - marketplace.json is valid JSON"
else
    echo -e "${RED}✗ FAIL${NC} - marketplace.json has invalid JSON syntax"
    exit 1
fi

# ============================================================================
# Test 2: Check required fields
# ============================================================================

echo ""
echo "Test 2: Check marketplace.json structure"

NAME=$(extract_value "$MARKETPLACE" "name")
VERSION=$(extract_value "$MARKETPLACE" "version")

# Check plugins array (special handling)
if command -v python &> /dev/null; then
    PLUGIN_COUNT=$(python -c "import json; d=json.load(open('$MARKETPLACE')); print(len(d.get('plugins', [])))" 2>/dev/null || echo "0")
elif command -v node &> /dev/null; then
    PLUGIN_COUNT=$(node -e "const fs = require('fs'); const d = JSON.parse(fs.readFileSync('$MARKETPLACE', 'utf8')); console.log((d.plugins || []).length)" 2>/dev/null || echo "0")
elif command -v jq &> /dev/null; then
    PLUGIN_COUNT=$(jq '.plugins | length' "$MARKETPLACE" 2>/dev/null || echo "0")
else
    # Fallback: count plugin entries
    PLUGIN_COUNT=$(grep -o '"plugins"' "$MARKETPLACE" | wc -l)
    if [ "$PLUGIN_COUNT" -gt 0 ]; then
        PLUGIN_COUNT=$(grep -c '"name"' "$MARKETPLACE" 2>/dev/null || echo "2")
    fi
fi

if [ -n "$NAME" ]; then
    echo -e "${GREEN}✓ PASS${NC} - 'name' field exists: $NAME"
else
    echo -e "${RED}✗ FAIL${NC} - 'name' field missing"
    exit 1
fi

if [ -n "$VERSION" ]; then
    echo -e "${GREEN}✓ PASS${NC} - 'version' field exists: $VERSION"
else
    echo -e "${YELLOW}⊘ WARN${NC} - 'version' field missing"
fi

if grep -q '"plugins"' "$MARKETPLACE" && grep -q '\[' "$MARKETPLACE"; then
    echo -e "${GREEN}✓ PASS${NC} - 'plugins' array exists"
else
    echo -e "${RED}✗ FAIL${NC} - 'plugins' array missing"
    exit 1
fi

# ============================================================================
# Test 3: Validate plugin.json files
# ============================================================================

echo ""
echo "Test 3: Validate each plugin's plugin.json"

PLUGINS=("ui" "exg")
ALL_PASS=true

for plugin in "${PLUGINS[@]}"; do
    PLUGIN_JSON="$STRIKE_ROOT/plugins/$plugin/.claude-plugin/plugin.json"

    if [ ! -f "$PLUGIN_JSON" ]; then
        echo -e "${RED}✗ FAIL${NC} - $plugin/plugin.json not found"
        ALL_PASS=false
        continue
    fi

    if ! validate_json "$PLUGIN_JSON"; then
        echo -e "${RED}✗ FAIL${NC} - $plugin/plugin.json has invalid JSON"
        ALL_PASS=false
        continue
    fi

    PLUGIN_NAME=$(extract_value "$PLUGIN_JSON" "name")
    PLUGIN_VERSION=$(extract_value "$PLUGIN_JSON" "version")

    if [ -n "$PLUGIN_NAME" ]; then
        echo -e "${GREEN}✓ PASS${NC} - $plugin plugin.json valid (name: $PLUGIN_NAME, version: $PLUGIN_VERSION)"
    else
        echo -e "${YELLOW}⊘ WARN${NC} - $plugin plugin.json missing 'name' field"
    fi
done

if [ "$ALL_PASS" = false ]; then
    exit 1
fi

# ============================================================================
# Test 4: Check hooks.json files
# ============================================================================

echo ""
echo "Test 4: Validate hooks.json files"

for plugin in "${PLUGINS[@]}"; do
    HOOKS_JSON="$STRIKE_ROOT/plugins/$plugin/.claude-plugin/hooks.json"

    if [ ! -f "$HOOKS_JSON" ]; then
        echo -e "${YELLOW}⊘ SKIP${NC} - $plugin/hooks.json not found"
        continue
    fi

    if validate_json "$HOOKS_JSON"; then
        echo -e "${GREEN}✓ PASS${NC} - $plugin/hooks.json valid JSON"
    else
        echo -e "${RED}✗ FAIL${NC} - $plugin/hooks.json invalid JSON"
        exit 1
    fi
done

# ============================================================================
# Summary
# ============================================================================

echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}All marketplace tests passed!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""

exit 0
