const fs = require('fs');
const path = require('path');

const rootDir = __dirname;

const categoriesConfig = [
  {
    folders: ['2 PIS', 'NEW COLLECTION/2 PIS'],
    name: '2 Pis', hindiName: '२-पीस सेट्स', slug: '2-pis', icon: 'fa-shirt',
    desc: 'Designer Kurta & Pant pairings in breathable premium cottons, rayons, and silks for effortless daily and office elegance.'
  },
  {
    folders: ['3 PIS ROUND', 'NEW COLLECTION/3 PIS ROUND'],
    name: '3 Pis Round', hindiName: '३-पीस राउंड घेरा', slug: '3-pis-round', icon: 'fa-gem',
    desc: 'Graceful full-flare Anarkalis and round kurtis paired with matching pants and designer dupattas.'
  },
  {
    folders: ['CORD-SET', 'NEW COLLECTION/CORD SET'],
    name: 'Cord-Set', hindiName: 'को-ऑर्ड सेट्स', slug: 'cord-set', icon: 'fa-vest-patches',
    desc: 'Chic modern matching top and bottom coord sets for office, casual brunch, party, and resort styling.'
  },
  {
    folders: ['ONE PIS', 'NEW COLLECTION/ONE PIS'],
    name: '1 Pis', hindiName: '१-पीस कुर्ती', slug: '1-pis', icon: 'fa-star',
    desc: 'Elegant standalone designer ethnic gowns, festive one-piece dresses, and tunic styles.'
  },
  {
    folders: ['SHORT PLAZZA & SARARA', 'NEW COLLECTION/SHORT PLAZZA &  SARARA'],
    name: 'Short Plazza & Sarara', hindiName: 'शॉर्ट प्लाजो एवं शरारा', slug: 'short-plazza-sarara', icon: 'fa-wand-magic-sparkles',
    desc: 'Trending short peplum tops paired with flared shararas and wide-leg palazzo pants.'
  },
  {
    folders: ['STET 3 PIS', 'NEW COLLECTION/STET 3 PIS'],
    name: 'Stet 3 Pis', hindiName: 'स्ट्रेट ३-पीस सेट्स', slug: 'stet-3-pis', icon: 'fa-layer-group',
    desc: 'Complete 3-piece straight kurti, pant, and dupatta ensembles for festive gatherings.'
  },
  {
    folders: ['WESTURN'],
    name: 'Westurn', hindiName: 'वेस्टर्न कलेक्शन', slug: 'westurn', icon: 'fa-crown',
    desc: 'Modern Indo-Western fusion wear, contemporary co-ords, and stylish partywear outfits.'
  },
  {
    folders: ['NEW COLLECTION/TUNIC'],
    name: 'Tunic', hindiName: 'ट्यूनिक कलेक्शन', slug: 'tunic', icon: 'fa-vest',
    desc: 'Trendy long tunics in vibrant cottons, crepe, and Jaipuri prints for everyday ethnic elegance.'
  },
  {
    folders: ['NEW COLLECTION/PENT'],
    name: 'Pant', hindiName: 'पैंट कलेक्शन', slug: 'pant', icon: 'fa-person',
    desc: 'Stylish designer ethnic pants in premium cottons and maslin fabric.'
  }
];

const brandDefs = {
  SL:  { code:'SL',  name:'SL Collection' },
  SHI: { code:'SHI', name:'Shihori Collection' },
  JD:  { code:'JD',  name:'JD Collection' },
  KH:  { code:'KH',  name:'KH Collection' },
  AB:  { code:'AB',  name:'AB Collection' },
  CHR: { code:'CHR', name:'Chhavi Collection' },
  VA:  { code:'VA',  name:'VA Collection' },
  VP:  { code:'VP',  name:'VP Collection' },
  ZI:  { code:'ZI',  name:'ZI Collection' },
  RV:  { code:'RV',  name:'Rivaaz Exclusive' }
};

function getFiles(dir){
  if(!fs.existsSync(dir)) return [];
  const out=[];
  fs.readdirSync(dir).forEach(f=>{
    const fp=path.join(dir,f);
    if(fs.statSync(fp).isDirectory()) getFiles(fp).forEach(x=>out.push(x));
    else if(/\.(jpe?g|png|webp)$/i.test(f)) out.push(fp);
  });
  return out;
}

function slugify(t){
  return t.toLowerCase().replace(/\s+/g,'-').replace(/[^\w-]+/g,'').replace(/--+/g,'-').replace(/^-+|-+$/g,'');
}

