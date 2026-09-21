const fs = require('fs');
const path = require('path');

const rootDir = __dirname;
const targetFolders = [
  { folder: 'AB', brandCode: 'AB', brandName: 'AB Collection' },
  { folder: 'J D', brandCode: 'JD', brandName: 'JD Collection' },
  { folder: 'KH', brandCode: 'KH', brandName: 'KH Collection' },
  { folder: 'SHIHORI', brandCode: 'SHIHORI', brandName: 'SHIHORI Collection' },
  { folder: 'SL', brandCode: 'SL', brandName: 'SL Collection' }
];

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });
  return arrayOfFiles;
}

function determineCategory(filename, folderPath) {
  const text = (filename + ' ' + folderPath).toLowerCase();
  
  // 1. Sharara / Gharara sets (including typos like srara)
  if (text.includes('sarara') || text.includes('sharara') || text.includes('srara') || text.includes('garara') || text.includes('gharara')) {
    return 'Sharara Sets';
  }
  
  // 2. Co-ord Sets (all cord, cordset, co-ord, c-cut, coord)
  if (text.includes('cord set') || text.includes('cordset') || text.includes('co-ord') || text.includes('coord') || text.includes('cord') || text.includes('c cut') || text.includes('c-cut')) {
    return 'Co-ord Sets';
  }

  // 3. Short & Palazzo Sets
  if (text.includes('short plazzo') || text.includes('short pair') || text.includes('short palazzo') || text.includes('short-plazzo') || text.includes('plazzo') || text.includes('palazzo')) {
    return 'Short & Palazzo Sets';
  }

  // 4. Anarkali / Angrakha / Round flared kurtas
  if (text.includes('round') || text.includes('angrakha') || text.includes('anarkali') || text.includes('amarakali') || text.includes('flare') || text.includes('flair') || text.includes('kuri fancy')) {
    return 'Anarkali & Round Flare';
  }

  // 5. Straight Sets
  if (text.includes('stet') || text.includes('stat') || text.includes('straight')) {
    return 'Straight Sets';
  }

  // 6. 3-Piece Sets
  if (text.includes('3 pcs') || text.includes('3 pis') || text.includes('3pcs') || text.includes('3pis') || text.includes('3-piece') || text.includes('3 piece') || text.includes('3 pc') || text.includes('3 pic')) {
    return '3-Piece Sets';
  }

  // 7. 2-Piece Sets
  if (text.includes('2 pcs') || text.includes('2 pis') || text.includes('2pcs') || text.includes('2pis') || text.includes('2-piece') || text.includes('2 piece') || text.includes('2 pic') || text.includes('pair') || text.includes('2 ton')) {
    return '2-Piece Sets';
  }

  // 8. One Piece & Kurtis
  if (text.includes('one pis') || text.includes('one piece') || text.includes('singal') || text.includes('single') || text.includes('kurti') || text.includes('kuri') || text.includes('salsa') || text.includes('viscos') || text.includes('crep') || text.includes('simar') || text.includes('mal cotton inner')) {
    return 'One Piece & Kurtis';
  }

  return '3-Piece Sets';
}

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

const productMap = new Map();

targetFolders.forEach(tf => {
  const dir = path.join(rootDir, tf.folder);
  const files = getAllFiles(dir);
  
  files.forEach(filePath => {
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    const fileName = path.basename(filePath, path.extname(filePath));
    
    let baseGroupKey = fileName.replace(/\s*\(\d+\)\s*$/, '').trim();
    baseGroupKey = baseGroupKey.replace(/\s+-\s+Copy(\s*\(\d+\))?$/, '').trim();
    
    const uniqueKey = tf.brandCode + '___' + baseGroupKey;
    
    if (!productMap.has(uniqueKey)) {
      productMap.set(uniqueKey, {
        brandCode: tf.brandCode,
        brandName: tf.brandName,
        rawName: baseGroupKey,
        folder: tf.folder,
        files: []
      });
    }
    productMap.get(uniqueKey).files.push(relPath);
  });
});

