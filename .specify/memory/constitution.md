<!--
Sync Impact Report
- Version change: template -> 1.0.0
- Modified principles:
	- Placeholder Principle 1 -> I. Code Quality Is a Release Gate
	- Placeholder Principle 2 -> II. Testing Standards Are Mandatory
	- Placeholder Principle 3 -> III. UX Consistency Is a Product Requirement
	- Placeholder Principle 4 -> IV. Performance Budgets Are Required
	- Placeholder Principle 5 -> V. Simplicity, Maintainability, and Documentation
- Added sections:
	- Engineering Standards
	- Delivery Workflow and Quality Gates
- Removed sections:
	- None
- Templates reviewed for sync:
	- ✅ .specify/templates/plan-template.md (no change needed; constitution check section remains valid)
	- ✅ .specify/templates/spec-template.md (no change needed; supports measurable criteria)
	- ✅ .specify/templates/tasks-template.md (no change needed; test tasks can be mandated per feature)
	- ✅ .specify/templates/checklist-template.md (no constitution conflicts found)
	- ✅ .specify/templates/agent-file-template.md (no constitution conflicts found)
	- ⚠ .specify/templates/commands/*.md (directory not present in this repository)
- Follow-up TODOs:
	- None
-->

# QLCB Constitution

## Core Principles

### I. Code Quality Is a Release Gate
All production code MUST meet baseline quality gates before merge: static analysis clean at
configured severity, formatting/linting applied, and no known high-severity defects left
untracked. Changes MUST preserve readability through clear naming and small, cohesive units
of behavior. Code review MUST reject changes that increase complexity without measurable
benefit.

Rationale: Consistent code quality reduces defect rates, maintenance cost, and onboarding time.

### II. Testing Standards Are Mandatory
Every behavior change MUST include automated tests at the appropriate level (unit,
integration, or contract). New or changed user-visible behavior MUST be covered by acceptance
scenarios. Defects MUST be reproduced with a failing test before fix when feasible.
No change is complete until required tests pass in CI.

Rationale: Reliable delivery depends on executable evidence that behavior remains correct.

### III. UX Consistency Is a Product Requirement
User-facing changes MUST follow shared interaction patterns for language, navigation,
feedback, states (loading/empty/error/success), and accessibility fundamentals. Equivalent
actions MUST behave consistently across screens and flows. Any intentional deviation MUST be
documented in the feature spec and approved during review.

Rationale: Consistency improves usability, trust, and supportability.

### IV. Performance Budgets Are Required
Features MUST define measurable performance expectations in planning (for example: latency,
throughput, memory, and startup time) and validate them before release. Regressions against
agreed budgets MUST block release unless explicitly approved with mitigation and follow-up
tasks.

Rationale: Performance is a functional requirement and must be managed explicitly.

### V. Simplicity, Maintainability, and Documentation
Solutions MUST prefer the simplest design that satisfies requirements. New dependencies,
abstractions, or architectural complexity MUST be justified by clear value. Public behavior,
operational expectations, and non-obvious decisions MUST be documented in specs, code comments,
or runbooks.

Rationale: Simple, documented systems are easier to evolve safely.

## Engineering Standards

- Definition of Done MUST include: code review complete, required tests passing, and updated
documentation for behavior changes.
- Requirements and success criteria MUST be testable and measurable, not implementation-specific.
- Accessibility and internationalization impacts MUST be considered for user-facing changes.
- Observability (logs/metrics/traces) SHOULD be added for new critical flows and MUST be added
when diagnosing failures would otherwise be difficult.

## Delivery Workflow and Quality Gates

- Plan phase MUST state quality, testing, UX consistency, and performance checks for the feature.
- Implementation MUST keep changes scoped to a user story or thin vertical slice where practical.
- Pull requests MUST include:
	- Summary of behavior changes
	- Linked acceptance scenarios
	- Evidence of tests run
	- Performance evidence when budgets apply
- Reviewers MUST block merge when constitutional principles are unmet or evidence is missing.

## Governance

This constitution supersedes conflicting local conventions in this repository.

- Amendment process: Propose changes via PR with rationale, impact assessment, and migration
guidance for affected templates/workflows.
- Approval policy: At least one maintainer approval is required for any amendment.
- Versioning policy:
	- MAJOR for incompatible principle or governance changes.
	- MINOR for new principles/sections or materially expanded guidance.
	- PATCH for clarifications and editorial refinements.
- Compliance checks: Every plan and PR review MUST include a constitution compliance check.

**Version**: 1.0.0 | **Ratified**: 2026-03-16 | **Last Amended**: 2026-03-16
