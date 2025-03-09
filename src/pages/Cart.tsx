
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CartItem from '@/components/CartItem';

const Cart = () => {
  const { items, totalPrice, totalItems, removeItem, updateQuantity } = useCart();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-screen-lg mx-auto"
          >
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <ShoppingBag className="h-8 w-8" />
                Your Cart
                {totalItems > 0 && (
                  <Badge variant="secondary" className="ml-2">{totalItems} items</Badge>
                )}
              </h1>
              <Link to="/menu">
                <Button variant="ghost" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Button>
              </Link>
            </div>
            
            {totalItems === 0 ? (
              <div className="text-center py-16 space-y-6">
                <div className="rounded-full bg-muted w-20 h-20 mx-auto flex items-center justify-center">
                  <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold">Your cart is empty</h2>
                <p className="text-muted-foreground">Looks like you haven't added any items to your cart yet.</p>
                <Button asChild>
                  <Link to="/menu">Browse Menu</Link>
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => (
                    <CartItem 
                      key={item.id}
                      item={item}
                      onRemove={() => removeItem(item.id)}
                      onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                    />
                  ))}
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-card rounded-lg shadow-sm border p-6 sticky top-24">
                    <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Taxes</span>
                        <span>₹{(totalPrice * 0.05).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>₹{(totalPrice * 1.05).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button className="w-full">Proceed to Checkout</Button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
