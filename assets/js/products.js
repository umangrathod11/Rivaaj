// Rivaaz Royal Ethnic Wear - Product Catalog Database
const RIVAAZ_PRODUCTS = [
  // --- 3 PIECE KURTI ROUND ---
  {
    id: "3pis-2750",
    name: "Designer Embroidered 3-Piece Kurti Round Set",
    category: "3 PIS KURTI ROUND",
    categoryLabel: "3-Piece Kurti Round",
    price: 2750,
    mrp: 4500,
    tag: "HOT SELLING",
    isTrending: true,
    isMostLoved: true,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Pure Chanderi Silk with Heavy Handwork & Organza Dupatta",
    colors: ["Wine Red", "Royal Navy", "Emerald Green"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "3 PIS KURTI ROUND/2750 (1).JPG",
    images: [
      "3 PIS KURTI ROUND/2750 (1).JPG",
      "3 PIS KURTI ROUND/2750 (2).JPG"
    ],
    description: "Premium heavy embroidered Anarkali round flare 3-piece set with intricately crafted neckline, matched pant, and designer dupatta. Ideal for boutique wedding & festive collections."
  },
  {
    id: "3pis-2999",
    name: "Royal Festive Flare 3-Piece Kurti Set",
    category: "3 PIS KURTI ROUND",
    categoryLabel: "3-Piece Kurti Round",
    price: 2999,
    mrp: 4999,
    tag: "EXCLUSIVE",
    isTrending: true,
    isMostLoved: true,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Premium Georgette Silk with Zari & Sequins",
    colors: ["Deep Maroon", "Teal Blue"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "3 PIS KURTI ROUND/2999 (1).JPG",
    images: [
      "3 PIS KURTI ROUND/2999 (1).JPG",
      "3 PIS KURTI ROUND/2999 (2).JPG"
    ],
    description: "Opulent festive 3-piece flare kurti set featuring heavy gold thread embroidery, comfortable inner lining, silk pant, and contrast heavy border dupatta."
  },
  {
    id: "3pis-chanderi-2299",
    name: "Pure Mal Chanderi Designer 3-Piece Set",
    category: "3 PIS KURTI ROUND",
    categoryLabel: "3-Piece Kurti Round",
    subCategory: "MALL CHANDERI",
    price: 2299,
    mrp: 3899,
    tag: "TRENDING",
    isTrending: true,
    isMostLoved: true,
    moq: "Set of 6 Pcs (Full Catalog / Assorted Colors)",
    fabric: "Pure Mal Chanderi with Digital Print & Gotta Patti Work",
    colors: ["Pastel Mustard", "Sage Green", "Rose Pink", "Sky Blue"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44", "3XL-46"],
    mainImage: "3 PIS KURTI ROUND/MALL CHANDERI  2299 (1).jpeg",
    images: [
      "3 PIS KURTI ROUND/MALL CHANDERI  2299 (1).jpeg",
      "3 PIS KURTI ROUND/MALL CHANDERI  2299 (2).jpeg",
      "3 PIS KURTI ROUND/MALL CHANDERI  2299 (3).jpeg",
      "3 PIS KURTI ROUND/MALL CHANDERI  2299 (4).jpeg",
      "3 PIS KURTI ROUND/MALL CHANDERI  2299 (5).jpeg",
      "3 PIS KURTI ROUND/MALL CHANDERI  2299 (6).jpeg"
    ],
    description: "Exquisite pure Mal Chanderi round silhouette with soft luxury touch, paired with matching pants and all-over printed Chanderi dupatta."
  },
  {
    id: "3pis-cottan-1750",
    name: "Pure 60/60 Cotton Handwork 3-Piece Set",
    category: "3 PIS KURTI ROUND",
    categoryLabel: "3-Piece Kurti Round",
    subCategory: "COTTAN",
    price: 1750,
    mrp: 2950,
    tag: "BESTSELLER",
    isTrending: false,
    isMostLoved: true,
    moq: "Set of 4 Pcs (M to XXL)",
    fabric: "100% Premium Pure 60/60 Cotton with Thread Embroidery",
    colors: ["Indigo Blue", "Rani Pink", "Mustard Yellow", "Olive Green"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "3 PIS KURTI ROUND/COTTAN/1750 (1).JPG",
    images: [
      "3 PIS KURTI ROUND/COTTAN/1750 (1).JPG",
      "3 PIS KURTI ROUND/COTTAN/1750 (2).JPG",
      "3 PIS KURTI ROUND/COTTAN/1750 (3).JPG",
      "3 PIS KURTI ROUND/COTTAN/1750 (4).JPG"
    ],
    description: "Breathable, skin-friendly pure cotton 3-piece set with intricate neckline embroidery, cotton pants with side pocket, and full 2.5m cotton malmal dupatta."
  },
  {
    id: "3pis-cottan-2099",
    name: "Artisanal Block Print Cotton 3-Piece Round Set",
    category: "3 PIS KURTI ROUND",
    categoryLabel: "3-Piece Kurti Round",
    subCategory: "COTTAN",
    price: 2099,
    mrp: 3499,
    tag: "NEW",
    isTrending: true,
    isMostLoved: false,
    moq: "Set of 4 Pcs (M to XXL)",
    fabric: "Pure Cotton Mulmul with Sanganeri Handblock Print",
    colors: ["Beige & Rust", "Powder Blue"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "3 PIS KURTI ROUND/COTTAN/2099.jpeg",
    images: [
      "3 PIS KURTI ROUND/COTTAN/2099.jpeg"
    ],
    description: "Graceful artisanal block-printed 3-piece kurti set designed for supreme comfort, elegance, and high retail turnover for ethnic boutiques."
  },

  // --- CORD SETS ---
  {
    id: "cord-1099",
    name: "Contemporary Printed Fusion Co-ord Set",
    category: "CORD SET",
    categoryLabel: "Co-ord Sets",
    price: 1099,
    mrp: 2199,
    tag: "HOT SELLING",
    isTrending: true,
    isMostLoved: true,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Premium Rayon Twill with Digital Graphic Print",
    colors: ["Emerald Leaf", "Midnight Black", "Sunset Ochre"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "CORD SET/1099 (1).PNG",
    images: [
      "CORD SET/1099 (1).PNG",
      "CORD SET/1099 (2).PNG",
      "CORD SET/1099 (3).PNG",
      "CORD SET/1099.JPG"
    ],
    description: "Trendy western-ethnic fusion 2-piece co-ord set with button-down stylish tunic and wide-leg matching trousers. Fast moving summer hit."
  },
  {
    id: "cord-1299",
    name: "Luxury Silk-Blend Embroidered Co-ord Set",
    category: "CORD SET",
    categoryLabel: "Co-ord Sets",
    price: 1299,
    mrp: 2499,
    tag: "TRENDING",
    isTrending: true,
    isMostLoved: true,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Heavy Modal Silk with Threadwork & Fancy Collar",
    colors: ["Teal Green", "Mauve Purple", "Warm Taupe"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "CORD SET/1299 (1).JPG",
    images: [
      "CORD SET/1299 (1).JPG",
      "CORD SET/1299 (2).JPG",
      "CORD SET/1299.JPG"
    ],
    description: "Chic festive co-ord set styled with delicate threadwork on the neckline and sleeves, paired with tailored relaxed fit pants."
  },
  {
    id: "cord-1750",
    name: "Celebrity Style Festive Partywear Co-ord Set",
    category: "CORD SET",
    categoryLabel: "Co-ord Sets",
    price: 1750,
    mrp: 3250,
    tag: "EXCLUSIVE",
    isTrending: true,
    isMostLoved: false,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Jacquard Silk with Heavy Yoke & Designer Cut",
    colors: ["Royal Blue", "Magenta"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "CORD SET/1750 (1).JPG",
    images: [
      "CORD SET/1750 (1).JPG",
      "CORD SET/1750 (2).JPG"
    ],
    description: "Glamorous cocktail and evening wear co-ord set with hand-embellished mirror and zari highlights."
  },
  {
    id: "cord-1899",
    name: "Imperial Rich Handcrafted Co-ord Set",
    category: "CORD SET",
    categoryLabel: "Co-ord Sets",
    price: 1899,
    mrp: 3599,
    tag: "PREMIUM",
    isTrending: false,
    isMostLoved: true,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Pure Chanderi Silk with Cutdana & Pearl Work",
    colors: ["Ivory Gold", "Ruby Red"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "CORD SET/1899 (1).JPG",
    images: [
      "CORD SET/1899 (1).JPG",
      "CORD SET/1899 (2).JPG"
    ],
    description: "High-end boutique piece crafted with premium silk fabric and delicate pearl accents for an elevated royal statement."
  },

  // --- ONE PIECE GOWNS ---
  {
    id: "onepis-1100",
    name: "Flared Royal One-Piece Ethnic Gown / Maxi",
    category: "ONE PIS",
    categoryLabel: "One Piece / Gowns",
    price: 1100,
    mrp: 2200,
    tag: "BESTSELLER",
    isTrending: true,
    isMostLoved: true,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Pure Heavy Cotton Georgette with Tiered Flare",
    colors: ["Forest Green", "Dusty Rose", "Peacock Blue"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "ONE PIS/1100 (1).JPG",
    images: [
      "ONE PIS/1100 (1).JPG",
      "ONE PIS/1100 (2).JPG",
      "ONE PIS/1100 (3).JPG"
    ],
    description: "Stunning full-length ethnic maxi gown featuring sweeping flare, comfortable waist gathering, and designer front yoke detailing."
  },

  // --- SHORT SHARARA ---
  {
    id: "sharara-2250",
    name: "Royal Peplum Short Kurti Sharara Set",
    category: "SHORT SARARA",
    categoryLabel: "Short Sharara Sets",
    price: 2250,
    mrp: 4200,
    tag: "HOT SELLING",
    isTrending: true,
    isMostLoved: true,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Heavy Chinon Silk with Zari Embroidery & Multi-Layer Sharara",
    colors: ["Gulabi Pink", "Mustard Yellow", "Mint Green"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "SHORT SARARA/2250.JPG",
    images: [
      "SHORT SARARA/2250.JPG"
    ],
    description: "Traditional yet contemporary short peplum style kurti with voluminous flared sharara and sheer embroidered dupatta. A wedding-season favorite."
  },

  // --- STRAIGHT / STET SUITS ---
  {
    id: "stet-cottan-1250",
    name: "Office & Daily Wear Straight Cotton Suit Set",
    category: "STET",
    categoryLabel: "Straight / Stet Sets",
    subCategory: "COTTAN",
    price: 1250,
    mrp: 2450,
    tag: "BESTSELLER",
    isTrending: true,
    isMostLoved: true,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Pure Combed Cotton with Thread Work & Malmal Dupatta",
    colors: ["Sky Blue", "Pastel Peach", "Soft Mint", "Lilac"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "STET/COTTAN/2026_06_26_11_48_IMG_0899.JPG",
    images: [
      "STET/COTTAN/2026_06_26_11_48_IMG_0899.JPG",
      "STET/COTTAN/2026_06_26_11_49_IMG_0903.JPG",
      "STET/COTTAN/2026_06_26_11_49_IMG_0904.JPG",
      "STET/COTTAN/2026_06_26_12_08_IMG_0816.JPG",
      "STET/COTTAN/2026_09_10_11_09_34_IMG_1167.JPG",
      "STET/COTTAN/2026_09_10_11_09_34_IMG_1168.JPG"
    ],
    description: "Classic straight-cut 3-piece cotton suit with refined computer embroidery, straight pants, and lightweight printed malmal dupatta. Essential for every boutique inventory."
  },
  {
    id: "stet-ziraf-1450",
    name: "Ziraf Jacquard Textured Straight Suit Set",
    category: "STET",
    categoryLabel: "Straight / Stet Sets",
    subCategory: "ZIRAF",
    price: 1450,
    mrp: 2799,
    tag: "NEW",
    isTrending: true,
    isMostLoved: false,
    moq: "Set of 4 Pcs (M, L, XL, XXL)",
    fabric: "Jacquard Weave Silk Cotton with Zari Lace Border",
    colors: ["Ivory Cream", "Almond Gold"],
    sizes: ["M-38", "L-40", "XL-42", "XXL-44"],
    mainImage: "STET/ZIRAF/2026_09_10_11_09_36_IMG_1166.JPG",
    images: [
      "STET/ZIRAF/2026_09_10_11_09_36_IMG_1166.JPG",
      "STET/ZIRAF/2026_09_10_11_09_37_IMG_1165.JPG"
    ],
    description: "Textured Ziraf woven straight cut salwar suit set featuring elegant lace detailing, contrast trousers, and fancy jacquard dupatta."
  }
];

// Category List with Meta Information
const RIVAAZ_CATEGORIES = [
  {
    id: "ALL",
    name: "All Categories",
    count: RIVAAZ_PRODUCTS.length,
    icon: "fa-gem"
  },
  {
    id: "3 PIS KURTI ROUND",
    name: "3-Piece Kurti Round",
    tagline: "Anarkalis & 3-Piece Flare Sets",
    image: "3 PIS KURTI ROUND/2750 (1).JPG",
    count: 5,
    icon: "fa-vest-patches"
  },
  {
    id: "CORD SET",
    name: "Co-ord Sets",
    tagline: "Western-Ethnic Fusion 2-Piece Sets",
    image: "CORD SET/1099 (1).PNG",
    count: 4,
    icon: "fa-shirt"
  },
  {
    id: "ONE PIS",
    name: "One Piece / Gowns",
    tagline: "Ethnic Flared Maxis & Long Gowns",
    image: "ONE PIS/1100 (1).JPG",
    count: 1,
    icon: "fa-person-dress"
  },
  {
    id: "SHORT SARARA",
    name: "Short Sharara Sets",
    tagline: "Peplum Kurtis with Tiered Sharara",
    image: "SHORT SARARA/2250.JPG",
    count: 1,
    icon: "fa-wand-magic-sparkles"
  },
  {
    id: "STET",
    name: "Straight / Stet Sets",
    tagline: "Cotton & Jacquard Straight Cut Suits",
    image: "STET/COTTAN/2026_06_26_11_48_IMG_0899.JPG",
    count: 2,
    icon: "fa-lines-leaning"
  }
];

// Wholesale Business Configuration
const RIVAAZ_CONFIG = {
  brandName: "Rivaaz Royal Ethnic Wear",
  tagline: "Elegance In Every Thread",
  phone: "+91 98765 43210",
  whatsappNumber: "919876543210",
  whatsappDisplay: "+91 98765 43210",
  email: "support@rivaaz.in",
  salesEmail: "wholesale@rivaaz.in",
  address: "123, Heritage Plaza, MG Road, Surat, Gujarat - 395003",
  workingHours: "Mon - Sat: 10:00 AM - 7:00 PM (Sunday Closed)",
  gstRate: 0.05,
  minOrderQuantity: "1 Set (4 Pcs)",
  currency: "₹"
};
