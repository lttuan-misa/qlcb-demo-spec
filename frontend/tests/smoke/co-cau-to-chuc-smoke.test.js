// tests/smoke/co-cau-to-chuc-smoke.test.js
// Smoke tests for Feature 002: Co cau To chuc
// Tests: validation, loop detection, store CRUD, status transitions.
// Run with: npm run smoke:002

import { validateDonViInput, detectCycle, normalizeCode } from "../../assets/js/co-cau-to-chuc/validators/don-vi-validator.js";
import { createStore } from "../../assets/js/co-cau-to-chuc/state/store.js";

let passed = 0;
let failed = 0;

function assert(label, condition) {
  if (condition) {
    console.log(`  PASS: ${label}`);
    passed++;
  } else {
    console.error(`  FAIL: ${label}`);
    failed++;
  }
}

// ---- normalizeCode ----
console.log("\n[normalizeCode]");
assert("trim + uppercase", normalizeCode("  ptc  ") === "PTC");
assert("spaces to underscore", normalizeCode("phong to chuc") === "PHONG_TO_CHUC");
assert("empty string", normalizeCode("") === "");

// ---- detectCycle ----
console.log("\n[detectCycle]");
const cycleNodes = [
  { id: "A", donViChaId: null },
  { id: "B", donViChaId: "A" },
  { id: "C", donViChaId: "B" },
];
assert("no cycle: A -> root", !detectCycle("A", null, cycleNodes));
assert("no cycle: C -> A", !detectCycle("C", "A", cycleNodes));
assert("cycle: A -> C (A is ancestor of C)", detectCycle("A", "C", cycleNodes));
assert("direct self-parent is a cycle", detectCycle("B", "B", cycleNodes));

// ---- validateDonViInput ----
console.log("\n[validateDonViInput]");
const existingDonVis = [
  {
    id: "dv-1",
    maDonVi: "PTC",
    loaiToChuc: "don_vi_hanh_chinh",
    capQuanLy: "tinh_thanh_pho",
    donViChaId: null,
    trangThaiHoatDong: "dang_hoat_dong",
  },
];

const validInput = {
  maDonVi: "PHCTH",
  tenDonVi: "Phong Hanh chinh",
  loaiToChuc: "don_vi_hanh_chinh",
  capQuanLy: "tinh_thanh_pho",
  donViChaId: null,
  trangThaiHoatDong: "dang_hoat_dong",
};

const r1 = validateDonViInput(validInput, existingDonVis);
assert("valid input passes", r1.isValid);

const r2 = validateDonViInput({ ...validInput, maDonVi: "" }, existingDonVis);
assert("empty ma is invalid", !r2.isValid && "maDonVi" in r2.errors);

const r3 = validateDonViInput({ ...validInput, tenDonVi: "" }, existingDonVis);
assert("empty ten is invalid", !r3.isValid && "tenDonVi" in r3.errors);

const r4 = validateDonViInput({ ...validInput, loaiToChuc: "invalid" }, existingDonVis);
assert("invalid loai is rejected", !r4.isValid && "loaiToChuc" in r4.errors);

const r5 = validateDonViInput({ ...validInput, capQuanLy: "unknown" }, existingDonVis);
assert("invalid cap is rejected", !r5.isValid && "capQuanLy" in r5.errors);

const r6 = validateDonViInput({ ...validInput, maDonVi: "PTC" }, existingDonVis);
assert("duplicate ma rejected", !r6.isValid && r6.errors.maDonVi);

const r7 = validateDonViInput({ ...validInput, maDonVi: "PTC" }, existingDonVis, "dv-1");
assert("duplicate ma allowed when editing same item", r7.isValid);

// ---- Store CRUD ----
console.log("\n[Store CRUD]");
const store = createStore();
const initialCount = store.getAll().length;
assert("seed data loaded", initialCount > 0);

const addResult = store.addDonVi({
  maDonVi: "TEST_UNIT",
  tenDonVi: "Don vi test",
  loaiToChuc: "don_vi_hanh_chinh",
  capQuanLy: "tinh_thanh_pho",
  donViChaId: null,
  trangThaiHoatDong: "dang_hoat_dong",
  ghiChu: "",
});
assert("addDonVi returns ok", addResult.ok);
assert("addDonVi generates id", typeof addResult.data.id === "string" && addResult.data.id.length > 0);
assert("count increased by 1", store.getAll().length === initialCount + 1);

const newId = addResult.data.id;
const updateResult = store.updateDonVi(newId, { tenDonVi: "Don vi test updated" });
assert("updateDonVi returns ok", updateResult.ok);
assert("updateDonVi persists change", store.getById(newId).tenDonVi === "Don vi test updated");

const toggleResult = store.chuyenTrangThai(newId, "ngung_hoat_dong");
assert("chuyenTrangThai to ngung", toggleResult.ok);
assert("status changed to ngung_hoat_dong", store.getById(newId).trangThaiHoatDong === "ngung_hoat_dong");

const toggleBack = store.chuyenTrangThai(newId, "dang_hoat_dong");
assert("chuyenTrangThai back to dang", toggleBack.ok);

// ---- canDelete ----
console.log("\n[canDelete]");
// Test unit with a child should not be deletable
const rootId = "dv-root"; // has children from seed
const deleteCheck = store.canDelete(rootId);
assert("unit with children cannot be deleted", !deleteCheck.ok);

// New unit with no children and no CBCCVC should be deletable
assert("new unit without children can be deleted", store.canDelete(newId).ok);

// ---- buildTree ----
console.log("\n[buildTree]");
const tree = store.buildTree();
assert("buildTree returns array", Array.isArray(tree));
assert("root has children", tree.length > 0 && tree[0].children !== undefined);

// ---- Audit trail ----
console.log("\n[Audit trail]");
assert("lichSu has entries after mutations", store.state.lichSu.length >= 3);
const lastLog = store.state.lichSu[0];
assert("last log has thoiGian", typeof lastLog.thoiGian === "string");
assert("last log has nguoiThucHien", typeof lastLog.nguoiThucHien === "string");

// ---- Summary ----
console.log(`\nResults: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  console.error("Smoke tests FAILED");
  process.exit(1);
} else {
  console.log("Smoke tests passed");
}
