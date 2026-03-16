// state/store.js — State management for Co cau To chuc feature.
// Flat array of DonViToChuc. Hierarchy via donViChaId.
// All mutations are immutable (structuredClone).

import { seedData } from "../data/seed.js";

export function createStore(initial = seedData) {
  const state = {
    donVis: structuredClone(initial.donVis),
    lichSu: [],
    currentUser: initial.currentUser,
  };

  // ---- Read ----

  function getAll() {
    return state.donVis;
  }

  function getActive() {
    return state.donVis.filter((dv) => dv.trangThaiHoatDong === "dang_hoat_dong");
  }

  function getById(id) {
    return state.donVis.find((dv) => dv.id === id) || null;
  }

  function getChildren(parentId) {
    return state.donVis.filter((dv) => dv.donViChaId === parentId);
  }

  function getAncestors(id) {
    const ancestors = [];
    let current = getById(id);
    while (current && current.donViChaId) {
      current = getById(current.donViChaId);
      if (current) ancestors.unshift(current);
    }
    return ancestors;
  }

  function getDescendants(id) {
    const result = [];
    const queue = getChildren(id);
    while (queue.length) {
      const node = queue.shift();
      result.push(node);
      queue.push(...getChildren(node.id));
    }
    return result;
  }

  /**
   * Build a tree structure from the flat array.
   * Returns root nodes with nested `children` arrays.
   */
  function buildTree(nodes = state.donVis) {
    const map = {};
    nodes.forEach((dv) => {
      map[dv.id] = { ...dv, children: [] };
    });
    const roots = [];
    nodes.forEach((dv) => {
      if (dv.donViChaId && map[dv.donViChaId]) {
        map[dv.donViChaId].children.push(map[dv.id]);
      } else {
        roots.push(map[dv.id]);
      }
    });
    return roots;
  }

  // ---- Constraint checks ----

  function canDeactivate(id) {
    const activeChildren = getChildren(id).filter(
      (c) => c.trangThaiHoatDong === "dang_hoat_dong",
    );
    if (activeChildren.length > 0) {
      return { ok: false, reason: "HAS_ACTIVE_CHILDREN" };
    }
    return { ok: true };
  }

  function canDelete(id) {
    const allChildren = getChildren(id);
    if (allChildren.length > 0) {
      return { ok: false, reason: "HAS_CHILDREN" };
    }
    const dv = getById(id);
    if (dv && dv.soLuongCBCCVC > 0) {
      return { ok: false, reason: "HAS_CBCCVC" };
    }
    return { ok: true };
  }

  // ---- Mutations ----

  function addDonVi(input) {
    const today = new Date().toISOString().slice(0, 10);
    const next = {
      id: `dv-${crypto.randomUUID().slice(0, 8)}`,
      maDonVi: input.maDonVi,
      tenDonVi: input.tenDonVi,
      loaiToChuc: input.loaiToChuc,
      capQuanLy: input.capQuanLy,
      donViChaId: input.donViChaId || null,
      trangThaiHoatDong: input.trangThaiHoatDong || "dang_hoat_dong",
      soLuongCBCCVC: 0,
      ghiChu: input.ghiChu || "",
      ngayTao: today,
      nguoiTao: state.currentUser,
      ngayCapNhat: today,
      nguoiCapNhat: state.currentUser,
    };
    state.donVis.push(next);
    _addHistory(next.id, "them", null, next);
    return { ok: true, data: next };
  }

  function updateDonVi(id, patch) {
    const idx = state.donVis.findIndex((dv) => dv.id === id);
    if (idx === -1) return { ok: false, reason: "NOT_FOUND" };
    const before = structuredClone(state.donVis[idx]);
    state.donVis[idx] = {
      ...state.donVis[idx],
      ...patch,
      ngayCapNhat: new Date().toISOString().slice(0, 10),
      nguoiCapNhat: state.currentUser,
    };
    _addHistory(id, "sua", before, state.donVis[idx]);
    return { ok: true, data: state.donVis[idx] };
  }

  function chuyenTrangThai(id, trangThai) {
    const idx = state.donVis.findIndex((dv) => dv.id === id);
    if (idx === -1) return { ok: false, reason: "NOT_FOUND" };
    const before = structuredClone(state.donVis[idx]);
    state.donVis[idx] = {
      ...state.donVis[idx],
      trangThaiHoatDong: trangThai,
      ngayCapNhat: new Date().toISOString().slice(0, 10),
      nguoiCapNhat: state.currentUser,
    };
    _addHistory(id, "chuyen_trang_thai", before, state.donVis[idx]);
    return { ok: true, data: state.donVis[idx] };
  }

  // ---- Private ----

  function _addHistory(doiTuong, hanhDong, giaTriTruoc, giaTriSau) {
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
    getAll,
    getActive,
    getById,
    getChildren,
    getAncestors,
    getDescendants,
    buildTree,
    canDeactivate,
    canDelete,
    addDonVi,
    updateDonVi,
    chuyenTrangThai,
  };
}
