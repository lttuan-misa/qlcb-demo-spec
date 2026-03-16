# Tasks: Quan Ly Danh Muc Chuc Vu Va Chuc Danh

**Input**: Design documents from `/specs/001-chuc-vu-chuc-danh/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Bao gom test tasks vi constitution va plan yeu cau testing toi thieu (manual + smoke test) cho ban demo UI-only.

**Organization**: Tasks duoc nhom theo user story de moi story co the implement va test doc lap.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Co the chay song song (khac file, khong phu thuoc task chua xong)
- **[Story]**: Story ma task phuc vu (US1, US2, US3)
- Mo ta phai kem duong dan file cu the

## Path Conventions

- Frontend static app: `frontend/index.html`, `frontend/assets/css/`, `frontend/assets/js/`, `frontend/tests/`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Khoi tao khung frontend static va quy uoc dev cho ban demo

- [X] T001 Tao cau truc thu muc frontend theo plan tai frontend/index.html
- [X] T002 [P] Tao design tokens co ban tai frontend/assets/css/tokens.css
- [X] T003 [P] Tao stylesheet chinh cho layout/trang thai UI tai frontend/assets/css/app.css
- [X] T004 [P] Tao seed data cho danh muc va don vi tai frontend/assets/js/data/seed.js
- [X] T005 [P] Tao bo test case manual theo quickstart tai frontend/tests/manual-test-cases.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Nen tang state, validation, render khung va smoke test dung chung cho tat ca user stories

**CRITICAL**: Hoan tat phase nay truoc khi lam US1/US2/US3

- [X] T006 Tao state store in-memory cho ChucVu/ChucDanh/DonVi tai frontend/assets/js/state/store.js
- [X] T007 [P] Tao ham validation dung chung cho Ma/Ten/PhanLoai/TrangThai tai frontend/assets/js/validators/danh-muc-validator.js
- [X] T008 Tao shell UI man hinh chinh (tabs + panel cau hinh + khu thong bao) tai frontend/index.html
- [X] T009 Tao module render khung danh muc (table/filter/search/modal placeholder) tai frontend/assets/js/ui/danh-muc-view.js
- [X] T010 [P] Tao module render cau hinh don vi tai frontend/assets/js/ui/cau-hinh-view.js
- [X] T011 Ket noi luong khoi tao ung dung va event bus don gian tai frontend/assets/js/app.js
- [X] T012 [P] Tao smoke test cho validation va state transition co ban tai frontend/tests/smoke/validation-smoke.test.js
- [X] T013 Chay va cap nhat ket qua smoke test + checklist setup vao frontend/tests/manual-test-cases.md

**Checkpoint**: Foundation san sang, co the trien khai user stories doc lap

---

## Phase 3: User Story 1 - Quan ly danh muc Chuc vu (Priority: P1) 🎯 MVP

**Goal**: Cho phep quan ly day du danh muc Chuc vu (them/sua/chuyen trang thai/tim-kiem-loc) tren UI demo

**Independent Test**: Thuc hien duoc toan bo flow US1 trong quickstart ma khong can dung tinh nang US2/US3

### Tests for User Story 1

- [X] T014 [P] [US1] Bo sung test case manual cho flow them moi Chuc vu tai frontend/tests/manual-test-cases.md
- [X] T015 [P] [US1] Bo sung test case manual cho flow sua Chuc vu tai frontend/tests/manual-test-cases.md
- [X] T016 [P] [US1] Bo sung smoke test trung Ma Chuc vu tai frontend/tests/smoke/validation-smoke.test.js

### Implementation for User Story 1

- [X] T017 [P] [US1] Them schema field ChucVu va helper map view-model tai frontend/assets/js/state/store.js
- [X] T018 [US1] Implement form modal Them/Sua Chuc vu tai frontend/assets/js/ui/danh-muc-view.js
- [X] T019 [US1] Implement validation va hien thi loi inline cho Chuc vu tai frontend/assets/js/validators/danh-muc-validator.js
- [X] T020 [US1] Implement bang danh sach Chuc vu + filter + search tai frontend/assets/js/ui/danh-muc-view.js
- [X] T021 [US1] Implement hanh dong chuyen Trang thai su dung Chuc vu tai frontend/assets/js/ui/danh-muc-view.js
- [X] T022 [US1] Them thong bao success/error/loading/empty cho tab Chuc vu tai frontend/assets/css/app.css
- [X] T023 [US1] Day wire event va cap nhat render Chuc vu trong app controller tai frontend/assets/js/app.js

**Checkpoint**: US1 hoan chinh va demo doc lap duoc

---

## Phase 4: User Story 2 - Quan ly danh muc Chuc danh (Priority: P2)

**Goal**: Cho phep quan ly danh muc Chuc danh nhat quan voi Chuc vu

**Independent Test**: Chay duoc luong them/sua/chuyen trang thai/tim-kiem-loc cho Chuc danh du lap voi US1

### Tests for User Story 2

- [X] T024 [P] [US2] Bo sung test case manual cho flow them/sua Chuc danh tai frontend/tests/manual-test-cases.md
- [X] T025 [P] [US2] Bo sung smoke test trung Ma Chuc danh tai frontend/tests/smoke/validation-smoke.test.js

### Implementation for User Story 2

- [X] T026 [P] [US2] Them schema field ChucDanh va helper map view-model tai frontend/assets/js/state/store.js
- [X] T027 [US2] Mo rong form modal de ho tro loai du lieu Chuc danh tai frontend/assets/js/ui/danh-muc-view.js
- [X] T028 [US2] Ap dung validation va thong diep nhat quan cho Chuc danh tai frontend/assets/js/validators/danh-muc-validator.js
- [X] T029 [US2] Render tab bang danh sach Chuc danh + filter + search tai frontend/assets/js/ui/danh-muc-view.js
- [X] T030 [US2] Implement chuyen Trang thai su dung cho Chuc danh tai frontend/assets/js/ui/danh-muc-view.js
- [X] T031 [US2] Canh chinh style va microcopy de dong nhat UX giua 2 tab tai frontend/assets/css/app.css
- [X] T032 [US2] Cap nhat luong dieu khien va event cho tab Chuc danh tai frontend/assets/js/app.js

**Checkpoint**: US1 va US2 deu hoat dong doc lap

---

## Phase 5: User Story 3 - Ap dung danh muc theo mo hinh don vi (Priority: P3)

**Goal**: Cau hinh nguon danh muc theo don vi va phan anh ngay tren UI

**Independent Test**: Chuyen duoc che do ap dung danh muc va kiem chung danh sach hien thi thay doi dung

### Tests for User Story 3

- [X] T033 [P] [US3] Bo sung test case manual cho flow doi che do ap dung danh muc tai frontend/tests/manual-test-cases.md
- [X] T034 [P] [US3] Bo sung smoke test state transition cheDoApDungDanhMuc tai frontend/tests/smoke/validation-smoke.test.js

### Implementation for User Story 3

- [X] T035 [P] [US3] Implement panel cau hinh DonVi (tu_xay_dung/don_vi_chu_quan) tai frontend/assets/js/ui/cau-hinh-view.js
- [X] T036 [US3] Them logic loc nguon danh muc theo che do DonVi tai frontend/assets/js/state/store.js
- [X] T037 [US3] Ket noi su kien doi che do va rerender ca 2 tab tai frontend/assets/js/app.js
- [X] T038 [US3] Hien thi thong bao xac nhan/chu thich khi doi che do ap dung tai frontend/index.html
- [X] T039 [US3] Dieu chinh UX panel cau hinh cho desktop/mobile tai frontend/assets/css/app.css

**Checkpoint**: Tat ca user stories da hoan thanh va test doc lap duoc

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Hoan thien tai lieu, hieu nang va soat loi cuoi cho ban demo

- [X] T040 [P] Dong bo UI contract voi implementation thuc te tai specs/001-chuc-vu-chuc-danh/contracts/ui-contract.md
- [X] T041 Toi uu hieu nang render/filter voi bo du lieu demo 500 ban ghi tai frontend/assets/js/ui/danh-muc-view.js
- [X] T042 [P] Cap nhat quickstart theo thao tac demo thuc te tai specs/001-chuc-vu-chuc-danh/quickstart.md
- [ ] T043 Chay full manual checklist va ghi ket qua vao frontend/tests/manual-test-cases.md
- [X] T044 Ra soat code style, ten bien, tach ham de dam bao chat luong tai frontend/assets/js/app.js

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: Bat dau ngay
- **Phase 2 (Foundational)**: Phu thuoc Phase 1; chan tat ca user stories
- **Phase 3-5 (User Stories)**: Bat dau sau Phase 2
- **Phase 6 (Polish)**: Bat dau khi user stories muc tieu da xong

### User Story Dependencies

- **US1 (P1)**: Doc lap sau Foundational, de nghi MVP
- **US2 (P2)**: Doc lap sau Foundational; tai su dung module chung tu US1 nhung co test rieng
- **US3 (P3)**: Doc lap sau Foundational; can US1/US2 de demo tac dong day du nhung van test logic rieng

### Within Each User Story

- Test tasks truoc implementation tasks
- Model/state truoc view logic
- View logic truoc polish style
- Hoan tat user story va test doc lap truoc khi chot

### Parallel Opportunities

- Setup: T002, T003, T004, T005 song song sau T001
- Foundational: T007, T010, T012 song song sau T006
- US1: T014, T015, T016 song song
- US2: T024, T025 song song
- US3: T033, T034 song song
- Polish: T040, T042 song song

---

## Parallel Example: User Story 1

```bash
Task: "T014 [US1] Test case them moi Chuc vu in frontend/tests/manual-test-cases.md"
Task: "T015 [US1] Test case sua Chuc vu in frontend/tests/manual-test-cases.md"
Task: "T016 [US1] Smoke test trung Ma Chuc vu in frontend/tests/smoke/validation-smoke.test.js"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Hoan tat Phase 1 + Phase 2
2. Hoan tat Phase 3 (US1)
3. Stop va demo MVP US1

### Incremental Delivery

1. MVP: US1
2. Mo rong: US2
3. Hoan thien cau hinh nguon danh muc: US3
4. Chot quality/performance/docs o Phase 6

### Parallel Team Strategy

1. Dev A: US1
2. Dev B: US2
3. Dev C: US3
4. Ca nhom hop nhat o Phase 6

---

## Notes

- Tat ca tasks tuan thu format checklist `- [ ] Txxx ...`
- Cac task co [USx] deu co duong dan file cu the
- Suggested MVP scope: Phase 1 + Phase 2 + Phase 3 (US1)
