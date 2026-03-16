# Implementation Plan: Quan Ly Danh Muc Chuc Vu Va Chuc Danh

**Branch**: `001-chuc-vu-chuc-danh` | **Date**: 2026-03-16 | **Spec**: `/specs/001-chuc-vu-chuc-danh/spec.md`
**Input**: Feature specification from `/specs/001-chuc-vu-chuc-danh/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Xay dung ban demo UI cho tinh nang quan ly danh muc Chuc vu/Chuc danh trong QLCB,
gom cac luong nghiep vu: tao moi, cap nhat, chuyen trang thai su dung, tim kiem/loc,
va cau hinh nguon danh muc theo Don vi (tu xay dung hoac don vi chu quan).

Pham vi ky thuat trong giai doan nay chi gom frontend thuần: HTML/CSS/JavaScript,
khong tich hop backend, khong ket noi database, su dung du lieu gia lap phia client.

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: HTML5, CSS3, JavaScript (ES2020+)  
**Primary Dependencies**: Khong dung framework UI; chi dung Web Platform APIs co san  
**Storage**: Khong database; du lieu demo luu tam trong bo nho trinh duyet (in-memory), cho phep tuy chon localStorage cho tra nghiem demo  
**Testing**: Kiem thu thu cong theo user journey + smoke test JS cho cac ham validation/chuyen trang thai  
**Target Platform**: Trinh duyet desktop hien dai (Chrome/Edge/Firefox ban moi), responsive cho kich thuoc mobile co ban
**Project Type**: Static frontend web application (demo)  
**Performance Goals**: 95% thao tac UI (loc/tim kiem/chuyen tab/chuyen trang thai) phan hoi trong <= 300ms voi bo du lieu demo 500 ban ghi moi danh muc  
**Constraints**: Khong backend, khong database, khong auth thuc te; pham vi chi de minh hoa UX va luong nghiep vu  
**Scale/Scope**: 1 man hinh chinh + cac modal form; quan ly 2 danh muc (Chuc vu, Chuc danh) va 1 cau hinh nguon danh muc theo don vi

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Gate 1 - Code Quality: PASS (se ap dung linting/co cau file ro rang, tieu chuan dat ten va review)
- Gate 2 - Testing Standards: PASS co dieu kien (yeu cau bo test toi thieu cho validation va state transition, cong them test checklist theo user story)
- Gate 3 - UX Consistency: PASS (su dung mot he thong pattern chung cho form, table, trang thai loading/empty/error/success)
- Gate 4 - Performance Budgets: PASS (da dat ngan sach phan hoi <= 300ms voi du lieu demo)
- Gate 5 - Simplicity & Documentation: PASS (UI-only, khong mo rong sang backend/db; co quickstart + UI contract)

## Project Structure

### Documentation (this feature)

```text
specs/001-chuc-vu-chuc-danh/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
frontend/
├── index.html
├── assets/
│   ├── css/
│   │   ├── tokens.css
│   │   └── app.css
│   └── js/
│       ├── data/
│       │   └── seed.js
│       ├── state/
│       │   └── store.js
│       ├── ui/
│       │   ├── danh-muc-view.js
│       │   └── cau-hinh-view.js
│       ├── validators/
│       │   └── danh-muc-validator.js
│       └── app.js
└── tests/
  ├── manual-test-cases.md
  └── smoke/
    └── validation-smoke.test.js
```

**Structure Decision**: Chon cau truc frontend static mot khoi de toi uu toc do demo,
de tach biet ro giao dien, state, validation va test smoke; khong tao backend/api/database.

## Post-Design Constitution Check

- Code Quality Is a Release Gate: PASS
  - Thiet ke tach module ro rang (ui/state/validators/data), han che logic dong o mot file lon.
- Testing Standards Are Mandatory: PASS co dieu kien
  - Da co chien luoc test thu cong theo user story + smoke test JS cho validation va state transition.
- UX Consistency Is a Product Requirement: PASS
  - UI contract da chot cho tab, modal, trang thai loading/empty/error/success va hanh vi nhat quan.
- Performance Budgets Are Required: PASS
  - Ngan sach phan hoi <= 300ms voi 500 ban ghi moi danh muc da duoc ghi vao plan va research.
- Simplicity, Maintainability, and Documentation: PASS
  - Du an giu pham vi UI-only va da co day du `research.md`, `data-model.md`, `contracts/ui-contract.md`, `quickstart.md`.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |
