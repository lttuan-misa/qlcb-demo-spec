export function renderDonViConfig(container, donVi, onModeChange) {
  container.innerHTML = `
    <div class="config-header">
      <div>
        <h2>Cau hinh nguon danh muc theo don vi</h2>
        <p>
          Don vi: <strong>${donVi.tenDonVi}</strong> (${donVi.maDonVi})
        </p>
      </div>
      <div class="mode-toggle" role="radiogroup" aria-label="Che do ap dung danh muc">
        <label class="mode-option ${
          donVi.cheDoApDungDanhMuc === "tu_xay_dung" ? "active" : ""
        }">
          <input
            type="radio"
            name="mode"
            value="tu_xay_dung"
            ${donVi.cheDoApDungDanhMuc === "tu_xay_dung" ? "checked" : ""}
          />
          Tu xay dung danh muc
        </label>
        <label class="mode-option ${
          donVi.cheDoApDungDanhMuc === "don_vi_chu_quan" ? "active" : ""
        }">
          <input
            type="radio"
            name="mode"
            value="don_vi_chu_quan"
            ${donVi.cheDoApDungDanhMuc === "don_vi_chu_quan" ? "checked" : ""}
          />
          Su dung danh muc don vi chu quan
        </label>
      </div>
    </div>
    <p class="app-subtitle">
      Luu y: Khi doi che do, du lieu ho so da co duoc bao toan. Nguon danh muc chi ap dung cho thao tac moi.
    </p>
  `;

  container.querySelectorAll("input[name='mode']").forEach((radio) => {
    radio.addEventListener("change", (event) => {
      onModeChange(event.target.value);
    });
  });
}
