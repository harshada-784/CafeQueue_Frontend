// Simple in-memory cart store
export type CartItem = {
  shopName: string;
  itemId: number;
  name: string;
  price: number;
  qty: number;
  imageUri?: string;
};

let cart: CartItem[] = [];
const listeners = new Set<() => void>();

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  listeners.forEach(l => l());
}

export function getCart(): CartItem[] {
  return cart.map(c => ({ ...c }));
}

export function getCount(): number {
  return cart.reduce((n, c) => n + c.qty, 0);
}

export function getTotal(): number {
  return cart.reduce((sum, c) => sum + c.qty * c.price, 0);
}

export function clearCart() {
  cart = [];
  notify();
}

export function addToCart(shopName: string, itemId: number, name: string, price: number, imageUri?: string): boolean {
  const existingShop = cart[0]?.shopName;
  if (existingShop && existingShop !== shopName) {
    console.warn('You can only add items from one shop at a time.');
    return false;
  }
  const idx = cart.findIndex(c => c.shopName === shopName && c.itemId === itemId);
  if (idx >= 0) {
    cart[idx] = { ...cart[idx], qty: cart[idx].qty + 1 };
  } else {
    cart = [...cart, { shopName, itemId, name, price, qty: 1, imageUri }];
  }
  notify();
  return true;
}

export function inc(itemId: number, shopName: string) {
  const idx = cart.findIndex(c => c.shopName === shopName && c.itemId === itemId);
  if (idx >= 0) {
    cart[idx] = { ...cart[idx], qty: cart[idx].qty + 1 };
    notify();
  }
}

export function dec(itemId: number, shopName: string) {
  const idx = cart.findIndex(c => c.shopName === shopName && c.itemId === itemId);
  if (idx >= 0) {
    const nextQty = cart[idx].qty - 1;
    if (nextQty <= 0) cart = cart.filter((_, i) => i !== idx);
    else cart[idx] = { ...cart[idx], qty: nextQty };
    notify();
  }
}
