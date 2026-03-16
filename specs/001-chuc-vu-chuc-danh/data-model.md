# Data Model: Quan Ly Danh Muc Chuc Vu Va Chuc Danh (UI Demo)

## 1. ChucVu
- Mo ta: Thuc the danh muc Chuc vu trong don vi.
- Fields:
  - id: dinh danh noi bo cho UI.
  - maChucVu: string, bat buoc, duy nhat trong pham vi nguon danh muc.
  - tenChucVu: string, bat buoc.
  - phanLoai: enum/string, bat buoc.
  - trangThaiSuDung: enum {"dang_su_dung", "khong_su_dung"}, bat buoc.
  - phamViApDung: enum {"don_vi", "don_vi_chu_quan"}.
  - duocThamChieuHoSo: boolean, chi ra muc dang duoc ho so su dung.

## 2. ChucDanh
- Mo ta: Thuc the danh muc Chuc danh chuyen mon.
- Fields:
  - id: dinh danh noi bo cho UI.
  - maChucDanh: string, bat buoc, duy nhat trong pham vi nguon danh muc.
  - tenChucDanh: string, bat buoc.
  - phanLoai: enum/string, bat buoc.
  - trangThaiSuDung: enum {"dang_su_dung", "khong_su_dung"}, bat buoc.
  - phamViApDung: enum {"don_vi", "don_vi_chu_quan"}.
  - duocThamChieuHoSo: boolean.

## 3. DonVi
- Mo ta: Cau hinh pham vi ap dung danh muc.
- Fields:
  - maDonVi: string.
  - tenDonVi: string.
  - cheDoApDungDanhMuc: enum {"tu_xay_dung", "don_vi_chu_quan"}.

## 4. HoSoCBCCVC (gia lap cho ràng buộc)
- Mo ta: Du lieu mo phong de kiem tra rang buoc xoa/chuyen trang thai.
- Fields:
  - maHoSo: string.
  - maChucVu: string.
  - maChucDanh: string.
  - trangThaiHoSo: enum {"hoat_dong", "nghi_huu", "khac"}.

## 5. LichSuThayDoiDanhMuc
- Mo ta: Dau vet thao tac tren UI.
- Fields:
  - id: string.
  - doiTuong: enum {"chuc_vu", "chuc_danh", "cau_hinh_don_vi"}.
  - hanhDong: enum {"them", "sua", "chuyen_trang_thai", "doi_che_do_ap_dung"}.
  - nguoiThucHien: string.
  - thoiGian: datetime-string.
  - giaTriTruoc: object.
  - giaTriSau: object.

## Validation Rules
- Ma la bat buoc va duy nhat trong tung danh muc theo nguon dang ap dung.
- Ten, Phan loai, Trang thai su dung la bat buoc.
- Khong cho xoa cứng muc neu duocThamChieuHoSo = true.
- Chuyen trang thai "khong_su_dung" duoc phep, nhung muc do khong hien thi trong danh sach chon cho ho so moi.
- Khi doi che do ap dung danh muc, du lieu ho so da co khong bi thay doi.

## State Transitions
- Danh muc item:
  - tao_moi -> dang_su_dung
  - dang_su_dung -> khong_su_dung
  - khong_su_dung -> dang_su_dung
- Cau hinh DonVi:
  - tu_xay_dung <-> don_vi_chu_quan
