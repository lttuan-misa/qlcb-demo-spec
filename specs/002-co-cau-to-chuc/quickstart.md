# Quickstart: Demo UI Co cau To chuc

## 1. Muc tieu

Chay nhanh ban demo UI thuần de trinh dien luong nghiep vu quan ly co cau to chuc:
xem cay phan cap, them/sua/chuyen trang thai don vi, xem chi tiet.

## 2. Dieu kien tien quyet

- Node.js >= 18 (de chay Vite va smoke tests).
- Trinh duyet desktop hien dai (Chrome/Edge/Firefox).
- Da cai dat dependencies: `cd frontend && npm install`.

## 3. Cai dat lan dau

```bash
cd frontend
npm install
```

> Lenh nay chi can chay mot lan. Vite se duoc cai vao node_modules.

## 4. Chay dev server

```bash
cd frontend
npm run dev
```

Vite khoi dong dev server tai `http://localhost:5173`.

Cac trang co san:
- `http://localhost:5173/` — Feature 001: Danh muc Chuc vu / Chuc danh
- `http://localhost:5173/co-cau-to-chuc.html` — Feature 002: Co cau To chuc (trang nay)

Vite ho tro Hot Module Reload: luu file la trinh duyet tu dong cap nhat.

## 5. Build ban production

```bash
cd frontend
npm run build
```

Output nam trong `frontend/dist/`. Mo `dist/co-cau-to-chuc.html` bang bat ky HTTP server.

## 6. Xem ban preview (sau khi build)

```bash
cd frontend
npm run preview
```

Tuong tu dev server nhung phuc vu tu ban da build.

## 7. Chay smoke tests

```bash
cd frontend
npm run smoke
```

Ket qua mong doi: `Smoke tests passed` (khong co loi xuat hien).

## 8. Luong demo de xuat

1. **Xem co cau to chuc**:
   - Mo `http://localhost:5173/co-cau-to-chuc.html`.
   - Man hinh List hien thi dang bang moi don vi co cot: Ma, Ten, Loai, Don vi cha, So CBCCVC, Trang thai.
   - Bam nut "Xem dang cay" de chuyen sang Tree view, expand/collapse cac node.

2. **Tim kiem va loc**:
   - Nhap tu khoa vao o tim kiem de loc theo Ma hoac Ten.
   - Chon Loai to chuc va Trang thai tu dropdown de loc them.
   - Ket qua cap nhat ngay lap tuc khong can reload.

3. **Them moi don vi**:
   - Bam nut "Them moi".
   - Nhap Ma, Ten, Loai, Cap quan ly, Don vi cha (tuy chon), Trang thai, Ghi chu.
   - Bam "Luu" de luu thanh cong va hien thi toast.
   - Thu de trong truong bat buoc hoac nhap Ma trung de kiem tra validation inline.

4. **Sua don vi**:
   - Bam "Sua" tren dong bat ky → form modal mo voi du lieu hien tai.
   - Chinh sua va "Luu" → bang cap nhat ngay.

5. **Xem chi tiet**:
   - Bam "Chi tiet" → chuyen sang man hinh chi tiet.
   - Xem: thong tin day du, don vi con truc thuoc, danh sach CBCCVC (du lieu demo), audit info.
   - Bam "Quay lai" de tro ve man hinh List.

6. **Chuyen trang thai**:
   - Bam "Chuyen trang thai" → dialog xac nhan hien ra voi mo ta ro rang hau qua.
   - Xac nhan → don vi bi chuyen sang Ngung hoat dong / Dang hoat dong.
   - Xac nhan don vi "Ngung hoat dong" khong xuat hien trong dropdown "Don vi cha" khi tao moi.

7. **Kiem tra edge case - vong lap**:
   - Thu gan Don vi cha cua mot don vi la chinh no, hoac la don vi con cua no.
   - He thong hien loi validation "Don vi cha tao vong lap trong cay".

## 9. Kiem thu nhanh

- Doi chieu voi `contracts/ui-contract.md` de kiem tra hanh vi tung man hinh.
- Doi chieu voi `specs/002-co-cau-to-chuc/spec.md` Section "Acceptance Scenarios".
- Xac nhan smoke test chay sach: `npm run smoke`.

## 10. Luu y pham vi

- Ban nay khong co backend, database hay xac thuc thuc te.
- Toan bo du lieu la du lieu demo phia client (in-memory + seed.js).
- Phuong an localStorage co the bat dau de giu trang thai demo giua cac session, nhung khong bat buoc.