function brand(n){
  const u=n.toUpperCase();
  if(/\bCHR\b/.test(u)) return brandDefs.CHR;
  if(/\bSHI\b|\bSHIHORI\b/.test(u)) return brandDefs.SHI;
  if(/\bJD\b|\bJ\s+D\b/.test(u)) return brandDefs.JD;
  if(/\bKH\b/.test(u)) return brandDefs.KH;
  if(/\bAB\b/.test(u)) return brandDefs.AB;
  if(/\bSL\b/.test(u)) return brandDefs.SL;
  if(/\bVA\b/.test(u)) return brandDefs.VA;
  if(/\bVP\b/.test(u)) return brandDefs.VP;
  if(/\bZI\b/.test(u)) return brandDefs.ZI;
  if(/\bRV\b/.test(u)) return brandDefs.RV;
  return brandDefs.RV;
}

function fabric(n){
  const l=n.toLowerCase();
  if(l.includes('roman silk')||l.includes('roman')) return 'Roman Silk';
  if(l.includes('crep')||l.includes('crepe')) return 'Pure Crepe Silk';
  if(l.includes('chanderi')) return 'Pure Mal Chanderi';
  if(l.includes('gajji')||l.includes('gaji')) return 'Pure Gajji Silk';
  if(l.includes('dhaboo')||l.includes('dhabu')) return 'Dhabu Handblock Cotton';
  if(l.includes('riyon')||l.includes('rayon')) return 'Heavy 14kg Rayon Slub';
  if(l.includes('jacquard')||l.includes('jecard')) return 'Tissue Jacquard Silk';
  if(l.includes('shimmer')||l.includes('simar')) return 'Shimmer Georgette';
  if(l.includes('viscose')||l.includes('viscos')) return 'Viscose Silk Blend';
  if(l.includes('lilen')||l.includes('lilan')||l.includes('linen')) return 'Pure Linen Cotton';
  if(l.includes('linening')||l.includes('linning')) return 'Premium Linen Fabric';
  if(l.includes('maslin')||l.includes('muslin')) return 'Premium Maslin Cotton';
  if(l.includes('kalamkari')) return 'Natural Kalamkari Cotton';
  if(l.includes('denim')) return 'Premium Denim';
  if(l.includes('coral')) return 'Coral Silk';
  if(l.includes('vichitra')) return 'Vichitra Silk';
  if(l.includes('cemric')||l.includes('cambric')) return 'Premium Cambric Cotton';
  if(l.includes('jaipuri')||l.includes('jaypuri')) return 'Jaipuri Hand-Block Cotton';
  if(l.includes('natural fabric')) return 'Natural Fabric Cotton';
  if(l.includes('cottan')||l.includes('cotton')||l.includes('mal')) return 'Premium Cotton Mal';
  if(l.includes('ziraf')) return 'Ziraf Textured Silk';
  return 'Premium Festive Silk Blend';
}

function work(n){
  const l=n.toLowerCase();
  if(l.includes('hand work')||l.includes('handwork')) return 'Exclusive Designer Handwork & Zari Work';
  if(l.includes('beads')||l.includes('bits')) return 'Designer Glass Beads & Sequence Mirror Work';
  if(l.includes('kalamkari')||l.includes('print')) return 'All-Over Kalamkari & Digital Block Print';
  if(l.includes('angrakha')) return 'Angrakha Style Zari & Tassel Detailing';
  if(l.includes('havy')||l.includes('heavy')) return 'Heavy Festive Zardozi & Thread Embroidery';
  if(l.includes('sarara')||l.includes('srara')) return 'Flared Layered Gota Patti Work';
  if(l.includes('cord set')||l.includes('cordset')) return 'Modern Collar Cut & Minimalist Button Detailing';
  if(l.includes('2 tone')||l.includes('2tone')) return 'Elegant 2-Tone Colour Block Design';
  if(l.includes('jaipuri')||l.includes('jaypuri')) return 'Traditional Jaipuri Block Print';
  if(l.includes('vartical')||l.includes('vertical')) return 'Chic Vertical Stripe Detailing';
  return 'Artisanal Sequence & Zari Thread Embroidery';
}

function sizes(n){
  const l=n.toLowerCase();
  if(l.includes('s to xxl')||l.includes('s to 2xl')) return ['S','M','L','XL','XXL'];
  if(l.includes('3xl to 6xl')||l.includes('3 xl to 6xl')) return ['3XL','4XL','5XL','6XL'];
  if(l.includes('3xl to 5xl')) return ['3XL','4XL','5XL'];
  if(l.includes('l to 3xl')||l.includes('l to xxxl')) return ['L','XL','XXL','3XL'];
  if(l.includes('l to 2xl')||l.includes('l to xxl')) return ['L','XL','XXL'];
  if(l.includes('m to 3xl')||l.includes('m to xxxl')) return ['M','L','XL','XXL','3XL'];
  return ['M','L','XL','XXL'];
}

