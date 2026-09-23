// ==========================================================================
// RIVAAZ ROYAL ETHNIC WEAR - JAVASCRIPT CONTROLLER
// ==========================================================================

// Global state keys
const CART_STORAGE_KEY = "RIVAAZ_CART_V1";
const WISHLIST_STORAGE_KEY = "RIVAAZ_WISHLIST_V1";

// State Helpers
function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  updateHeaderBadges();
}

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(wishlist) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  updateHeaderBadges();
}

// Toast Notification
function showToast(message, icon = "fa-check-circle") {
  let toast = document.getElementById("rivaazToast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "rivaazToast";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid ${icon} text-gold"></i> <span>${message}</span>`;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// Update Cart and Wishlist Count in Header & Bottom Nav
function updateHeaderBadges() {
  const cart = getCart();
  const wishlist = getWishlist();
  
  const totalCartSets = cart.reduce((sum, item) => sum + (item.sets || 1), 0);
  
  const cartBadges = document.querySelectorAll(".header-cart-badge, .mobile-cart-badge");
  cartBadges.forEach(el => {
    el.textContent = totalCartSets;
    el.style.display = totalCartSets > 0 ? "flex" : "none";
  });

  const wishlistBadges = document.querySelectorAll(".header-wishlist-badge, .mobile-wishlist-badge");
  wishlistBadges.forEach(el => {
    el.textContent = wishlist.length;
    el.style.display = wishlist.length > 0 ? "flex" : "none";
  });
}

// Add to Cart / Inquiry
function addToCart(productId, setsCount = 1) {
  const product = (typeof getProductById === 'function' ? getProductById(productId) : null) || RIVAAZ_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const cart = getCart();
  const existingIndex = cart.findIndex(item => item.id === productId);

  if (existingIndex > -1) {
    cart[existingIndex].sets += setsCount;
  } else {
    cart.push({
      id: product.id,
      name: product.title || product.name,
      category: product.category,
      price: product.price,
      image: (product.images && product.images[0]) || product.mainImage,
      fabric: product.fabric,
      moq: product.moq || '1 Set (4 Pcs)',
      sets: setsCount,
      pcsPerSet: 4
    });
  }

  saveCart(cart);
  showToast(`Added ${setsCount} Set(s) of "${product.title || product.name}" to Wholesale Enquiry Sheet!`);
}

// Toggle Wishlist
function toggleWishlist(productId, btnElement) {
  const wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  const product = (typeof getProductById === 'function' ? getProductById(productId) : null) || RIVAAZ_PRODUCTS.find(p => p.id === productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    if (btnElement) btnElement.classList.remove("active");
    showToast(`Removed from Wishlist`);
  } else {
    wishlist.push(productId);
    if (btnElement) btnElement.classList.add("active");
    showToast(`Added "${product ? (product.title || product.name) : 'Item'}" to Wishlist!`, "fa-heart");
  }
  saveWishlist(wishlist);
}

// WhatsApp Direct Inquiry for Single Product
function inquiryOnWhatsApp(productId) {
  const product = (typeof getProductById === 'function' ? getProductById(productId) : null) || RIVAAZ_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const waNumber = (typeof RIVAAZ_CONFIG !== 'undefined' && RIVAAZ_CONFIG.whatsappNumber) ? RIVAAZ_CONFIG.whatsappNumber : "917575841119";

  const msg = `*RIVAAZ WHOLESALE ENQUIRY*%0A` +
              `Hello Rivaaz Royal Ethnic Wear,%0A` +
              `I am interested in wholesale order for:%0A` +
              `• *Item Code:* ${encodeURIComponent(product.code)}%0A` +
              `• *Product:* ${encodeURIComponent(product.title || product.name)}%0A` +
              `• *Main Category:* ${encodeURIComponent(product.category)}%0A` +
              `• *Brand / Collection:* ${encodeURIComponent(product.brandName || product.brand)}%0A` +
              `• *Wholesale Price:* ₹${product.price} / Pc%0A` +
              `• *MOQ:* ${encodeURIComponent(product.moq || '1 Set (4 Pcs)')}%0A` +
              `• *Fabric:* ${encodeURIComponent(product.fabric)}%0A%0A` +
              `Please share available color charts, catalog PDF, and delivery timeframe to my location.`;

  window.open(`https://wa.me/${waNumber}?text=${msg}`, "_blank");
}

// WhatsApp General Contact
function openWhatsAppChat(customMessage = "") {
  const waNumber = (typeof RIVAAZ_CONFIG !== 'undefined' && RIVAAZ_CONFIG.whatsappNumber) ? RIVAAZ_CONFIG.whatsappNumber : "917575841119";
  const defaultMsg = customMessage || "Hello Rivaaz Royal Ethnic Wear, I am a boutique owner / retailer interested in women ethnic wear wholesale catalog.";
  window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(defaultMsg)}`, "_blank");
}

// Quick View Modal
function openQuickView(productId) {
  const product = (typeof getProductById === 'function' ? getProductById(productId) : null) || RIVAAZ_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let modal = document.getElementById("quickViewModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "quickViewModal";
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="modal-window">
        <button class="modal-close-btn" onclick="closeQuickView()"><i class="fa-solid fa-xmark"></i></button>
        <div id="quickViewContent" style="padding: 30px;"></div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeQuickView();
    });
  }

  const productImages = (product.images && product.images.length > 0) ? product.images : [product.mainImage || 'assets/images/placeholder.jpg'];
  const mainImgSrc = productImages[0];

  const thumbHtml = productImages.map((img, i) => `
    <div class="detail-thumb-item ${i === 0 ? 'active' : ''}" onclick="changeModalMainImg(this, '${img}')">
      <img src="${img}" alt="${product.title || product.name}">
    </div>
  `).join('');

  const sizesArray = Array.isArray(product.sizes) ? product.sizes : ['M', 'L', 'XL', 'XXL'];
  const sizesHtml = sizesArray.map(s => `<span class="badge-tag" style="background:#f4ede0; color:#143527; border-color:#dfba73;">${s}</span>`).join(' ');

  document.getElementById("quickViewContent").innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; align-items: start; font-family: 'Poppins', sans-serif;">
      <div>
        <div class="detail-main-img-box" style="height: 380px;">
          <img id="modalMainImage" src="${mainImgSrc}" alt="${product.title || product.name}">
        </div>
        <div class="detail-thumbnails-row">${thumbHtml}</div>
      </div>
      <div>
        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 10px; flex-wrap: wrap;">
          <span class="product-code-badge"><i class="fa-solid fa-barcode"></i> Code: ${product.code}</span>
          <span class="product-subcat-badge">${product.category}</span>
          <span class="badge-tag tag-exclusive">${product.badge || product.tag || 'HOT'}</span>
        </div>
        <h3 style="font-size: 1.5rem; margin-bottom: 6px; color: var(--c-emerald-950); font-weight: 800;">${product.title || product.name}</h3>
        <p style="font-size: 0.88rem; color: var(--c-gold-600); font-weight: 800; text-transform: uppercase; margin-bottom: 14px;">${product.brandName} • ${product.category}</p>
        
        <div style="background: var(--c-bg-cream); padding: 16px 20px; border-radius: 8px; margin-bottom: 18px;">
          <div style="display: flex; align-items: baseline; gap: 12px;">
            <span style="font-size: 1.85rem; font-weight: 900; color: var(--c-emerald-950);">₹${product.price.toLocaleString('en-IN')} <span style="font-size: 0.95rem; font-weight: 600; color: var(--c-text-secondary);">/ Pc</span></span>
            <span style="text-decoration: line-through; color: var(--c-text-muted); font-size: 1.05rem; font-weight: 500;">₹${(product.mrp || product.originalPrice).toLocaleString('en-IN')}</span>
          </div>
          <p style="font-size: 0.9rem; color: #143527; font-weight: 700; margin-top: 6px;"><i class="fa-solid fa-boxes-stacked text-gold"></i> MOQ: ${product.moq || '1 Set (4 Pcs)'}</p>
        </div>

        <p style="font-size: 0.92rem; color: var(--c-text-secondary); line-height: 1.6; margin-bottom: 16px;">${product.description}</p>
        
        <div style="margin-bottom: 16px;">
          <strong style="font-size: 0.88rem; display: block; margin-bottom: 8px; color: var(--c-emerald-950);">Available Sizes (Set Pack):</strong>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">${sizesHtml}</div>
        </div>

        <div style="font-size: 0.92rem; color: var(--c-text-secondary); margin-bottom: 20px;">
          <strong style="color: var(--c-emerald-950);">Fabric:</strong> ${product.fabric}
        </div>

        <div style="display: flex; gap: 12px;">
          <button class="btn btn-whatsapp btn-block" onclick="inquiryOnWhatsApp('${product.id}')" title="Order on WhatsApp" style="padding: 13px 20px; font-size: 0.95rem; justify-content: center;">
            <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeQuickView() {
  const modal = document.getElementById("quickViewModal");
  if (modal) modal.classList.remove("active");
}

function changeModalMainImg(thumbElem, imgUrl) {
  const mainImg = document.getElementById("modalMainImage");
  if (mainImg) mainImg.src = imgUrl;
  const allThumbs = thumbElem.parentElement.querySelectorAll(".detail-thumb-item");
  allThumbs.forEach(t => t.classList.remove("active"));
  thumbElem.classList.add("active");
}

// Render Product Card Component
function createProductCardHTML(product) {
  const wishlist = getWishlist();
  const isWishlisted = wishlist.includes(product.id);
  const badgeText = product.badge || product.tag || "HOT SELLER";
  const tagClass = badgeText.includes("HOT") ? "tag-hot" :
                   badgeText.includes("TREND") ? "tag-trending" :
                   badgeText.includes("NEW") ? "tag-new" : "tag-exclusive";

  const imgSrc = (product.images && product.images[0]) || product.mainImage || 'assets/images/placeholder.jpg';
  const mrpVal = product.mrp || product.originalPrice || Math.round(product.price * 1.35);

  return `
    <div class="product-card" data-category="${product.category}" data-brand="${product.brand}" data-id="${product.id}" data-code="${product.code}">
      <div class="product-image-box">
        <span class="badge-tag ${tagClass} product-badge-pos">${badgeText}</span>
        <button class="product-wishlist-btn ${isWishlisted ? 'active' : ''}" onclick="toggleWishlist('${product.id}', this)" title="Add to Wishlist">
          <i class="fa-solid fa-heart"></i>
        </button>
        <img src="${imgSrc}" alt="${product.title || product.name}" loading="lazy">
        <div class="product-overlay-actions">
          <button class="quick-view-btn" onclick="openQuickView('${product.id}')">
            <i class="fa-solid fa-eye text-gold"></i> Quick View
          </button>
          <a href="product-detail.html?id=${product.id}" class="quick-view-btn">
            <i class="fa-solid fa-circle-info text-gold"></i> Details
          </a>
        </div>
      </div>
      <div class="product-info-box">
        <div class="product-meta-header">
          <span class="product-code-badge"><i class="fa-solid fa-barcode"></i> ${product.code}</span>
          <span class="product-subcat-badge">${product.brand}</span>
        </div>
        <span class="product-category-meta">${product.category}</span>
        <h4 class="product-card-title">
          <a href="product-detail.html?id=${product.id}">${product.title || product.name}</a>
        </h4>
        <p class="product-card-fabric">${product.fabric}</p>
        <div class="product-price-row">
          <div class="product-price-current">₹${product.price.toLocaleString('en-IN')} <span>/ Pc</span></div>
          <div class="product-price-mrp">₹${mrpVal.toLocaleString('en-IN')}</div>
        </div>
        <span class="product-moq-badge"><i class="fa-solid fa-box-open"></i> ${product.moq || '1 Set (4 Pcs)'}</span>
        <div class="product-card-actions">
          <button class="btn-card-wa" onclick="inquiryOnWhatsApp('${product.id}')" title="Order on WhatsApp">
            <i class="fa-brands fa-whatsapp"></i> Order on WhatsApp
          </button>
        </div>
      </div>
    </div>
  `;
}

// Download PDF Catalogue Action – Extra Large High-Res Images & Details Below
function downloadCatalogue() {
  showToast("Preparing Wholesale Catalog PDF with High-Res Images...", "fa-file-pdf");
  setTimeout(() => {
    const printWin = window.open("", "_blank");
    if (!printWin) {
      alert("Popup blocked! Please allow popups in your browser to view and download the PDF catalogue.");
      return;
    }

    const baseHref = window.location.href.substring(0, window.location.href.lastIndexOf('/') + 1);

    // Build each product card: Extra Large image at top, complete description below
    let catalogItems = (typeof RIVAAZ_PRODUCTS !== 'undefined' ? RIVAAZ_PRODUCTS : []).map((p, idx) => {
      const mainImg = (p.images && p.images[0]) || p.mainImage || '';
      const extraImgs = (p.images && p.images.slice(1, 5)) || [];
      const thumbsHtml = extraImgs.length > 0
        ? `<div class="cat-thumb-strip">
            <span class="cat-thumb-label"><i class="fa-solid fa-palette"></i> ${p.images.length} Colors:</span>
            <div class="cat-thumbs-list">
              ${p.images.map((img, i) =>
                `<img src="${encodeURI(img)}" class="cat-thumb-img" alt="Color ${i+1}" onclick="document.getElementById('main-img-${idx}').src='${encodeURI(img)}'" title="Click to view this color" />`
              ).join('')}
            </div>
           </div>`
        : '';

      const numSizes = p.sizes ? p.sizes.length : 4;
      const setPrice = (p.price * numSizes).toLocaleString('en-IN');
      const waMsg = encodeURIComponent(`Hello Rivaaz Royal Ethnic Wear, I want to place a wholesale order for Code: ${p.code} (${p.shortTitle || p.title || p.name}) at ₹${p.price}/pc.`);

      return `
        <div class="cat-card" data-category="${p.category || ''}" data-code="${p.code || ''}">
          <!-- Big Showcase Image Top -->
          <div class="cat-img-box">
            <div class="cat-badges-top">
              <span class="cat-idx-badge">#${idx + 1}</span>
              <span class="cat-cat-badge">${p.category || 'Ethnic Wear'}</span>
              ${p.brandName ? `<span class="cat-brand-badge">${p.brandName}</span>` : ''}
            </div>
            <img src="${encodeURI(mainImg)}" id="main-img-${idx}" class="cat-main-img" alt="${p.code}" loading="lazy" />
            ${thumbsHtml}
          </div>

          <!-- Description Section Below -->
          <div class="cat-details-box">
            <div class="cat-title-row">
              <div class="cat-code-badge">${p.code}</div>
              <div class="cat-p-title">${p.shortTitle || p.title || p.name}</div>
            </div>

            <div class="cat-specs-table">
              <div class="cat-spec-item">
                <span class="cat-spec-k">Fabric:</span>
                <span class="cat-spec-v">${p.fabric || 'Premium Quality'}</span>
              </div>
              <div class="cat-spec-item">
                <span class="cat-spec-k">Work / Style:</span>
                <span class="cat-spec-v">${p.work || 'Designer Embroidery & Work'}</span>
              </div>
              <div class="cat-spec-item">
                <span class="cat-spec-k">Sizes:</span>
                <span class="cat-spec-v cat-sizes-tag">${(p.sizes || ['M','L','XL','XXL']).join(' &nbsp;•&nbsp; ')}</span>
              </div>
              <div class="cat-spec-item">
                <span class="cat-spec-k">Set Ratio:</span>
                <span class="cat-spec-v">${numSizes} Pcs Full Set (${p.colors ? p.colors.length : 1} Color Available)</span>
              </div>
            </div>

            <div class="cat-pricing-row">
              <div class="cat-price-col">
                <span class="cat-price-sub">Wholesale Rate</span>
                <span class="cat-rate-num">₹${p.price.toLocaleString('en-IN')} <small>/ Pc</small></span>
              </div>
              <div class="cat-set-col">
                <span class="cat-price-sub">Set Total (${numSizes} Pcs)</span>
                <span class="cat-set-num">₹${setPrice}</span>
              </div>
              <a href="https://wa.me/917575841119?text=${waMsg}" target="_blank" class="cat-wa-btn" title="Order Code ${p.code} on WhatsApp">
                Order Code
              </a>
            </div>
          </div>
        </div>
      `;
    }).join('');

    const categoriesList = typeof RIVAAZ_CATEGORIES !== 'undefined' ? RIVAAZ_CATEGORIES : [];
    const catFilterButtons = categoriesList.map(c => 
      `<button class="filter-btn" onclick="filterCat('${c.name}')">${c.name} (${c.count || ''})</button>`
    ).join('');

    printWin.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <base href="${baseHref}">
        <meta charset="UTF-8">
        <title>RIVAAZ ROYAL ETHNIC WEAR — Wholesale Catalog (${catalogItems.length} Designs)</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: 'Outfit', sans-serif;
            background: #f6f3ee;
            color: #17241c;
            padding: 24px 28px 60px;
            -webkit-font-smoothing: antialiased;
          }

          /* ── Catalog Header ── */
          .cover-header {
            max-width: 1200px;
            margin: 0 auto 28px;
            background: linear-gradient(135deg, #071911 0%, #0d281e 60%, #173f2f 100%);
            color: #ffffff;
            border-radius: 16px;
            padding: 30px 24px 26px;
            text-align: center;
            border: 2px solid #c59d5f;
            box-shadow: 0 10px 30px rgba(7, 25, 17, 0.25);
          }
          .cover-logo {
            font-family: 'Playfair Display', serif;
            font-size: 38px;
            font-weight: 800;
            letter-spacing: 2px;
            color: #dfba73;
            margin-bottom: 4px;
          }
          .cover-tagline {
            font-size: 13.5px;
            color: #d6be92;
            letter-spacing: 2.5px;
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 12px;
          }
          .cover-contact {
            font-size: 13.5px;
            color: #d4e2db;
            line-height: 1.8;
          }
          .cover-contact strong { color: #dfba73; font-weight: 700; }

          /* ── Action Toolbar ── */
          .toolbar {
            max-width: 1200px;
            margin: 0 auto 24px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            background: #ffffff;
            padding: 14px 20px;
            border-radius: 12px;
            border: 1px solid #e2d6c3;
            box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          }
          .toolbar-group {
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
          }
          .tool-btn {
            padding: 9px 18px;
            font-size: 13.5px;
            font-weight: 700;
            font-family: inherit;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1.5px solid transparent;
            display: inline-flex;
            align-items: center;
            gap: 6px;
          }
          .btn-gold {
            background: #dfba73;
            color: #071911;
            border-color: #c59d5f;
          }
          .btn-gold:hover {
            background: #c59d5f;
            color: #ffffff;
          }
          .btn-outline {
            background: #ffffff;
            color: #0d281e;
            border-color: #d8c7ad;
          }
          .btn-outline:hover, .btn-outline.active {
            background: #0d281e;
            color: #dfba73;
            border-color: #0d281e;
          }
          .filter-bar {
            max-width: 1200px;
            margin: 0 auto 24px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .filter-btn {
            padding: 6px 14px;
            background: #ffffff;
            border: 1px solid #dcd1bf;
            border-radius: 20px;
            font-size: 12.5px;
            font-weight: 600;
            color: #2b3a32;
            cursor: pointer;
            transition: all 0.2s;
          }
          .filter-btn:hover, .filter-btn.active {
            background: #071911;
            color: #dfba73;
            border-color: #071911;
          }

          /* ── Product Grid: 2 Columns Spacious or 1 Column Massive ── */
          .cat-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          .cat-grid.view-single {
            grid-template-columns: 1fr;
            max-width: 860px;
          }

          /* ── Product Card: Big Image + Bottom Description ── */
          .cat-card {
            background: #ffffff;
            border: 1.5px solid #d8c7ad;
            border-radius: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            box-shadow: 0 6px 20px rgba(7, 25, 17, 0.08);
            break-inside: avoid;
            page-break-inside: avoid;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .cat-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 28px rgba(7, 25, 17, 0.14);
            border-color: #c59d5f;
          }

          /* ── Big Image Container ── */
          .cat-img-box {
            position: relative;
            width: 100%;
            background: #f3ede2;
            border-bottom: 2px solid #e7dcce;
          }
          .cat-badges-top {
            position: absolute;
            top: 12px;
            left: 12px;
            display: flex;
            gap: 6px;
            z-index: 2;
            flex-wrap: wrap;
          }
          .cat-idx-badge {
            background: #071911;
            color: #dfba73;
            font-size: 11px;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 6px;
          }
          .cat-cat-badge {
            background: #dfba73;
            color: #071911;
            font-size: 11px;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .cat-brand-badge {
            background: rgba(255, 255, 255, 0.95);
            color: #8c6721;
            font-size: 11px;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 6px;
            border: 1px solid #dfba73;
          }

          /* ── Image sizing: Large & Full ── */
          .cat-main-img {
            width: 100%;
            height: 520px;
            object-fit: cover;
            object-position: top center;
            display: block;
            background: #f7f4ed;
            transition: opacity 0.2s;
          }
          .cat-grid.view-single .cat-main-img {
            height: 620px;
          }

          /* ── Color Variations Strip ── */
          .cat-thumb-strip {
            padding: 10px 14px;
            background: #faf6ef;
            border-top: 1px solid #eadaaf;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .cat-thumb-label {
            font-size: 11.5px;
            font-weight: 700;
            color: #70541d;
            white-space: nowrap;
          }
          .cat-thumbs-list {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 2px;
          }
          .cat-thumb-img {
            width: 64px;
            height: 76px;
            object-fit: cover;
            object-position: top center;
            border-radius: 6px;
            border: 1.5px solid #d4be92;
            cursor: pointer;
            transition: transform 0.15s, border-color 0.15s;
            flex-shrink: 0;
            background: #eee;
          }
          .cat-thumb-img:hover {
            transform: scale(1.06);
            border-color: #071911;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          }

          /* ── Description Box (Below the Image) ── */
          .cat-details-box {
            padding: 18px 20px 20px;
            display: flex;
            flex-direction: column;
            gap: 14px;
            flex: 1;
            background: #ffffff;
          }

          .cat-title-row {
            display: flex;
            align-items: center;
            gap: 10px;
            flex-wrap: wrap;
          }
          .cat-code-badge {
            background: #071911;
            color: #dfba73;
            font-size: 13.5px;
            font-weight: 800;
            padding: 5px 12px;
            border-radius: 6px;
            letter-spacing: 0.5px;
          }
          .cat-p-title {
            font-size: 15px;
            font-weight: 800;
            color: #071911;
            line-height: 1.35;
            flex: 1;
            min-width: 180px;
          }

          /* ── Spec Details ── */
          .cat-specs-table {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px 14px;
            background: #faf7f2;
            border: 1px solid #ebe2d4;
            border-radius: 10px;
            padding: 12px 14px;
          }
          .cat-spec-item {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }
          .cat-spec-k {
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            color: #837462;
          }
          .cat-spec-v {
            font-size: 12.5px;
            font-weight: 700;
            color: #17241c;
          }
          .cat-sizes-tag {
            color: #9a6f1e;
            font-weight: 800;
          }

          /* ── Pricing & WhatsApp Action ── */
          .cat-pricing-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
            background: #071911;
            color: #ffffff;
            padding: 12px 16px;
            border-radius: 10px;
            margin-top: auto;
          }
          .cat-price-col, .cat-set-col {
            display: flex;
            flex-direction: column;
          }
          .cat-price-sub {
            font-size: 10.5px;
            font-weight: 600;
            text-transform: uppercase;
            color: #dfba73;
            letter-spacing: 0.5px;
          }
          .cat-rate-num {
            font-size: 23px;
            font-weight: 900;
            color: #ffffff;
            line-height: 1.1;
          }
          .cat-rate-num small {
            font-size: 12px;
            font-weight: 500;
            color: #d1c7b7;
          }
          .cat-set-num {
            font-size: 17px;
            font-weight: 800;
            color: #dfba73;
            line-height: 1.1;
          }
          .cat-wa-btn {
            background: #25d366;
            color: #ffffff;
            text-decoration: none;
            font-size: 12.5px;
            font-weight: 800;
            padding: 8px 14px;
            border-radius: 6px;
            white-space: nowrap;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            transition: background 0.2s;
          }
          .cat-wa-btn:hover {
            background: #1eb956;
          }

          /* ── Responsive adjustments ── */
          @media (max-width: 900px) {
            .cat-grid { grid-template-columns: 1fr; }
            .cat-main-img { height: 440px; }
            body { padding: 14px 14px 40px; }
          }

          /* ── Print / PDF Styles ── */
          @media print {
            body {
              padding: 0;
              background: #ffffff !important;
            }
            .cover-header {
              box-shadow: none;
              border: 2px solid #071911;
              background: #071911 !important;
              color: #ffffff !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
              margin-bottom: 20px;
              padding: 20px;
            }
            .toolbar, .filter-bar, .cat-wa-btn {
              display: none !important;
            }
            .cat-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 18px !important;
            }
            .cat-card {
              border: 1.5px solid #071911 !important;
              box-shadow: none !important;
              break-inside: avoid !important;
              page-break-inside: avoid !important;
              margin-bottom: 16px;
            }
            .cat-main-img {
              height: 440px !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .cat-pricing-row {
              background: #071911 !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .cat-specs-table {
              background: #f7f4ed !important;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        </style>
      </head>
      <body>
        <!-- Header -->
        <div class="cover-header">
          <div class="cover-logo">RIVAAZ ROYAL ETHNIC WEAR</div>
          <div class="cover-tagline">Surat's Premier B2B Manufacturer & Wholesale Supplier</div>
          <div class="cover-contact">
            📍 <strong>YAMUNA CHOWK, Gf, Kiran Mall, B/s Rangila Park, Mota Varachha, Surat — 394101</strong><br>
            💬 WhatsApp / Call: <strong>+91 75758 41119</strong> &nbsp;|&nbsp; ✉️ <strong>dipakvala333@gmail.com</strong>
          </div>
        </div>

        <!-- Interactive Toolbar -->
        <div class="toolbar">
          <div class="toolbar-group">
            <span style="font-size: 13.5px; font-weight: 700; color: #555;">View Mode:</span>
            <button class="tool-btn btn-outline active" id="btn2Col" onclick="setViewMode(2)">
              <i class="fa-solid fa-table-cells-large"></i> 2 Columns (Standard)
            </button>
            <button class="tool-btn btn-outline" id="btn1Col" onclick="setViewMode(1)">
              <i class="fa-solid fa-image"></i> 1 Column (Extra Large Photos)
            </button>
          </div>
          <div class="toolbar-group">
            <button class="tool-btn btn-gold" onclick="window.print()">
              <i class="fa-solid fa-print"></i> Print / Save as PDF
            </button>
          </div>
        </div>

        <!-- Category Filters -->
        <div class="filter-bar">
          <button class="filter-btn active" onclick="filterCat('all')">All Designs (${catalogItems.length})</button>
          ${catFilterButtons}
        </div>

        <!-- Product Grid with Large Images -->
        <div class="cat-grid" id="catalogGrid">
          ${catalogItems}
        </div>

        <script>
          function setViewMode(cols) {
            const grid = document.getElementById('catalogGrid');
            const btn2 = document.getElementById('btn2Col');
            const btn1 = document.getElementById('btn1Col');
            if (cols === 1) {
              grid.classList.add('view-single');
              btn1.classList.add('active');
              btn2.classList.remove('active');
            } else {
              grid.classList.remove('view-single');
              btn2.classList.add('active');
              btn1.classList.remove('active');
            }
          }

          function filterCat(catName) {
            const cards = document.querySelectorAll('.cat-card');
            const btns = document.querySelectorAll('.filter-btn');
            btns.forEach(b => b.classList.remove('active'));
            if (event && event.target) event.target.classList.add('active');

            cards.forEach(card => {
              if (catName === 'all' || card.getAttribute('data-category') === catName) {
                card.style.display = 'flex';
              } else {
                card.style.display = 'none';
              }
            });
          }
        </script>
      </body>
      </html>
    `);
    printWin.document.close();
  }, 800);
}


