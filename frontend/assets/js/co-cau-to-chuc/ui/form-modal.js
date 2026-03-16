// ui/form-modal.js — Screen 3: Add/Edit modal for DonViToChuc.

/**
 * Populate the Don vi cha <select> with active units, excluding editingId.
 */
export function populateChaSelect(selectEl, allDonVis, editingId) {
  const options = allDonVis
    .filter((dv) => dv.trangThaiHoatDong === "dang_hoat_dong" && dv.id !== editingId)
    .sort((a, b) => a.tenDonVi.localeCompare(b.tenDonVi, "vi"))
    .map((dv) => `<option value="${dv.id}">${dv.tenDonVi} (${dv.maDonVi})</option>`)
    .join("");

  selectEl.innerHTML = `<option value="">(Khong co - la goc cay)</option>${options}`;
}

/**
 * Clear all field-error messages in a form.
 */
export function clearFormErrors(formEl) {
  formEl.querySelectorAll(".field-error").forEach((node) => {
    node.textContent = "";
  });
}

/**
 * Display validation errors from an errors object.
 */
export function showFormErrors(formEl, errors) {
  Object.entries(errors).forEach(([key, message]) => {
    const node = formEl.querySelector(`[data-error-for="${key}"]`);
    if (node) node.textContent = message;
  });
}

/**
 * Open the Add/Edit modal.
 * @param {HTMLDialogElement} modalEl
 * @param {HTMLFormElement} formEl
 * @param {object|null} editingItem - null for add, unit object for edit
 * @param {object[]} allDonVis - For parent select
 */
export function openModal(modalEl, formEl, editingItem, allDonVis) {
  clearFormErrors(formEl);

  const title = formEl.querySelector("#item-form-title");
  title.textContent = editingItem ? `Cap nhat don vi: ${editingItem.tenDonVi}` : "Them moi don vi";

  formEl.querySelector("#field-ma").value = editingItem?.maDonVi ?? "";
  formEl.querySelector("#field-ten").value = editingItem?.tenDonVi ?? "";
  formEl.querySelector("#field-loai").value = editingItem?.loaiToChuc ?? "";
  formEl.querySelector("#field-cap").value = editingItem?.capQuanLy ?? "";
  formEl.querySelector("#field-trang-thai-form").value =
    editingItem?.trangThaiHoatDong ?? "dang_hoat_dong";
  formEl.querySelector("#field-ghi-chu").value = editingItem?.ghiChu ?? "";

  const chaSelect = formEl.querySelector("#field-cha");
  populateChaSelect(chaSelect, allDonVis, editingItem?.id ?? null);
  chaSelect.value = editingItem?.donViChaId ?? "";

  modalEl.showModal();
  formEl.querySelector("#field-ma").focus();
}

/**
 * Close the modal.
 */
export function closeModal(modalEl) {
  modalEl.close();
}

/**
 * Read form values into a plain input object.
 */
export function readFormValues(formEl) {
  return {
    maDonVi: formEl.querySelector("#field-ma").value,
    tenDonVi: formEl.querySelector("#field-ten").value.trim(),
    loaiToChuc: formEl.querySelector("#field-loai").value,
    capQuanLy: formEl.querySelector("#field-cap").value,
    donViChaId: formEl.querySelector("#field-cha").value || null,
    trangThaiHoatDong: formEl.querySelector("#field-trang-thai-form").value,
    ghiChu: formEl.querySelector("#field-ghi-chu").value.trim(),
  };
}

/**
 * Check if any form field has been changed from its initial state.
 * Used to decide whether to show a "discard changes?" confirmation.
 */
export function formHasChanges(formEl, editingItem) {
  const current = readFormValues(formEl);
  if (!editingItem) {
    return Object.values(current).some((v) => v !== "" && v !== null);
  }
  return (
    current.maDonVi !== (editingItem.maDonVi ?? "") ||
    current.tenDonVi !== (editingItem.tenDonVi ?? "") ||
    current.loaiToChuc !== (editingItem.loaiToChuc ?? "") ||
    current.capQuanLy !== (editingItem.capQuanLy ?? "") ||
    current.donViChaId !== (editingItem.donViChaId ?? null) ||
    current.trangThaiHoatDong !== (editingItem.trangThaiHoatDong ?? "dang_hoat_dong") ||
    current.ghiChu !== (editingItem.ghiChu ?? "")
  );
}
