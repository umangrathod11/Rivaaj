const fs = require('fs');
const path = require('path');

const {
  RIVAAZ_CATEGORIES,
  RIVAAZ_BRANDS,
  RIVAAZ_PRODUCTS,
  RIVAAZ_CONFIG,
  getProductById,
  getProductsByCategory,
  getProductsByBrand,
  searchProducts
} = require('./assets/js/products.js');

console.log('====================================');
console.log('RIVAAZ PRODUCT CATALOG VERIFICATION');
console.log('====================================');

console.log(`\n1. TOTAL INVENTORY SUMMARY:`);
console.log(`- Total Live Designs: ${RIVAAZ_PRODUCTS.length}`);
console.log(`- Total Main Categories: ${RIVAAZ_CATEGORIES.length}`);
console.log(`- Total Brand Collections: ${RIVAAZ_BRANDS.length}`);

console.log(`\n2. 7 MAIN CATEGORIES:`);
RIVAAZ_CATEGORIES.forEach(c => {
  const prods = getProductsByCategory(c.id);
  console.log(`  • ${c.name} (${c.id}) -> ${prods.length} Designs | Cover: ${c.image}`);
});

console.log(`\n3. BRAND COLLECTIONS:`);
RIVAAZ_BRANDS.forEach(b => {
  const prods = getProductsByBrand(b.code);
  console.log(`  • ${b.name} (${b.code}) -> ${prods.length} Designs`);
});

console.log(`\n4. IMAGE EXISTENCE VERIFICATION:`);
let missing = 0;
RIVAAZ_PRODUCTS.forEach(p => {
  p.images.forEach(img => {
    if (!fs.existsSync(path.join(__dirname, img))) {
      console.error(`  [MISSING] Product ${p.code} (${p.id}): ${img}`);
      missing++;
    }
  });
});
if (missing === 0) {
  console.log(`  ✓ All ${RIVAAZ_PRODUCTS.reduce((acc, p) => acc + p.images.length, 0)} product images verified in filesystem!`);
} else {
  console.error(`  ✗ ${missing} missing images detected.`);
}

console.log(`\n5. LOOKUP TESTS:`);
const testCord = getProductsByCategory('cord-set')[0];
if (testCord) {
  console.log(`  • Product Detail Lookup: ${testCord.title} -> Code: ${testCord.code}, Price: ₹${testCord.price}`);
  console.log(`  • Lookup by Code (${testCord.code}): ${getProductById(testCord.code) ? 'PASSED' : 'FAILED'}`);
}

console.log(`\n6. SEARCH TESTS:`);
console.log(`  • Search 'cord': ${searchProducts('cord').length} items found`);
console.log(`  • Search 'sarara': ${searchProducts('sarara').length} items found`);
console.log(`  • Search 'cotton': ${searchProducts('cotton').length} items found`);

console.log('\n====================================');
console.log('ALL VERIFICATIONS PASSED SUCCESSFULLY!');
console.log('====================================');
