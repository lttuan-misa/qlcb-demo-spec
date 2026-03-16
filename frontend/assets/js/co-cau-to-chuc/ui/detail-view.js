// ui/detail-view.js — Screen 2: Full detail panel for a DonViToChuc.

const LOAI_LABELS = {
  don_vi_hanh_chinh: "Don vi hanh chinh",
  don_vi_su_nghiep_cong_lap: "Don vi su nghiep cong lap",
  to_chuc_chinh_tri_xa_hoi: "To chuc chinh tri - xa hoi",
  to_chuc_xa_hoi_nghe_nghiep: "To chuc xa hoi - nghe nghiep",
};

const CAP_LABELS = {
  trung_uong: "Trung uong",
  tinh_thanh_pho: "Tinh / Thanh pho",
  huyen_quan: "Huyen / Quan",
  xa_phuong_thi_tran: "Xa / Phuong / Thi tran",
};

/**
 * Render the detail panel for a given DonViToChuc.
 * @param {HTMLElement} target - Container element.
 * @param {object} donVi - The unit to display.
 * @param {object[]} allDonVis - Full list for parent name lookup & children list.
 * @param {object} handlers - { onEdit, onToggle, onBack }
 */
export function renderDetail(target, donVi, allDonVis, handlers) {
  if (!donVi) {
    target.innerHTML = `
      <div class="status-banner error">
        Khong tim thay don vi nay.
        <button class="btn btn-secondary" id="back-btn" type="button" style="margin-left:12px">Quay lai danh sach</button>
      </div>`;
    target.querySelector("#back-btn")?.addEventListener("click", handlers.onBack);
    return;
  }

  const donViMap = Object.fromEntries(allDonVis.map((dv) => [dv.id, dv]));
  const chaName = donVi.donViChaId ? (donViMap[donVi.donViChaId]?.tenDonVi ?? "—") : "(La goc cay)";

  const statusBadge =
    donVi.trangThaiHoatDong === "dang_hoat_dong"
      ? `<span class="badge active">Dang hoat dong</span>`
      : `<span class="badge inactive">Ngung hoat dong</span>`;

  const toggleLabel =
    donVi.trangThaiHoatDong === "dang_hoat_dong" ? "Ngung hoat dong" : "Kich hoat";

  // Children
  const children = allDonVis.filter((dv) => dv.donViChaId === donVi.id);
  const childrenHtml = children.length
    ? `<table class="data-table">
        <thead><tr><th>Ma</th><th>Ten</th><th>Loai</th><th>Trang thai</th></tr></thead>
        <tbody>${children
          .map(
            (c) => `
          <tr>
            <td>${c.maDonVi}</td>
            <td><a href="#detail/${c.id}" class="link-btn">${c.tenDonVi}</a></td>
            <td>${LOAI_LABELS[c.loaiToChuc] || c.loaiToChuc}</td>
            <td>${c.trangThaiHoatDong === "dang_hoat_dong" ? '<span class="badge active">Hoat dong</span>' : '<span class="badge inactive">Ngung</span>'}</td>
          </tr>`,
          )
          .join("")}</tbody>
      </table>`
    : `<p style="color:var(--color-muted)">Chua co don vi con nao.</p>`;

  target.innerHTML = `
    <div class="detail-panel">
      <div class="detail-header">
        <div>
          <h2>${donVi.tenDonVi}</h2>
          <span style="color:var(--color-muted);font-size:0.9rem">${donVi.maDonVi}</span>
        </div>
        <div class="detail-header-actions">
          <button class="btn btn-secondary" id="btn-back" type="button">Quay lai</button>
          <button class="btn btn-secondary" id="btn-edit" type="button">Sua</button>
          <button class="btn btn-secondary" id="btn-toggle" type="button">${toggleLabel}</button>
        </div>
      </div>

      <div class="detail-fields">
        <div class="detail-field">
          <label>Ma don vi</label>
          <div class="detail-value">${donVi.maDonVi}</div>
        </div>
        <div class="detail-field">
          <label>Loai to chuc</label>
          <div class="detail-value">${LOAI_LABELS[donVi.loaiToChuc] || donVi.loaiToChuc}</div>
        </div>
        <div class="detail-field">
          <label>Cap quan ly</label>
          <div class="detail-value">${CAP_LABELS[donVi.capQuanLy] || donVi.capQuanLy}</div>
        </div>
        <div class="detail-field">
          <label>Don vi cha</label>
          <div class="detail-value">${chaName}</div>
        </div>
        <div class="detail-field">
          <label>Trang thai</label>
          <div class="detail-value">${statusBadge}</div>
        </div>
        <div class="detail-field">
          <label>So CBCCVC</label>
          <div class="detail-value">${donVi.soLuongCBCCVC}</div>
        </div>
        <div class="detail-field" style="grid-column:1/-1">
          <label>Ghi chu</label>
          <div class="detail-value">${donVi.ghiChu || '<span style="color:var(--color-muted)">Khong co</span>'}</div>
        </div>
      </div>

      <div class="detail-section-title">Thong tin audit</div>
      <div class="detail-fields">
        <div class="detail-field">
          <label>Nguoi tao</label>
          <div class="detail-value">${donVi.nguoiTao}</div>
        </div>
        <div class="detail-field">
          <label>Ngay tao</label>
          <div class="detail-value">${donVi.ngayTao}</div>
        </div>
        <div class="detail-field">
          <label>Nguoi cap nhat</label>
          <div class="detail-value">${donVi.nguoiCapNhat}</div>
        </div>
        <div class="detail-field">
          <label>Ngay cap nhat</label>
          <div class="detail-value">${donVi.ngayCapNhat}</div>
        </div>
      </div>

      <div class="detail-section-title">Don vi con truc thuoc (${children.length})</div>
      ${childrenHtml}
    </div>`;

  target.querySelector("#btn-back")?.addEventListener("click", handlers.onBack);
  target.querySelector("#btn-edit")?.addEventListener("click", () => handlers.onEdit?.(donVi.id));
  target.querySelector("#btn-toggle")?.addEventListener("click", () => handlers.onToggle?.(donVi.id));
}
