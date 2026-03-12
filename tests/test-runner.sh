#!/bin/bash
# test-runner.sh - Comprehensive test runner for Strike Plugin
# Part of Strike Plugin v1.7.0

set -euo pipefail

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

STRIKE_ROOT="${STRIKE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
cd "$STRIKE_ROOT"

echo -e "${BLUE}${BOLD}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}${BOLD}║   Strike Plugin v1.7.0 - Test Runner          ║${NC}"
echo -e "${BLUE}${BOLD}╚════════════════════════════════════════╝${NC}"
echo ""

# Test suites
SUITS=(
    "tests/schemas/test-marketplace.sh"
    "tests/skills/test-skill-structure.sh"
)

TOTAL=0
PASSED=0
FAILED=0

for suite in "${SUITS[@]}"; do
    if [ -f "$suite" ]; then
        TOTAL=$((TOTAL + 1))
        echo -e "${BOLD}Running: $suite${NC}"
        echo "─────────────────────────────────────────"

        if bash "$suite"; then
            echo -e "${GREEN}✓ PASSED${NC}\n"
            PASSED=$((PASSED + 1))
        else
            echo -e "${RED}✗ FAILED${NC}\n"
            FAILED=$((FAILED + 1))
        fi
    else
        echo -e "${YELLOW}⊘ SKIPPED${NC} - $suite not found\n"
    fi
done

# Additional checks
echo -e "${BOLD}Additional Checks${NC}"
echo "─────────────────────────────────────────"

# Check folder structure
echo "Checking folder structure..."

REQUIRED_FOLDERS=(
    "plugins/ui/.claude-plugin"
    "plugins/ui/agents"
    "plugins/ui/skills/core"
    "plugins/ui/skills/optional"
    "plugins/ui/hooks"
    "plugins/ui/scripts"
    "plugins/ui/data"
    "plugins/ui/mcp"
    "plugins/exg/.claude-plugin"
    "plugins/exg/skills"
    "plugins/exg/hooks"
    "plugins/exg/data"
    "bin"
    "tests"
)

for folder in "${REQUIRED_FOLDERS[@]}"; do
    if [ -d "$folder" ]; then
        echo -e "  ${GREEN}✓${NC} $folder"
    else
        echo -e "  ${RED}✗${NC} $folder (missing)"
        FAILED=$((FAILED + 1))
    fi
done

# Check required files
echo ""
echo "Checking required files..."

REQUIRED_FILES=(
    ".claude-plugin/marketplace.json"
    "plugins/ui/.claude-plugin/plugin.json"
    "plugins/ui/.claude-plugin/hooks.json"
    "plugins/ui/agents/orchestrator.md"
    "plugins/ui/agents/build.md"
    "plugins/ui/agents/adversarial.md"
    "plugins/ui/agents/reviewer.md"
    "plugins/exg/.claude-plugin/plugin.json"
    "plugins/exg/.claude-plugin/hooks.json"
    "bin/strike.js"
    "plugins/ui/mcp/server.js"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ${GREEN}✓${NC} $file"
    else
        echo -e "  ${RED}✗${NC} $file (missing)"
        FAILED=$((FAILED + 1))
    fi
done

# Final summary
echo ""
echo -e "${BOLD}════════════════════════════════════════${NC}"
echo -e "${BOLD}Test Summary${NC}"
echo -e "${BOLD}════════════════════════════════════════${NC}"
echo "Test Suites Run: $TOTAL"
echo -e "Passed:  ${GREEN}$PASSED${NC}"
echo -e "Failed:  ${RED}$FAILED${NC}"
echo -e "${BOLD}════════════════════════════════════════${NC}"
echo ""

# Calculate score
TOTAL_CHECKS=$((TOTAL + ${#REQUIRED_FOLDERS[@]} + ${#REQUIRED_FILES[@]}))
TOTAL_PASSED=$((PASSED + ${#REQUIRED_FOLDERS[@]} + ${#REQUIRED_FILES[@]}))
SCORE=$((TOTAL_PASSED * 100 / TOTAL_CHECKS))

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}${BOLD}✓ ALL TESTS PASSED!${NC}"
    echo -e "Quality Score: ${SCORE}%"
    exit 0
else
    echo -e "${RED}${BOLD}✗ SOME TESTS FAILED${NC}"
    echo -e "Quality Score: ${SCORE}%"
    exit 1
fi
