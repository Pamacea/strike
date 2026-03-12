#!/bin/bash
# validate-command.sh - Validate bash commands for safety
# Part of Strike UI Plugin v1.7.0

set -euo pipefail

# Colors
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Command from argument
COMMAND="${1:-}"

# Skip if no command
if [ -z "$COMMAND" ]; then
    exit 0
fi

# Dangerous commands that should be blocked
DANGEROUS_PATTERNS=(
    "rm -rf /"
    "rm -rf /\*"
    ":> /"
    "dd if=/dev/zero"
    "mkfs."
    "format"
    "chmod 000"
    "chown -R root"
    "> /dev/sd"
    "curl.*|.*sh"
    "wget.*|.*sh"
    "eval.*\$"
)

# Check against dangerous patterns
for pattern in "${DANGEROUS_PATTERNS[@]}"; do
    if [[ "$COMMAND" =~ $pattern ]]; then
        echo -e "${RED}❌ Blocked potentially dangerous command: $COMMAND${NC}" >&2
        exit 2
    fi
done

# Risky commands (warn only)
RISKY_PATTERNS=(
    "git push"
    "npm publish"
    "docker push"
    "rm -rf"
    "git clean"
)

for pattern in "${RISKY_PATTERNS[@]}"; do
    if [[ "$COMMAND" =~ $pattern ]]; then
        echo -e "${YELLOW}⚠️  Risky operation: $COMMAND${NC}" >&2
        # Continue anyway (exit 0)
        break
    fi
done

exit 0
