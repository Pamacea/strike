#!/usr/bin/env node
/**
 * Session Start Hook - Cross-platform (Windows/Unix)
 * EXG Plugin v1.0.0
 */

const fs = require('fs');
const path = require('path');

// Create log directory if needed
const logDir = path.join(process.cwd(), '.ex-g-se');
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Append to log
  const logFile = path.join(logDir, 'session.log');
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `[${timestamp}] ✓ EXG Plugin v1.0.0 - Session content generation ready\n`);
} catch (err) {
  // Silently fail - don't break startup
}

process.exit(0);
