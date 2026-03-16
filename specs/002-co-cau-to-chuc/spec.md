# Feature Specification: Quan Ly Danh Muc Co Cau To Chuc

**Feature Branch**: `002-co-cau-to-chuc`  
**Created**: 2026-03-16  
**Status**: Draft  
**Input**: User description: "Tôi muốn bổ sung danh mục cơ cấu tổ chức trên phần mềm quản lý cán bộ, công chức, viên chức. Hãy tìm hiểu 1 số thông tin về cơ cấu tổ chức của 1 đơn vị nhà nước theo quy định của bộ nội vụ (Việt Nam)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Khai bao va quan ly danh muc Don vi trong co cau to chuc (Priority: P1)

Voi vai tro can bo to chuc, toi co the khai bao va quan ly danh muc don vi
(phong, ban, trung tam, truong phong, can bo chuyen trach...) theo co cau to chuc cua
don vi chu quan, de he thong ho tro phan cong, theo doi va bao cao nhan su dung quy dinh.

**Why this priority**: Co cau to chuc la nen tang phan loai va lien ket toan bo ho so CBCCVC.
Neu khong co danh muc nay, cac chuc nang cap phat ho so, bao cao bien che va
to chuc can bo deu bi anh huong.

**Independent Test**: Co the kiem thu doc lap bang cach tao moi mot don vi to chuc,
cap nhat thong tin, chuyen trang thai va tra cuu don vi do trong danh sach co cau to chuc.

**Acceptance Scenarios**:

1. **Given** don vi chua co phong "Phong To chuc - Can bo",
   **When** can bo quan tri tao moi voi Ma don vi, Ten don vi, Loai to chuc va Don vi cha,
   **Then** he thong luu thanh cong va hien thi don vi trong cay co cau to chuc.
2. **Given** mot don vi to chuc dang hoat dong,
   **When** can bo quan tri cap nhat Ten don vi hoac Don vi cha,
   **Then** thay doi duoc phang anh ngay trong cay co cau to chuc va cac man hinh lien quan.
3. **Given** mot don vi to chuc khong con hoat dong,
   **When** can bo quan tri chuyen Trang thai sang "Ngung hoat dong",
   **Then** don vi do khong con xuat hien trong cac o chon don vi khi tao ho so moi,
   nhung van giu duoc lien ket voi ho so lich su.

---

### User Story 2 - Xem va tim kiem co cau to chuc theo phan cap (Priority: P2)

Voi vai tro can bo nhan su hoac lanh dao don vi, toi co the xem co cau to chuc toan don vi
theo dang cay phan cap de nam bat nhanh so luong, vi tri va moi quan he cac don vi truc thuoc,
phuc vu lap ke hoach bien che va quan ly nhan su.

**Why this priority**: Kha nang xem co cau to chuc phan cap la dieu kien can thiet de can bo
to chuc va lanh dao ra quyet dinh phan cong, dieu dong CBCCVC.

**Independent Test**: Co the kiem thu doc lap bang cach tao nhieu cap don vi long nhau va xac nhan
cay hien thi dung cap bac, so luong CBCCVC theo tung don vi, va chuc nang tim kiem theo ten don vi.

**Acceptance Scenarios**:

1. **Given** co cau to chuc co nhieu cap (bo/so - phong/ban - to/nhom),
   **When** can bo nhan su mo man hinh co cau to chuc,
   **Then** he thong hien thi dang cay voi day du cac cap, ten va so luong bien che thuc te.
2. **Given** nguoi dung muon tim nhanh mot phong ban,
   **When** nguoi dung nhap tu khoa ten hoac ma don vi vao o tim kiem,
   **Then** he thong loc va lam noi bat cac don vi khop trong cay to chuc.
3. **Given** nguoi dung click vao mot node don vi tren cay,
   **When** thao tac duoc ghi nhan,
   **Then** he thong hien thi thong tin chi tiet cua don vi va danh sach CBCCVC thuoc don vi do.

---

### User Story 3 - Phan loai don vi theo quy dinh Bo Noi Vu (Priority: P2)

Voi vai tro quan tri he thong, toi co the cau hinh loai don vi va cap quan ly
tuong ung voi quy dinh hien hanh cua Bo Noi Vu (don vi hanh chinh, don vi su nghiep cong lap,
to chuc chinh tri - xa hoi...) de he thong sinh bao cao dung mau bieu theo quy dinh phap luat.

