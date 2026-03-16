import { createStore } from "./state/store.js";
import { validateDanhMucInput } from "./validators/danh-muc-validator.js";
import {
  buildPhanLoaiOptions,
  filterRows,
  renderStatusBanner,
  renderTable,
} from "./ui/danh-muc-view.js";
import { renderDonViConfig } from "./ui/cau-hinh-view.js";

const store = createStore();

const els = {
  config: document.querySelector("#don-vi-config"),
  tableRegion: document.querySelector("#table-region"),
  statusRegion: document.querySelector("#status-region"),
  search: document.querySelector("#search-input"),
  filterPhanLoai: document.querySelector("#filter-phan-loai"),
  filterTrangThai: document.querySelector("#filter-trang-thai"),
  btnThemMoi: document.querySelector("#btn-them-moi"),
  tabs: document.querySelectorAll(".tab-btn"),
  toastContainer: document.querySelector("#toast-container"),
  modal: document.querySelector("#item-modal"),
  form: document.querySelector("#item-form"),
  formTitle: document.querySelector("#item-form-title"),
  btnCloseModal: document.querySelector("#btn-close-modal"),
  btnCancel: document.querySelector("#btn-cancel"),
  fieldMa: document.querySelector("#field-ma"),
  fieldTen: document.querySelector("#field-ten"),
  fieldPhanLoai: document.querySelector("#field-phan-loai"),
  fieldTrangThai: document.querySelector("#field-trang-thai"),
};

const uiState = {
  activeTab: "chuc_vu",
  query: "",
  phanLoai: "all",
  trangThai: "all",
  editingId: null,
  loading: true,
  error: "",
};

function getLabelByTab(tab) {
  return tab === "chuc_vu" ? "Chuc vu" : "Chuc danh";
}

function clearFormErrors() {
  els.form.querySelectorAll(".field-error").forEach((node) => {
    node.textContent = "";
  });
}

function showFormErrors(errors) {
  Object.entries(errors).forEach(([key, message]) => {
    const errorNode = els.form.querySelector(`[data-error-for='${key}']`);
    if (errorNode) {
      errorNode.textContent = message;
    }
  });
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  els.toastContainer.appendChild(node);
  setTimeout(() => node.remove(), 2200);
}

function syncPhanLoaiFilterOptions(rows) {
  const options = buildPhanLoaiOptions(rows);
  const previous = els.filterPhanLoai.value;

  els.filterPhanLoai.innerHTML = options
    .map((value) =>
      value === "all"
        ? '<option value="all">Tat ca</option>'
        : `<option value="${value}">${value}</option>`,
    )
    .join("");

  els.filterPhanLoai.value = options.includes(previous) ? previous : "all";
  uiState.phanLoai = els.filterPhanLoai.value;
}

function openModal(editingItem = null) {
  clearFormErrors();
  uiState.editingId = editingItem?.id || null;
  els.formTitle.textContent = uiState.editingId
    ? `Cap nhat ${getLabelByTab(uiState.activeTab)}`
    : `Them moi ${getLabelByTab(uiState.activeTab)}`;

  els.fieldMa.value = editingItem?.ma || "";
  els.fieldTen.value = editingItem?.ten || "";
  els.fieldPhanLoai.value = editingItem?.phanLoai || "";
  els.fieldTrangThai.value = editingItem?.trangThaiSuDung || "dang_su_dung";

  els.modal.showModal();
  els.fieldMa.focus();
}

function closeModal() {
  uiState.editingId = null;
  els.modal.close();
}

function renderApp() {
  renderDonViConfig(els.config, store.state.donVi, (mode) => {
    if (store.setDonViMode(mode)) {
      toast("Da cap nhat che do ap dung danh muc.");
      renderApp();
    }
  });

  els.tabs.forEach((btn) => {
    const isActive = btn.dataset.tab === uiState.activeTab;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-selected", String(isActive));
  });

  const rows = store.getVisibleItems(uiState.activeTab);
  syncPhanLoaiFilterOptions(rows);

  const filtered = filterRows(rows, uiState.query, uiState.phanLoai, uiState.trangThai);

  renderStatusBanner(els.statusRegion, {
    loading: uiState.loading,
    error: uiState.error,
    info: `${filtered.length}/${rows.length} ban ghi ${getLabelByTab(uiState.activeTab)} dang hien thi.`,
  });

  renderTable(els.tableRegion, filtered, uiState.activeTab, {
    onEdit: (id) => {
      const found = rows.find((row) => row.id === id);
      if (found) {
        openModal(found);
      }
    },
    onToggle: (id) => {
      const result = store.toggleStatus(uiState.activeTab, id);
      if (!result.ok) {
        uiState.error = "Khong tim thay ban ghi can cap nhat.";
      } else {
        uiState.error = "";
        toast("Da cap nhat trang thai su dung.");
      }
      renderApp();
    },
  });

  uiState.loading = false;
}

function bindEvents() {
  els.tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      uiState.activeTab = btn.dataset.tab;
      uiState.query = "";
      uiState.phanLoai = "all";
      uiState.trangThai = "all";
      els.search.value = "";
      els.filterTrangThai.value = "all";
      uiState.error = "";
      renderApp();
    });
  });

  els.search.addEventListener("input", (event) => {
    uiState.query = event.target.value;
    renderApp();
  });

  els.filterPhanLoai.addEventListener("change", (event) => {
    uiState.phanLoai = event.target.value;
    renderApp();
  });

  els.filterTrangThai.addEventListener("change", (event) => {
    uiState.trangThai = event.target.value;
    renderApp();
  });

  els.btnThemMoi.addEventListener("click", () => openModal());

  els.btnCloseModal.addEventListener("click", closeModal);
  els.btnCancel.addEventListener("click", closeModal);

  els.form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearFormErrors();

    const currentRows = store.getVisibleItems(uiState.activeTab);
    const payload = {
      ma: els.fieldMa.value,
      ten: els.fieldTen.value.trim(),
      phanLoai: els.fieldPhanLoai.value.trim(),
      trangThaiSuDung: els.fieldTrangThai.value,
    };

    const validation = validateDanhMucInput(payload, currentRows, uiState.editingId);

    if (!validation.isValid) {
      showFormErrors(validation.errors);
      return;
    }

    payload.ma = validation.normalizedCode;

    if (uiState.editingId) {
      store.updateItem(uiState.activeTab, uiState.editingId, payload);
      toast(`Da cap nhat ${getLabelByTab(uiState.activeTab)}.`);
    } else {
      store.addItem(uiState.activeTab, payload);
      toast(`Da them moi ${getLabelByTab(uiState.activeTab)}.`);
    }

    closeModal();
    renderApp();
  });
}

function bootstrap() {
  renderStatusBanner(els.statusRegion, { loading: true });
  bindEvents();
  // Simulate short loading state so loading/empty transitions are visible in demo.
  setTimeout(() => {
    renderApp();
  }, 250);
}

bootstrap();
