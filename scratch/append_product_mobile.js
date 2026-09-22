const fs = require('fs');
let css = fs.readFileSync('assets/css/style.css', 'utf8');

const productDetailMobile = `

/* ==========================================================================
   PRODUCT DETAIL PAGE - COMPLETE MOBILE RESPONSIVE FIX
   ========================================================================== */
@media (max-width: 768px) {

  /* Breadcrumb bar on product page */
  .product-detail-section > .container > div[style*="background: var(--c-bg-cream)"],
  [style*="padding: 14px 0; border-bottom"] {
    font-size: 0.78rem !important;
    padding: 10px 0 !important;
  }

  /* Product Detail Section */
  .product-detail-section {
    padding: 12px 0 30px !important;
  }
  .product-detail-section > .container {
    padding-left: 12px !important;
    padding-right: 12px !important;
    max-width: 100vw !important;
  }

  /* Product Detail Grid: Stack to single column */
  .product-detail-grid {
    display: block !important;
    grid-template-columns: none !important;
    gap: 0 !important;
    width: 100% !important;
  }

  /* Gallery: full width, natural height */
  .detail-gallery-wrap {
    width: 100% !important;
    position: static !important;
    margin-bottom: 16px !important;
  }

  /* Main image box */
  .detail-main-img-box {
    width: 100% !important;
    height: 0 !important;
    padding-bottom: 115% !important;
    position: relative !important;
    overflow: hidden !important;
    border-radius: 12px !important;
    background: #f5f0e8 !important;
  }
  .detail-main-img-box img,
  #mainDetailImage {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: top center !important;
    display: block !important;
    border-radius: 12px !important;
  }

  /* Thumbnails row: horizontal scroll */
  .detail-thumbnails-row {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    gap: 8px !important;
    overflow-x: auto !important;
    padding: 10px 0 4px !important;
    scrollbar-width: none !important;
    -webkit-overflow-scrolling: touch !important;
    width: 100% !important;
  }
  .detail-thumbnails-row::-webkit-scrollbar {
    display: none !important;
  }

  /* Thumbnail items */
  .detail-thumb-item {
    flex: 0 0 auto !important;
    width: 62px !important;
    height: 74px !important;
    border-radius: 8px !important;
    overflow: hidden !important;
    border: 2px solid transparent !important;
    cursor: pointer !important;
  }
  .detail-thumb-item.active {
    border-color: #dfba73 !important;
  }
  .detail-thumb-item img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    display: block !important;
  }

  /* Info column: full width */
  .detail-info-col {
    width: 100% !important;
    padding: 0 !important;
  }

  /* Product title */
  .detail-product-title {
    font-size: 1.25rem !important;
    line-height: 1.3 !important;
    margin-bottom: 10px !important;
  }

  /* Price box */
  .detail-price-box {
    margin-bottom: 16px !important;
    padding: 12px !important;
    background: #f9f5ef !important;
    border-radius: 10px !important;
    border: 1px solid #e8e0d0 !important;
  }

  /* Order actions: full width stacked buttons */
  .detail-order-actions {
    flex-direction: column !important;
    gap: 10px !important;
    margin: 16px 0 !important;
  }
  .detail-order-actions .btn {
    width: 100% !important;
    justify-content: center !important;
    padding: 13px 16px !important;
    font-size: 0.95rem !important;
  }

  /* Specs table: full width, compact */
  .detail-specs-table {
    width: 100% !important;
    font-size: 0.82rem !important;
    margin-bottom: 16px !important;
  }
  .detail-specs-table td {
    padding: 7px 8px !important;
  }
  .detail-specs-table td:first-child {
    width: 42% !important;
    color: #64748b !important;
    font-size: 0.78rem !important;
  }

  /* Wholesale tier: single card full width */
  .wholesale-tier-grid {
    grid-template-columns: 1fr !important;
    max-width: 100% !important;
    margin: 10px 0 !important;
  }
  .tier-card {
    padding: 10px 12px !important;
    text-align: center !important;
  }
  .tier-qty {
    font-size: 0.78rem !important;
  }
  .tier-price {
    font-size: 1.05rem !important;
    font-weight: 800 !important;
  }

  /* Related products section */
  #relatedProductsGrid.products-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10px !important;
  }

  /* Breadcrumb inline */
  .container [style*="background: var(--c-bg-cream)"] {
    font-size: 0.78rem !important;
    padding: 8px 0 !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
  }

  /* Set qty counter */
  .set-qty-counter {
    width: 100% !important;
    justify-content: center !important;
  }

  /* Quick view modal */
  #quickViewContent > div {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
  #quickViewContent .detail-main-img-box {
    height: 260px !important;
    padding-bottom: 0 !important;
  }
  #quickViewContent #mainDetailImage {
    position: static !important;
    width: 100% !important;
    height: 260px !important;
  }
}
`;

css = css + productDetailMobile;
fs.writeFileSync('assets/css/style.css', css);

// Validate
let open = 0;
for (let c of css) {
  if (c === '{') open++;
  if (c === '}') open--;
}
console.log('CSS braces balanced:', open === 0 ? 'YES - OK' : 'NO - ' + open);
console.log('Total size:', (css.length/1024).toFixed(1), 'KB');
console.log('Total lines:', css.split('\n').length);
