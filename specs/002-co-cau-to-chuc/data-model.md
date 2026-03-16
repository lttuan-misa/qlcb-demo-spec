# Data Model: Quan Ly Danh Muc Co Cau To Chuc

## 1. Entities

### DonViToChuc (Don vi trong co cau to chuc)

Phan tu co ban cua co cau to chuc. Luu duoi dang flat array, quan he cha-con xac dinh qua `donViChaId`.

```javascript
{
  // Identity
  id: string,              // UUID ngan: "dv-xxxxxxxx" (sinh tu crypto.randomUUID())
  maDonVi: string,         // Ma don vi, viet hoa, duy nhat trong pham vi quan ly. Vi du: "PTC", "PHONG_TC"
  tenDonVi: string,        // Ten day du cua don vi. Vi du: "Phong To chuc - Can bo"

  // Classification
  loaiToChuc: LoaiToChuc,  // Loai theo quy dinh Bo Noi Vu (xem enum ben duoi)
  capQuanLy: CapQuanLy,    // Cap hanh chinh (xem enum ben duoi)

  // Hierarchy
  donViChaId: string|null, // id cua don vi cha; null neu la goc cay

  // Status
  trangThaiHoatDong: TrangThaiHoatDong, // dang_hoat_dong | ngung_hoat_dong

  // CBCCVC count (client-side computed from seed data for demo)
  soLuongCBCCVC: number,   // So CBCCVC dang cong tac tai don vi nay (bien che thuc te)

  // Metadata
  ghiChu: string,          // Ghi chu them (co the rong)
  ngayTao: string,         // ISO date string "YYYY-MM-DD"
  nguoiTao: string,        // Username nguoi tao
  ngayCapNhat: string,     // ISO date string "YYYY-MM-DD"
  nguoiCapNhat: string,    // Username nguoi cap nhat lan cuoi

  // Constraint helpers
  coDonViCon: boolean,     // Derived: co bat ky don vi con dang hoat dong khong (computed when needed)
  coCBCCVC: boolean,       // Derived: co CBCCVC dang cong tac khong (computed when needed)
}
```

### LoaiToChuc (Enum)

Phan loai don vi theo quy dinh Bo Noi Vu (Nghi dinh 25/2025/ND-CP, 307/2025/ND-CP):

```javascript
const LOAI_TO_CHUC = {
  DON_VI_HANH_CHINH:          "don_vi_hanh_chinh",
  DON_VI_SU_NGHIEP_CONG_LAP:  "don_vi_su_nghiep_cong_lap",
  TO_CHUC_CHINH_TRI_XA_HOI:   "to_chuc_chinh_tri_xa_hoi",
  TO_CHUC_XA_HOI_NGHE_NGHIEP: "to_chuc_xa_hoi_nghe_nghiep",
};

// Labels hien thi tieng Viet
const LOAI_TO_CHUC_LABELS = {
  don_vi_hanh_chinh:          "Don vi hanh chinh",
  don_vi_su_nghiep_cong_lap:  "Don vi su nghiep cong lap",
  to_chuc_chinh_tri_xa_hoi:   "To chuc chinh tri - xa hoi",
  to_chuc_xa_hoi_nghe_nghiep: "To chuc xa hoi - nghe nghiep",
};
```

### CapQuanLy (Enum)

Cap hanh chinh theo quy dinh:

```javascript
const CAP_QUAN_LY = {
  TRUNG_UONG:        "trung_uong",
  TINH_THANH_PHO:   "tinh_thanh_pho",
  HUYEN_QUAN:       "huyen_quan",
  XA_PHUONG_THI_TRAN: "xa_phuong_thi_tran",
};

const CAP_QUAN_LY_LABELS = {
  trung_uong:          "Trung uong",
  tinh_thanh_pho:      "Tinh / Thanh pho",
  huyen_quan:          "Huyen / Quan",
  xa_phuong_thi_tran:  "Xa / Phuong / Thi tran",
};
```

### TrangThaiHoatDong (Enum)

```javascript
const TRANG_THAI_HOAT_DONG = {
  DANG_HOAT_DONG:  "dang_hoat_dong",
  NGUNG_HOAT_DONG: "ngung_hoat_dong",
};
```

### LichSuThayDoiToChuc (Audit log entry)

Ghi nhan moi hanh dong thay doi tren DonViToChuc:

