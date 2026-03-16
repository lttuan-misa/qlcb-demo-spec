# Implementation Plan: Quan Ly Danh Muc Co Cau To Chuc

**Branch**: `002-co-cau-to-chuc` | **Date**: 2026-03-16 | **Spec**: `/specs/002-co-cau-to-chuc/spec.md`
**Input**: Feature specification from `/specs/002-co-cau-to-chuc/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Xay dung ban demo UI cho tinh nang quan ly danh muc Co cau To chuc trong he thong QLCB (quan ly can bo, cong chuc, vien chuc). Tinh nang bao gom cac luong nghiep vu chinh: khai bao va quan ly don vi to chuc phan cap; xem co cau dang cay (tree) hoac dang bang; tim kiem/loc theo ma, ten, loai, trang thai; them/sua/chuyen trang thai don vi qua modal/dialog; va xem chi tiet don vi kem danh sach don vi con va CBCCVC.

Pham vi ky thuat chi gom frontend thuan: HTML5, CSS3, JavaScript ES2020+. Vite duoc su dung lam dev server va build tool (devDependency duy nhat). Khong co framework UI, khong co component library, khong backend, khong database. Du lieu demo duoc quan ly client-side in-memory, tuan theo bo Design System MISA QLCB (color tokens, spacing, component patterns).

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES2020+)
**Primary Dependencies**: Vite 6.x (devDependency duy nhat - dev server + build tool); khong framework UI; khong component library; vanilla Web Platform APIs
**Storage**: Khong database; du lieu demo in-memory (store.js); localStorage la tuy chon de giu trang thai giua cac session demo
**Testing**: Kiem thu thu cong theo user story (manual-test-cases.md) + smoke test Node.js cho validation, store mutations va loop detection
**Target Platform**: Trinh duyet desktop hien dai (Chrome/Edge/Firefox ban moi nhat), responsive tu 1024px tro len
**Project Type**: Static frontend web application (demo, multi-page)
**Performance Goals**: 95% thao tac UI (tim kiem, loc, toggle view, mo modal) phan hoi trong <= 300ms voi bo du lieu demo 200 don vi; tree rendering voi <= 100 node phan hoi duoc
**Constraints**: Khong backend, khong database, khong auth thuc te; pham vi chi de minh hoa UX va luong nghiep vu; tuan theo Design System Figma https://mind-glyph-46433684.figma.site/ (colors, spacing, border-radius)
**Scale/Scope**: 1 trang HTML rieng (co-cau-to-chuc.html) + 4 man hinh logic (List, Detail, Form modal, Confirm dialog); quan ly co cau to chuc phan cap da cap tu goc den la

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Gate 1 - Code Quality: PASS (mo-dun hoa ro rang: state/ui/validators/data nam trong thu muc rieng; dat ten nhat quan tieng Viet; review truoc merge)
- Gate 2 - Testing Standards: PASS co dieu kien (smoke test moi cho co-cau-to-chuc: validation, loop-detection, store mutations; manual test checklist cho ca 4 man hinh va cac edge case)
- Gate 3 - UX Consistency: PASS (tai su dung tokens.css va cac pattern da xay dung o feature 001; 4 trang thai man hinh thong nhat: loading/empty/error/success)
- Gate 4 - Performance Budgets: PASS (ngan sach <= 300ms cho tat ca thao tac UI; tree rendering <= 100 node la du cho ban demo)
- Gate 5 - Simplicity & Documentation: PASS (chi them Vite 1 devDependency; vanilla JS/CSS; co day du research.md, data-model.md, ui-contract.md, quickstart.md)

## Project Structure

### Documentation (this feature)

```text
specs/002-co-cau-to-chuc/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
│   └── ui-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
frontend/
├── vite.config.js                         # Vite multi-page config (moi)
├── package.json                           # Cap nhat: them Vite devDependency + dev/build/preview scripts
├── index.html                             # Feature 001 - Chuc vu/Chuc danh (giu nguyen)
├── co-cau-to-chuc.html                    # Feature 002 - Co cau to chuc entry page (moi)
├── assets/
│   ├── css/
│   │   ├── tokens.css                     # Design tokens mau, spacing, radius (tai su dung)
│   │   ├── app.css                        # Styles chung + Feature 001 (mo rong toi thieu)
│   │   └── co-cau-to-chuc.css             # Styles rieng: Tree view, Detail panel, Breadcrumb (moi)
│   └── js/
│       ├── app.js                         # Feature 001 entry (giu nguyen)
│       ├── data/seed.js                   # Feature 001 seed (giu nguyen)
│       ├── state/store.js                 # Feature 001 store (giu nguyen)
│       ├── ui/                            # Feature 001 UI modules (giu nguyen)
│       ├── validators/                    # Feature 001 validators (giu nguyen)
│       └── co-cau-to-chuc/
│           ├── app.js                     # Entry: khoi dong store, bind events, render loop
│           ├── data/
│           │   └── seed.js                # Du lieu demo: cay 3 cap voi so CBCCVC gia lap
│           ├── state/
│           │   └── store.js               # CRUD DonViToChuc, tree helpers, loop detection, audit trail
│           ├── ui/
│           │   ├── list-view.js           # Screen 1: bang + tree toggle, toolbar, pagination
│           │   ├── tree-view.js           # Tree rendering: node expand/collapse, node count badge
│           │   ├── detail-view.js         # Screen 2: info panel, don vi con, CBCCVC list, breadcrumb
│           │   ├── form-modal.js          # Screen 3: modal them/sua, inline validation, loading state
│           │   └── confirm-dialog.js      # Screen 4: dialog xac nhan chuyen trang thai / xoa
│           └── validators/
│               └── don-vi-validator.js    # Validate ma, ten, loai, cap, trang thai; phat hien vong lap
└── tests/
    ├── manual-test-cases.md               # Manual test cases Feature 001 (giu nguyen)
    └── smoke/
        ├── validation-smoke.test.js       # Feature 001 smoke tests (giu nguyen)
        └── co-cau-to-chuc-smoke.test.js   # Feature 002: don-vi-validator + store + loop detection