// Dedicated Mobile Navigation Drawer Controller
function initMobileNavigation() {
  let backdrop = document.querySelector(".mobile-nav-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "mobile-nav-backdrop";
    document.body.appendChild(backdrop);
  }

  let drawer = document.getElementById("rivaazMobileDrawer");
  if (!drawer) {
    drawer = document.createElement("div");
    drawer.id = "rivaazMobileDrawer";
    drawer.className = "mobile-nav-drawer";
    
    // Dynamic Main Categories
    const catList = typeof RIVAAZ_CATEGORIES !== 'undefined' ? RIVAAZ_CATEGORIES : [];

    const categoriesHtml = catList.map(c => `
      <a href="shop.html?category=${encodeURIComponent(c.id)}" class="drawer-subitem">
        <span>${c.name}</span>
        <span class="dropdown-badge">${c.count}</span>
      </a>
    `).join('');

    drawer.innerHTML = `
      <div class="drawer-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <img src="assets/images/logo.png" alt="Rivaaz Collection" class="drawer-logo">
          <div>
            <div style="font-weight: 800; font-size: 1.05rem; letter-spacing: 1px; color: #fff;">RIVAAZ</div>
            <div style="font-size: 0.68rem; color: var(--c-gold-300); text-transform: uppercase; font-weight: 700;">Royal Ethnic Wear</div>
          </div>
        </div>
        <button class="drawer-close-btn" onclick="closeMobileDrawer()" aria-label="Close Menu">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="drawer-body">
        <a href="index.html" class="drawer-link"><i class="fa-solid fa-house text-gold"></i> Home</a>
        
        <!-- Main Categories -->
        <div class="drawer-dropdown">
          <div class="drawer-link drawer-dropdown-toggle" onclick="toggleDrawerCategory(this)">
            <span><i class="fa-solid fa-vest-patches text-gold"></i> Main Categories</span>
            <i class="fa-solid fa-chevron-down drawer-arrow"></i>
          </div>
          <div class="drawer-submenu">
            ${categoriesHtml}
            <a href="shop.html" class="drawer-subitem" style="color: var(--c-gold-600); font-weight: 700; margin-top: 6px;">
              <span>View All Categories &rarr;</span>
            </a>
          </div>
        </div>

        <a href="shop.html?filter=trending" class="drawer-link"><i class="fa-solid fa-wand-magic-sparkles text-gold"></i> New Arrivals</a>
        <a href="about.html" class="drawer-link"><i class="fa-solid fa-building text-gold"></i> About Us</a>
        <a href="contact.html" class="drawer-link"><i class="fa-solid fa-phone text-gold"></i> Contact Us</a>
        <a href="javascript:void(0)" onclick="downloadCatalogue(); closeMobileDrawer();" class="drawer-link"><i class="fa-solid fa-file-pdf text-gold"></i> Download PDF Catalog</a>
      </div>

      <div class="drawer-footer">
        <p><i class="fa-solid fa-location-dot text-gold"></i> Kiran Mall, Mota Varachha, Surat</p>
        <button onclick="openWhatsAppChat(); closeMobileDrawer();" class="btn btn-whatsapp btn-block btn-sm" style="font-size: 0.85rem;">
          <i class="fa-brands fa-whatsapp"></i> Chat on WhatsApp
        </button>
      </div>
    `;
    document.body.appendChild(drawer);
  }

  const mobileToggle = document.querySelector(".mobile-nav-toggle");
  if (mobileToggle) {
    mobileToggle.onclick = openMobileDrawer;
  }
  backdrop.onclick = closeMobileDrawer;
}

