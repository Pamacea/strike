#!/bin/bash
# validate-file-size.sh - Validate file size before write
# Part of Strike UI Plugin v1.7.0

set -euo pipefail

# Configuration
MAX_SIZE=$((100 * 1024))  # 100KB default
MAX_SIZE_KB=100

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# File path from argument
FILE="${1:-}"

# Skip if no file specified
if [ -z "$FILE" ]; then
    exit 0
fi

# Skip if file doesn't exist yet (new file)
if [ ! -f "$FILE" ]; then
    exit 0
fi

# Get file size
SIZE=$(wc -c < "$FILE" 2>/dev/null || echo "0")
SIZE_KB=$((SIZE / 1024))

# Check against limit
if [ "$SIZE" -gt "$MAX_SIZE" ]; then
    echo -e "${YELLOW}⚠️  Warning: File size ${SIZE_KB}KB exceeds ${MAX_SIZE_KB}KB limit${NC}" >&2
    echo -e "${YELLOW}   File: $FILE${NC}" >&2
    # Don't block, just warn
    exit 0
fi

exit 0