const categoriesConfig = {
  'Co-ord Sets': {
    slug: 'co-ord-sets',
    name: 'Co-ord Sets',
    hindiName: 'को-ऑर्ड सेट्स',
    icon: 'fa-vest-patches',
    desc: 'Chic modern matching top and bottom coord sets for office, casual brunch, and party styling.'
  },
  '3-Piece Sets': {
    slug: '3-piece-sets',
    name: '3-Piece Sets',
    hindiName: '३-पीस सेट्स',
    icon: 'fa-layer-group',
    desc: 'Complete designer Kurti, Pant & Dupatta ensembles for weddings and grand festive celebrations.'
  },
  'Sharara Sets': {
    slug: 'sharara-sets',
    name: 'Sharara Sets',
    hindiName: 'शरारा सेट्स',
    icon: 'fa-wand-magic-sparkles',
    desc: 'Royal flared sharara and peplum kurti sets with intricate embroidery and heavy dupattas.'
  },
  'Short & Palazzo Sets': {
    slug: 'short-palazzo-sets',
    name: 'Short & Palazzo Sets',
    hindiName: 'शॉर्ट और पलाज़ो',
    icon: 'fa-person-dress',
    desc: 'Trending designer short tops paired with breathable flowy palazzo pants.'
  },
  'Anarkali & Round Flare': {
    slug: 'anarkali-round-flare',
    name: 'Anarkali & Round Flare',
    hindiName: 'अनारकली एवं घेरा कुर्ती',
    icon: 'fa-gem',
    desc: 'Graceful full-flare floor-length Anarkalis, Angrakhas and festive round kurtis.'
  },
  'Straight Sets': {
    slug: 'straight-sets',
    name: 'Straight Sets',
    hindiName: 'स्ट्रेट कट सेट्स',
    icon: 'fa-ruler-vertical',
    desc: 'Classic straight-fit kurtas with pants, perfect for sophisticated everyday & office styling.'
  },
  '2-Piece Sets': {
    slug: '2-piece-sets',
    name: '2-Piece Sets',
    hindiName: '२-पीस सेट्स',
    icon: 'fa-shirt',
    desc: 'Comfortable & stylish Kurta-Pant pairings crafted in premium breathable cottons and silks.'
  },
  'One Piece & Kurtis': {
    slug: 'one-piece-kurtis',
    name: 'One Piece & Kurtis',
    hindiName: 'वन पीस एवं कुर्ती',
    icon: 'fa-star',
    desc: 'Elegant standalone kurtis, fancy dresses and tunic styles for effortless ethnic charm.'
  }
};

const products = [];
let idCounter = 1;

