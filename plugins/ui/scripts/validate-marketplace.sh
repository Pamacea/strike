#!/bin/bash
# strike-validate - Validate marketplace and registry JSON files

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Root directory
STRIKE_ROOT="${STRIKE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"

echo "🔍 Validating Strike Marketplace..."
echo ""

# Check if ajv is installed
if ! command -v ajv &> /dev/null; then
    echo -e "${YELLOW}⚠️  ajv not found. Installing...${NC}"
    npm install -g ajv-cli
fi

# Validate marketplace.json
echo "Validating marketplace manifest..."
ajv validate \
    --spec=draft7 \
    --strict=false \
    --schema-data="$STRIKE_ROOT/.claude-plugin/marketplace.schema.json" \
    --data="$STRIKE_ROOT/.claude-plugin/marketplace.json"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ marketplace.json valid${NC}"
else
    echo -e "${RED}❌ marketplace.json invalid${NC}"
    exit 1
fi

echo ""

# Validate UI patterns registry
echo "Validating UI patterns registry..."
ajv validate \
    --spec=draft7 \
    --strict=false \
    --schema-data="$STRIKE_ROOT/plugins/ui/schemas/registry.schema.json" \
    --data="$STRIKE_ROOT/registry/ui-patterns.json"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ ui-patterns.json valid${NC}"
else
    echo -e "${RED}❌ ui-patterns.json invalid${NC}"
    exit 1
fi

echo ""

# Validate constraints registry
echo "Validating constraints registry..."
ajv validate \
    --spec=draft7 \
    --strict=false \
    --schema-data="$STRIKE_ROOT/plugins/ui/schemas/registry.schema.json" \
    --data="$STRIKE_ROOT/registry/constraints.json"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ constraints.json valid${NC}"
else
    echo -e "${RED}❌ constraints.json invalid${NC}"
    exit 1
fi

echo ""

# Validate workflows registry
echo "Validating workflows registry..."
ajv validate \
    --spec=draft7 \
    --strict=false \
    --schema-data="$STRIKE_ROOT/plugins/ui/schemas/registry.schema.json" \
    --data="$STRIKE_ROOT/registry/workflows.json"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ workflows.json valid${NC}"
else
    echo -e "${RED}❌ workflows.json invalid${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ All marketplace files validated successfully!${NC}"
echo ""

# Statistics
echo "📊 Marketplace Statistics:"
echo ""

# Count items
PATTERNS=$(jq '.items | length' "$STRIKE_ROOT/registry/ui-patterns.json")
CONSTRAINTS=$(jq '.items | length' "$STRIKE_ROOT/registry/constraints.json")
WORKFLOWS=$(jq '.items | length' "$STRIKE_ROOT/registry/workflows.json")

echo "  UI Patterns:     $PATTERNS"
echo "  Constraints:     $CONSTRAINTS"
echo "  Workflows:       $WORKFLOWS"
echo "  Total Items:     $((PATTERNS + CONSTRAINTS + WORKFLOWS))"
echo ""

exit 0
