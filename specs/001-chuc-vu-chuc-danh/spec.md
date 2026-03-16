# Feature Specification: Quan Ly Danh Muc Chuc Vu Va Chuc Danh

**Feature Branch**: `001-chuc-vu-chuc-danh`  
**Created**: 2026-03-16  
**Status**: Draft  
**Input**: User description: "Quan ly danh muc Chuc vu va Chuc danh cho ho so CBCCVC, bao gom thong tin ma, ten, phan loai, trang thai su dung va nguyen tac ap dung theo don vi"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY TESTABLE - meaning if you implement just ONE of them,
  you should still have a viable MVP (Minimum Viable Product) that delivers value.
  
  Assign priorities (P1, P2, P3, etc.) to each story, where P1 is the most critical.
  Think of each story as a standalone slice of functionality that can be:
  - Developed independently
  - Tested independently
  - Deployed independently
  - Demonstrated to users independently
-->

### User Story 1 - Quan ly danh muc Chuc vu (Priority: P1)

Voi vai tro can bo to chuc, toi co the khai bao va quan ly danh muc Chuc vu cua don vi
de ho so CBCCVC luon co thong tin Chuc vu hop le theo quy dinh.

**Why this priority**: Chuc vu la thong tin bat buoc trong ho so, neu khong co danh muc dung
thi khong the nhap/chuan hoa du lieu nhan su.

**Independent Test**: Co the kiem thu doc lap bang cach tao moi, chinh sua, ngung su dung va
tra cuu cac muc Chuc vu trong danh muc cua don vi.

**Acceptance Scenarios**:

1. **Given** don vi chua co muc Chuc vu "Truong phong", **When** can bo to chuc tao moi muc
  voi Ma, Ten, Phan loai va Trang thai su dung, **Then** he thong luu thanh cong va hien thi muc
  trong danh sach danh muc Chuc vu.
2. **Given** mot muc Chuc vu dang duoc su dung, **When** can bo to chuc cap nhat Ten hoac
  Phan loai, **Then** thong tin moi duoc cap nhat va hien thi nhat quan o man hinh quan ly danh muc.
3. **Given** mot muc Chuc vu khong con ap dung, **When** can bo to chuc chuyen Trang thai
  sang khong su dung, **Then** muc do khong con duoc de xuat cho ho so moi nhung van giu
  nguyen cho cac ho so lich su.

---

### User Story 2 - Quan ly danh muc Chuc danh (Priority: P2)

Voi vai tro can bo to chuc, toi co the khai bao va quan ly danh muc Chuc danh
de dam bao ho so CBCCVC co thong tin ve vi tri chuyen mon, ngach bac theo quy dinh.

**Why this priority**: Chuc danh cung la thong tin bat buoc trong ho so, can duoc quan ly day du
de phuc vu nghiep vu bo nhiem, xep hang va bao cao.

**Independent Test**: Co the kiem thu doc lap bang cach tao moi, cap nhat, ngung su dung va
tra cuu cac muc Chuc danh trong danh muc cua don vi.

**Acceptance Scenarios**:

1. **Given** don vi can bo sung Chuc danh "Chuyen vien chinh", **When** can bo to chuc tao moi
  muc Chuc danh voi day du truong bat buoc, **Then** he thong ghi nhan muc moi trong danh muc.
2. **Given** muc Chuc danh dang duoc su dung trong nhieu ho so, **When** can bo to chuc doi
  Trang thai sang khong su dung, **Then** he thong khong cho phep gan cho ho so moi va
  khong lam mat lien ket du lieu da co.

---

### User Story 3 - Ap dung danh muc theo mo hinh don vi (Priority: P3)

Voi vai tro quan tri don vi, toi co the cau hinh don vi su dung danh muc Chuc vu/Chuc danh
tu xay dung hoac danh muc do don vi chu quan ban hanh,
de phan mem phu hop linh hoat voi co cau to chuc thuc te.

**Why this priority**: Tinh linh hoat ve nguon danh muc la yeu to van hanh quan trong, nhung
co the trien khai sau khi danh muc co ban da duoc quan ly on dinh.

**Independent Test**: Co the kiem thu doc lap bang cach cau hinh che do ap dung danh muc cho
tung don vi va xac minh ho so moi chi su dung duoc gia tri tu nguon danh muc duoc chon.

**Acceptance Scenarios**:

1. **Given** don vi duoc cau hinh "Tu xay dung danh muc", **When** nguoi dung lap ho so moi,
  **Then** he thong chi hien thi cac Chuc vu/Chuc danh do don vi tu quan ly.
2. **Given** don vi duoc cau hinh "Su dung danh muc don vi chu quan", **When** nguoi dung lap
  ho so moi, **Then** he thong chi hien thi cac muc danh muc do don vi chu quan ban hanh.
3. **Given** don vi chuyen doi giua hai che do ap dung danh muc, **When** viec chuyen doi duoc
  xac nhan, **Then** he thong bao toan du lieu ho so da co va ap dung quy tac moi cho du lieu tao moi.

---

### Edge Cases

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right edge cases.
-->

