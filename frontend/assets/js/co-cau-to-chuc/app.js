// co-cau-to-chuc/app.js — Entry point for Feature 002.
// Orchestrates: store, routing, event binding, rendering.

import { createStore } from "./state/store.js";
import { validateDonViInput, normalizeCode } from "./validators/don-vi-validator.js";
import {
  filterRows,
  renderSkeletonRows,
  renderEmptyState,
  renderErrorState,
  renderTable,
  syncLoaiFilter,
} from "./ui/list-view.js";
import { renderTree, collapseAll } from "./ui/tree-view.js";
import { renderDetail } from "./ui/detail-view.js";
import {
  openModal,
  closeModal,
  readFormValues,
  clearFormErrors,
  showFormErrors,
  formHasChanges,
} from "./ui/form-modal.js";
import { showConfirmDialog } from "./ui/confirm-dialog.js";

// ---- Store ----
const store = createStore();

// ---- DOM refs ----
const els = {
  breadcrumb: document.querySelector("#breadcrumb"),
  screenList: document.querySelector("#screen-list"),
  screenDetail: document.querySelector("#screen-detail"),
  tableRegion: document.querySelector("#table-region"),
  treeRegion: document.querySelector("#tree-region"),
  statusRegion: document.querySelector("#status-region"),
  paginationRegion: document.querySelector("#pagination-region"),
  search: document.querySelector("#search-input"),
  filterLoai: document.querySelector("#filter-loai"),
  filterTrangThai: document.querySelector("#filter-trang-thai"),
  btnThemMoi: document.querySelector("#btn-them-moi"),
  btnToggleView: document.querySelector("#btn-toggle-view"),
  detailRegion: document.querySelector("#detail-region"),
  toastContainer: document.querySelector("#toast-container"),
  modal: document.querySelector("#item-modal"),
  form: document.querySelector("#item-form"),
  confirmDialog: document.querySelector("#confirm-dialog"),
  btnCloseModal: document.querySelector("#btn-close-modal"),
  btnCancel: document.querySelector("#btn-cancel"),
};

// ---- UI State ----
const uiState = {
  viewMode: "table", // "table" | "tree"
  query: "",
  loai: "all",
  trangThai: "all",
  editingId: null,
  loading: true,
  error: "",
  page: 1,
  pageSize: 25,
};

const PAGE_SIZES = [10, 25, 50];

// ---- Helpers ----

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  els.toastContainer.appendChild(node);
  setTimeout(() => node.remove(), 2200);
}

function currentRoute() {
  const hash = location.hash;
  if (hash.startsWith("#detail/")) return { screen: "detail", id: hash.slice(8) };
  return { screen: "list" };
}

function navigate(hash) {
  location.hash = hash;
}

// ---- Breadcrumb ----

function renderBreadcrumb(screen, donVi) {
  const base = `<a href="#list">Co cau to chuc</a><span class="breadcrumb-sep">›</span>`;
  if (screen === "detail" && donVi) {
    els.breadcrumb.innerHTML =
      base + `<span class="breadcrumb-current">${donVi.tenDonVi}</span>`;
  } else {
    els.breadcrumb.innerHTML = `<span class="breadcrumb-current">Co cau to chuc</span>`;
  }
}

// ---- Pagination ----

function renderPagination(target, totalRows) {
  const totalPages = Math.ceil(totalRows / uiState.pageSize);
  if (totalPages <= 1) {
    target.innerHTML = `<div class="pagination"><span>${totalRows} ban ghi</span></div>`;
    return;
  }

  const p = uiState.page;
  const start = (p - 1) * uiState.pageSize + 1;
  const end = Math.min(p * uiState.pageSize, totalRows);

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(
      (pg) =>
        `<button class="page-btn ${pg === p ? "is-active" : ""}" data-page="${pg}">${pg}</button>`,
    )
    .join("");

  target.innerHTML = `
    <div class="pagination">
      <span>${start}–${end} / ${totalRows} ban ghi</span>
      <div class="pagination-pages">
        <button class="page-btn" data-page="${p - 1}" ${p <= 1 ? "disabled" : ""}>‹</button>
        ${pages}
        <button class="page-btn" data-page="${p + 1}" ${p >= totalPages ? "disabled" : ""}>›</button>
      </div>
    </div>`;

  target.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-page]");
    if (!btn || btn.disabled) return;
    const pg = Number(btn.dataset.page);
    if (pg >= 1 && pg <= totalPages) {
      uiState.page = pg;
      renderListScreen();
    }
  });
}

