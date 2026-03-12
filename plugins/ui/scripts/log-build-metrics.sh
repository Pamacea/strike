#!/bin/bash
# log-build-metrics.sh - Log build metrics for performance tracking
# Part of Strike UI Plugin v1.7.0

set -euo pipefail

# Configuration
STRIKE_ROOT="${STRIKE_ROOT:-$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)}"
LOG_DIR="$STRIKE_ROOT/.claude/.strike"
LOG_FILE="$LOG_DIR/performance.log"

# Create log directory if it doesn't exist
mkdir -p "$LOG_DIR"

# Timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# Arguments
TOOL_NAME="${1:-unknown}"
TOOL_STATUS="${2:-success}"

# Log entry
cat >> "$LOG_FILE" << EOF
{
  "timestamp": "$TIMESTAMP",
  "tool": "$TOOL_NAME",
  "status": "$TOOL_STATUS",
  "session": "${CLAUDE_SESSION_ID:-unknown}"
}
EOF

# Optional: Send notification (uncomment if desired)
# if command -v osascript &> /dev/null; then
#     osascript -e 'display notification "Strike: '"$TOOL_NAME"' completed" with title "Claude Code"' 2>/dev/null || true
# fi

exit 0
