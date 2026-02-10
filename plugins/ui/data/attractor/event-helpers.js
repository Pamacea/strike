/**
 * Strike Event Helpers
 *
 * Convenience functions for emitting common strike events.
 * These helpers integrate with the orchestrator and implementer workflows.
 */

const { StrikeEventEmitter } = require('./event-emitter.js');

/**
 * Create a new event emitter for a strike session
 */
function createEmitter(sessionId, config) {
  return new StrikeEventEmitter(sessionId, config);
}

/**
 * Emit session start event
 */
function emitSessionStart(emitter, mode, config) {
  return emitter.emit('SESSION_START', {
    mode,
    timestamp: new Date().toISOString(),
    config
  });
}

/**
 * Emit phase start event
 */
function emitPhaseStart(emitter, phase) {
  return emitter.emit('PHASE_START', {
    phase,
    session_id: emitter.sessionId,
    timestamp: new Date().toISOString()
  });
}

/**
 * Emit phase end event
 */
function emitPhaseEnd(emitter, phase, durationMs, success, outputFiles = []) {
  return emitter.emit('PHASE_END', {
    phase,
    session_id: emitter.sessionId,
    duration_ms: durationMs,
    success,
    output_files: outputFiles
  });
}

/**
 * Emit analysis start event
 */
function emitAnalysisStart(emitter, prompt) {
  return emitter.emit('ANALYSIS_START', {
    prompt,
    timestamp: new Date().toISOString()
  });
}

/**
 * Emit analysis completion event
 */
function emitAnalysisEnd(emitter, prompt, keywords, riskAssessment) {
  return emitter.emit('ANALYSIS_END', {
    prompt,
    detected_keywords: keywords,
    risk_assessment: riskAssessment,
    timestamp: new Date().toISOString()
  });
}

/**
 * Emit anti-patterns detected event
 */
function emitAntiPatternsDetected(emitter, patterns) {
  const highSeverity = patterns.filter(p => p.severity === 'high').length;

  return emitter.emit('ANTI_PATTERNS_DETECTED', {
    patterns: patterns.map(p => ({
      category: p.category,
      pattern: p.pattern,
      severity: p.severity,
      confidence: p.confidence || 0.8
    })),
    total_count: patterns.length,
    high_severity_count: highSeverity
  });
}

/**
 * Emit constraints selected event
 */
function emitConstraintsSelected(emitter, constraints, totalScore, categories) {
  return emitter.emit('CONSTRAINTS_SELECTED', {
    constraints: constraints.map(c => ({
      id: c.id,
      name: c.name,
      category: c.category,
      score: c.total_score,
      creativity: c.creativity,
      difficulty: c.difficulty,
      impact: c.impact,
      synergy: c.synergy
    })),
    total_score: totalScore,
    categories_selected: categories
  });
}

/**
 * Emit challenge start event
 */
function emitChallengeStart(emitter, targetDecision) {
  return emitter.emit('CHALLENGE_START', {
    target_decision: targetDecision,
    timestamp: new Date().toISOString()
  });
}

/**
 * Emit challenge end event
 */
function emitChallengeEnd(emitter, originalDecision, challenges, alternatives, modified, finalDecision) {
  return emitter.emit('CHALLENGE_END', {
    original_decision: originalDecision,
    challenges_raised: challenges,
    alternatives_proposed: alternatives,
    decision_modified: modified,
    final_decision: finalDecision
  });
}

/**
 * Emit spec generated event
 */
function emitSpecGenerated(emitter, specFile, validationPassed, schemaVersion, featureCount, constraintCount) {
  return emitter.emit('SPEC_GENERATED', {
    spec_file: specFile,
    validation_passed: validationPassed,
    schema_version: schemaVersion,
    feature_count: featureCount,
    constraint_count: constraintCount
  });
}

/**
 * Emit build start event
 */
function emitBuildStart(emitter, template, specFile, outputDir) {
  return emitter.emit('BUILD_START', {
    template,
    spec_file: specFile,
    output_dir: outputDir
  });
}

/**
 * Emit build end event
 */
function emitBuildEnd(emitter, template, success, outputDir, componentCount, bundleSize, buildTimeMs) {
  return emitter.emit('BUILD_END', {
    template,
    success,
    output_dir: outputDir,
    component_count: componentCount,
    bundle_size: bundleSize,
    build_time_ms: buildTimeMs
  });
}

