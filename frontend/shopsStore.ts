// Temporary in-memory store for shops per college. Replace with backend later.
export type Shop = {
  id: number;
  name: string;
  minPrice: number; // starting price
  imageUri?: string;
  isOpen?: boolean; // shop open/close status
};

const sampleShopsByCollege: Record<string, Shop[]> = {
  'Bharati Vidyapeeth': [
    { id: 1, name: 'Bharti Cafe', minPrice: 20, imageUri: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop', isOpen: true },
    { id: 2, name: 'Dosa Cafeteria', minPrice: 69, imageUri: 'https://images.unsplash.com/photo-1593253787226-567eda4ad32d?q=80&w=1200&auto=format&fit=crop', isOpen: false },
    { id: 3, name: 'Milkshake Centre', minPrice: 49, imageUri: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop', isOpen: true },
  ],
  'State Engineering College': [
    { id: 4, name: 'Simran Sandwiches', minPrice: 29, imageUri: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop', isOpen: true },
    { id: 5, name: 'Campus Biryani', minPrice: 79, imageUri: 'https://images.unsplash.com/photo-1604908176997-431002e04c72?q=80&w=1200&auto=format&fit=crop', isOpen: false },
  ],
  'City Science University': [
    { id: 6, name: 'Green Bowl', minPrice: 39, imageUri: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1200&auto=format&fit=crop', isOpen: true },
  ],
  'Lakeside Arts College': [
    { id: 7, name: 'Artisan Wraps', minPrice: 35, imageUri: 'https://images.unsplash.com/photo-1526312426976-593c2e615d43?q=80&w=1200&auto=format&fit=crop', isOpen: true },
  ],
};

export function getShopsForCollege(collegeName: string): Shop[] {
  // 1) Exact match
  let list = sampleShopsByCollege[collegeName];
  // 2) Fuzzy match (case-insensitive, substring)
  if (!list) {
    const target = (collegeName || '').trim().toLowerCase();
    const matchKey = Object.keys(sampleShopsByCollege).find(k => {
      const key = k.toLowerCase();
      return key.includes(target) || target.includes(key);
    });
    if (matchKey) list = sampleShopsByCollege[matchKey];
  }
  // 3) Fallback to a default set so the UI isn't empty during demos
  if (!list) list = sampleShopsByCollege['Bharati Vidyapeeth'];
  if (!list) return [];
  // clone
  return list.map(s => ({ ...s }));
}

// ---- Shop Menus (sample data) ----
export type MenuItem = {
  id: number;
  name: string;
  price: number;
  imageUri?: string;
};

const menusByShop: Record<string, MenuItem[]> = {
  'Bharti Cafe': [
    { id: 101, name: 'Vadapav', price: 20, imageUri: 'https://images.unsplash.com/photo-1617692855027-f8fe2e139fca?q=80&w=1200&auto=format&fit=crop' },
    { id: 102, name: 'Grilled Cheese Mayo Sandwich', price: 50, imageUri: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=1200&auto=format&fit=crop' },
    { id: 103, name: 'Coffee', price: 20, imageUri: 'https://images.unsplash.com/photo-1509043759401-136742328bb3?q=80&w=1200&auto=format&fit=crop' },
    { id: 104, name: 'Veg Aloo Tikki Burger', price: 79, imageUri: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?q=80&w=1200&auto=format&fit=crop' },
  ],
  'Dosa Cafeteria': [
    { id: 201, name: 'Masala Dosa', price: 69, imageUri: 'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?q=80&w=1200&auto=format&fit=crop' },
    { id: 202, name: 'Idli Sambar', price: 40, imageUri: 'https://images.unsplash.com/photo-1631452180519-5c198e2e8def?q=80&w=1200&auto=format&fit=crop' },
  ],
  'Milkshake Centre': [
    { id: 301, name: 'Chocolate Shake', price: 49, imageUri: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1200&auto=format&fit=crop' },
  ],
  'Simran Sandwiches': [
    { id: 401, name: 'Veg Sandwich', price: 29, imageUri: 'https://images.unsplash.com/photo-1565299715199-866c917206bb?q=80&w=1200&auto=format&fit=crop' },
  ],
  'Campus Biryani': [
    { id: 501, name: 'Chicken Biryani', price: 129, imageUri: 'https://images.unsplash.com/photo-1604908176997-431002e04c72?q=80&w=1200&auto=format&fit=crop' },
  ],
  'Green Bowl': [
    { id: 601, name: 'Veggie Bowl', price: 39, imageUri: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?q=80&w=1200&auto=format&fit=crop' },
  ],
  'Artisan Wraps': [
    { id: 701, name: 'Paneer Wrap', price: 35, imageUri: 'https://images.unsplash.com/photo-1526312426976-593c2e615d43?q=80&w=1200&auto=format&fit=crop' },
  ],
};

export function getMenuForShop(shopName: string): MenuItem[] {
  const exact = menusByShop[shopName];
  if (exact) return exact.map(m => ({ ...m }));
  const target = (shopName || '').trim().toLowerCase();
  const key = Object.keys(menusByShop).find(k => {
    const low = k.toLowerCase();
    return low.includes(target) || target.includes(low);
  });
  if (!key) return [];
  return menusByShop[key].map(m => ({ ...m }));
}

// Toggle shop open/close status
export function toggleShopStatus(collegeName: string, shopId: number) {
  const shops = getShopsForCollege(collegeName);
  const shop = shops.find(s => s.id === shopId);
  if (shop) {
    shop.isOpen = !shop.isOpen;
  }
}

// Update shop status
export function updateShopStatus(collegeName: string, shopId: number, isOpen: boolean) {
  const shops = getShopsForCollege(collegeName);
  const shop = shops.find(s => s.id === shopId);
  if (shop) {
    shop.isOpen = isOpen;
  }
}

// Get shop status
export function getShopStatus(collegeName: string, shopId: number): boolean {
  const shops = getShopsForCollege(collegeName);
  const shop = shops.find(s => s.id === shopId);
  return shop?.isOpen ?? true; // Default to open if not specified
}

// Placeholder to simulate registration from canteen admin later
export function registerShop(collegeName: string, shop: Omit<Shop, 'id'>) {
  const arr = sampleShopsByCollege[collegeName] || (sampleShopsByCollege[collegeName] = []);
  const nextId = Object.values(sampleShopsByCollege).flat().reduce((m, s) => Math.max(m, s.id), 0) + 1;
  arr.push({ id: nextId, ...shop });
}
