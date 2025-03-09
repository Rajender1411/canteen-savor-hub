
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MenuSection from '@/components/MenuSection';
import { useMenu, type MenuCategory } from '@/hooks/useMenu';
import { Loader2 } from 'lucide-react';

const Menu = () => {
  const { menuItems, loading, getItemsByCategory } = useMenu();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('tiffin');
  
  const categories = [
    { id: 'tiffin', label: 'Tiffins' },
    { id: 'fast-food', label: 'Fast Food' },
    { id: 'snacks', label: 'Snacks' },
    { id: 'meals', label: 'Meals' },
    { id: 'beverages', label: 'Beverages' },
    { id: 'desserts', label: 'Desserts' },
  ];

  const getCategoryDescription = (category: string) => {
    switch(category) {
      case 'tiffin':
        return 'Traditional South Indian breakfast items, light and delicious.';
      case 'fast-food':
        return 'Quick and tasty options for when you\'re in a hurry.';
      case 'snacks':
        return 'Perfect bites for between meals or on-the-go.';
      case 'meals':
        return 'Complete balanced meals to satisfy your hunger.';
      case 'beverages':
        return 'Refreshing drinks to complement your food.';
      case 'desserts':
        return 'Sweet treats to finish your meal on a high note.';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20">
        <section className="py-12 md:py-16 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4">Our Selection</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our wide range of delicious options, prepared with fresh ingredients and care.
              </p>
            </motion.div>
          </div>
        </section>
        
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2">Loading menu...</span>
          </div>
        ) : (
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4">
              <Tabs 
                defaultValue="tiffin" 
                value={activeCategory}
                onValueChange={(value) => setActiveCategory(value as MenuCategory)}
                className="w-full max-w-screen-xl mx-auto"
              >
                <div className="sticky top-16 z-10 bg-background/80 backdrop-blur-md pt-4 pb-2">
                  <TabsList className="w-full justify-start overflow-x-auto flex-nowrap mb-6 h-auto p-1">
                    {categories.map((category) => (
                      <TabsTrigger 
                        key={category.id} 
                        value={category.id}
                        className="px-4 py-2 whitespace-nowrap"
                      >
                        {category.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                
                {categories.map((category) => (
                  <TabsContent key={category.id} value={category.id} className="mt-0">
                    <MenuSection 
                      title={category.label}
                      items={getItemsByCategory(category.id)}
                      description={getCategoryDescription(category.id)}
                    />
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
