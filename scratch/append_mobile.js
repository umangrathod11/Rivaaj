const fs = require('fs');
let css = fs.readFileSync('assets/css/style.css', 'utf8');

const mobileOverrides = `

/* ==========================================================================
   SHOP PAGE - COMPLETE MOBILE RESPONSIVE FIX (DEFINITIVE OVERRIDE - APPENDED)
   ========================================================================== */
@media (max-width: 768px) {
  html, body {
    overflow-x: hidden !important;
    max-width: 100vw !important;
    width: 100% !important;
  }

  .shop-page-section {
    padding: 0 !important;
    overflow-x: hidden !important;
  }
  .shop-page-section > .container {
    padding-left: 0 !important;
    padding-right: 0 !important;
    max-width: 100vw !important;
    width: 100% !important;
    overflow-x: hidden !important;
  }

  .collection-layout-wrapper {
    display: block !important;
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    padding: 0 !important;
    gap: 0 !important;
    grid-template-columns: none !important;
  }

  .collection-sidebar-card {
    position: fixed !important;
    top: 0 !important;
    left: -100% !important;
    width: 80vw !important;
    max-width: 290px !important;
    height: 100dvh !important;
    z-index: 1300 !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    border-radius: 0 14px 14px 0 !important;
    transition: left 0.3s ease !important;
    box-shadow: 4px 0 30px rgba(0,0,0,0.28) !important;
    background: #ffffff !important;
    padding: 16px 14px !important;
  }
  .collection-sidebar-card.mobile-open {
    left: 0 !important;
  }

  .collection-main-content {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    display: block !important;
    padding: 0 !important;
  }

  .collection-top-header {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 8px 12px !important;
    width: 100% !important;
    flex-wrap: nowrap !important;
    gap: 4px !important;
  }

  .quick-pills-bar {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    overflow-x: auto !important;
    overflow-y: hidden !important;
    -webkit-overflow-scrolling: touch !important;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
    gap: 8px !important;
    padding: 8px 12px 12px !important;
    width: 100% !important;
    max-width: 100vw !important;
    box-sizing: border-box !important;
  }
  .quick-pills-bar::-webkit-scrollbar {
    display: none !important;
  }

  .collection-products-grid {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 8px !important;
    padding: 4px 10px 24px !important;
    width: 100% !important;
    max-width: 100vw !important;
    box-sizing: border-box !important;
    overflow-x: hidden !important;
  }
  .collection-products-grid.list-view {
    grid-template-columns: 1fr !important;
  }

  .collection-product-card {
    width: 100% !important;
    min-width: 0 !important;
    max-width: 100% !important;
    overflow: hidden !important;
    display: flex !important;
    flex-direction: column !important;
    border-radius: 10px !important;
    border: 1px solid #e8e2d8 !important;
    background: #ffffff !important;
  }

  .card-img-box {
    width: 100% !important;
    height: 0 !important;
    padding-bottom: 128% !important;
    position: relative !important;
    overflow: hidden !important;
    background: #f5f0e8 !important;
    border-radius: 10px 10px 0 0 !important;
    flex-shrink: 0 !important;
  }
  .card-img-box img {
    position: absolute !important;
    inset: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    object-position: top center !important;
    display: block !important;
    cursor: pointer !important;
  }
}
`;

css = css + mobileOverrides;
fs.writeFileSync('assets/css/style.css', css);
console.log('Done! Total lines:', css.split('\n').length, '| Total bytes:', css.length);
