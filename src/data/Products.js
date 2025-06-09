export const products = [
  {
    id: 1,
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    category: 'Clothing',
    rating: 4,
    reviewCount: 24,
    image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    isNew: true,
    isBestSeller: true,
    description: 'Made from 100% certified organic cotton, chemical-free dyes',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2tCmmHc-dQAVY8IiSBMFdOgqkQkPFdAFHVQ&s',
    partnerName: 'EcoWear',
    details: [
      '100% organic cotton',
      'Chemical-free dyes',
      'Machine washable',
      'Available in multiple sizes'
    ],
    stock: 100
  },
  {
    id: 2,
    name: 'Bamboo Toothbrush Set',
    price: 12.99,
    category: 'Personal Care',
    rating: 5,
    reviewCount: 56,
    image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    isBestSeller: true,
    description: 'Biodegradable bamboo handles with charcoal-infused bristles',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS7z6saQzYqJd2qy1R17cDCCGVyW61YVa1Dg&s',
    partnerName: 'GreenSmile',
    details: [
      'Set of 4 toothbrushes',
      'Biodegradable bamboo handles',
      'Charcoal-infused bristles',
      'Eco-friendly packaging'
    ],
    stock: 200
  },
  {
    id: 3,
    name: 'Reusable Stainless Steel Bottle',
    price: 24.99,
    category: 'Home',
    rating: 4,
    reviewCount: 32,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    description: 'Double-walled insulation keeps drinks cold for 24 hours',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRfJKs4lcOFHlo-_hX3txP4FkT4CD7yiQFxg&s',
    partnerName: 'HydroEco',
    details: [
      'Double-walled stainless steel',
      '24-hour cold retention',
      'BPA-free',
      'Leak-proof cap'
    ],
    stock: 150
  },
  {
    id: 4,
    name: 'Organic Lavender Soap',
    price: 8.99,
    category: 'Personal Care',
    rating: 5,
    reviewCount: 18,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    isNew: true,
    description: 'Handmade with organic lavender essential oils',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ2FWwPP7DfbShs4mpgPGVuThe7xAJERTxUQ&s',
    partnerName: 'NatureScent',
    details: [
      'Organic lavender oil',
      'Handmade in small batches',
      'Vegan and cruelty-free',
      'Biodegradable packaging'
    ],
    stock: 300
  },
  {
    id: 5,
    name: 'Hemp Shopping Bag',
    price: 15.99,
    category: 'Accessories',
    rating: 4,
    reviewCount: 42,
    image: 'https://hempgogreen.com/wp-content/uploads/HGG1002-Go-Green-Zippered-Tote-Bag-WC-1-768x768.jpg',
    description: 'Durable 100% hemp fiber with reinforced stitching',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn=9GcRS7z6saQzYqJd2qy1R17cDCCGVyW61YVa1Dg&s',
    partnerName: 'HempHaven',
    details: [
      '100% hemp fiber',
      'Reinforced stitching',
      'Machine washable',
      'Foldable design'
    ],
    stock: 120
  },
  {
    id: 6,
    name: 'Organic Quinoa',
    price: 6.99,
    category: 'Food',
    rating: 5,
    reviewCount: 89,
    image: 'https://biobasics.org/cdn/shop/files/buy-organic-quinoa-pseudo-grain-online-at-bio-basics-store-now.png?v=1739516226&width=1000',
    isBestSeller: true,
    description: 'Fair-trade certified organic quinoa, 1kg package',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn=9GcQRfJKs4lcOFHlo-_hX3txP4FkT4CD7yiQFxg&s',
    partnerName: 'FairHarvest',
    details: [
      'Fair-trade certified',
      '1kg package',
      'Non-GMO',
      'Gluten-free'
    ],
    stock: 500
  },
  {
    id: 7,
    name: 'Bamboo Cutting Board',
    price: 34.99,
    category: 'Home',
    rating: 4,
    reviewCount: 27,
    image: 'https://www.kitchenknifeguru.com/wp-content/uploads/2023/10/IMG_3741_ed2a_760.webp',
    description: 'Sustainable bamboo with juice groove and non-slip feet',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn=9GcSJ2FWwPP7DfbShs4mpgPGVuThe7xAJERTxUQ&s',
    partnerName: 'EcoWood',
    details: [
      'Sustainable bamboo',
      'Juice groove design',
      'Non-slip feet',
      'Easy to clean'
    ],
    stock: 80
  },
  {
    id: 8,
    name: 'Reusable Beeswax Wraps',
    price: 18.99,
    category: 'Home',
    rating: 4,
    reviewCount: 36,
    image: 'https://m.media-amazon.com/images/I/91CddgwtLQL._SX679_.jpg',
    isNew: true,
    description: 'Set of 3 organic cotton wraps coated with beeswax',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=9GcSJ2FWwPP7DfbShs4mpgPGVuThe7xAJERTxUQ&s',
    partnerName: 'BeeGreen',
    details: [
      'Set of 3 wraps',
      'Organic cotton and beeswax',
      'Reusable and washable',
      'Biodegradable'
    ],
    stock: 250
  },
  {
    id: 9,
    name: 'Eco-Friendly Notebook',
    price: 9.99,
    category: 'Accessories',
    rating: 4,
    reviewCount: 15,
    image: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    isNew: true,
    description: 'Recycled paper notebook with biodegradable cover',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=9GcRS7z6saQzYqJd2qy1R17cDCCGVyW61YVa1Dg&s',
    partnerName: 'GreenPages',
    details: [
      '100% recycled paper',
      'Biodegradable cover',
      '80 pages',
      'Spiral-bound'
    ],
    stock: 400
  },
  {
    id: 10,
    name: 'Organic Coffee Beans',
    price: 14.99,
    category: 'Food',
    rating: 5,
    reviewCount: 63,
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c312?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    isBestSeller: true,
    description: 'Fair-trade organic coffee beans, 500g package',
    partnerLogo: 'https://encrypted-tbn0.gstatic.com/images?q=9GcQRfJKs4lcOFHlo-_hX3txP4FkT4CD7yiQFxg&s',
    partnerName: 'FairBrew',
    details: [
      'Fair-trade certified',
      '500g package',
      'Medium roast',
      'Organic'
    ],
    stock: 600
  }
];