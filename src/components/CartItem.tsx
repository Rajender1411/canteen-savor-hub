
import React from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useCart, type CartItem } from '@/context/CartContext';

interface CartItemProps {
  item: CartItem;
  onRemove?: () => void;
  onUpdateQuantity?: (qty: number) => void;
}

export default function CartItemComponent({ item, onRemove, onUpdateQuantity }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  
  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      removeItem(item.id);
    }
  };
  
  const handleUpdateQuantity = (qty: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(qty);
    } else {
      updateQuantity(item.id, qty);
    }
  };
  
  return (
    <div className="flex items-center py-4 border-b last:border-0">
      <div className="flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-md overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex-grow">
        <h3 className="text-sm sm:text-base font-medium text-left">{item.name}</h3>
        <p className="text-sm text-muted-foreground text-left">₹{item.price} × {item.quantity}</p>
        
        {item.customizations && item.customizations.length > 0 && (
          <div className="text-xs text-muted-foreground text-left mt-1">
            {item.customizations.join(', ')}
          </div>
        )}
      </div>
      
      <div className="flex-shrink-0 flex items-center ml-2">
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-l-md"
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-center text-sm">{item.quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-r-md"
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button 
          variant="ghost"
          size="icon" 
          className="h-8 w-8 ml-2 text-destructive hover:text-destructive/90"
          onClick={handleRemove}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
