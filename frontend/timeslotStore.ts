// Timeslot Management Store for CafeQueue
export interface Timeslot {
  id: string;
  startTime: string; // e.g., "09:00"
  endTime: string; // e.g., "09:30"
  maxOrders: number; // e.g., 10
  currentOrders: number; // e.g., 7
  isActive: boolean;
  shopName: string;
}

export interface ShopTimeslots {
  shopName: string;
  timeslots: Timeslot[];
}

// Sample timeslots for shops
const sampleTimeslots: Record<string, ShopTimeslots> = {
  'Bharti Cafe': {
    shopName: 'Bharti Cafe',
    timeslots: [
      {
        id: 'slot_1',
        startTime: '09:00',
        endTime: '09:30',
        maxOrders: 10,
        currentOrders: 7,
        isActive: true,
        shopName: 'Bharti Cafe'
      },
      {
        id: 'slot_2',
        startTime: '09:30',
        endTime: '10:00',
        maxOrders: 10,
        currentOrders: 3,
        isActive: true,
        shopName: 'Bharti Cafe'
      },
      {
        id: 'slot_3',
        startTime: '10:00',
        endTime: '10:30',
        maxOrders: 10,
        currentOrders: 0,
        isActive: true,
        shopName: 'Bharti Cafe'
      },
      {
        id: 'slot_4',
        startTime: '10:30',
        endTime: '11:00',
        maxOrders: 10,
        currentOrders: 0,
        isActive: true,
        shopName: 'Bharti Cafe'
      }
    ]
  },
  'Dosa Cafeteria': {
    shopName: 'Dosa Cafeteria',
    timeslots: [
      {
        id: 'slot_1',
        startTime: '08:30',
        endTime: '09:00',
        maxOrders: 8,
        currentOrders: 5,
        isActive: true,
        shopName: 'Dosa Cafeteria'
      },
      {
        id: 'slot_2',
        startTime: '09:00',
        endTime: '09:30',
        maxOrders: 8,
        currentOrders: 2,
        isActive: true,
        shopName: 'Dosa Cafeteria'
      }
    ]
  },
  'Milkshake Centre': {
    shopName: 'Milkshake Centre',
    timeslots: [
      {
        id: 'slot_1',
        startTime: '10:00',
        endTime: '10:30',
        maxOrders: 12,
        currentOrders: 8,
        isActive: true,
        shopName: 'Milkshake Centre'
      },
      {
        id: 'slot_2',
        startTime: '10:30',
        endTime: '11:00',
        maxOrders: 12,
        currentOrders: 1,
        isActive: true,
        shopName: 'Milkshake Centre'
      }
    ]
  },
  'Simran Sandwiches': {
    shopName: 'Simran Sandwiches',
    timeslots: [
      {
        id: 'slot_1',
        startTime: '11:00',
        endTime: '11:30',
        maxOrders: 15,
        currentOrders: 10,
        isActive: true,
        shopName: 'Simran Sandwiches'
      }
    ]
  },
  'Campus Biryani': {
    shopName: 'Campus Biryani',
    timeslots: [
      {
        id: 'slot_1',
        startTime: '12:00',
        endTime: '12:30',
        maxOrders: 20,
        currentOrders: 15,
        isActive: true,
        shopName: 'Campus Biryani'
      }
    ]
  },
  'Green Bowl': {
    shopName: 'Green Bowl',
    timeslots: [
      {
        id: 'slot_1',
        startTime: '09:00',
        endTime: '09:30',
        maxOrders: 6,
        currentOrders: 4,
        isActive: true,
        shopName: 'Green Bowl'
      }
    ]
  },
  'Artisan Wraps': {
    shopName: 'Artisan Wraps',
    timeslots: [
      {
        id: 'slot_1',
        startTime: '08:00',
        endTime: '08:30',
        maxOrders: 8,
        currentOrders: 6,
        isActive: true,
        shopName: 'Artisan Wraps'
      }
    ]
  }
};