// ---- List Screen ----

function renderListScreen() {
  els.screenList.hidden = false;
  els.screenDetail.hidden = true;
  renderBreadcrumb("list");

  const allRows = store.getAll();
  syncLoaiFilter(els.filterLoai, allRows, uiState.loai);

  const filtered = filterRows(allRows, uiState.query, uiState.loai, uiState.trangThai);

  // Status info
  els.statusRegion.innerHTML = `<div class="status-banner">${filtered.length}/${allRows.length} don vi dang hien thi.</div>`;

  if (uiState.loading) {
    renderSkeletonRows(els.tableRegion);
    els.paginationRegion.innerHTML = "";
    return;
  }

  if (uiState.error) {
    renderErrorState(els.tableRegion, uiState.error, () => {
      uiState.error = "";
      renderListScreen();
    });
    return;
  }

  if (uiState.viewMode === "tree") {
    els.tableRegion.hidden = true;
    els.treeRegion.hidden = false;
    const rootNodes = store.buildTree(filtered);
    renderTree(els.treeRegion, rootNodes, {
      onDetail: (id) => navigate(`#detail/${id}`),
      onEdit: (id) => openEditModal(id),
    });
    els.paginationRegion.innerHTML = "";
  } else {
    els.tableRegion.hidden = false;
    els.treeRegion.hidden = true;

    const totalRows = filtered.length;
    const start = (uiState.page - 1) * uiState.pageSize;
    const pageRows = filtered.slice(start, start + uiState.pageSize);

    if (!allRows.length) {
      renderEmptyState(els.tableRegion, () => openAddModal());
      els.paginationRegion.innerHTML = "";
    } else if (!filtered.length) {
      els.tableRegion.innerHTML = `<div class="empty-state"><p>Khong co don vi nao khop voi bo loc.</p></div>`;
      els.paginationRegion.innerHTML = "";
    } else {
      renderTable(els.tableRegion, pageRows, allRows, {
        onDetail: (id) => navigate(`#detail/${id}`),
        onEdit: (id) => openEditModal(id),
        onToggle: (id) => promptToggle(id),
      });
      renderPagination(els.paginationRegion, totalRows);
    }
  }
}

// ---- Detail Screen ----

function renderDetailScreen(id) {
  els.screenList.hidden = true;
  els.screenDetail.hidden = false;

  const donVi = store.getById(id);
  renderBreadcrumb("detail", donVi);
  renderDetail(els.detailRegion, donVi, store.getAll(), {
    onBack: () => navigate("#list"),
    onEdit: () => openEditModal(id),
    onToggle: () => promptToggle(id),
  });
}

// ---- Modal helpers ----

function openAddModal() {
  uiState.editingId = null;
  openModal(els.modal, els.form, null, store.getAll());
}

function openEditModal(id) {
  const donVi = store.getById(id);
  if (!donVi) return;
  uiState.editingId = id;
  openModal(els.modal, els.form, donVi, store.getAll());
}

