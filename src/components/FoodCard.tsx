
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from '@/context/CartContext';
import type { MenuItem } from '@/hooks/useMenu';

interface FoodCardProps {
  item: MenuItem;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity,
      image: item.image,
      category: item.category,
      customizations: selectedCustomizations
    });
    
    // Reset after adding to cart
    setQuantity(1);
    setSelectedCustomizations([]);
  };
  
  const toggleCustomization = (optionId: string) => {
    setSelectedCustomizations(prev => 
      prev.includes(optionId)
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };
  
  const cardVariants = {
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)"
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all"
      variants={cardVariants}
      whileHover="hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="relative h-48 overflow-hidden">
        <motion.img 
          src={item.image} 
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          whileHover={{ scale: 1.05 }}
        />
        {item.isSpecial && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-primary text-primary-foreground">
              Special
            </Badge>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg text-left">{item.name}</h3>
          <span className="font-semibold">₹{item.price}</span>
        </div>
        
        <p className="text-muted-foreground text-sm mb-4 text-left line-clamp-2">
          {item.description}
        </p>
        
        {item.customizationOptions && item.customizationOptions.length > 0 && (
          <div className="mb-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full justify-between mb-2 text-xs"
            >
              {isExpanded ? "Hide options" : "Customize"} {isExpanded ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            </Button>
            
            {isExpanded && (
              <div className="space-y-2 text-sm">
                {item.customizationOptions.map(option => (
                  <div key={option.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`${item.id}-${option.id}`}
                        checked={selectedCustomizations.includes(option.id)}
                        onChange={() => toggleCustomization(option.id)}
                        className="rounded text-primary focus:ring-primary"
                      />
                      <label htmlFor={`${item.id}-${option.id}`} className="text-xs">
                        {option.name}
                      </label>
                    </div>
                    <span className="text-xs">+₹{option.priceAdd}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-l-md"
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-r-md"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            size="sm" 
            className="px-3"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