/**
 * Emit component loaded event
 */
function emitComponentLoaded(emitter, componentId, name, compatibility, antiPatternRisk) {
  return emitter.emit('COMPONENT_LOADED', {
    component_id: componentId,
    name,
    compatibility,
    anti_pattern_risk: antiPatternRisk
  });
}

/**
 * Emit accessibility check event
 */
function emitAccessibilityCheck(emitter, checkType, passed, itemsChecked, itemsFailed, failures = []) {
  return emitter.emit('ACCESSIBILITY_CHECK', {
    check_type: checkType,
    passed,
    items_checked: itemsChecked,
    items_failed: itemsFailed,
    failures
  });
}

/**
 * Emit validation error event
 */
function emitValidationError(emitter, schema, errors) {
  return emitter.emit('VALIDATION_ERROR', {
    schema,
    errors: errors.map(e => ({
      path: e.path || '',
      message: e.message || '',
      value: e.value
    }))
  });
}

/**
 * Emit error event
 */
function emitError(emitter, phase, errorType, message, stackTrace, recoverable = true) {
  return emitter.emit('ERROR', {
    phase,
    error_type: errorType,
    message,
    stack_trace: stackTrace,
    recoverable
  });
}

/**
 * Emit checkpoint saved event
 */
function emitCheckpointSaved(emitter, nodeId, checkpointFile) {
  return emitter.emit('CHECKPOINT_SAVED', {
    node_id: nodeId,
    checkpoint_file: checkpointFile,
    timestamp: new Date().toISOString()
  });
}

/**
 * Emit checkpoint loaded event
 */
function emitCheckpointLoaded(emitter, checkpointFile, resumedFromNode) {
  return emitter.emit('CHECKPOINT_LOADED', {
    checkpoint_file: checkpointFile,
    resumed_from_node: resumedFromNode,
    timestamp: new Date().toISOString()
  });
}

/**
 * Emit metrics collected event
 */
function emitMetricsCollected(emitter, complianceScore, a11yScore, validationScore, bundleSizeBytes, buildTimeMs, componentsUsed) {
  return emitter.emit('METRICS_COLLECTED', {
    compliance_score: complianceScore,
    a11y_score: a11yScore,
    validation_score: validationScore,
    bundle_size_bytes: bundleSizeBytes,
    build_time_ms: buildTimeMs,
    components_used: componentsUsed
  });
}

/**
 * Wrapper for executing a phase with automatic event emission
 */
async function withPhaseEvents(emitter, phaseName, phaseFn) {
  const startTime = Date.now();

  try {
    emitPhaseStart(emitter, phaseName);

    const result = await phaseFn();

    const duration = Date.now() - startTime;
    emitPhaseEnd(emitter, phaseName, duration, true, result.output_files || []);

    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    emitPhaseEnd(emitter, phaseName, duration, false);
    emitError(emitter, phaseName, error.constructor.name, error.message, error.stack);

    throw error;
  }
}

/**
 * Wrapper for executing with checkpoint support
 */
async function withCheckpoint(emitter, nodeId, phaseFn, checkpointDir) {
  const checkpointFile = `${checkpointDir}/${nodeId}.checkpoint.json`;

  try {
    const result = await phaseFn();

    // Save checkpoint
    const checkpoint = {
      node_id: nodeId,
      timestamp: new Date().toISOString(),
      result,
      session_id: emitter.sessionId
    };

    // In real implementation, write to file
    emitCheckpointSaved(emitter, nodeId, checkpointFile);

    return result;
  } catch (error) {
    emitError(emitter, nodeId, 'CheckpointError', error.message, error.stack);
    throw error;
  }
}

// Export all helpers
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    createEmitter,
    emitSessionStart,
    emitPhaseStart,
    emitPhaseEnd,
    emitAnalysisStart,
    emitAnalysisEnd,
    emitAntiPatternsDetected,
    emitConstraintsSelected,
    emitChallengeStart,
    emitChallengeEnd,
    emitSpecGenerated,
    emitBuildStart,
    emitBuildEnd,
    emitComponentLoaded,
    emitAccessibilityCheck,
    emitValidationError,
    emitError,
    emitCheckpointSaved,
    emitCheckpointLoaded,
    emitMetricsCollected,
    withPhaseEvents,
    withCheckpoint
  };
}