function openMobileDrawer() {
  const drawer = document.getElementById("rivaazMobileDrawer");
  const backdrop = document.querySelector(".mobile-nav-backdrop");
  if (drawer && backdrop) {
    drawer.classList.add("open");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById("rivaazMobileDrawer");
  const backdrop = document.querySelector(".mobile-nav-backdrop");
  if (drawer && backdrop) {
    drawer.classList.remove("open");
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function toggleDrawerCategory(elem) {
  const dropdown = elem.closest(".drawer-dropdown");
  if (dropdown) dropdown.classList.toggle("open");
}

// Dynamic Mobile Bottom Navigation
function initMobileBottomBar() {
  if (document.querySelector(".mobile-bottom-nav")) return;

  const currentPath = window.location.pathname;
  const isHome = currentPath.endsWith("index.html") || currentPath.endsWith("/") || currentPath === "";
  const isShop = currentPath.includes("shop.html") || currentPath.includes("product-detail.html");
  const isCart = currentPath.includes("cart.html");

  const bottomNav = document.createElement("nav");
  bottomNav.className = "mobile-bottom-nav";
  bottomNav.innerHTML = `
    <a href="index.html" class="mobile-nav-item ${isHome ? 'active' : ''}">
      <i class="fa-solid fa-house"></i>
      <span>Home</span>
    </a>
    <a href="shop.html" class="mobile-nav-item ${isShop ? 'active' : ''}">
      <i class="fa-solid fa-layer-group"></i>
      <span>Catalog</span>
    </a>
    <a href="shop.html?filter=wishlist" class="mobile-nav-item">
      <i class="fa-regular fa-heart"></i>
      <span>Wishlist</span>
      <span class="mobile-badge mobile-wishlist-badge" style="display: none;">0</span>
    </a>
    <a href="cart.html" class="mobile-nav-item ${isCart ? 'active' : ''}">
      <i class="fa-solid fa-bag-shopping"></i>
      <span>Enquiry</span>
      <span class="mobile-badge mobile-cart-badge" style="display: none;">0</span>
    </a>
    <a href="javascript:void(0)" onclick="openWhatsAppChat()" class="mobile-nav-item nav-wa">
      <i class="fa-brands fa-whatsapp"></i>
      <span>Chat</span>
    </a>
  `;

  document.body.appendChild(bottomNav);
  updateHeaderBadges();
}

// Mobile Filter Drawer Controller for Shop Page
function initShopMobileFilter() {
  const filterSidebar = document.querySelector(".filter-sidebar");
  if (!filterSidebar) return;

  if (!filterSidebar.querySelector(".filter-sidebar-close")) {
    const closeHeader = document.createElement("div");
    closeHeader.className = "filter-sidebar-close";
    closeHeader.innerHTML = `
      <h4><i class="fa-solid fa-sliders text-gold"></i> Filter Catalog</h4>
      <button onclick="closeShopMobileFilter()"><i class="fa-solid fa-xmark"></i></button>
    `;
    filterSidebar.insertBefore(closeHeader, filterSidebar.firstChild);
  }
}

function openShopMobileFilter() {
  const sidebar = document.querySelector(".filter-sidebar");
  const backdrop = document.querySelector(".mobile-nav-backdrop");
  if (sidebar && backdrop) {
    sidebar.classList.add("open");
    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
    
    const clickHandler = () => {
      closeShopMobileFilter();
      backdrop.removeEventListener("click", clickHandler);
    };
    backdrop.addEventListener("click", clickHandler);
  }
}

function closeShopMobileFilter() {
  const sidebar = document.querySelector(".filter-sidebar");
  const backdrop = document.querySelector(".mobile-nav-backdrop");
  if (sidebar) sidebar.classList.remove("open");
  if (backdrop) backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

// Hero Banner Slider Controller
let currentHeroSlideIndex = 0;
let heroSlideInterval = null;

function showHeroSlide(index) {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slider-dot");
  if (slides.length === 0) return;

  if (index >= slides.length) currentHeroSlideIndex = 0;
  else if (index < 0) currentHeroSlideIndex = slides.length - 1;
  else currentHeroSlideIndex = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentHeroSlideIndex);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentHeroSlideIndex);
  });
}

