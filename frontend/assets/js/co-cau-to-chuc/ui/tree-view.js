// ui/tree-view.js — Tree view rendering with expand/collapse.

const expandedIds = new Set();

/**
 * Render a tree from root nodes (with .children arrays).
 */
export function renderTree(target, rootNodes, handlers, depth = 0) {
  if (!rootNodes.length) {
    target.innerHTML = `<div class="empty-state"><p>Chua co don vi nao.</p></div>`;
    return;
  }

  const ul = _buildTreeUl(rootNodes, handlers, depth);
  target.innerHTML = "";
  target.appendChild(ul);
}

function _buildTreeUl(nodes, handlers, depth) {
  const ul = document.createElement("ul");
  ul.className = depth === 0 ? "tree-root" : "tree-node-children";

  nodes
    .slice()
    .sort((a, b) => a.tenDonVi.localeCompare(b.tenDonVi, "vi"))
    .forEach((node) => {
      const li = document.createElement("li");
      li.className = "tree-node";

      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expandedIds.has(node.id);

      const statusBadge =
        node.trangThaiHoatDong === "dang_hoat_dong"
          ? `<span class="badge active" style="font-size:0.75rem;padding:2px 7px">Hoat dong</span>`
          : `<span class="badge inactive" style="font-size:0.75rem;padding:2px 7px">Ngung</span>`;

      const cbccvcBadge =
        node.soLuongCBCCVC > 0
          ? `<span class="tree-cbccvc-badge">${node.soLuongCBCCVC} CB</span>`
          : "";

      const toggleClass = hasChildren
        ? isExpanded
          ? "tree-toggle is-expanded"
          : "tree-toggle is-collapsed"
        : "tree-toggle is-leaf";

      li.innerHTML = `
        <div class="tree-node-row" data-node-id="${node.id}">
          <button class="${toggleClass}" data-toggle-id="${node.id}" aria-label="${hasChildren ? (isExpanded ? "Thu gon" : "Mo rong") : ""}" ${!hasChildren ? "disabled" : ""}></button>
          <span class="tree-node-label">${node.tenDonVi} <small style="color:var(--color-muted)">(${node.maDonVi})</small></span>
          <span class="tree-node-meta">
            ${cbccvcBadge}
            ${statusBadge}
            <button class="link-btn" data-action="detail" data-id="${node.id}" style="font-size:0.82rem">Chi tiet</button>
            <button class="link-btn" data-action="edit" data-id="${node.id}" style="font-size:0.82rem">Sua</button>
          </span>
        </div>`;

      // Add children container if has children
      if (hasChildren) {
        const childrenContainer = document.createElement("div");
        childrenContainer.id = `tree-children-${node.id}`;
        childrenContainer.hidden = !isExpanded;
        const childUl = _buildTreeUl(node.children, handlers, depth + 1);
        childrenContainer.appendChild(childUl);
        li.appendChild(childrenContainer);
      }

      // Toggle expand/collapse
      li.addEventListener("click", (e) => {
        const toggleBtn = e.target.closest("[data-toggle-id]");
        if (toggleBtn && hasChildren) {
          e.stopPropagation();
          const id = toggleBtn.dataset.toggleId;
          if (expandedIds.has(id)) {
            expandedIds.delete(id);
          } else {
            expandedIds.add(id);
          }
          const container = li.querySelector(`#tree-children-${id}`);
          if (container) container.hidden = !expandedIds.has(id);
          toggleBtn.className = expandedIds.has(id)
            ? "tree-toggle is-expanded"
            : "tree-toggle is-collapsed";
        }

        const actionBtn = e.target.closest("[data-action]");
        if (actionBtn) {
          e.stopPropagation();
          const { action, id } = actionBtn.dataset;
          if (action === "detail") handlers.onDetail?.(id);
          if (action === "edit") handlers.onEdit?.(id);
        }
      });

      ul.appendChild(li);
    });

  return ul;
}

/**
 * Expand all nodes (for "Mo rong tat ca" action if needed).
 */
export function expandAll(nodeIds) {
  nodeIds.forEach((id) => expandedIds.add(id));
}

/**
 * Collapse all nodes.
 */
export function collapseAll() {
  expandedIds.clear();
}
