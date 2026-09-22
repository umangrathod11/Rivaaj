const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

// 7 Exact Categories requested by user
const categoriesConfig = [
  {
    folder: '2 PIS',
    name: '2 Pis',
    hindiName: '२-पीस सेट्स',
    slug: '2-pis',
    icon: 'fa-shirt',
    desc: 'Designer Kurta & Pant pairings in breathable premium cottons, rayons, and silks for effortless daily and office elegance.'
  },
  {
    folder: '3 PIS ROUND',
    name: '3 Pis Round',
    hindiName: '३-पीस राउंड घेरा',
    slug: '3-pis-round',
    icon: 'fa-gem',
    desc: 'Graceful full-flare floor-length Anarkalis, Angrakhas, and round kurtis paired with matching pants and designer dupattas.'
  },
  {
    folder: 'CORD-SET',
    name: 'Cord-Set',
    hindiName: 'को-ऑर्ड सेट्स',
    slug: 'cord-set',
    icon: 'fa-vest-patches',
    desc: 'Chic modern matching top and bottom coord sets for office, casual brunch, party, and resort styling.'
  },
  {
    folder: 'ONE PIS',
    name: '1 Pis',
    hindiName: '१-पीस कुर्ती',
    slug: '1-pis',
    icon: 'fa-star',
    desc: 'Elegant standalone designer ethnic gowns, festive one-piece dresses, and tunic styles.'
  },
  {
    folder: 'SHORT PLAZZA & SARARA',
    name: 'Short Plazza & Sarara',
    hindiName: 'शॉर्ट प्लाजो एवं शरारा',
    slug: 'short-plazza-sarara',
    icon: 'fa-wand-magic-sparkles',
    desc: 'Trending designer short peplum tops paired with flared shararas and wide-leg palazzo pants with grand dupattas.'
  },
  {
    folder: 'STET 3 PIS',
    name: 'Stet 3 Pis',
    hindiName: 'स्ट्रेट ३-पीस सेट्स',
    slug: 'stet-3-pis',
    icon: 'fa-layer-group',
    desc: 'Complete 3-piece straight kurti, pant, and dupatta ensembles for festive gatherings and wholesale collections.'
  },
  {
    folder: 'WESTURN',
    name: 'Westurn',
    hindiName: 'वेस्टर्न कलेक्शन',
    slug: 'westurn',
    icon: 'fa-crown',
    desc: 'Modern Indo-Western fusion wear, contemporary co-ords, and stylish partywear outfits.'
  }
];

const brandDefinitions = {
  'SL': { code: 'SL', name: 'SL Collection' },
  'SHI': { code: 'SHI', name: 'Shihori Collection' },
  'JD': { code: 'JD', name: 'JD Collection' },
  'KH': { code: 'KH', name: 'KH Collection' },
  'AB': { code: 'AB', name: 'AB Collection' },
  'CHR': { code: 'CHR', name: 'Chhavi Collection' },
  'RV': { code: 'RV', name: 'Rivaaz Exclusive' }
};

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

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

function detectBrand(rawName, folderPath) {
  const upper = rawName.toUpperCase();
  if (/\bCHR\b/.test(upper)) return brandDefinitions['CHR'];
  if (/\bSHI\b|\bSHIHORI\b/.test(upper)) return brandDefinitions['SHI'];
  if (/\bJD\b|\bJ D\b/.test(upper)) return brandDefinitions['JD'];
  if (/\bKH\b/.test(upper)) return brandDefinitions['KH'];
  if (/\bAB\b/.test(upper)) return brandDefinitions['AB'];
  if (/\bRV\b/.test(upper)) return brandDefinitions['RV'];
  if (/\bSL\b/.test(upper)) return brandDefinitions['SL'];
  
  return brandDefinitions['RV'];
}

function detectFabric(rawName, folderPath) {
  const l = (rawName + ' ' + folderPath).toLowerCase();
  if (l.includes('roman silk') || l.includes('roman')) return 'Roman Silk';
  if (l.includes('crep') || l.includes('crepe')) return 'Pure Crepe Silk';
  if (l.includes('chanderi')) return 'Pure Mal Chanderi';
  if (l.includes('gajji') || l.includes('gaji')) return 'Pure Gajji Silk';
  if (l.includes('dhaboo') || l.includes('dhabu')) return 'Dhabu Handblock Cotton';
  if (l.includes('riyon') || l.includes('rayon')) return 'Heavy 14kg Rayon Slub';
  if (l.includes('tissue') || l.includes('jecard') || l.includes('jacquard')) return 'Tissue Jacquard Silk';
  if (l.includes('simar') || l.includes('shimmer')) return 'Shimmer Georgette';
  if (l.includes('viscos') || l.includes('viscose')) return 'Viscose Silk Blend';
  if (l.includes('lilen') || l.includes('lilan') || l.includes('linen')) return 'Pure Linen Cotton';
  if (l.includes('glass') || l.includes('hiffion') || l.includes('chiffon')) return 'Milano Glass Chiffon';
  if (l.includes('salsa')) return 'Salsa Silk';
  if (l.includes('cottan') || l.includes('cotton') || l.includes('mal')) return 'Premium Cotton Mal';
  if (l.includes('ziraf')) return 'Ziraf Textured Silk';
  if (l.includes('imp fabric')) return 'Premium Imported Silk Fabric';
  return 'Premium Festive Silk Blend';
}

