# UI Contract: Co cau To chuc

## 1. Muc tieu

Dinh nghia hop dong hanh vi giao dien cho ban demo UI co cau to chuc,
dam bao nghiep vu, trang thai man hinh va test nhat quan.

Tat ca component PHAI lay tu bo Design System tai https://mind-glyph-46433684.figma.site/
(mau sac, spacing, border-radius, component patterns). Khong tu xay dung component ngoai bo nay.

---

## 2. Man hinh va thanh phan

### Screen 1 — Danh muc (List Screen) [man hinh mac dinh]

**URL**: `co-cau-to-chuc.html` (hash rong hoac `#list`)

| Khu vuc | Component | Mo ta |
|---------|-----------|-------|
| Header | Breadcrumb | "Trang chu > Danh muc > Co cau to chuc" |
| Toolbar — tim kiem | Search Input | Placeholder: "Nhap Ma hoac Ten don vi..." |
| Toolbar — bo loc | Select | Loai to chuc (Tat ca + 4 gia tri enum) |
| Toolbar — bo loc | Select | Trang thai: Tat ca / Dang hoat dong / Ngung hoat dong |
| Toolbar — hanh dong | Button Primary | "Them moi" |
| Toggle view | Button Group | "Xem dang bang" / "Xem dang cay" |
| Vung hien thi | Table (mac dinh) | Cot: Ma, Ten, Loai, Don vi cha, So CBCCVC, Trang thai, Hanh dong |
| Vung hien thi | Tree View (toggle) | Node co badge so CBCCVC, expand/collapse, icon trang thai |
| Hanh dong moi dong / node | Button Text | "Chi tiet", "Sua", "Chuyen trang thai" |
| Phan trang | Pagination | So ban ghi/trang (25 mac dinh), dieu huong trang |

**Trang thai man hinh**:
- Loading: hien skeleton loader (3 dong) tren vung bang/cay.
- Empty: hien empty state co icon va CTA "Them don vi dau tien".
- Error: hien error banner co nut "Thu lai".
- Success (sau hanh dong): hien Toast ngan gon.

---

### Screen 2 — Chi tiet Don vi (Detail Screen)

**URL**: `co-cau-to-chuc.html#detail/{id}`