const products=[];
let idx=1;

categoriesConfig.forEach(cat=>{
  const allFiles=[];
  cat.folders.forEach(f=> getFiles(path.join(rootDir,f)).forEach(x=>allFiles.push(x)));

  const groups=new Map();
  allFiles.forEach(fp=>{
    const rel=path.relative(rootDir,fp).replace(/\\/g,'/');
    const base=path.basename(fp,path.extname(fp))
      .replace(/\s*\(\d+\)\s*$/,'')
      .replace(/\s+-\s+Copy(\s*\(\d+\))?$/,'')
      .trim();
    const key=cat.slug+'___'+base;
    if(!groups.has(key)) groups.set(key,{cat,rawName:base,files:[]});
    groups.get(key).files.push(rel);
  });

  groups.forEach(({cat,rawName,files})=>{
    files.sort((a,b)=>{
      const an=parseInt(((a.match(/\((\d+)\)/)||[])[1])||'99',10);
      const bn=parseInt(((b.match(/\((\d+)\)/)||[])[1])||'99',10);
      return an-bn;
    });

    const br=brand(rawName);
    const numM=rawName.match(/^\s*(\d{3,4})\b/);
    let codeNum=numM?numM[1]:null;
    let price=codeNum?parseInt(codeNum,10):0;
    const fallbacks={'2-pis':895,'3-pis-round':1095,'cord-set':810,'1-pis':850,'short-plazza-sarara':950,'stet-3-pis':925,'westurn':1325,'tunic':395,'pant':550};
    if(!codeNum||price<200||price>5000){price=fallbacks[cat.slug]||995;codeNum=price.toString();}

    const mrp=Math.round((price*1.4)/50)*50;
    const itemCode=`${br.code}-${codeNum}`;

    let title=rawName
      .replace(/^\s*\d{3,5}\s*/,'')
      .replace(/\b(SL|SHI|SHIHORI|JD|J\s*D|KH|AB|CHR|VA|VP|ZI|RV)\b/gi,'')
      .replace(/\bM\s*TO\s*(XXL|3XL|XXXL|2XL|4XL|6XL)\b/gi,'')
      .replace(/\bS\s*TO\s*(2XL|XXL|3XL)\b/gi,'')
      .replace(/\bL\s*T(O)?\s*(2XL|XXL|3XL|XXXL)\b/gi,'')
      .replace(/\b3XL\s*TO\s*[56]XL\b/gi,'')
      .replace(/\b\d+\s*COLORS?\b/gi,'')
      .replace(/\b\d+\s*DESIGNS?\b/gi,'')
      .replace(/\b\d+\s*PRINTS?\b/gi,'')
      .replace(/\b(SINGAL|SINGLE|ONE|1)\s*P(I|C|IC)S?\b/gi,'')
      .replace(/\b[23]\s*P(I|C|IC)S?\b/gi,'')
      .replace(/\bONE\s*SIDE\s*POCKET\b/gi,'')
      .replace(/\b(COTTAN|ZIRAF)\b/gi,'')
      .replace(/\s+/g,' ').trim();

    if(title.length<3) title=`${cat.name} Designer Set`;
    title=title.split(' ').map(w=>w.charAt(0).toUpperCase()+w.slice(1).toLowerCase()).join(' ');

    const fullTitle=`${title} (${itemCode})`;
    const id=slugify(`${itemCode}-${cat.slug}-${idx}`);

    let badge='HOT SELLER';
    if(idx%7===0) badge='NEW ARRIVAL';
    else if(idx%5===0) badge='TRENDING';
    else if(idx%4===0) badge='BEST SELLER';
    else if(price>=1500) badge='EXCLUSIVE';

    products.push({
      id, code:itemCode, name:fullTitle, title:fullTitle, shortTitle:title,
      brand:br.code, brandName:br.name,
      category:cat.name, categoryLabel:cat.name, categorySlug:cat.slug, subCategory:br.name,
      price, mrp, originalPrice:mrp,
      rating:Number((4.5+((idx*3)%5)*0.1).toFixed(1)),
      reviewCount:18+((idx*11)%82),
      badge, tag:badge,
      moq:'1 Set (4 Pcs: M-L-XL-XXL)',
      sizes:sizes(rawName),
      colors:files.map((_,i)=>`Color ${i+1}`),
      images:files, mainImage:files[0]||'assets/images/placeholder.jpg', image:files[0]||'assets/images/placeholder.jpg',
      featured:idx<=18, isTrending:idx%3===0, isMostLoved:idx%4===0, inStock:true,
      fabric:fabric(rawName), work:work(rawName),
      description:`Experience timeless grace with Rivaaj's ${fullTitle}. Crafted in ${fabric(rawName)} with ${work(rawName)}. Perfect for festive celebrations, weddings, casual luxury, and wholesale boutiques.`
    });
    idx++;
  });
});