function detectWork(rawName) {
  const l = rawName.toLowerCase();
  if (l.includes('hand work') || l.includes('handwork')) return 'Exclusive Designer Handwork & Zari Work';
  if (l.includes('bits') || l.includes('beads')) return 'Designer Glass Beads & Sequence Mirror Work';
  if (l.includes('print')) return 'All-Over Digital Floral & Bandhani Print';
  if (l.includes('angrakha')) return 'Angrakha Style Zari & Tassel Detailing';
  if (l.includes('havy') || l.includes('heavy')) return 'Heavy Festive Zardozi & Thread Embroidery';
  if (l.includes('sarara') || l.includes('srara')) return 'Flared Layered Gota Patti Work';
  if (l.includes('cord set') || l.includes('cordset')) return 'Modern Collar Cut & Minimalist Button Detailing';
  return 'Artisanal Sequence & Zari Thread Embroidery';
}

function detectSizes(rawName) {
  const l = rawName.toLowerCase();
  let sizes = ['M', 'L', 'XL', 'XXL'];
  if (l.includes('s to 2xl')) sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  if (l.includes('l to 2xl') || l.includes('l t 2xl')) sizes = ['L', 'XL', 'XXL'];
  if (l.includes('l to xxxl')) sizes = ['L', 'XL', 'XXL', '3XL'];
  if (l.includes('3xl') || l.includes('xxxl') || l.includes('3 xxl') || l.includes('3 xl')) {
    if (!sizes.includes('3XL')) sizes.push('3XL');
  }
  if (l.includes('4xl') || l.includes('4 to 6xl')) {
    if (!sizes.includes('4XL')) sizes.push('4XL');
    if (!sizes.includes('5XL')) sizes.push('5XL');
    if (!sizes.includes('6XL')) sizes.push('6XL');
  }
  return sizes;
}

const products = [];
let idCounter = 1;

categoriesConfig.forEach(catConf => {
  const catDir = path.join(rootDir, catConf.folder);
  const files = getAllFiles(catDir);
  
  // Group files by base product name
  const productGroupMap = new Map();
  
  files.forEach(filePath => {
    const relPath = path.relative(rootDir, filePath).replace(/\\/g, '/');
    const fileName = path.basename(filePath, path.extname(filePath));
    
    // Clean trailing copy/counter indices like (1), (2), - Copy (1)
    let baseGroupKey = fileName.replace(/\s*\(\d+\)\s*$/, '').trim();
    baseGroupKey = baseGroupKey.replace(/\s+-\s+Copy(\s*\(\d+\))?$/, '').trim();
    
    const uniqueKey = catConf.slug + '___' + baseGroupKey;
    
    if (!productGroupMap.has(uniqueKey)) {
      productGroupMap.set(uniqueKey, {
        categoryConfig: catConf,
        rawName: baseGroupKey,
        folderPath: path.dirname(relPath),
        files: []
      });
    }
    productGroupMap.get(uniqueKey).files.push(relPath);
  });
  
  productGroupMap.forEach(groupData => {
    const { categoryConfig, rawName, folderPath, files } = groupData;
    
    // Sort files by number in parentheses
    files.sort((a, b) => {
      const aNum = parseInt((a.match(/\((\d+)\)/) || [0, 99])[1], 10);
      const bNum = parseInt((b.match(/\((\d+)\)/) || [0, 99])[1], 10);
      return aNum - bNum;
    });
    
    const brand = detectBrand(rawName, folderPath);
    
    // Extract price number from filename
    const numMatch = rawName.match(/\b\d{3,5}\b/);
    let codeNum = numMatch ? numMatch[0] : (850 + (idCounter % 50) * 25);
    
    let price = parseInt(codeNum, 10);
    if (isNaN(price) || price < 400 || price > 10000) {
      if (categoryConfig.slug === '2-pis') price = 895;
      else if (categoryConfig.slug === '3-pis-round') price = 1395;
      else if (categoryConfig.slug === 'cord-set') price = 1095;
      else if (categoryConfig.slug === '1-pis') price = 995;
      else if (categoryConfig.slug === 'short-plazza-sarara') price = 1895;
      else if (categoryConfig.slug === 'stet-3-pis') price = 1295;
      else if (categoryConfig.slug === 'westurn') price = 1325;
      else price = 1295;
      codeNum = price.toString();
    }
    
    const originalPrice = Math.round((price * 1.35) / 50) * 50;
    const itemCode = `${brand.code}-${codeNum}`;
    
    // Clean raw title
    let cleanTitle = rawName
      .replace(/\b\d{3,5}\b/g, '')
      .replace(/\b(SL|SHI|SHIHORI|JD|J D|KH|AB|CHR|RV)\b/gi, '')
      .replace(/\bM\s*TO\s*(XXL|3XL|2XL|4XL|6XL|XXXL)\b/gi, '')
      .replace(/\bS\s*TO\s*(2XL|XXL|3XL)\b/gi, '')
      .replace(/\bL\s*T\s*2XL\b/gi, '')
      .replace(/\b\d+\s*COLOR(S)?\b/gi, '')
      .replace(/\b\d+\s*DESIGN(S)?\b/gi, '')
      .replace(/\b\d+\s*PRINT\b/gi, '')
      .replace(/\b(SINGAL|SINGLE)\s*P(I|C)S?\b/gi, '')
      .replace(/\b3\s*P(I|C|IC)S?\b/gi, '')
      .replace(/\b2\s*P(I|C|IC)S?\b/gi, '')
      .replace(/\b(COTTAN|ZIRAF)\b/gi, '')
      .replace(/\s+/g, ' ')
      .trim();
      
    if (cleanTitle.length < 3) {
      cleanTitle = `${categoryConfig.name} Designer Suit`;
    }
    
    // Capitalize words nicely
    cleanTitle = cleanTitle.split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(' ');
      
    const fullTitle = `${cleanTitle} (${itemCode})`;
    const idSlug = slugify(`${itemCode}-${categoryConfig.slug}-${idCounter}`);
    
    const fabric = detectFabric(rawName, folderPath);
    const work = detectWork(rawName);
    const sizes = detectSizes(rawName);
    
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
      brand: brand.code,
      brandName: brand.name,
      category: categoryConfig.name,
      categoryLabel: categoryConfig.name,
      categorySlug: categoryConfig.slug,
      subCategory: brand.name,
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
      featured: idCounter <= 16,
      isTrending: idCounter % 3 === 0,
      isMostLoved: idCounter % 4 === 0,
      inStock: true,
      fabric: fabric,
      work: work,
      description: `Experience timeless grace with Rivaaj's ${fullTitle}. Artfully crafted in ${fabric} with ${work}. Perfect for festive celebrations, weddings, casual luxury, and wholesale boutiques.`
    });
    
    idCounter++;
  });
});

