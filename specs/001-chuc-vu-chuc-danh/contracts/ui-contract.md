# UI Contract: Danh Muc Chuc Vu - Chuc Danh

## 1. Muc tieu
Dinh nghia hop dong hanh vi giao dien cho ban demo UI, dam bao nghiep vu va test nhat quan.

## 2. Man hinh va thanh phan
- Man hinh chinh gom:
  - Tab 1: Danh muc Chuc vu
  - Tab 2: Danh muc Chuc danh
  - Panel cau hinh Don vi: che do ap dung danh muc
- Moi tab co:
  - Bang danh sach
  - O tim kiem
  - Bo loc Phan loai
  - Bo loc Trang thai su dung
  - Nut Them moi
  - Hanh dong Sua/Chuyen trang thai

## 3. Hanh vi bat buoc
- Khi bam Them moi:
  - Mo modal form voi truong Ma, Ten, Phan loai, Trang thai su dung.
  - Neu thieu du lieu bat buoc, hien thong bao loi tai truong va khong cho luu.
  - Neu trung Ma trong cung pham vi, hien loi trung ma va khong cho luu.
- Khi Sua:
  - Form duoc nap du lieu hien tai.
  - Luu thanh cong cap nhat ngay tren bang ma khong reload trang.
- Khi Chuyen trang thai:
  - Cho phep dang_su_dung <-> khong_su_dung.
  - Neu item dang duoc tham chieu boi ho so, cam xoa cứng, chi cho chuyen trang thai.
- Khi doi che do ap dung danh muc cua Don vi:
  - UI cap nhat nguon hien thi cho ca Chuc vu va Chuc danh.
  - Du lieu lich su dang hien thi khong bi mat bat thuong.

## 4. Trang thai giao dien
- Loading: hien skeleton hoac thong diep dang tai du lieu.
- Empty: hien thong diep khong co du lieu va CTA Them moi.
- Error: hien thong diep loi ro nghia, cho phep thu lai thao tac.
- Success: hien thong bao ngan gon sau thao tac luu/cap nhat.

## 5. Quy tac nhat quan UX
- Nhan nut, nhan truong, thong diep loi va success dung cung mot van phong ngon ngu tren 2 tab.
- Cung mot thao tac phai co cung vi tri dieu khien tren 2 tab.
- Trinh ban ban bang va modal thong nhat ve kich thuoc, khoang cach, mau trang thai.

## 6. Dieu kien chap nhan hop dong
- Tat ca acceptance scenarios trong `spec.md` duoc demo duoc tren UI.
- Validation va trang thai man hinh hoat dong nhat quan cho ca 2 danh muc.
- Co tai lieu manual test de doi chieu ket qua mong doi.
