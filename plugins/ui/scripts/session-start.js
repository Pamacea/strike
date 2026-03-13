#!/usr/bin/env node
/**
 * Session Start Hook - Cross-platform (Windows/Unix)
 * Strike UI Plugin v1.7.0
 */

const fs = require('fs');
const path = require('path');

// Create log directory if needed
const logDir = path.join(process.cwd(), '.claude', '.strike');
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Append to log
  const logFile = path.join(logDir, 'session.log');
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `[${timestamp}] ✓ Strike UI Plugin v1.7.0 loaded\n`);
} catch (err) {
  // Silently fail - don't break startup
}

process.exit(0);