function nextHeroSlide() {
  showHeroSlide(currentHeroSlideIndex + 1);
}

function prevHeroSlide() {
  showHeroSlide(currentHeroSlideIndex - 1);
}

function goToHeroSlide(index) {
  showHeroSlide(index);
  resetHeroSlideInterval();
}

function startHeroSlideInterval() {
  if (heroSlideInterval) clearInterval(heroSlideInterval);
  heroSlideInterval = setInterval(nextHeroSlide, 5500);
}

function resetHeroSlideInterval() {
  startHeroSlideInterval();
}

function initHeroSlider() {
  const slider = document.getElementById("heroBannerSlider");
  if (!slider) return;

  startHeroSlideInterval();

  slider.addEventListener("mouseenter", () => {
    if (heroSlideInterval) clearInterval(heroSlideInterval);
  });

  slider.addEventListener("mouseleave", () => {
    startHeroSlideInterval();
  });

  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      nextHeroSlide();
      resetHeroSlideInterval();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      prevHeroSlide();
      resetHeroSlideInterval();
    }
  }
}

// Dedicated Desktop Mega Dropdown Initializer
function initDesktopHeaderDropdown() {
  const dropdowns = document.querySelectorAll(".dropdown-menu.mega-dropdown");
  if (dropdowns.length === 0 || typeof RIVAAZ_CATEGORIES === 'undefined') return;

  const totalProducts = typeof RIVAAZ_PRODUCTS !== 'undefined' ? RIVAAZ_PRODUCTS.length : 146;
  
  const catItemsHtml = RIVAAZ_CATEGORIES.map(c => `
    <a href="shop.html?category=${encodeURIComponent(c.id)}" class="dropdown-item">
      <div style="display: flex; align-items: center; gap: 12px;">
        <img src="${c.image}" alt="${c.name}" class="dropdown-thumb" onerror="this.src='assets/images/placeholder.jpg'">
        <div>
          <div class="dropdown-title">${c.name}</div>
          <div class="dropdown-sub">${c.hindiName}</div>
        </div>
      </div>
      <span class="dropdown-badge">${c.count} Design${c.count === 1 ? '' : 's'}</span>
    </a>
  `).join('');

  const brandItemsHtml = (typeof RIVAAZ_BRANDS !== 'undefined' ? RIVAAZ_BRANDS : []).map(b => `
    <a href="shop.html?brand=${encodeURIComponent(b.code)}" class="product-subcat-badge">${b.name.replace(' Collection', '')} (${b.count})</a>
  `).join('');

  const fullContent = `
    <div style="font-size: 0.78rem; font-weight: 800; color: var(--c-gold-600); text-transform: uppercase; letter-spacing: 1px; padding: 4px 14px 8px; border-bottom: 1px solid var(--c-border-subtle);">Main Categories</div>
    ${catItemsHtml}
    <div style="display: flex; gap: 6px; padding: 10px 14px 4px; flex-wrap: wrap; border-top: 1px solid var(--c-border-subtle); margin-top: 6px;">
      <span style="font-size: 0.75rem; font-weight: 700; color: var(--c-text-muted); width: 100%;">Filter by Brand Collection:</span>
      ${brandItemsHtml}
    </div>
    <a href="shop.html" class="dropdown-cta">
      <span>View Complete Wholesale Catalog (${totalProducts} Designs)</span>
      <i class="fa-solid fa-arrow-right"></i>
    </a>
  `;

  dropdowns.forEach(dd => {
    dd.innerHTML = fullContent;
  });
}

