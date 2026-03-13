#!/usr/bin/env node
/**
 * Log File Write - Cross-platform (Windows/Unix)
 * Strike UI Plugin v1.7.0
 *
 * Usage: node log-file-write.js "filepath"
 */

const fs = require('fs');
const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
  process.exit(0);
}

const logDir = path.join(process.cwd(), '.claude', '.strike');
try {
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  const logFile = path.join(logDir, 'file-operations.log');
  const timestamp = new Date().toISOString();
  fs.appendFileSync(logFile, `[${timestamp}] Wrote: ${filePath}\n`);
} catch (err) {
  // Silently fail
}

process.exit(0);