function promptToggle(id) {
  const donVi = store.getById(id);
  if (!donVi) return;

  const toActive = donVi.trangThaiHoatDong === "ngung_hoat_dong";
  const newState = toActive ? "Dang hoat dong" : "Ngung hoat dong";
  const newValue = toActive ? "dang_hoat_dong" : "ngung_hoat_dong";

  let extra = "";
  if (!toActive) {
    const check = store.canDeactivate(id);
    if (!check.ok) {
      extra = ` Luu y: Don vi nay co don vi con dang hoat dong.`;
    }
  }

  showConfirmDialog(els.confirmDialog, {
    title: `Chuyen trang thai don vi?`,
    message: `Don vi "${donVi.tenDonVi}" se duoc chuyen sang "${newState}".${extra}`,
    confirmLabel: newState,
    confirmVariant: toActive ? "primary" : "danger",
    onConfirm: () => {
      const result = store.chuyenTrangThai(id, newValue);
      if (result.ok) {
        toast(`Da chuyen sang ${newState}.`);
        render();
      }
    },
  });
}

// ---- Routing ----

function render() {
  const route = currentRoute();
  if (route.screen === "detail") {
    renderDetailScreen(route.id);
  } else {
    renderListScreen();
  }
}

// ---- Event Binding ----

function bindEvents() {
  window.addEventListener("hashchange", render);

  els.search.addEventListener("input", (e) => {
    uiState.query = e.target.value;
    uiState.page = 1;
    renderListScreen();
  });

  els.filterLoai.addEventListener("change", (e) => {
    uiState.loai = e.target.value;
    uiState.page = 1;
    renderListScreen();
  });

  els.filterTrangThai.addEventListener("change", (e) => {
    uiState.trangThai = e.target.value;
    uiState.page = 1;
    renderListScreen();
  });

  els.btnThemMoi.addEventListener("click", openAddModal);

  els.btnToggleView.addEventListener("click", () => {
    uiState.viewMode = uiState.viewMode === "table" ? "tree" : "table";
    els.btnToggleView.textContent =
      uiState.viewMode === "table" ? "Xem dang cay" : "Xem dang bang";
    if (uiState.viewMode === "table") collapseAll();
    renderListScreen();
  });

  // Modal: close buttons
  els.btnCloseModal.addEventListener("click", () => {
    const donVi = uiState.editingId ? store.getById(uiState.editingId) : null;
    if (formHasChanges(els.form, donVi)) {
      showConfirmDialog(els.confirmDialog, {
        title: "Co chac muon thoat?",
        message: "Du lieu ban vua nhap se bi mat neu thoat khong luu.",
        confirmLabel: "Co, thoat",
        confirmVariant: "danger",
        onConfirm: () => closeModal(els.modal),
      });
    } else {
      closeModal(els.modal);
    }
  });

  els.btnCancel.addEventListener("click", () => {
    const donVi = uiState.editingId ? store.getById(uiState.editingId) : null;
    if (formHasChanges(els.form, donVi)) {
      showConfirmDialog(els.confirmDialog, {
        title: "Co chac muon thoat?",
        message: "Du lieu ban vua nhap se bi mat neu thoat khong luu.",
        confirmLabel: "Co, thoat",
        confirmVariant: "danger",
        onConfirm: () => closeModal(els.modal),
      });
    } else {
      closeModal(els.modal);
    }
  });

  // Modal: form submit
  els.form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearFormErrors(els.form);

    const input = readFormValues(els.form);
    input.maDonVi = normalizeCode(input.maDonVi);

    const validation = validateDonViInput(input, store.getAll(), uiState.editingId);
    if (!validation.isValid) {
      showFormErrors(els.form, validation.errors);
      return;
    }

    input.maDonVi = validation.normalizedCode;

    if (uiState.editingId) {
      store.updateDonVi(uiState.editingId, input);
      toast("Da cap nhat don vi thanh cong.");
    } else {
      store.addDonVi(input);
      toast("Da them moi don vi thanh cong.");
    }

    closeModal(els.modal);
    uiState.editingId = null;
    render();
  });
}

// ---- Bootstrap ----

function bootstrap() {
  // Show loading skeletons
  renderSkeletonRows(els.tableRegion);

  bindEvents();

  // Short delay to show loading state (demonstrates loading → data transition)
  setTimeout(() => {
    uiState.loading = false;
    render();
  }, 250);
}

bootstrap();
