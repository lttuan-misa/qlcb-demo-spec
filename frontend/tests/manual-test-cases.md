# Manual Test Cases - QLCB Demo UI

## Setup Verification

- [ ] Trang `frontend/index.html` mo thanh cong tren trinh duyet hien dai.
- [ ] Hien thi duoc panel cau hinh Don vi va 2 tab danh muc.
- [ ] Trang thai loading xuat hien ngan truoc khi hien thi bang du lieu.

## US1 - Danh muc Chuc vu

- [ ] Them moi Chuc vu hop le (du Ma/Ten/Phan loai/Trang thai) -> hien trong bang.
- [ ] Thu them Chuc vu trung Ma trong nguon dang ap dung -> hien loi trung Ma, khong luu.
- [ ] Sua Chuc vu va luu -> du lieu cap nhat khong can reload trang.
- [ ] Chuyen trang thai su dung Chuc vu -> badge va nut tac vu doi dung.
- [ ] Search theo Ma hoac Ten Chuc vu -> bang loc dung ket qua.
- [ ] Loc theo Phan loai va Trang thai Chuc vu -> ket qua dung.

## US2 - Danh muc Chuc danh

- [ ] Them moi Chuc danh hop le -> hien trong bang Chuc danh.
- [ ] Thu them Chuc danh trung Ma trong nguon dang ap dung -> hien loi trung Ma.
- [ ] Sua Chuc danh -> du lieu cap nhat dung.
- [ ] Chuyen trang thai Chuc danh -> cap nhat dung tren UI.
- [ ] Search/loc trong tab Chuc danh -> ket qua dung va doc lap tab Chuc vu.

## US3 - Cau hinh nguon danh muc theo Don vi

- [ ] Chuyen che do `tu_xay_dung` -> `don_vi_chu_quan` -> danh sach Chuc vu doi theo nguon.
- [ ] Chuyen che do `tu_xay_dung` -> `don_vi_chu_quan` -> danh sach Chuc danh doi theo nguon.
- [ ] Chuyen nguoc lai `don_vi_chu_quan` -> `tu_xay_dung` -> danh sach quay ve nguon don vi.
- [ ] Sau khi doi che do, thong bao cap nhat che do hien dung.

## UX and States

- [ ] Empty state hien dung khi bo loc khong tra ve ban ghi nao.
- [ ] Error inline hien duoi truong form khi validate that bai.
- [ ] Success toast hien sau thao tac them/sua/chuyen trang thai.
- [ ] Bo cuc khong vo tren man hinh mobile rong 390px.

## Performance Spot Check

- [ ] Tim/loc/chuyen tab phan hoi muot, khong co do tre nhan thay ro voi bo du lieu demo.

## Execution Notes

- [ ] Da doi chieu voi `specs/001-chuc-vu-chuc-danh/contracts/ui-contract.md`.
- [ ] Da doi chieu voi `specs/001-chuc-vu-chuc-danh/quickstart.md`.
- [x] Ket qua smoke test: `Smoke tests passed`.