// Calculate final categories with actual counts & best cover image
const finalCategories = categoriesConfig.map(conf => {
  const catProducts = products.filter(p => p.categorySlug === conf.slug);
  const count = catProducts.length;
  const coverImage = (catProducts.length > 0 && catProducts[0].images.length > 0)
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

// Calculate unique brands
const brandCodes = Object.keys(brandDefinitions);
const finalBrands = brandCodes.map(code => {
  const bDef = brandDefinitions[code];
  const brandProducts = products.filter(p => p.brand === code);
  const coverImage = (brandProducts.length > 0 && brandProducts[0].images.length > 0)
    ? brandProducts[0].images[0]
    : 'assets/images/placeholder.jpg';
  return {
    id: code,
    code: code,
    name: bDef.name,
    count: brandProducts.length,
    image: coverImage
  };
}).filter(b => b.count > 0);

console.log('=== 7 Clean Categories Counts & Covers ===');
finalCategories.forEach(c => console.log(`  ${c.name} (${c.slug}): ${c.count} designs [Cover: ${c.image}]`));

console.log('\n=== Brand Counts ===');
finalBrands.forEach(b => console.log(`  ${b.name} (${b.code}): ${b.count} designs`));

console.log(`\nTotal Products Generated: ${products.length}`);

// Write assets/js/products.js
const jsContent = `/**
 * Rivaaj Fashion Studio - Unified Product Catalog & Category Data
 * 7 Clean Categories: 2 Pis, 3 Pis Round, Cord-Set, 1 Pis, Short Plazza & Sarara, Stet 3 Pis, Westurn
 * Total Live Designs: ${products.length}
 */

// 1. MAIN CATEGORIES
const RIVAAZ_CATEGORIES = ${JSON.stringify(finalCategories, null, 2)};

// 2. BRAND COLLECTIONS
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
  address: "YAMUNA CHOWK, Gf, Kiran Mall, B/s Rangila Park, Mota Varachha, Surat, Gujarat 394101",
  phone: "+91 75758 41119",
  email: "dipakvala333@gmail.com",
  workingHours: "Mon - Sat: 10:00 AM - 8:00 PM (Sunday Closed)"
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
  const target = categoryNameOrSlug.toLowerCase().trim().replace(/[-\s_]/g, '');
  return RIVAAZ_PRODUCTS.filter(p => {
    const cat = (p.category || '').toLowerCase().replace(/[-\s_]/g, '');
    const slug = (p.categorySlug || '').toLowerCase().replace(/[-\s_]/g, '');
    return cat === target || slug === target;
  });
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

// Ensure assets/js folder exists
const jsDir = path.join(rootDir, 'assets/js');
if (!fs.existsSync(jsDir)) {
  fs.mkdirSync(jsDir, { recursive: true });
}

fs.writeFileSync(path.join(jsDir, 'products.js'), jsContent, 'utf8');
console.log('Successfully written assets/js/products.js!');
