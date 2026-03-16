import { seedData } from "../data/seed.js";

const TYPE_KEY = {
  chuc_vu: "chucVus",
  chuc_danh: "chucDanhs",
};

export function createStore(initial = seedData) {
  const state = {
    donVi: structuredClone(initial.donVi),
    chucVus: structuredClone(initial.chucVus),
    chucDanhs: structuredClone(initial.chucDanhs),
    lichSu: [],
    currentUser: initial.currentUser,
  };

  function getModeScope() {
    return state.donVi.cheDoApDungDanhMuc === "tu_xay_dung" ? "don_vi" : "don_vi_chu_quan";
  }

  function getVisibleItems(type) {
    const key = TYPE_KEY[type];
    if (!key) return [];
    const scope = getModeScope();
    return state[key].filter((item) => item.phamViApDung === scope);
  }

  function addItem(type, input) {
    const key = TYPE_KEY[type];
    const scope = getModeScope();
    const next = {
      id: `${type}-${crypto.randomUUID().slice(0, 8)}`,
      ma: input.ma,
      ten: input.ten,
      phanLoai: input.phanLoai,
      trangThaiSuDung: input.trangThaiSuDung,
      phamViApDung: scope,
      duocThamChieuHoSo: false,
    };
    state[key].push(next);
    addHistory(type, "them", null, next);
    return next;
  }

  function updateItem(type, id, patch) {
    const key = TYPE_KEY[type];
    const idx = state[key].findIndex((item) => item.id === id);
    if (idx === -1) return null;
    const before = structuredClone(state[key][idx]);
    state[key][idx] = { ...state[key][idx], ...patch };
    addHistory(type, "sua", before, state[key][idx]);
    return state[key][idx];
  }

  function toggleStatus(type, id) {
    const key = TYPE_KEY[type];
    const idx = state[key].findIndex((item) => item.id === id);
    if (idx === -1) return { ok: false, reason: "NOT_FOUND" };

    const current = state[key][idx];
    const before = structuredClone(current);
    const nextStatus =
      current.trangThaiSuDung === "dang_su_dung" ? "khong_su_dung" : "dang_su_dung";

    state[key][idx] = {
      ...current,
      trangThaiSuDung: nextStatus,
    };

    addHistory(type, "chuyen_trang_thai", before, state[key][idx]);
    return { ok: true, item: state[key][idx] };
  }

  function setDonViMode(mode) {
    if (!["tu_xay_dung", "don_vi_chu_quan"].includes(mode)) {
      return false;
    }
    const before = structuredClone(state.donVi);
    state.donVi.cheDoApDungDanhMuc = mode;
    addHistory("cau_hinh_don_vi", "doi_che_do_ap_dung", before, state.donVi);
    return true;
  }

  function addHistory(doiTuong, hanhDong, giaTriTruoc, giaTriSau) {
    state.lichSu.unshift({
      id: `log-${Date.now()}`,
      doiTuong,
      hanhDong,
      nguoiThucHien: state.currentUser,
      thoiGian: new Date().toISOString(),
      giaTriTruoc,
      giaTriSau: structuredClone(giaTriSau),
    });
  }

  return {
    state,
    getVisibleItems,
    addItem,
    updateItem,
    toggleStatus,
    setDonViMode,
    getModeScope,
  };
}