- Trung Ma Chuc vu hoac Ma Chuc danh trong cung pham vi danh muc ap dung.
- Nhap thieu truong bat buoc (Ma, Ten, Phan loai, Trang thai su dung).
- Co gang xoa hoan toan muc danh muc da duoc tham chieu boi ho so CBCCVC.
- Chuyen trang thai su dung cua muc dang duoc dung cho ho so dang hoat dong.
- Don vi chuyen nguon danh muc (tu xay dung <-> don vi chu quan) khi dang co ho so da lap.
- Don vi khong co quyen quan ly danh muc nhung thuc hien thao tac thay doi.

## Requirements *(mandatory)*

<!--
  ACTION REQUIRED: The content in this section represents placeholders.
  Fill them out with the right functional requirements.
-->

### Functional Requirements

- **FR-001**: He thong MUST cho phep khai bao danh muc Chuc vu voi day du truong:
  Ma Chuc vu, Ten Chuc vu, Phan loai, Trang thai su dung.
- **FR-002**: He thong MUST cho phep khai bao danh muc Chuc danh voi day du truong:
  Ma Chuc danh, Ten Chuc danh, Phan loai, Trang thai su dung.
- **FR-003**: He thong MUST cho phep xem danh sach, tim kiem va loc danh muc Chuc vu/Chuc danh
  theo Ma, Ten, Phan loai, Trang thai su dung.
- **FR-004**: He thong MUST dam bao Ma Chuc vu va Ma Chuc danh la duy nhat trong pham vi danh muc
  ma don vi dang ap dung.
- **FR-005**: He thong MUST cho phep cap nhat thong tin danh muc va theo doi trang thai su dung
  ma khong lam mat du lieu ho so da phat sinh.
- **FR-006**: He thong MUST khong cho phep xoa hoan toan mot muc Chuc vu/Chuc danh neu muc do
  da duoc tham chieu trong bat ky ho so CBCCVC nao.
- **FR-007**: He thong MUST cho phep tung don vi cau hinh nguyen tac ap dung danh muc theo 1 trong 2 che do:
  (a) Tu xay dung danh muc rieng, hoac (b) Su dung danh muc do don vi chu quan ban hanh.
- **FR-008**: He thong MUST ap dung nhat quan mot nguon danh muc cho tung don vi tai thoi diem lap/sua ho so,
  va khong hien thi cac gia tri ngoai nguon da cau hinh.
- **FR-009**: He thong MUST ghi nhan dau vet thay doi cho cac thao tac them/sua/chuyen trang thai danh muc,
  bao gom thoi diem va nguoi thuc hien.
- **FR-010**: He thong MUST chi cho phep nguoi dung co quyen quan tri to chuc-can bo thuc hien
  thao tac tao, sua, chuyen trang thai va cau hinh nguon danh muc.

### Key Entities *(include if feature involves data)*

- **ChucVu**: Danh muc vi tri lanh dao/quan ly hoac vi tri dam nhiem trong co cau don vi;
  thuoc tinh chinh gom MaChucVu, TenChucVu, PhanLoai, TrangThaiSuDung, PhamViApDung.
- **ChucDanh**: Danh muc vi tri chuyen mon/ngach bac cua CBCCVC;
  thuoc tinh chinh gom MaChucDanh, TenChucDanh, PhanLoai, TrangThaiSuDung, PhamViApDung.
- **DonVi**: Don vi su dung he thong;
  thuoc tinh lien quan gom CheDoApDungDanhMuc (TuXayDung hoac DonViChuQuan).
- **HoSoCBCCVC**: Ho so nhan su cua can bo;
  bat buoc lien ket toi 1 ChucVu va 1 ChucDanh hop le theo nguon danh muc duoc cau hinh cua DonVi.
- **LichSuThayDoiDanhMuc**: Ban ghi dau vet thay doi danh muc;
  gom doi tuong thay doi, hanh dong, nguoi thuc hien, thoi diem, gia tri truoc/sau.

## Assumptions & Dependencies

- He thong da co co che xac thuc va phan quyen nguoi dung theo vai tro don vi.
- Don vi chu quan (neu co) da cung cap va duy tri bo danh muc chuan de don vi cap duoi su dung.
- Ho so CBCCVC hien tai da ho tro truong Chuc vu va Chuc danh bat buoc.
- Cac bao cao to chuc can bo se su dung cung nguon du lieu danh muc da duoc quan ly trong tinh nang nay.

## Success Criteria *(mandatory)*

<!--
  ACTION REQUIRED: Define measurable success criteria.
  These must be technology-agnostic and measurable.
-->

### Measurable Outcomes

- **SC-001**: 100% ho so CBCCVC tao moi trong pham vi ap dung tinh nang co day du thong tin Chuc vu va Chuc danh hop le.
- **SC-002**: It nhat 95% thao tac tao moi/cap nhat mot muc danh muc (Chuc vu hoac Chuc danh) hoan tat trong <= 10 giay.
- **SC-003**: It nhat 90% nguoi dung vai tro to chuc-can bo hoan thanh dung quy trinh quan ly danh muc
  (them, sua, chuyen trang thai) ngay o lan thao tac dau tien.
- **SC-004**: Ty le loi du lieu ho so do chon sai hoac thieu Chuc vu/Chuc danh giam it nhat 80%
  sau 1 ky bao cao van hanh dau tien.
- **SC-005**: 100% don vi tham gia co the cau hinh va van hanh on dinh it nhat 1 trong 2 che do
  ap dung danh muc (tu xay dung hoac don vi chu quan ban hanh).