| Khu vuc | Component | Mo ta |
|---------|-----------|-------|
| Header | Breadcrumb | "Trang chu > Co cau to chuc > {Ten don vi}" |
| Header hanh dong | Button Secondary | "Quay lai" (chuyen ve #list) |
| Info panel | Detail Panel | Ma, Ten, Loai, Cap, Don vi cha, Trang thai, Ghi chu |
| Audit | Detail Panel | Nguoi tao, Ngay tao, Nguoi cap nhat, Ngay cap nhat |
| Don vi con | Table | Ma, Ten, Loai, Trang thai cua don vi con truc tiep |
| CBCCVC | Table | Ma CB, Ho ten, Chuc vu (du lieu demo gia lap) |
| Hanh dong | Button Group | "Sua", "Chuyen trang thai" |

**Trang thai man hinh**:
- Loading: skeleton loader cho info panel va cac bang.
- Empty (khong co don vi con): hien "Chua co don vi con nao."
- Empty (khong co CBCCVC): hien "Chua co CBCCVC nao."
- Error (id khong tim thay): hien error banner va nut "Quay lai danh sach".

---

### Screen 3 — Form Them moi / Sua (Modal Dialog)

**Trigger**: Bam "Them moi" (Screen 1) hoac "Sua" (Screen 1 hoac 2)

| Khu vuc | Component | Mo ta |
|---------|-----------|-------|
| Container | Modal Dialog | Rong toi da 600px, overlay nen mo |
| Tieu de | Heading | "Them moi don vi" HOAC "Cap nhat don vi: {Ten}" |
| Dong | Button Text (X) | Goc phai tren, dong modal |
| Ma don vi | Text Input | Bat buoc, toi da 30 ky tu; auto-normalize: uppercase |
| Ten don vi | Text Input | Bat buoc, toi da 120 ky tu |
| Loai to chuc | Select | Bat buoc; 4 gia tri: Don vi hanh chinh, Don vi su nghiep cong lap, To chuc CT-XH, To chuc XH-NN |
| Cap quan ly | Select | Bat buoc; 4 gia tri: Trung uong, Tinh/TP, Huyen/Quan, Xa/Phuong/TT |
| Don vi cha | Select | Tuy chon; hien thi danh sach don vi dang hoat dong (tru chinh no khi sua); hien "(Khong co - la goc)" |
| Trang thai | Select | Bat buoc; Dang hoat dong / Ngung hoat dong |
| Ghi chu | Textarea | Tuy chon, toi da 500 ky tu |
| Footer | Button Secondary + Button Primary | "Huy" (dong khong luu) + "Luu" |

**Hanh vi validation**:
- Hien loi inline (field-error) ngay duoi truong vi pham sau khi mat focus HOAC khi nop form.
- Nut "Luu" bi disable khi form dang xu ly.
- Khi luu thanh cong: dong modal, hien Toast, cap nhat bang/cay.
- Khi luu that bai (trung Ma, vong lap, loi he thong): giu nguyen modal, hien loi ro rang.
- Khi bam "Huy" hoac "X": neu form chua thay doi → dong ngay; neu da nhap lieu → hien Confirmation Dialog "Co chac muon thoat? Du lieu se bi mat."

---

### Screen 4 — Confirmation Dialog

**Trigger**: Bam "Chuyen trang thai" (Screen 1 hoac 2), hoac "Huy" khi form co thay doi chua luu

| Khu vuc | Component | Mo ta |
|---------|-----------|-------|
| Container | Confirmation Dialog | Rong toi da 440px |
| Icon | Warning Icon / Info Icon | Phu hop muc do: warning khi chuyen trang thai/thoat form; danger khi xoa |
| Tieu de | Heading | "Chuyen trang thai don vi?" hoac "Co chac muon thoat?" |
| Noi dung | Text | Mo ta ro hau qua; vi du: "Don vi '[Ten]' se bi chuyen sang Ngung hoat dong. Don vi nay se khong xuat hien trong o chon Don vi cha khi tao moi." |
| Hanh dong | Button Secondary + Button Danger/Primary | "Huy" (dong dialog) + nut xac nhan |

**Hanh vi**:
- "Chuyen sang Ngung hoat dong": cap nhat, dong dialog, hien Toast, lam moi man hinh.
- "Chuyen sang Dang hoat dong": tuong tu.
- "Co, thoat" (khi huy form co thay doi): dong modal, bo qua nhap lieu.
- Bam "Huy" trong dialog: dong dialog, quay lai trang thai truoc.

---

## 3. Rang buoc hanh dong (Business Rules trong UI)

| Hanh dong | Dieu kien cam | Hanh vi khi bi cam |
|-----------|---------------|-------------------|
| Xoa don vi | Co don vi con HOAC co CBCCVC | Hien loi "Khong the xoa: con don vi con / CBCCVC." Nut xoa bi disable. |
| Chuyen sang Ngung hoat dong | Don vi co don vi con dang hoat dong | Hien canh bao (warning banner) nhung van cho phep sau khi xac nhan |
| Chon Don vi cha (form) | Chinh don vi hien tai | Loai khoi danh sach lua chon |
| Chon Don vi cha (form) | Tao vong lap trong cay | Validation bao loi "Don vi cha tao vong lap trong cay" |
| Truy cap chi tiet | Id khong ton tai | Hien error state va nut "Quay lai danh sach" |

---

## 4. Trang thai giao dien nhat quan

Tat ca man hinh PHAI xu ly day du 4 trang thai:

| Trang thai | Hien thi | Chi tiet |
|------------|----------|----------|
| Loading | Skeleton loader | Hien 3 dong skeleton thay cho bang; hien skeleton cho info panel |
| Empty | Empty state | Icon minh hoa + text mo ta + CTA button |
| Error | Error banner | Text loi ro rang + nut "Thu lai" + ghi log ra console |
| Success | Toast notification | Ngan gon, o goc phai duoi, tu dong bien mat sau 2.2s |

---

## 5. Nguyen tac UX nhat quan (Design System)

- **Color tokens**: Chi su dung bien CSS tu `tokens.css` (--color-primary, --color-danger, --color-success, v.v.); khong dung gia tri mau hex truc tiep.
- **Spacing**: Chi su dung --space-1 den --space-6 tu tokens.css.
- **Border radius**: Chi su dung --radius-sm, --radius-md, --radius-lg.
- **Ngon ngu**: Toan bo nhan nut, tieu de truong, thong bao loi/thanh cong dung tieng Viet, van phong hanh chinh, nhat quan giua 2 tinh nang.
- **Badge trang thai**:
  - "Dang hoat dong": badge xanh la (green, class `badge active`)
  - "Ngung hoat dong": badge cam (orange, class `badge inactive`)
- **Toast**: Dung chung pattern voi feature 001 (`class="toast"` trong `#toast-container`).
- **Responsive**: Giao dien toi uu cho man hinh >= 1024px. Tren man hinh nho hon: toolbar wrap xuong hang, bang co the scroll ngang.
- **Accessibility**:
  - Moi truong nhap lieu phai co `<label>` tuong ung.
  - Thong bao loi phai co `data-error-for` khop voi `name` cua truong.
  - Modal Dialog dung native `<dialog>` API.
  - Breadcrumb dung `<nav aria-label="Breadcrumb">`.
  - `aria-live="polite"` cho vung toast va status.
  - Keyboard: Tab/Shift-Tab di chuyen qua form; Enter xac nhan; Escape dong modal.

---

## 6. Dieu kien chap nhan hop dong

- Tat ca acceptance scenarios trong `spec.md` co the demo tren UI.
- Bo sung khi kiet: Screen 1 (list + tree toggle), Screen 2 (detail + back), Screen 3 (modal + validation), Screen 4 (confirmation).
- 4 trang thai man hinh hoat dong nhat quan.
- Khong co HTML color literal (only CSS vars from tokens.css).
- Smoke test chay sach: `npm run smoke`.
- Manual test cases trong `frontend/tests/manual-test-cases.md` duoc cap nhat cho feature 002.
