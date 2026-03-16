# Feature Specification: Quan Ly Danh Muc Co Cau To Chuc

**Feature Branch**: `002-co-cau-to-chuc`  
**Created**: 2026-03-16  
**Status**: Draft  
**Input**: User description: "Tôi muốn bổ sung danh mục cơ cấu tổ chức trên phần mềm quản lý cán bộ, công chức, viên chức. Hãy tìm hiểu 1 số thông tin về cơ cấu tổ chức của 1 đơn vị nhà nước theo quy định của bộ nội vụ (Việt Nam)"

## Design Reference

**Design System Source**: [MISA QLCB Design System](https://mind-glyph-46433684.figma.site/)

Toan bo giao dien cua tinh nang nay PHAI tuan theo bo Design System duoc dinh nghia tai link Figma tren, bao gom:
- Bo mau sac (color tokens), kieu chu (typography), khoang cach (spacing), do bo goc (border radius) theo Design System.
- Cac component tieu chuan: Button, Input, Select, Table, Modal/Dialog, Badge, Toast/Notification, Tree, Breadcrumb, Pagination, Tooltip.
- Trang thai component: default, hover, active, disabled, loading, error, empty.
- Nguyen tac bo cuc (layout): sidebar + content area, panel voi shadow va border, header voi breadcrumb.

Bat ky sai lech co y so voi Design System PHAI duoc ghi nhan trong phan "Assumptions & Dependencies" cua spec nay va duoc phe duyet truoc khi trien khai.

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

## UI Screens & Interactions

Phan nay mo ta cac man hinh giao dien can xay dung cho tinh nang Quan ly danh muc Co cau to chuc,
su dung bo Design System tai https://mind-glyph-46433684.figma.site/.
Tat ca component phai duoc lay tu bo Design System nay, khong tu phat minh component rieng.

### Screen 1 - Man hinh Danh muc Co cau To chuc (List Screen)

**Muc dich**: Man hinh chinh de xem toan bo co cau to chuc va thuc hien cac thao tac quan ly.

**Bo cuc**:
- Header: Tieu de trang "Co cau to chuc" + Breadcrumb (Trang chu > Danh muc > Co cau to chuc).
- Thanh cong cu (Toolbar):
  - O tim kiem (Search Input): tim theo Ma don vi hoac Ten don vi.
  - Bo loc Loai to chuc (Select/Dropdown).
  - Bo loc Trang thai hoat dong (Select/Dropdown): Dang hoat dong / Ngung hoat dong / Tat ca.
  - Nut "Them moi" (Button Primary) canh phai toolbar.
- Khu vuc hien thi co cau:
  - Che do mac dinh: hien thi danh sach dang bang (Table) voi cac cot: Ma don vi, Ten don vi, Loai to chuc, Don vi cha, So luong CBCCVC, Trang thai, Hanh dong.
  - Che do cay (Tree View): chuyen doi giua dang bang va dang cay bang nut toggle "Xem dang cay".
  - Cot Hanh dong moi dong: nut "Chi tiet", nut "Sua", nut "Chuyen trang thai".
- Trang thai man hinh:
  - Loading: Hien skeleton loader tren bang theo Design System.
  - Empty: Hien empty state voi icon minh hoa va CTA "Them don vi dau tien".
  - Error: Hien thong bao loi theo Design System voi nut "Thu lai".
- Phan trang (Pagination): hien thi so trang, so ban ghi/trang, dieu huong trang.

**Hanh vi**:
- Khi goi search/filter: loc du lieu ngay lap tuc (hoac sau 300ms debounce), khong reload trang.
- Khi bam "Them moi": mo man hinh Form Them moi (Screen 3) theo dang modal hoac slide-in panel.
- Khi bam "Chi tiet": mo man hinh Chi tiet don vi (Screen 2).
- Khi bam "Sua": mo man hinh Form Sua (Screen 3) pre-fill du lieu hien tai.
- Khi bam "Chuyen trang thai": hien Dialog xac nhan (Screen 4).

---

### Screen 2 - Man hinh Chi tiet Don vi To chuc (Detail Screen)

**Muc dich**: Hien thi day du thong tin cua mot don vi to chuc, bao gom cac don vi con truc thuoc
va danh sach CBCCVC thuoc don vi do.

**Bo cuc**:
- Header: Breadcrumb (Trang chu > Danh muc > Co cau to chuc > [Ten don vi]) + Nut "Quay lai".
- Khu vuc thong tin chinh (Detail Panel theo Design System):
  - Ma don vi, Ten don vi, Loai to chuc, Cap quan ly, Don vi cha, Trang thai hoat dong, Ghi chu.
  - Thong tin audit: Nguoi tao, Ngay tao, Nguoi cap nhat lan cuoi, Ngay cap nhat.
- Khu vuc Don vi con truc thuoc: bang danh sach cac don vi truc tiep duoi don vi nay.
- Khu vuc CBCCVC thuoc don vi: bang tom tat danh sach can bo dang cong tac tai don vi.
- Nhom nut hanh dong (Button Group): "Sua", "Chuyen trang thai", "Quay lai".

**Hanh vi**:
- Khi bam "Sua": chuyen sang man hinh Form Sua (Screen 3).
- Khi bam "Chuyen trang thai": hien Dialog xac nhan (Screen 4).
- Khi bam "Quay lai": quay ve man hinh Danh muc (Screen 1).
- Khi bam vao ten don vi con trong bang: mo Chi tiet don vi con do.

---

### Screen 3 - Form Them moi / Sua Don vi To chuc (Add/Edit Form)

**Muc dich**: Cho phep can bo quan tri nhap lieu de tao moi hoac cap nhat mot don vi to chuc.

**Hien thi**: Modal Dialog theo Design System (rong toi da 600px), co overlay nen mo.

**Bo cuc form**:
- Tieu de modal: "Them moi don vi" hoac "Cap nhat don vi: [Ten don vi]".
- Nut "Dong" (X) goc phai tren modal.
- Cac truong nhap lieu (Field Group theo Design System):
  - Ma don vi (Text Input, bat buoc, toi da 30 ky tu).
  - Ten don vi (Text Input, bat buoc, toi da 120 ky tu).
  - Loai to chuc (Select, bat buoc): Don vi hanh chinh / Don vi su nghiep cong lap / To chuc chinh tri - xa hoi / To chuc xa hoi - nghe nghiep.
  - Cap quan ly (Select, bat buoc): Trung uong / Tinh/Thanh pho / Huyen/Quan / Xa/Phuong/Thi tran.
  - Don vi cha (Select/Tree Select, tuy chon): chon tu danh sach don vi hien co trong cay to chuc.
  - Trang thai hoat dong (Select, bat buoc): Dang hoat dong / Ngung hoat dong.
  - Ghi chu (Textarea, tuy chon, toi da 500 ky tu).
- Footer modal: Nut "Huy" (Button Secondary) + Nut "Luu" (Button Primary).

**Hanh vi validation**:
- Hien thi thong bao loi inline (Field Error theo Design System) ngay tai truong vi pham khi mat focus hoac khi nop form.
- Nut "Luu" bi disable khi form dang xu ly (loading state).
- Khi luu thanh cong: dong modal, hien Toast thong bao thanh cong, cap nhat bang tren man hinh Danh muc.
- Khi luu that bai: giu nguyen modal, hien thong bao loi ro nguyen nhan (trung Ma, loi he thong, v.v.).
- Khi bam "Huy" hoac "X" khi form co thay doi: hien Dialog xac nhan thoat (co the bo qua neu chua nhap gi).

---

### Screen 4 - Dialog Xac nhan Chuyen Trang thai / Xac nhan Xoa (Confirmation Dialog)

**Muc dich**: Xac nhan cac thao tac co anh huong quan trong: chuyen trang thai don vi,
hoac xac nhan xoa yeu cau (truong hop don vi du dieu kien bi xoa khoi he thong).

**Hien thi**: Dialog xac nhan nho (Confirmation Dialog theo Design System), rong toi da 440px.

**Bo cuc**:
- Icon canh bao (Warning Icon) phu hop voi muc do thao tac.
- Tieu de hanh dong: "Chuyen trang thai don vi?" hoac "Xac nhan xoa don vi?".
- Noi dung mo ta ro rang hau qua: vi du "Don vi '[Ten don vi]' se bi chuyen sang Ngung hoat dong.
  Don vi nay se khong xuat hien trong cac o chon khi tao ho so moi."
- Nhom nut: Nut "Huy" (Button Secondary) + Nut xac nhan chinh (Button Danger hoac Button Primary tuy hanh dong).

**Hanh vi**:
- Khi xac nhan "Chuyen sang Ngung hoat dong":
  - He thong cap nhat trang thai, dong dialog, hien Toast thanh cong, lam moi trang thai don vi tren bang.
- Khi xac nhan "Chuyen sang Dang hoat dong":
  - Tuong tu quy trinh tren.
- Khi xac nhan "Xoa":
  - He thong kiem tra rang buoc (con CBCCVC hoac don vi con), neu vi pham thi hien thong bao loi va cam xoa.
  - Neu hop le, xoa va hien Toast thanh cong.
- Khi bam "Huy": dong dialog, khong thay doi du lieu.

---

### Nguyen tac UX nhat quan (theo Design System)

- **Ngon ngu nhat quan**: Tat ca nhan nut, tieu de truong, thong bao loi va thanh cong phai dung cung nguon ngon ngu (Tieng Viet, van phong hanh chinh).
- **Phan hoi thao tac**: Moi hanh dong (submit, save, delete) phai co trang thai loading ro rang va thong bao ket qua (Toast notification theo Design System).
- **Trang thai man hinh day du**: Tat ca man hinh phai xu ly ca 4 trang thai: Loading, Empty, Error, Success theo dung quy cach cua Design System.
- **Accessibility co ban**: Tat ca form field phai co label ro rang, thong bao loi phai lien ket voi truong tuong ung (aria-describedby), focus order hop ly.
- **Responsive**: Giao dien hoat dong tot tren man hinh tu 1024px tro len (desktop/laptop la uu tien chinh).

---

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
- **FR-013**: Giao dien MUST su dung bo Design System tai https://mind-glyph-46433684.figma.site/ cho
  tat ca component (Button, Input, Select, Table, Modal, Badge, Toast, Tree, Pagination, Breadcrumb).
- **FR-014**: Man hinh Danh muc (Screen 1) MUST hien thi du lieu theo 2 che do: dang bang (Table)
  va dang cay (Tree View), co the chuyen doi bang nut toggle.
- **FR-015**: Man hinh Chi tiet (Screen 2) MUST hien thi toan bo thong tin don vi to chuc bao gom
  thong tin audit (nguoi tao, ngay tao, nguoi cap nhat, ngay cap nhat) va danh sach don vi con truc thuoc.
- **FR-016**: Form Them moi / Sua (Screen 3) MUST duoc hien thi dang Modal Dialog, co validation
  inline theo tung truong, va co trang thai loading khi dang xu ly.
- **FR-017**: Dialog Xac nhan (Screen 4) MUST hien thi noi dung mo ta ro rang hau qua cua thao tac
  truoc khi nguoi dung xac nhan thuc hien.
- **FR-018**: Tat ca man hinh MUST xu ly va hien thi dung 4 trang thai: Loading (skeleton), Empty
  (empty state co CTA), Error (thong bao loi co nut thu lai), va Success (toast notification).
- **FR-019**: Giao dien MUST dat chuan accessibility co ban: label ro rang cho moi truong nhap lieu,
  thong bao loi lien ket voi truong tuong ung, focus order hop ly, ho tro dieu huong bang ban phim.

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
- Bo Design System tai https://mind-glyph-46433684.figma.site/ la nguon tham chieu duy nhat cho
  cac quyet dinh thiet ke giao dien; tat ca component va token phai duoc lay tu bo nay.
- Trong truong hop mot component can thiet khong co san trong Design System, team phai thao luan
  va thong nhat truoc khi tu xay dung, va ghi ro quyet dinh trong phan nay.

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
- **SC-006**: 100% man hinh giao dien (Danh muc, Chi tiet, Form Them/Sua, Dialog Xac nhan) su dung
  dung component va design token tu Design System tai https://mind-glyph-46433684.figma.site/,
  khong co component tu xay dung ngoai bo Design System tru cac truong hop da duoc phe duyet.
- **SC-007**: 100% man hinh xu ly day du 4 trang thai giao dien (Loading, Empty, Error, Success)
  theo dung quy cach Design System trong kiem thu chap nhan.
- **SC-008**: It nhat 90% nguoi dung hoan thanh quy trinh them/sua/chuyen trang thai don vi ma
  khong can huong dan them, duoc do bang kiem thu nguoi dung voi vai tro quan tri to chuc.