// ==========================================================================
// HERO BANNER SLIDER CONTROLLER
// ==========================================================================
let currentHeroSlide = 0;
let heroSliderTimer = null;

function initHeroSlider() {
  const sliderEl = document.getElementById("heroBannerSlider");
  if (!sliderEl) return;

  const slides = sliderEl.querySelectorAll(".hero-slide");
  const dots = sliderEl.querySelectorAll(".slider-dot");
  if (slides.length <= 1) return;

  function showSlide(index) {
    if (index >= slides.length) currentHeroSlide = 0;
    else if (index < 0) currentHeroSlide = slides.length - 1;
    else currentHeroSlide = index;

    slides.forEach((s, idx) => {
      s.classList.toggle("active", idx === currentHeroSlide);
    });

    dots.forEach((d, idx) => {
      d.classList.toggle("active", idx === currentHeroSlide);
    });
  }

  window.nextHeroSlide = function() {
    showSlide(currentHeroSlide + 1);
    resetHeroTimer();
  };

  window.prevHeroSlide = function() {
    showSlide(currentHeroSlide - 1);
    resetHeroTimer();
  };

  window.goToHeroSlide = function(index) {
    showSlide(index);
    resetHeroTimer();
  };

  function startHeroTimer() {
    stopHeroTimer();
    heroSliderTimer = setInterval(() => {
      showSlide(currentHeroSlide + 1);
    }, 5000);
  }

  function stopHeroTimer() {
    if (heroSliderTimer) clearInterval(heroSliderTimer);
  }

  function resetHeroTimer() {
    stopHeroTimer();
    startHeroTimer();
  }

  sliderEl.addEventListener("mouseenter", stopHeroTimer);
  sliderEl.addEventListener("mouseleave", startHeroTimer);

  // Touch Swipe Support for Mobile
  let touchStartX = 0;
  let touchEndX = 0;

  sliderEl.addEventListener("touchstart", (e) => {
    if (e.changedTouches && e.changedTouches.length) {
      touchStartX = e.changedTouches[0].screenX;
    }
    stopHeroTimer();
  }, { passive: true });

  sliderEl.addEventListener("touchend", (e) => {
    if (e.changedTouches && e.changedTouches.length) {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) {
          showSlide(currentHeroSlide + 1);
        } else {
          showSlide(currentHeroSlide - 1);
        }
      }
    }
    startHeroTimer();
  }, { passive: true });

  startHeroTimer();
}

// DOM Initializer
document.addEventListener("DOMContentLoaded", () => {
  initDesktopHeaderDropdown();
  updateHeaderBadges();
  initMobileNavigation();
  initMobileBottomBar();
  initShopMobileFilter();
  initHeroSlider();

  const newsletterForms = document.querySelectorAll(".newsletter-form");
  newsletterForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input[type='email']");
      if (input && input.value) {
        showToast(`Thank you! ${input.value} subscribed for wholesale alerts.`, "fa-envelope-circle-check");
        input.value = "";
      }
    });
  });
});