```

**Structure Decision**: Tach feature 002 vao thu muc con rieng (`co-cau-to-chuc/`) de tranh xung dot voi feature 001, giu nguyen toan bo code cu, de de mo rong them feature moi. Vite duoc them nhu devDependency duy nhat de co hot-module reload khi phat trien va kha nang build toi uu; khong them bat ky framework hay component library nao khac.

## Post-Design Constitution Check

- Code Quality Is a Release Gate: PASS
  - Cau truc module: ui/, state/, validators/, data/ tach biet, moi file mot trach nhiem duy nhat. Dat ten theo quy uoc tieng Viet nhat quan.
- Testing Standards Are Mandatory: PASS co dieu kien
  - Smoke test moi (co-cau-to-chuc-smoke.test.js) bao gom: validation don vi, phat hien vong lap trong cay, CRUD store, chuyen trang thai.
  - Manual test cases mo rong cho 4 man hinh va cac edge case da xac dinh trong spec.
- UX Consistency Is a Product Requirement: PASS
  - tokens.css duoc tai su dung 100%. UI contract da xac dinh ro component, trang thai, ngon ngu nhat quan giua 2 feature.
- Performance Budgets Are Required: PASS
  - Ngan sach phan hoi <= 300ms da duoc ghi nhan cho search/filter/toggle view va tree render <= 100 node.
- Simplicity, Maintainability, and Documentation: PASS
  - Chi them Vite (1 devDependency); vanilla JS/CSS giup de doc, de bao tri; co day du research.md, data-model.md, ui-contract.md, quickstart.md.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Them Vite devDependency | Hot reload khi dev + toi uu build + module resolution nhat quan | Khong co build tool: ES import duong dan phuc tap, khong co HMR, kho quan ly multi-page |
