export function normalizeCode(value) {
  return value.trim().toUpperCase().replace(/\s+/g, "_");
}

export function validateDanhMucInput(input, existingCodes, editingId) {
  const errors = {};
  const normalizedCode = normalizeCode(input.ma || "");

  if (!normalizedCode) {
    errors.ma = "Ma la truong bat buoc.";
  }

  if (!(input.ten || "").trim()) {
    errors.ten = "Ten la truong bat buoc.";
  }

  if (!(input.phanLoai || "").trim()) {
    errors.phanLoai = "Phan loai la truong bat buoc.";
  }

  if (!input.trangThaiSuDung) {
    errors.trangThaiSuDung = "Trang thai su dung la truong bat buoc.";
  }

  const duplicate = existingCodes.find(
    (row) => normalizeCode(row.ma) === normalizedCode && row.id !== editingId,
  );

  if (duplicate) {
    errors.ma = "Ma da ton tai trong nguon danh muc dang ap dung.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    normalizedCode,
  };
}