const finalCats=categoriesConfig.map(c=>{
  const ps=products.filter(p=>p.categorySlug===c.slug);
  return {id:c.slug,slug:c.slug,name:c.name,hindiName:c.hindiName,icon:c.icon,
    count:ps.length,image:ps.length>0&&ps[0].images.length>0?ps[0].images[0]:'assets/images/placeholder.jpg',
    description:c.desc};
});

const finalBrands=Object.keys(brandDefs).map(code=>{
  const ps=products.filter(p=>p.brand===code);
  if(ps.length===0) return null;
  return {id:code,code,name:brandDefs[code].name,count:ps.length,image:ps[0].images[0]||'assets/images/placeholder.jpg'};
}).filter(Boolean);

console.log('=== Category Summary ===');
finalCats.forEach(c=>console.log(`  ${c.name.padEnd(25)}(${c.slug}): ${c.count} designs`));
console.log('\n=== Brand Summary ===');
finalBrands.forEach(b=>console.log(`  ${b.name.padEnd(22)}(${b.code}): ${b.count} designs`));
console.log(`\nTotal: ${products.length} products`);

const js=`/**
 * Rivaaj Fashion Studio - Product Catalog
 * 9 Categories | Total: ${products.length} designs
 */

const RIVAAZ_CATEGORIES = ${JSON.stringify(finalCats,null,2)};
const RIVAAZ_BRANDS = ${JSON.stringify(finalBrands,null,2)};
const RIVAAZ_SUBCATEGORIES = RIVAAZ_CATEGORIES;
const RIVAAZ_PRODUCTS = ${JSON.stringify(products,null,2)};
const RIVAAZ_SETTINGS = {
  storeName:"Rivaaz Royal Ethnic Wear",
  tagline:"India's Premium Wholesale Women's Ethnic Hub",
  whatsappNumber:"917575841119",
  currency:"₹",
  address:"YAMUNA CHOWK, Gf, Kiran Mall, B/s Rangila Park, Mota Varachha, Surat, Gujarat 394101",
  phone:"+91 75758 41119",
  email:"dipakvala333@gmail.com",
  workingHours:"Mon - Sat: 10:00 AM - 8:00 PM (Sunday Closed)"
};
const RIVAAZ_CONFIG=RIVAAZ_SETTINGS;
function getProductById(id){if(!id)return null;const c=id.toString().trim().toLowerCase();return RIVAAZ_PRODUCTS.find(p=>p.id.toLowerCase()===c||p.code.toLowerCase()===c)||null;}
function getProductsByCategory(s){if(!s||s==='ALL')return RIVAAZ_PRODUCTS;const t=s.toLowerCase().replace(/[-\\s_]/g,'');return RIVAAZ_PRODUCTS.filter(p=>(p.category||'').toLowerCase().replace(/[-\\s_]/g,'')=== t||(p.categorySlug||'').toLowerCase().replace(/[-\\s_]/g,'')=== t);}
function getProductsByBrand(c){if(!c||c==='ALL')return RIVAAZ_PRODUCTS;return RIVAAZ_PRODUCTS.filter(p=>p.brand.toLowerCase()===c.toLowerCase());}
function getFeaturedProducts(n=12){return RIVAAZ_PRODUCTS.filter(p=>p.featured).slice(0,n);}
function getNewArrivals(n=12){return RIVAAZ_PRODUCTS.slice(0,n);}
function searchProducts(q){if(!q)return RIVAAZ_PRODUCTS;const s=q.toLowerCase().trim();return RIVAAZ_PRODUCTS.filter(p=>(p.title||'').toLowerCase().includes(s)||(p.code||'').toLowerCase().includes(s)||(p.category||'').toLowerCase().includes(s)||(p.brandName||'').toLowerCase().includes(s)||(p.fabric||'').toLowerCase().includes(s));}
if(typeof module!=='undefined'&&module.exports){module.exports={RIVAAZ_CATEGORIES,RIVAAZ_BRANDS,RIVAAZ_SUBCATEGORIES,RIVAAZ_PRODUCTS,RIVAAZ_SETTINGS,RIVAAZ_CONFIG,getProductById,getProductsByCategory,getProductsByBrand,getFeaturedProducts,getNewArrivals,searchProducts};}
`;

const dir=path.join(rootDir,'assets/js');
if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
fs.writeFileSync(path.join(dir,'products.js'),js,'utf8');
console.log('\n[OK] assets/js/products.js written!');
