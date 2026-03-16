// validators/don-vi-validator.js
// Validates DonViToChuc input and detects tree cycles.

export function normalizeCode(value) {
  return (value || "").trim().toUpperCase().replace(/\s+/g, "_");
}

/**
 * Detect if setting newParentId as parent of nodeId would create a cycle.
 * Traverses ancestor chain from newParentId upward.
 */
export function detectCycle(nodeId, newParentId, allNodes) {
  if (!newParentId) return false;
  let current = allNodes.find((n) => n.id === newParentId);
  while (current) {
    if (current.id === nodeId) return true;
    current = allNodes.find((n) => n.id === current.donViChaId);
  }
  return false;
}

/**
 * Validate a DonViToChuc input.
 *
 * @param {object} input - Fields from the form.
 * @param {object[]} allDonVis - All existing units (for duplicate + cycle checks).
 * @param {string|null} editingId - ID being edited (excluded from duplicate check).
 * @returns {{ isValid: boolean, errors: object, normalizedCode: string }}
 */
export function validateDonViInput(input, allDonVis, editingId = null) {
  const errors = {};
  const normalizedCode = normalizeCode(input.maDonVi);

  if (!normalizedCode) {
    errors.maDonVi = "Ma don vi la truong bat buoc.";
  } else {
    const duplicate = allDonVis.find(
      (dv) => normalizeCode(dv.maDonVi) === normalizedCode && dv.id !== editingId,
    );
    if (duplicate) {
      errors.maDonVi = "Ma don vi da ton tai.";
    }
  }

  if (!(input.tenDonVi || "").trim()) {
    errors.tenDonVi = "Ten don vi la truong bat buoc.";
  }

  const LOAI_VALUES = [
    "don_vi_hanh_chinh",
    "don_vi_su_nghiep_cong_lap",
    "to_chuc_chinh_tri_xa_hoi",
    "to_chuc_xa_hoi_nghe_nghiep",
  ];
  if (!LOAI_VALUES.includes(input.loaiToChuc)) {
    errors.loaiToChuc = "Loai to chuc khong hop le.";
  }

  const CAP_VALUES = ["trung_uong", "tinh_thanh_pho", "huyen_quan", "xa_phuong_thi_tran"];
  if (!CAP_VALUES.includes(input.capQuanLy)) {
    errors.capQuanLy = "Cap quan ly khong hop le.";
  }

  if (input.donViChaId) {
    const parentExists = allDonVis.some((dv) => dv.id === input.donViChaId);
    if (!parentExists) {
      errors.donViChaId = "Don vi cha khong ton tai.";
    } else if (editingId && detectCycle(editingId, input.donViChaId, allDonVis)) {
      errors.donViChaId = "Don vi cha tao vong lap trong cay.";
    }
  }

  const TRANG_THAI_VALUES = ["dang_hoat_dong", "ngung_hoat_dong"];
  if (!TRANG_THAI_VALUES.includes(input.trangThaiHoatDong)) {
    errors.trangThaiHoatDong = "Trang thai hoat dong khong hop le.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedCode,
  };
}
