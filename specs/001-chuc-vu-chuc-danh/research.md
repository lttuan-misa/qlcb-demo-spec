# Research: Quan Ly Danh Muc Chuc Vu Va Chuc Danh

## Decision 1: Kien truc UI-only cho ban demo
- Decision: Trien khai frontend thuần bang HTML/CSS/JavaScript, khong backend va khong database.
- Rationale: Phu hop muc tieu demo nhanh, tap trung trai nghiem nguoi dung va luong nghiep vu cot loi.
- Alternatives considered:
  - UI + mock API server: bi loai vi tang do phuc tap van hanh demo.
  - Fullstack day du: bi loai vi vuot pham vi va thoi gian.

## Decision 2: Quan ly du lieu danh muc phia client
- Decision: Dung store in-memory lam nguon du lieu chinh cho demo, co the bo sung localStorage de giu trang thai phien trinh dien.
- Rationale: Khong can backend/database nhung van dam bao thao tac them/sua/chuyen trang thai co do tin cay trong suot phien demo.
- Alternatives considered:
  - localStorage-only: bi loai vi kho reset du lieu nhanh giua cac vong demo.
  - hard-code table khong co state: bi loai vi khong minh hoa duoc luong nghiep vu.

## Decision 3: Mo hinh man hinh va flow UX nhat quan
- Decision: Mot man hinh chinh gom 3 khu vuc: tab Danh muc Chuc vu, tab Danh muc Chuc danh, va khu cau hinh nguon danh muc theo Don vi.
- Rationale: Don gian hoa dieu huong, de doi chieu va demo duoc US1, US2, US3 trong cung mot bo cuc.
- Alternatives considered:
  - Tach thanh nhieu trang: bi loai vi tang thao tac dieu huong.
  - Mot form tong hop cho ca 2 danh muc: bi loai vi de gay nham lan nghiep vu.

## Decision 4: Chuan validation va rang buoc du lieu
- Decision: Ap dung validation dong nhat cho ca Chuc vu/Chuc danh: bat buoc Ma/Ten/Phan loai/Trang thai, kiem tra trung Ma theo pham vi nguon danh muc dang ap dung.
- Rationale: Dam bao tinh testable cua FR-001..FR-008 va giam loi nhap lieu.
- Alternatives considered:
  - Validation toi thieu chi can Ma/Ten: bi loai vi khong dat yeu cau nghiep vu day du.

## Decision 5: Chien luoc test cho demo theo constitution
- Decision: Ket hop manual test theo user story va smoke test cho validator + state transition quan trong.
- Rationale: Dap ung nguyen tac testing mandatory trong constitution nhung van gon nhe cho ban demo UI-only.
- Alternatives considered:
  - Chi test thu cong: bi loai vi khong dat gate testing cua constitution.
  - E2E tu dong day du: bi loai vi vuot pham vi demo.

## Decision 6: Ngan sach hieu nang cho UI
- Decision: Dat muc 95% thao tac tim/loc/chuyen trang thai phan hoi <= 300ms voi 500 ban ghi moi danh muc tren may dev pho bien.
- Rationale: Du de the hien trai nghiem muot cho buoi demo ma khong doi hoi ha tang phuc tap.
- Alternatives considered:
  - Khong dat ngan sach hieu nang: bi loai vi trai voi constitution.
  - Dat nguong qua chat (<100ms): bi loai vi khong can thiet cho pha demo.
