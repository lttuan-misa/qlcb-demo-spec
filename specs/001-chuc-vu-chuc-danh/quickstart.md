# Quickstart: Demo UI Danh Muc Chuc Vu - Chuc Danh

## 1. Muc tieu
Chay nhanh ban demo UI thuần de trinh dien luong nghiep vu quan ly danh muc Chuc vu/Chuc danh.

## 2. Dieu kien tien quyet
- Trinh duyet desktop hien dai (Chrome/Edge/Firefox).
- Co source code frontend theo cau truc da mo ta trong `plan.md`.

## 3. Cach chay
- Mo file `frontend/index.html` truc tiep bang trinh duyet.
- Hoac dung static server bat ky de tranh gioi han CORS khi mo rong demo.
- Chay smoke test logic:
   - `cd frontend`
   - `npm run smoke`

## 4. Luong demo de xuat
1. Vao tab Danh muc Chuc vu, tao moi 1 Chuc vu hop le.
2. Thu tao them 1 Chuc vu trung Ma de kiem tra validation.
3. Cap nhat thong tin 1 Chuc vu va doi trang thai su dung.
4. Chuyen sang tab Danh muc Chuc danh, lap lai luong them/sua/chuyen trang thai.
5. Doi che do ap dung danh muc Don vi:
   - tu_xay_dung -> don_vi_chu_quan
   - xac minh du lieu hien thi doi theo nguon duoc chon.
6. Tim kiem va loc theo Phan loai/Trang thai.

## 5. Kiem thu nhanh
- Doi chieu voi `contracts/ui-contract.md` va checklist manual trong `frontend/tests/manual-test-cases.md`.
- Xac nhan cac muc tieu SC-001..SC-005 trong `spec.md` co the trinh dien duoc.
- Xac nhan smoke test tra ket qua `Smoke tests passed`.

## 6. Luu y pham vi
- Ban nay khong co backend/database/auth thuc te.
- Tat ca du lieu la du lieu demo phia client.