```javascript
{
  id: string,            // "log-{timestamp}"
  doiTuong: string,      // id cua DonViToChuc bi thay doi
  hanhDong: string,      // "them" | "sua" | "chuyen_trang_thai"
  nguoiThucHien: string, // Username
  thoiGian: string,      // ISO datetime string
  giaTriTruoc: object|null, // Snapshot truoc khi thay doi (null khi them moi)
  giaTriSau: object,     // Snapshot sau khi thay doi
}
```

---

## 2. Store State Shape

```javascript
const state = {
  donVis: DonViToChuc[],   // Flat array, quan he cha-con qua donViChaId
  lichSu: LichSuThayDoiToChuc[], // Audit trail (moi nhat truoc)
  currentUser: string,     // Username dang dung demo
};
```

---

## 3. Store Operations

```javascript
// Read
getAll()             → DonViToChuc[]          // Toan bo don vi
getActive()          → DonViToChuc[]          // Chi don vi dang_hoat_dong
getById(id)          → DonViToChuc|null

// Tree helpers
buildTree(nodes)     → TreeNode[]             // Xay dung cay tu flat array
getAncestors(id)     → DonViToChuc[]          // Chuoi cha tu goc den node
getDescendants(id)   → DonViToChuc[]          // Toan bo don vi con chau

// Mutations (all return { ok: boolean, data?, error? })
addDonVi(input)      → { ok, data: DonViToChuc }
updateDonVi(id, patch) → { ok, data: DonViToChuc }
chuyenTrangThai(id, trangThai) → { ok, data: DonViToChuc }

// Constraint checks (used before mutations)
canDelete(id)        → { ok: boolean, reason?: string }
  // false neu co don vi con hoat dong HOAC co CBCCVC
canChangeParent(id, newParentId) → { ok: boolean, reason?: string }
  // false neu tao vong lap trong cay
```

---

## 4. Seed Data Structure

Du lieu demo phan anh co cau cua mot So/Nganh cap Tinh, gom 3 cap:

```
[Cap 0 - Goc] So Noi Vu Demo (so_noi_vu)
  [Cap 1] Phong To chuc - Can bo (ptc)         — 5 CBCCVC
  [Cap 1] Phong Hanh chinh - Tong hop (phcth)  — 3 CBCCVC
  [Cap 1] Phong Xay dung chinh quyen (pxdcq)   — 4 CBCCVC
    [Cap 2] To Quan ly dia gioi (tqldg)         — 2 CBCCVC
    [Cap 2] To Ho so Cong dan (thscd)           — 2 CBCCVC (ngung hoat dong)
  [Cap 1] Van phong So (vps)                    — 6 CBCCVC
    [Cap 2] Bo phan Luu tru (bplt)              — 2 CBCCVC
    [Cap 2] Bo phan CNTT (bpcntt)               — 3 CBCCVC
```

Tong: 9 don vi, trong do 1 ngung hoat dong, so CBCCVC khac nhau cho demo.

---

## 5. TreeNode Shape (runtime, khong luu trong store)

```javascript
{
  ...DonViToChuc,      // Spread toan bo thuoc tinh goc
  children: TreeNode[], // Don vi con (da duoc sap xep theo tenDonVi)
  depth: number,       // Do sau (goc = 0)
  isExpanded: boolean, // Trang thai expand/collapse (quan ly boi UI state)
}
```

---

## 6. Validation Rules (don-vi-validator.js)

| Truong | Rule |
|--------|------|
| maDonVi | Bat buoc; normalize: trim + uppercase + spaces→underscore; duy nhat trong allDonVis (tru editingId) |
| tenDonVi | Bat buoc; trim; toi da 120 ky tu |
| loaiToChuc | Bat buoc; phai thuoc LOAI_TO_CHUC enum |
| capQuanLy | Bat buoc; phai thuoc CAP_QUAN_LY enum |
| donViChaId | Tuy chon; neu co, phai ton tai trong store; khong duoc tao vong lap |
| trangThaiHoatDong | Bat buoc; phai thuoc TRANG_THAI_HOAT_DONG enum |
| ghiChu | Tuy chon; toi da 500 ky tu |

### Loop Detection

```javascript
function detectCycle(nodeId, newParentId, allNodes) {
  // Duyet chuoi cha tu newParentId len den goc
  // Neu gap nodeId → vong lap → return true
  let current = allNodes.find(n => n.id === newParentId);
  while (current) {
    if (current.id === nodeId) return true;
    current = allNodes.find(n => n.id === current.donViChaId);
  }
  return false;
}
```
