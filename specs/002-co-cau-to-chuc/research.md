# Research: Quan Ly Danh Muc Co Cau To Chuc

## Decision 1: Su dung Vite lam build tool duy nhat

- **Decision**: Them Vite 6.x la devDependency duy nhat trong frontend/package.json. Khong them framework UI, khong them component library.
- **Rationale**: Vite cung cap hot-module reload (HMR) giup tang toc phat trien; giai quyet van de CORS khi import ES module qua `file://`; ho tro multi-page app voi cau hinh don gian. Chi them 1 dep giu du an con don gian.
- **Alternatives considered**:
  - Khong co build tool (nhu feature 001): bi loai vi ES module import qua `file://` gap loi CORS khi phat trien local; kho scale khi them nhieu page.
  - React/Vue: bi loai vi vuot pham vi demo, tang do phuc tap, vi pham nguyen tac simplicity cua constitution.
  - Parcel/webpack: bi loai vi cau hinh phuc tap hon Vite voi ket qua tuong duong.

## Decision 2: Tach feature 002 vao thu muc con rieng

- **Decision**: Tao thu muc `frontend/assets/js/co-cau-to-chuc/` rieng biet cho toan bo JS modules cua feature 002. CSS rieng o `co-cau-to-chuc.css`. Entry HTML rieng o `co-cau-to-chuc.html`.
- **Rationale**: Giu nguyen toan bo code feature 001 (khong lam hong tinh nang hien co). De tim file khi co nhieu feature. Vite multi-page tu dong phan biet bundle cho moi page.
- **Alternatives considered**:
  - Merge vao cung index.html bang tab moi: bi loai vi lam html/js phuc tap, kho maintain, kho test doc lap.
  - Mono-file (tat ca trong 1 JS file): bi loai vi vi pham nguyen tac module hoa ro rang cua constitution.

## Decision 3: Hien thi cay to chuc bang CSS indentation + toggle node

- **Decision**: Render tree hien thi trong HTML bang cau truc `<ul>/<li>` long nhau, su dung CSS indent + triangle icon cho expand/collapse. Khong su dung thu vien tree component ben ngoai.
- **Rationale**: Vanilla HTML/CSS/JS du de render cay <= 100 node trong thoi gian <= 300ms. Toggle expand/collapse co the xu ly bang classList. Giu dung nguyen tac "minimal libraries".
- **Alternatives considered**:
  - Thu vien tree (vue-tree, react-arborist...): bi loai vi yeu cau framework, tang dependency.
  - Canvas/SVG-based tree: bi loai vi phuc tap, kho accessible, kho maintain.
  - Flat list voi indentation level: duoc giu lam fallback cho man hinh nho.

## Decision 4: Quan ly du lieu co cau to chuc phan cap phia client

- **Decision**: Luu danh sach don vi duoc phang (flat array of DonViToChuc objects), moi don vi co truong `donViChaId` de chi dinh quan he cha-con. Tree duoc xay dung tu flat list khi render, khong luu cay theo cau truc long nhau.
- **Rationale**: Flat array de CRUD (them/sua/xoa theo id). Tree builder nhanh (<5ms voi 200 node). De serialize/deserialize neu them localStorage sau.
- **Alternatives considered**:
  - Luu nested tree truc tiep: bi loai vi kho CRUD (phai di chuyen node trong cay), kho clone/compare khi audit.
  - Adjacency list co index: khong can thiet voi <= 200 demo records.

## Decision 5: Phat hien vong lap trong cay to chuc

- **Decision**: Truoc khi luu cap nhat `donViChaId`, kiem tra vong lap bang cach duyet cay tu node cha de xem co gap lai node hien tai khong. Ham `detectCycle(nodeId, newParentId, allNodes)` trong don-vi-validator.js.
- **Rationale**: FR-005 yeu cau ngan chan viec tao vong lap (A la cha cua B, B la cha cua A). Co the kiem tra trong O(depth) vi don vi cha la duy nhat.
- **Alternatives considered**:
  - Khong kiem tra: bi loai vi co the tao vo han loop khi render tree.
  - Union-Find: bi loai vi qua phuc tap cho cay co cha duy nhat.

## Decision 6: Trang thai giao dien 4-state nhat quan voi feature 001

- **Decision**: Su dung cung pattern 4-state: loading skeleton, empty state co CTA, error banner co nut thu lai, success toast. Tai su dung CSS token tu tokens.css.
- **Rationale**: Nhat quan trai nghiem nguoi dung giua 2 tinh nang (constitution Gate 3). Giam thoi gian viet CSS moi.
- **Alternatives considered**:
  - Spinner thay skeleton: bi loai vi kem UX, gap nhan; skeleton bao toan layout on dinh hon.
  - Inline alert thay toast: bi loai vi chiem khong gian khi co nhieu thong bao thanh cong lien tiep.

## Decision 7: Detail screen dung full-page route gia lap (hash routing)

- **Decision**: Su dung URL hash (#detail/id) de gio lap dieu huong den man hinh chi tiet. Khi hash thay doi, app render man hinh phu hop. Nut "Quay lai" reset hash ve man hinh list.
- **Rationale**: Khong can router library. Nguoi dung co the bookmark/copy link chi tiet. Breadcrumb phan anh dung trang thai hien tai.
- **Alternatives considered**:
  - Render inline (modal hoac side panel): bi loai vi spec yeu cau man hinh chi tiet rieng biet voi breadcrumb va URL phan anh trang thai.
  - History API pushState: bi loai vi phuc tap hon hash va co the gap van de khi chay qua file:// hoac Vite preview.
