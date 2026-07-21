(function () {
  "use strict";

  function humanize(filename) {
    const base = filename.replace(/\.[^/.]+$/, "");
    return base
      .replace(/^[0-9]+[a-zA-Z]?_/, "")
      .replace(/[_-]+/g, " ")
      .replace(/\b\w/g, function (c) { return c.toUpperCase(); });
  }

  function extOf(filename) {
    const m = /\.([a-zA-Z0-9]+)$/.exec(filename);
    return m ? m[1].toLowerCase() : "";
  }

  function iconFor(ext) {
    if (ext === "csv") return "📊";
    if (ext === "json") return "🧾";
    if (ext === "xlsx") return "📈";
    return "📄";
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function buildImageCard(file, idx) {
    const label = humanize(file.split("/").pop());
    return '<figure class="gallery-card" data-idx="' + idx + '">' +
      '<img src="' + file + '" alt="' + escapeHtml(label) + '" loading="lazy" />' +
      '<figcaption>' + escapeHtml(label) + '</figcaption>' +
    '</figure>';
  }

  function buildDataCard(file) {
    const name = file.split("/").pop();
    const ext = extOf(file);
    const label = humanize(name);
    const isViewable = ext === "csv" || ext === "json" || ext === "md" || ext === "txt";
    const href = isViewable ? ("viewer.html?type=text&file=" + encodeURIComponent(file)) : file;
    const extra = isViewable ? "" : ' download';
    return '<a class="data-card" href="' + href + '"' + extra + '>' +
      '<span class="data-icon">' + iconFor(ext) + '</span>' +
      '<span class="data-meta"><strong>' + escapeHtml(label) + '</strong><small>' + escapeHtml(name) + '</small></span>' +
      '<span class="data-badge">' + ext.toUpperCase() + '</span>' +
    '</a>';
  }

  window.AssetExplorer = { humanize: humanize, extOf: extOf };

  window.renderAssetExplorer = function (rootId, groups) {
    const root = document.getElementById(rootId);
    if (!root) return;

    const allImages = [];
    groups.forEach(function (g) { (g.images || []).forEach(function (f) { allImages.push(f); }); });

    let html = '<div class="explorer-search"><input type="search" id="' + rootId + '-search" placeholder="Tìm theo tên file trong toàn bộ kho dữ liệu…" /></div>';

    groups.forEach(function (g) {
      html += '<div class="explorer-group">';
      html += '<div class="explorer-group-head"><h3>' + escapeHtml(g.label) + '</h3>' +
        (g.folder ? '<a class="chip" href="' + g.folder + '/" target="_blank" rel="noopener">Mở thư mục gốc</a>' : '') +
      '</div>';
      if (g.images && g.images.length) {
        html += '<div class="gallery-grid">' + g.images.map(function (f) {
          return buildImageCard(f, allImages.indexOf(f));
        }).join("") + '</div>';
      }
      if (g.data && g.data.length) {
        html += '<div class="data-grid">' + g.data.map(buildDataCard).join("") + '</div>';
      }
      if ((!g.images || !g.images.length) && (!g.data || !g.data.length)) {
        html += '<div class="explorer-group-empty">Chưa có tệp trực quan hóa cho mục này.</div>';
      }
      html += '</div>';
    });

    root.innerHTML = html;

    const search = document.getElementById(rootId + "-search");
    search.addEventListener("input", function () {
      const q = search.value.trim().toLowerCase();
      root.querySelectorAll(".gallery-card").forEach(function (card) {
        const match = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
        card.style.display = match ? "" : "none";
      });
      root.querySelectorAll(".data-card").forEach(function (card) {
        const match = !q || card.textContent.toLowerCase().indexOf(q) !== -1;
        card.style.display = match ? "" : "none";
      });
      root.querySelectorAll(".explorer-group").forEach(function (g) {
        const anyVisible = Array.prototype.some.call(
          g.querySelectorAll(".gallery-card, .data-card"),
          function (el) { return el.style.display !== "none"; }
        );
        g.style.display = anyVisible ? "" : "none";
      });
    });

    root.querySelectorAll(".gallery-card").forEach(function (card) {
      card.addEventListener("click", function () {
        openLightbox(allImages, parseInt(card.getAttribute("data-idx"), 10));
      });
    });
  };

  let lightboxEl = null;
  let lbImages = [];
  let lbIndex = 0;

  function ensureLightbox() {
    if (lightboxEl) return lightboxEl;
    lightboxEl = document.createElement("div");
    lightboxEl.className = "lightbox";
    lightboxEl.innerHTML =
      '<button class="lightbox-close" aria-label="Đóng">✕</button>' +
      '<button class="lightbox-prev" aria-label="Trước">‹</button>' +
      '<figure><img src="" alt="" /><figcaption></figcaption></figure>' +
      '<button class="lightbox-next" aria-label="Sau">›</button>';
    document.body.appendChild(lightboxEl);
    lightboxEl.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightboxEl.querySelector(".lightbox-prev").addEventListener("click", function () { step(-1); });
    lightboxEl.querySelector(".lightbox-next").addEventListener("click", function () { step(1); });
    lightboxEl.addEventListener("click", function (e) { if (e.target === lightboxEl) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!lightboxEl.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
    return lightboxEl;
  }

  function openLightbox(images, idx) {
    ensureLightbox();
    lbImages = images;
    lbIndex = idx;
    showCurrent();
    lightboxEl.classList.add("open");
  }

  function closeLightbox() {
    if (lightboxEl) lightboxEl.classList.remove("open");
  }

  function step(delta) {
    lbIndex = (lbIndex + delta + lbImages.length) % lbImages.length;
    showCurrent();
  }

  function showCurrent() {
    const file = lbImages[lbIndex];
    const img = lightboxEl.querySelector("img");
    const cap = lightboxEl.querySelector("figcaption");
    img.src = file;
    img.alt = file;
    cap.textContent = humanize(file.split("/").pop()) + "  ·  " + (lbIndex + 1) + "/" + lbImages.length;
  }
})();