**Why this priority**: Viec phan loai dung theo quy dinh phap luat la bat buoc de bao cao len
Bo Noi Vu va cac co quan cap tren dat chuan quy dinh, tranh sai sot phap ly.

**Independent Test**: Co the kiem thu doc lap bang cach khai bao cac loai don vi,
gan loai cho don vi va xac nhan bao cao tong hop phan loai bien che hien thi dung theo Loai don vi.

**Acceptance Scenarios**:

1. **Given** he thong cung cap danh sach Loai to chuc (Don vi hanh chinh, Don vi su nghiep cong lap,
   To chuc chinh tri - xa hoi, To chuc xa hoi - nghe nghiep),
   **When** can bo quan tri chon Loai to chuc khi khai bao don vi moi,
   **Then** he thong luu thong tin Loai to chuc va su dung trong loc bao cao.
2. **Given** mot don vi duoc gan Loai to chuc,
   **When** nguoi dung xuat bao cao bien che tong hop,
   **Then** he thong tong hop so luong CBCCVC phan nhom theo Loai to chuc dung quy dinh.

---

### User Story 4 - Quan ly co cau to chuc da cap (So/Tinh, Phong/Ban, To/Nhom) (Priority: P3)

Voi vai tro quan tri he thong da don vi, toi co the xay dung co cau to chuc phan cap
tu don vi chuyen quyen cap tren den cac phong ban va to nhom cap duoi,
de he thong ho tro quan ly phan tan nhan su theo dung co cau thuc te.

**Why this priority**: Phan cap co cau to chuc giup mo rong he thong cho cac don vi lon
co nhieu don vi truc thuoc, nhung co the trien khai sau khi co cau mot cap da on dinh.

**Independent Test**: Co the kiem thu bang cach khai bao it nhat 3 cap don vi long nhau
va xac nhan ca cay phan cap, phan quyen truy cap du lieu va loc bao cao theo cap deu hoat dong dung.

**Acceptance Scenarios**:

1. **Given** can bo tao mot don vi cap phong/ban voi truong "Don vi cha" tro den don vi cap So/Tinh,
   **When** luu thong tin thanh cong,
   **Then** don vi moi xuat hien dung vi tri duoi don vi cha trong cay co cau.
2. **Given** can bo quan tri muon di chuyen mot phong/ban sang don vi cha khac,
   **When** thay doi Don vi cha va xac nhan,
   **Then** he thong cap nhat vi tri don vi trong cay, bao toan lich su va cap nhat phan quyen theo don vi cha moi.

---

### Edge Cases

- Tao don vi vong lap (don vi A la cha cua B, B la cha cua A).
- Nhap thieu truong bat buoc (Ma don vi, Ten don vi, Loai to chuc, Trang thai).
- Co gang xoa hoan toan mot don vi con CBCCVC dang cong tac hoac co don vi con truc thuoc.
- Chuyen Trang thai "Ngung hoat dong" cho don vi co don vi con dang hoat dong.
- Ma don vi bi trung trong cung pham vi quan ly.
- Don vi chi co mot cap duy nhat (khong co don vi cha - goc cua cay to chuc).
- He thong co nhieu don vi chu quan, moi don vi co cay co cau rieng biet.
- Chuyen don vi tu don vi cha nay sang don vi cha khac khi da co ho so CBCCVC lien ket.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: He thong MUST cho phep khai bao don vi trong co cau to chuc voi cac truong bat buoc:
  Ma don vi, Ten don vi, Loai to chuc, Cap quan ly, Don vi cha (neu co), Trang thai hoat dong.
- **FR-002**: He thong MUST cung cap danh sach Loai to chuc theo quy dinh Bo Noi Vu bao gom:
  Don vi hanh chinh, Don vi su nghiep cong lap, To chuc chinh tri - xa hoi, To chuc xa hoi - nghe nghiep.
- **FR-003**: He thong MUST hien thi co cau to chuc theo dang cay phan cap, phan anh dung quan he
  don vi cha - don vi con.
