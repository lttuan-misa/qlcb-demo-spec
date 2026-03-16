const typeLabel = {
  chuc_vu: "Chuc vu",
  chuc_danh: "Chuc danh",
};

export function buildPhanLoaiOptions(items) {
  const set = new Set(items.map((row) => row.phanLoai).filter(Boolean));
  return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
}

export function filterRows(rows, query, phanLoaiFilter, statusFilter) {
  const needle = (query || "").trim().toLowerCase();
  return rows.filter((row) => {
    const matchKeyword =
      !needle || row.ma.toLowerCase().includes(needle) || row.ten.toLowerCase().includes(needle);
    const matchCategory = phanLoaiFilter === "all" || row.phanLoai === phanLoaiFilter;
    const matchStatus = statusFilter === "all" || row.trangThaiSuDung === statusFilter;
    return matchKeyword && matchCategory && matchStatus;
  });
}

export function renderStatusBanner(target, payload = {}) {
  const { loading = false, error = "", info = "" } = payload;
  if (loading) {
    target.innerHTML = '<div class="status-banner">Dang tai du lieu danh muc...</div>';
    return;
  }

  if (error) {
    target.innerHTML = `<div class="status-banner error">${error}</div>`;
    return;
  }

  if (info) {
    target.innerHTML = `<div class="status-banner">${info}</div>`;
    return;
  }

  target.innerHTML = "";
}

export function renderTable(target, rows, type, handlers) {
  if (!rows.length) {
    target.innerHTML = `
      <div class="empty-state">
        <p>Khong co du lieu ${typeLabel[type]} trong bo loc hien tai.</p>
        <p>Ban co the doi bo loc hoac them moi de tiep tuc.</p>
      </div>
    `;
    return;
  }

  target.innerHTML = `
    <table class="data-table">
      <thead>
        <tr>
          <th>Ma</th>
          <th>Ten</th>
          <th>Phan loai</th>
          <th>Trang thai</th>
          <th>Tac vu</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row) => `
          <tr>
            <td>${row.ma}</td>
            <td>${row.ten}</td>
            <td>${row.phanLoai}</td>
            <td>
              <span class="badge ${
                row.trangThaiSuDung === "dang_su_dung" ? "active" : "inactive"
              }">
                ${row.trangThaiSuDung === "dang_su_dung" ? "Dang su dung" : "Khong su dung"}
              </span>
            </td>
            <td>
              <div class="row-actions">
                <button class="link-btn" data-action="edit" data-id="${row.id}">Sua</button>
                <button class="link-btn" data-action="toggle" data-id="${row.id}">
                  ${row.trangThaiSuDung === "dang_su_dung" ? "Ngung su dung" : "Kich hoat"}
                </button>
              </div>
            </td>
          </tr>
        `,
          )
          .join("")}
      </tbody>
    </table>
  `;

  target.querySelectorAll("button[data-action='edit']").forEach((btn) => {
    btn.addEventListener("click", () => handlers.onEdit(btn.dataset.id));
  });

  target.querySelectorAll("button[data-action='toggle']").forEach((btn) => {
    btn.addEventListener("click", () => handlers.onToggle(btn.dataset.id));
  });
}
