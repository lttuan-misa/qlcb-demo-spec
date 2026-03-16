// ui/list-view.js — Screen 1: Table view and filter helpers.

const LOAI_LABELS = {
  don_vi_hanh_chinh: "Don vi hanh chinh",
  don_vi_su_nghiep_cong_lap: "Don vi su nghiep cong lap",
  to_chuc_chinh_tri_xa_hoi: "To chuc CT-XH",
  to_chuc_xa_hoi_nghe_nghiep: "To chuc XH-NN",
};

export function filterRows(rows, query, loaiFilter, trangThaiFilter) {
  const q = (query || "").toLowerCase();
  return rows.filter((row) => {
    if (q && !row.maDonVi.toLowerCase().includes(q) && !row.tenDonVi.toLowerCase().includes(q)) {
      return false;
    }
    if (loaiFilter !== "all" && row.loaiToChuc !== loaiFilter) return false;
    if (trangThaiFilter !== "all" && row.trangThaiHoatDong !== trangThaiFilter) return false;
    return true;
  });
}

export function renderSkeletonRows(target, count = 3) {
  target.innerHTML = Array.from(
    { length: count },
    () => `<div class="skeleton skeleton-row"></div>`,
  ).join("");
}

export function renderEmptyState(target, onAdd) {
  target.innerHTML = `
    <div class="empty-state">
      <p>Chua co don vi nao trong co cau to chuc.</p>
      <button class="btn btn-primary" id="empty-add-btn" type="button">Them don vi dau tien</button>
    </div>`;
  target.querySelector("#empty-add-btn")?.addEventListener("click", onAdd);
}

export function renderErrorState(target, message, onRetry) {
  target.innerHTML = `
    <div class="status-banner error">
      ${message || "Da xay ra loi khi tai du lieu."}
      <button class="btn btn-secondary" id="retry-btn" type="button" style="margin-left:12px">Thu lai</button>
    </div>`;
  target.querySelector("#retry-btn")?.addEventListener("click", onRetry);
}

/**
 * Populate the Loai filter <select> with unique values from rows.
 */
export function syncLoaiFilter(selectEl, rows, currentValue) {
  const loais = [...new Set(rows.map((r) => r.loaiToChuc))].sort();
  selectEl.innerHTML =
    `<option value="all">Tat ca</option>` +
    loais
      .map(
        (v) =>
          `<option value="${v}" ${v === currentValue ? "selected" : ""}>${LOAI_LABELS[v] || v}</option>`,
      )
      .join("");
}

/**
 * Render the flat table view.
 */
export function renderTable(target, rows, allDonVis, handlers) {
  if (!rows.length) {
    target.innerHTML = `<div class="empty-state"><p>Khong co don vi nao khop voi bo loc hien tai.</p></div>`;
    return;
  }

  const donViMap = Object.fromEntries(allDonVis.map((dv) => [dv.id, dv]));

  const tbody = rows
    .map((row) => {
      const chaName = row.donViChaId ? (donViMap[row.donViChaId]?.tenDonVi ?? "—") : "—";
      const statusBadge =
        row.trangThaiHoatDong === "dang_hoat_dong"
          ? `<span class="badge active">Dang hoat dong</span>`
          : `<span class="badge inactive">Ngung hoat dong</span>`;
      const toggleLabel =
        row.trangThaiHoatDong === "dang_hoat_dong" ? "Ngung hoat dong" : "Kich hoat";
      return `
        <tr>
          <td>${row.maDonVi}</td>
          <td>${row.tenDonVi}</td>
          <td>${LOAI_LABELS[row.loaiToChuc] || row.loaiToChuc}</td>
          <td>${chaName}</td>
          <td style="text-align:right">${row.soLuongCBCCVC}</td>
          <td>${statusBadge}</td>
          <td>
            <div class="row-actions">
              <button class="link-btn" data-action="detail" data-id="${row.id}">Chi tiet</button>
              <button class="link-btn" data-action="edit" data-id="${row.id}">Sua</button>
              <button class="link-btn" data-action="toggle" data-id="${row.id}">${toggleLabel}</button>
            </div>
          </td>
        </tr>`;
    })
    .join("");

  target.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Ma</th>
          <th>Ten don vi</th>
          <th>Loai to chuc</th>
          <th>Don vi cha</th>
          <th style="text-align:right">CBCCVC</th>
          <th>Trang thai</th>
          <th>Tac vu</th>
        </tr>
      </thead>
      <tbody>${tbody}</tbody>
    </table>`;

  target.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    const { action, id } = btn.dataset;
    if (action === "detail") handlers.onDetail?.(id);
    if (action === "edit") handlers.onEdit?.(id);
    if (action === "toggle") handlers.onToggle?.(id);
  });
}