// Get timeslots for a specific shop
export function getTimeslotsForShop(shopName: string): Timeslot[] {
  const shopData = sampleTimeslots[shopName];
  return shopData ? shopData.timeslots : [];
}

// Get current active timeslot for a shop
export function getCurrentTimeslot(shopName: string): Timeslot | null {
  const timeslots = getTimeslotsForShop(shopName);
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  return timeslots.find(slot => {
    return slot.isActive && currentTime >= slot.startTime && currentTime < slot.endTime;
  }) || null;
}

// Get next available timeslot
export function getNextAvailableTimeslot(shopName: string): Timeslot | null {
  const timeslots = getTimeslotsForShop(shopName);
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  return timeslots.find(slot => {
    return slot.isActive && slot.currentOrders < slot.maxOrders && currentTime < slot.startTime;
  }) || null;
}

// Add order to timeslot
export function addOrderToTimeslot(shopName: string, timeslotId: string): boolean {
  const shopData = sampleTimeslots[shopName];
  if (!shopData) return false;
  
  const timeslot = shopData.timeslots.find(slot => slot.id === timeslotId);
  if (!timeslot || timeslot.currentOrders >= timeslot.maxOrders) return false;
  
  timeslot.currentOrders++;
  return true;
}

// Remove order from timeslot
export function removeOrderFromTimeslot(shopName: string, timeslotId: string): boolean {
  const shopData = sampleTimeslots[shopName];
  if (!shopData) return false;
  
  const timeslot = shopData.timeslots.find(slot => slot.id === timeslotId);
  if (!timeslot || timeslot.currentOrders <= 0) return false;
  
  timeslot.currentOrders--;
  return true;
}

// Update timeslot configuration (for shop admin)
export function updateTimeslotConfig(shopName: string, timeslotId: string, updates: Partial<Timeslot>): boolean {
  const shopData = sampleTimeslots[shopName];
  if (!shopData) return false;
  
  const timeslotIndex = shopData.timeslots.findIndex(slot => slot.id === timeslotId);
  if (timeslotIndex === -1) return false;
  
  shopData.timeslots[timeslotIndex] = { ...shopData.timeslots[timeslotIndex], ...updates };
  return true;
}

// Add new timeslot
export function addTimeslot(shopName: string, timeslot: Omit<Timeslot, 'id'>): boolean {
  const shopData = sampleTimeslots[shopName];
  if (!shopData) {
    sampleTimeslots[shopName] = { shopName, timeslots: [] };
  }
  
  const newTimeslot: Timeslot = {
    ...timeslot,
    id: `slot_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  
  sampleTimeslots[shopName].timeslots.push(newTimeslot);
  return true;
}

// Delete timeslot
export function deleteTimeslot(shopName: string, timeslotId: string): boolean {
  const shopData = sampleTimeslots[shopName];
  if (!shopData) return false;
  
  shopData.timeslots = shopData.timeslots.filter(slot => slot.id !== timeslotId);
  return true;
}

// Get all shops with timeslots (for college admin)
export function getAllShopTimeslots(): ShopTimeslots[] {
  return Object.values(sampleTimeslots);
}

// Calculate remaining slots
export function getRemainingSlots(timeslot: Timeslot): number {
  return Math.max(0, timeslot.maxOrders - timeslot.currentOrders);
}

// Calculate time remaining until next timeslot
export function getTimeUntilNextTimeslot(shopName: string): string {
  const nextSlot = getNextAvailableTimeslot(shopName);
  if (!nextSlot) return 'No upcoming slots';
  
  const now = new Date();
  const [hours, minutes] = nextSlot.startTime.split(':').map(Number);
  const slotTime = new Date();
  slotTime.setHours(hours, minutes, 0, 0);
  
  const diffMs = slotTime.getTime() - now.getTime();
  if (diffMs <= 0) return 'Starting soon';
  
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const remainingMins = diffMins % 60;
  
  if (diffHours > 0) {
    return `${diffHours}h ${remainingMins}m remaining`;
  }
  return `${remainingMins} mins remaining`;
}