productMap.forEach((data, key) => {
  const { brandCode, brandName, rawName, folder, files } = data;
  
  files.sort((a, b) => {
    const aNum = (a.match(/\((\d+)\)/) || [0, 99])[1];
    const bNum = (b.match(/\((\d+)\)/) || [0, 99])[1];
    return aNum - bNum;
  });
  
  const numMatch = rawName.match(/\b\d{3,5}\b/);
  const codeNum = numMatch ? numMatch[0] : (1000 + idCounter);
  const itemCode = `${brandCode}-${codeNum}`;
  
  let price = parseInt(codeNum, 10);
  if (isNaN(price) || price < 400 || price > 10000) {
    price = 1499;
  }
  const originalPrice = Math.round(price * 1.35 / 50) * 50;
  
  const category = determineCategory(rawName, folder);
  const catConfig = categoriesConfig[category] || categoriesConfig['3-Piece Sets'];
  
  let cleanTitle = rawName
    .replace(/\b\d{3,5}\b/g, '')
    .replace(new RegExp(`\\b${brandCode}\\b`, 'gi'), '')
    .replace(/\bM\s*TO\s*(XXL|3XL|2XL|4XL|6XL)\b/gi, '')
    .replace(/\b\d+\s*COLOR(S)?\b/gi, '')
    .replace(/\b\d+\s*DESIGN(S)?\b/gi, '')
    .replace(/\b\d+\s*PRINT\b/gi, '')
    .replace(/\b(SINGAL|SINGLE)\s*P(I|C)S?\b/gi, '')
    .replace(/\b3\s*P(I|C|IC)S?\b/gi, '')
    .replace(/\b2\s*P(I|C|IC)S?\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
    
  if (cleanTitle.length < 3) {
    cleanTitle = `${category.replace(/s$/, '')} Design`;
  }
  
  cleanTitle = cleanTitle.split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  
  const fullTitle = `${cleanTitle} (${itemCode})`;
  const idSlug = slugify(`${itemCode}-${category}-${idCounter}`);
  
  let fabric = 'Premium Cotton Mal';
  const lRaw = rawName.toLowerCase();
  if (lRaw.includes('crep')) fabric = 'Pure Crepe Silk';
  else if (lRaw.includes('chanderi')) fabric = 'Pure Mal Chanderi';
  else if (lRaw.includes('riyon') || lRaw.includes('rayon')) fabric = 'Heavy Rayon Slub';
  else if (lRaw.includes('tissue') || lRaw.includes('jecard') || lRaw.includes('jacquard')) fabric = 'Tissue Jacquard Silk';
  else if (lRaw.includes('simar')) fabric = 'Shimmer Georgette';
  else if (lRaw.includes('viscos')) fabric = 'Viscose Silk Blend';
  else if (lRaw.includes('lilan') || lRaw.includes('linen')) fabric = 'Pure Linen Cotton';
  else if (lRaw.includes('glass') || lRaw.includes('hiffion') || lRaw.includes('chiffon')) fabric = 'Milano Glass Chiffon';
  
  let work = 'Intricate Handwork & Sequence Embroidery';
  if (lRaw.includes('print')) work = 'Digital Handblock & Foil Print Work';
  else if (lRaw.includes('bits') || lRaw.includes('beads')) work = 'Designer Beads & Mirror Work';
  else if (lRaw.includes('angrakha')) work = 'Angrakha Style Zari & Tassel Work';
  else if (lRaw.includes('havy') || lRaw.includes('heavy')) work = 'Heavy Festive Zardozi & Thread Work';
  
  let sizes = ['M', 'L', 'XL', 'XXL'];
  if (lRaw.includes('3xl') || lRaw.includes('3 xxl') || lRaw.includes('3 xl')) sizes.push('3XL');
  if (lRaw.includes('4xl')) sizes.push('4XL');
  if (lRaw.includes('6xl')) sizes.push('5XL', '6XL');
  
  let badge = 'HOT SELLER';
  if (idCounter % 5 === 0) badge = 'TRENDING';
  else if (idCounter % 4 === 0) badge = 'BEST SELLER';
  else if (idCounter % 7 === 0) badge = 'NEW ARRIVAL';
  else if (price >= 2000) badge = 'EXCLUSIVE';
  
  const rating = Number((4.6 + ((idCounter * 7) % 4) * 0.1).toFixed(1));
  const reviewCount = 25 + ((idCounter * 13) % 95);
  
  const colorsList = files.map((f, i) => `Color ${i + 1}`);
  const mainImage = files.length > 0 ? files[0] : 'assets/images/placeholder.jpg';
  
  products.push({
    id: idSlug,
    code: itemCode,
    name: fullTitle,
    title: fullTitle,
    shortTitle: cleanTitle,
    brand: brandCode,
    brandName: brandName,
    category: category,
    categoryLabel: category,
    categorySlug: catConfig.slug,
    subCategory: brandName,
    price: price,
    mrp: originalPrice,
    originalPrice: originalPrice,
    rating: rating,
    reviewCount: reviewCount,
    badge: badge,
    tag: badge,
    moq: '1 Set (4 Pcs: M-L-XL-XXL)',
    sizes: sizes,
    colors: colorsList,
    images: files,
    mainImage: mainImage,
    image: mainImage,
    featured: idCounter <= 12,
    isTrending: idCounter % 3 === 0,
    isMostLoved: idCounter % 4 === 0,
    inStock: true,
    fabric: fabric,
    work: work,
    description: `Experience timeless elegance with Rivaaj's ${fullTitle}. Artfully crafted in premium ${fabric} with ${work}. Perfect for festive functions, family celebrations, weddings, and casual luxury styling.`
  });
  
  idCounter++;
});

// Calculate counts & assign best cover image for each category
const finalCategories = Object.keys(categoriesConfig).map(catName => {
  const conf = categoriesConfig[catName];
  const catProducts = products.filter(p => p.category === catName);
  const count = catProducts.length;
  const coverImage = catProducts.length > 0 && catProducts[0].images.length > 0 
    ? catProducts[0].images[0] 
    : 'assets/images/placeholder.jpg';
    
  return {
    id: conf.slug,
    slug: conf.slug,
    name: conf.name,
    hindiName: conf.hindiName,
    icon: conf.icon,
    count: count,
    image: coverImage,
    description: conf.desc
  };
});

const finalBrands = targetFolders.map(tf => {
  const brandProducts = products.filter(p => p.brand === tf.brandCode);
  const coverImage = brandProducts.length > 0 && brandProducts[0].images.length > 0
    ? brandProducts[0].images[0]
    : 'assets/images/placeholder.jpg';
  return {
    id: tf.brandCode,
    code: tf.brandCode,
    name: tf.brandName,
    count: brandProducts.length,
    image: coverImage
  };
});

console.log('Category Counts:');
finalCategories.forEach(c => console.log(`  ${c.name} (${c.slug}): ${c.count} items (cover: ${c.image})`));

console.log('Brand Counts:');
finalBrands.forEach(b => console.log(`  ${b.name} (${b.code}): ${b.count} items`));

// Generate products.js content
const jsContent = `/**
 * Rivaaj Fashion Studio - Unified Product Catalog & Category Data
 * Main Categories: Garment Styles (Co-ord Sets, 3-Piece Sets, Sharara Sets, Short & Palazzo, etc.)
 * Brands / Collections: AB, JD, KH, SHIHORI, SL
 * Total Live Designs: ${products.length}
 */

// 1. MAIN GARMENT STYLE CATEGORIES
const RIVAAZ_CATEGORIES = ${JSON.stringify(finalCategories, null, 2)};

// 2. BRAND / FOLDER COLLECTIONS
const RIVAAZ_BRANDS = ${JSON.stringify(finalBrands, null, 2)};

// Backward compatibility alias for any legacy scripts
const RIVAAZ_SUBCATEGORIES = RIVAAZ_CATEGORIES;

// 3. MASTER PRODUCT INVENTORY
const RIVAAZ_PRODUCTS = ${JSON.stringify(products, null, 2)};

// 4. STORE SETTINGS & CONTACT CONFIGURATION
const RIVAAZ_SETTINGS = {
  storeName: "Rivaaz Royal Ethnic Wear",
  tagline: "India's Premium Wholesale Women's Ethnic Hub",
  whatsappNumber: "917575841119",
  whatsappMessageTemplate: "Hello Rivaaj! I am interested in wholesale inquiry for {productTitle} (Code: {productCode}, Wholesale Price: ₹{price}/pc). Please share color chart and details.",
  currency: "₹",
  shippingThreshold: 1999,
  defaultDeliveryCharge: 99,
  address: "123, Heritage Plaza, MG Road, Surat, Gujarat - 395003",
  phone: "+91 75758 41119",
  email: "support@rivaaz.in",
  workingHours: "Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)"
};

const RIVAAZ_CONFIG = RIVAAZ_SETTINGS;

// 5. HELPER UTILITY FUNCTIONS
function getProductById(id) {
  if (!id) return null;
  const cleanId = id.toString().trim().toLowerCase();
  return RIVAAZ_PRODUCTS.find(p => 
    p.id.toLowerCase() === cleanId || 
    p.code.toLowerCase() === cleanId ||
    p.code.toLowerCase().replace('-', '') === cleanId.replace('-', '')
  ) || null;
}

function getProductsByCategory(categoryNameOrSlug) {
  if (!categoryNameOrSlug || categoryNameOrSlug === 'ALL' || categoryNameOrSlug === 'all') return RIVAAZ_PRODUCTS;
  const target = categoryNameOrSlug.toLowerCase().trim();
  return RIVAAZ_PRODUCTS.filter(p => 
    p.category.toLowerCase() === target || 
    p.categorySlug.toLowerCase() === target
  );
}

function getProductsByBrand(brandCode) {
  if (!brandCode || brandCode === 'ALL' || brandCode === 'all') return RIVAAZ_PRODUCTS;
  const target = brandCode.toLowerCase().trim();
  return RIVAAZ_PRODUCTS.filter(p => p.brand.toLowerCase() === target);
}

function getFeaturedProducts(limit = 12) {
  return RIVAAZ_PRODUCTS.filter(p => p.featured).slice(0, limit);
}

function getNewArrivals(limit = 12) {
  return RIVAAZ_PRODUCTS.slice(0, limit);
}

function searchProducts(query) {
  if (!query) return RIVAAZ_PRODUCTS;
  const q = query.toLowerCase().trim();
  return RIVAAZ_PRODUCTS.filter(p => 
    p.title.toLowerCase().includes(q) ||
    p.code.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.brandName.toLowerCase().includes(q) ||
    p.fabric.toLowerCase().includes(q) ||
    p.work.toLowerCase().includes(q)
  );
}

// Export for Node/CommonJS if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    RIVAAZ_CATEGORIES,
    RIVAAZ_BRANDS,
    RIVAAZ_SUBCATEGORIES,
    RIVAAZ_PRODUCTS,
    RIVAAZ_SETTINGS,
    RIVAAZ_CONFIG,
    getProductById,
    getProductsByCategory,
    getProductsByBrand,
    getFeaturedProducts,
    getNewArrivals,
    searchProducts
  };
}
`;

fs.writeFileSync(path.join(rootDir, 'assets/js/products.js'), jsContent, 'utf8');
console.log('Successfully generated assets/js/products.js!');
