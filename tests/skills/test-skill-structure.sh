#!/bin/bash
# test-skill-structure.sh - Test skill structure validation
# Part of Strike Plugin v1.7.0

set -euo pipefail

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

STRIKE_ROOT="${STRIKE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
echo "🧪 Testing Skill Structure..."
echo ""

MAX_LINES=500
MAX_DESC_LENGTH=500

# Find all SKILL.md files
echo "Scanning for SKILL.md files..."
SKILL_FILES=$(find "$STRIKE_ROOT/plugins" -name "SKILL.md" 2>/dev/null)

TOTAL=0
PASSED=0
FAILED=0

for skill_file in $SKILL_FILES; do
    TOTAL=$((TOTAL + 1))

    # Extract relative path
    rel_path="${skill_file#$STRIKE_ROOT/}"
    plugin=$(echo "$rel_path" | cut -d/ -f2)
    skill_name=$(echo "$rel_path" | cut -d/ -f3)

    echo ""
    echo "Testing: $rel_path"

    # Test 1: File exists and readable
    if [ -f "$skill_file" ]; then
        echo -e "  ${GREEN}✓${NC} File exists"
    else
        echo -e "  ${RED}✗${NC} File not found"
        FAILED=$((FAILED + 1))
        continue
    fi

    # Test 2: Frontmatter exists (starts with ---)
    if head -1 "$skill_file" | grep -q '^---'; then
        echo -e "  ${GREEN}✓${NC} Frontmatter starts correctly"
    else
        echo -e "  ${RED}✗${NC} Frontmatter missing start delimiter"
        FAILED=$((FAILED + 1))
        continue
    fi

    # Test 3: Frontmatter ends (has closing ---)
    if sed -n '2,/^---$/p' "$skill_file" | grep -q '^---'; then
        echo -e "  ${GREEN}✓${NC} Frontmatter ends correctly"
    else
        echo -e "  ${YELLOW}⊘${NC} Frontmatter end delimiter not found"
    fi

    # Test 4: Has name field
    if grep -q '^name:' "$skill_file"; then
        NAME_VALUE=$(grep '^name:' "$skill_file" | cut -d: -f2 | xargs)
        echo -e "  ${GREEN}✓${NC} Has name: $NAME_VALUE"
    else
        echo -e "  ${RED}✗${NC} Missing 'name' field"
        FAILED=$((FAILED + 1))
        continue
    fi

    # Test 5: Has description field
    if grep -q '^description:' "$skill_file"; then
        DESC_VALUE=$(grep '^description:' "$skill_file" | cut -d: -f2 | xargs)
        DESC_LEN=${#DESC_VALUE}
        if [ $DESC_LEN -gt 50 ]; then
            echo -e "  ${GREEN}✓${NC} Has description (${DESC_LEN} chars)"
        else
            echo -e "  ${YELLOW}⊘${NC} Description too short (${DESC_LEN} chars, recommend 50+)"
        fi
    else
        echo -e "  ${RED}✗${NC} Missing 'description' field"
        FAILED=$((FAILED + 1))
        continue
    fi

    # Test 6: Has version field
    if grep -q '^version:' "$skill_file"; then
        echo -e "  ${GREEN}✓${NC} Has version"
    else
        echo -e "  ${YELLOW}⊘${NC} Missing 'version' field"
    fi

    # Test 7: File size under limit
    LINE_COUNT=$(wc -l < "$skill_file")
    if [ $LINE_COUNT -le $MAX_LINES ]; then
        echo -e "  ${GREEN}✓${NC} Size: $LINE_COUNT lines (under ${MAX_LINES})"
    else
        echo -e "  ${YELLOW}⊘${NC} Size: $LINE_COUNT lines (exceeds ${MAX_LINES}, consider modularizing)"
    fi

    # Test 8: Has allowed-tools or no tools section
    if grep -q '^allowed-tools:' "$skill_file" || ! grep -q 'tools' "$skill_file"; then
        echo -e "  ${GREEN}✓${NC} Tools properly configured"
    else
        echo -e "  ${YELLOW}⊘${NC} Consider adding 'allowed-tools' for permission clarity"
    fi

    PASSED=$((PASSED + 1))
done

echo ""
echo "════════════════════════════════════════"
echo "Test Summary"
echo "════════════════════════════════════════"
echo "Total skills tested: $TOTAL"
echo -e "Passed: ${GREEN}$PASSED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo "════════════════════════════════════════"
echo ""

if [ $FAILED -gt 0 ]; then
    exit 1
fi

exit 0