- **FR-004**: He thong MUST dam bao Ma don vi la duy nhat trong pham vi quan ly cua tung don vi chuyen quyen.
- **FR-005**: He thong MUST ngan chan viec tao vong lap trong cay co cau to chuc (A cha cua B, B cha cua A).
- **FR-006**: He thong MUST cho phep tim kiem va loc danh sach don vi theo Ma, Ten, Loai to chuc, Cap quan ly va Trang thai hoat dong.
- **FR-007**: He thong MUST khong cho phep xoa hoan toan mot don vi neu don vi do con co CBCCVC
  dang cong tac hoac co don vi con truc thuoc dang hoat dong.
- **FR-008**: He thong MUST cho phep chuyen Trang thai "Ngung hoat dong" cho don vi; don vi da ngung
  khong xuat hien trong cac o chon khi tao/sua ho so CBCCVC moi, nhung van giu duoc du lieu lich su.
- **FR-009**: He thong MUST cho phep cap nhat Don vi cha cua mot don vi (di chuyen vi tri trong cay);
  sau khi cap nhat, cay co cau va cac lien ket phan quyen duoc cap nhat nhat quan.
- **FR-010**: He thong MUST hien thi so luong CBCCVC bien che thuc te (dang cong tac) tai moi node
  tren cay co cau to chuc.
- **FR-011**: He thong MUST ghi nhan dau vet thay doi cho cac thao tac tao, sua, chuyen trang thai,
  bao gom nguoi thuc hien va thoi diem thay doi.
- **FR-012**: He thong MUST chi cho phep nguoi dung co quyen quan tri to chuc thuc hien cac thao tac
  tao moi, cap nhat, chuyen trang thai va xoa don vi trong co cau to chuc.

### Key Entities

- **DonViToChuc**: Don vi trong co cau to chuc; thuoc tinh chinh gom MaDonVi, TenDonVi,
  LoaiToChuc, CapQuanLy, DonViCha (tu tham chieu de phan cap), TrangThaiHoatDong, GhiChu.
- **LoaiToChuc**: Phan loai don vi theo quy dinh phap luat; cac gia tri chuan bao gom:
  Don vi hanh chinh, Don vi su nghiep cong lap, To chuc chinh tri - xa hoi, To chuc xa hoi - nghe nghiep.
- **CapQuanLy**: Cap hanh chinh cua don vi; phan lop theo quy dinh: Trung uong, Tinh/Thanh pho,
  Huyen/Quan, Xa/Phuong/Thi tran.
- **HoSoCBCCVC**: Ho so nhan su lien ket den DonViToChuc noi CBCCVC dang cong tac.
- **LichSuThayDoiToChuc**: Ban ghi dau vet cac thay doi tren DonViToChuc; gom doi tuong, hanh dong,
  nguoi thuc hien, thoi diem, gia tri truoc/sau thay doi.

## Assumptions & Dependencies

- He thong da co co che xac thuc va phan quyen nguoi dung theo vai tro (quan tri to chuc, can bo to chuc, can bo nhan su, lanh dao).
- Ho so CBCCVC da co truong "Don vi cong tac" lien ket den DonViToChuc.
- Danh sach Loai to chuc va Cap quan ly tuan theo quy dinh hien hanh cua Bo Noi Vu
  (Nghi dinh 25/2025/ND-CP va Nghi dinh 307/2025/ND-CP).
- Pham vi ap dung ban dau la mot don vi don le; mo rong da cap (nhieu don vi chu quan) co the
  thuc hien trong giai doan tiep theo.
- Cac bao cao bien che, bao cao to chuc can bo se su dung truc tiep du lieu tu danh muc co cau to chuc.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% CBCCVC tao ho so moi duoc gan vao mot don vi trong co cau to chuc hop le, dang hoat dong.
- **SC-002**: It nhat 95% thao tac tao moi hoac cap nhat mot don vi trong co cau to chuc hoan tat trong <= 10 giay.
- **SC-003**: It nhat 90% nguoi dung vai tro quan tri to chuc hoan thanh dung quy trinh khai bao co cau
  (tao, cap nhat, chuyen trang thai) o lan thao tac dau tien.
- **SC-004**: Ty le loi ho so CBCCVC do thieu hoac sai thong tin Don vi cong tac giam it nhat 80%
  sau 1 ky bao cao van hanh ke tu khi trien khai tinh nang.
- **SC-005**: Bao cao to chuc bien che phan loai theo Loai to chuc va Cap quan ly tao ra ket qua
  nhat quan voi du lieu khai bao trong co cau to chuc (100% khop trong kiem thu chap nhan).
