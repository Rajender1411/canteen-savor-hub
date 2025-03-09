
import { useState, useEffect } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isSpecial?: boolean;
  customizationOptions?: {
    id: string;
    name: string;
    priceAdd: number;
  }[];
}

export type MenuCategory = 
  | 'tiffin' 
  | 'fast-food' 
  | 'snacks' 
  | 'meals' 
  | 'beverages' 
  | 'desserts';

// Mock menu data
const mockMenuItems: MenuItem[] = [
  {
    id: 'tiffin-1',
    name: 'Masala Dosa',
    description: 'Crispy rice crepe filled with spiced potato, served with sambar and chutney',
    price: 60,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=500',
    category: 'tiffin',
    isSpecial: true
  },
  {
    id: 'tiffin-2',
    name: 'Idli Sambar',
    description: 'Steamed rice cakes served with lentil soup and coconut chutney',
    price: 40,
    image: 'https://images.unsplash.com/photo-1589301761270-da3cab0d887c?q=80&w=500',
    category: 'tiffin'
  },
  {
    id: 'tiffin-3',
    name: 'Pongal',
    description: 'Traditional South Indian rice and lentil porridge with ghee',
    price: 50,
    image: 'https://images.unsplash.com/photo-1605196560327-31c4f1194d91?q=80&w=500',
    category: 'tiffin'
  },
  {
    id: 'fast-food-1',
    name: 'Veg Burger',
    description: 'Garden-fresh vegetable patty with lettuce, tomato, and special sauce',
    price: 70,
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=500',
    category: 'fast-food',
    customizationOptions: [
      { id: 'cheese', name: 'Extra Cheese', priceAdd: 15 },
      { id: 'patty', name: 'Double Patty', priceAdd: 30 }
    ]
  },
  {
    id: 'fast-food-2',
    name: 'Cheese Pizza',
    description: 'Hand-stretched crust with signature sauce and mozzarella cheese',
    price: 120,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=500',
    category: 'fast-food',
    isSpecial: true,
    customizationOptions: [
      { id: 'cheese', name: 'Extra Cheese', priceAdd: 25 },
      { id: 'veg', name: 'Extra Vegetables', priceAdd: 20 }
    ]
  },
  {
    id: 'snacks-1',
    name: 'Samosa',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 20,
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?q=80&w=500',
    category: 'snacks'
  },
  {
    id: 'snacks-2',
    name: 'Veg Puff',
    description: 'Flaky pastry filled with spiced mixed vegetables',
    price: 25,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=500',
    category: 'snacks'
  },
  {
    id: 'meals-1',
    name: 'Veg Thali',
    description: 'Complete meal with rice, dal, vegetables, roti, and dessert',
    price: 120,
    image: 'https://images.unsplash.com/photo-1626778668571-8a4134ab0628?q=80&w=500',
    category: 'meals',
    isSpecial: true
  },
  {
    id: 'meals-2',
    name: 'Veg Biryani',
    description: 'Fragrant rice cooked with mixed vegetables and aromatic spices',
    price: 100,
    image: 'https://images.unsplash.com/photo-1589916047639-06004efe271e?q=80&w=500',
    category: 'meals'
  },
  {
    id: 'beverages-1',
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea with milk',
    price: 20,
    image: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=500',
    category: 'beverages'
  },
  {
    id: 'beverages-2',
    name: 'Cold Coffee',
    description: 'Chilled coffee blend topped with cream',
    price: 60,
    image: 'https://images.unsplash.com/photo-1578314675229-995406e7c8cf?q=80&w=500',
    category: 'beverages',
    customizationOptions: [
      { id: 'ice-cream', name: 'Add Ice Cream', priceAdd: 20 }
    ]
  },
  {
    id: 'desserts-1',
    name: 'Gulab Jamun',
    description: 'Sweet milk solid dumplings soaked in sugar syrup',
    price: 40,
    image: 'https://images.unsplash.com/photo-1611293388250-580b08c4a145?q=80&w=500',
    category: 'desserts'
  },
  {
    id: 'desserts-2',
    name: 'Chocolate Brownie',
    description: 'Rich chocolate brownie with nuts, served with ice cream',
    price: 80,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=500',
    category: 'desserts',
    isSpecial: true
  }
];

export const useMenu = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call delay
    const fetchMenuItems = async () => {
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setMenuItems(mockMenuItems);
        setLoading(false);
      } catch (err) {
        setError('Failed to load menu items');
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const getItemsByCategory = (category: string) => {
    return menuItems.filter(item => item.category === category);
  };

  const getSpecialItems = () => {
    return menuItems.filter(item => item.isSpecial);
  };

  const getItemById = (id: string) => {
    return menuItems.find(item => item.id === id);
  };

  return {
    menuItems,
    loading,
    error,
    getItemsByCategory,
    getSpecialItems,
    getItemById
  };
};
