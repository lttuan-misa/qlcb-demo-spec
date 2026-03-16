import { createStore } from "../../assets/js/state/store.js";
import { validateDanhMucInput } from "../../assets/js/validators/danh-muc-validator.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Smoke test failed: ${message}`);
  }
}

(function runSmokeTests() {
  const store = createStore();

  const visibleChucVu = store.getVisibleItems("chuc_vu");
  const duplicateResult = validateDanhMucInput(
    {
      ma: visibleChucVu[0].ma,
      ten: "Ban ghi thu",
      phanLoai: "Lanh dao",
      trangThaiSuDung: "dang_su_dung",
    },
    visibleChucVu,
    null,
  );

  assert(!duplicateResult.isValid, "Duplicate code must be rejected");
  assert(Boolean(duplicateResult.errors.ma), "Duplicate code must return code error");

  const modeBefore = store.state.donVi.cheDoApDungDanhMuc;
  const modeSet = store.setDonViMode(
    modeBefore === "tu_xay_dung" ? "don_vi_chu_quan" : "tu_xay_dung",
  );

  assert(modeSet === true, "Mode transition must succeed");
  assert(
    store.state.donVi.cheDoApDungDanhMuc !== modeBefore,
    "Mode must be changed after transition",
  );

  const added = store.addItem("chuc_vu", {
    ma: "CV_TEST_SMOKE",
    ten: "Smoke Test Role",
    phanLoai: "Test",
    trangThaiSuDung: "dang_su_dung",
  });

  assert(Boolean(added.id), "Added item must contain generated id");
  assert(added.ma === "CV_TEST_SMOKE", "Added item must keep normalized code");

  const toggled = store.toggleStatus("chuc_vu", added.id);
  assert(toggled.ok, "Toggle status must return ok=true");
  assert(
    ["dang_su_dung", "khong_su_dung"].includes(toggled.item.trangThaiSuDung),
    "Toggle status must keep valid status value",
  );

  console.log("Smoke tests passed");
})();
