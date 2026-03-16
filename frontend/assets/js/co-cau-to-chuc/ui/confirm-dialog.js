// ui/confirm-dialog.js — Screen 4: Reusable confirmation dialog.

/**
 * Show a confirmation dialog.
 * @param {HTMLDialogElement} dialogEl
 * @param {object} options
 * @param {string} options.title
 * @param {string} options.message
 * @param {string} options.confirmLabel - Label for confirm button
 * @param {"danger"|"primary"} [options.confirmVariant="danger"]
 * @param {Function} options.onConfirm
 * @param {Function} [options.onCancel]
 */
export function showConfirmDialog(dialogEl, options) {
  const {
    title,
    message,
    confirmLabel = "Xac nhan",
    confirmVariant = "danger",
    onConfirm,
    onCancel,
  } = options;

  dialogEl.querySelector("#confirm-title").textContent = title;
  dialogEl.querySelector("#confirm-message").textContent = message;

  const okBtn = dialogEl.querySelector("#btn-confirm-ok");
  okBtn.textContent = confirmLabel;
  okBtn.className = confirmVariant === "primary" ? "btn btn-primary" : "btn btn-danger";

  // Clone to remove old listeners
  const newOk = okBtn.cloneNode(true);
  okBtn.replaceWith(newOk);

  const cancelBtn = dialogEl.querySelector("#btn-confirm-cancel");
  const newCancel = cancelBtn.cloneNode(true);
  cancelBtn.replaceWith(newCancel);

  dialogEl.querySelector("#btn-confirm-ok").addEventListener("click", () => {
    dialogEl.close();
    onConfirm?.();
  });

  dialogEl.querySelector("#btn-confirm-cancel").addEventListener("click", () => {
    dialogEl.close();
    onCancel?.();
  });

  dialogEl.showModal();
}

/**
 * Close the confirmation dialog programmatically.
 */
export function closeConfirmDialog(dialogEl) {
  dialogEl.close();
}
