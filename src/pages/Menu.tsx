
import React from 'react';
import { motion } from 'framer-motion';
import { useMenu } from '@/hooks/useMenu';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import MenuSection from '@/components/MenuSection';

const Menu = () => {
  const { loading, categories, getItemsByCategory } = useMenu();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-20">
        {/* Hero section */}
        <section className="bg-secondary/50 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-screen-lg mx-auto text-center"
            >
              <Badge className="mb-4">Our Menu</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Delicious Options</h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Browse through our wide selection of meals, snacks, and beverages carefully prepared for you.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Menu categories */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="space-y-12">
                {categories.map((category) => (
                  <MenuSection 
                    key={category}
                    title={category}
                    items={getItemsByCategory(category)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Menu;
