
import React from 'react';
import { motion } from 'framer-motion';
import FoodCard from './FoodCard';
import type { MenuItem } from '@/hooks/useMenu';

interface MenuSectionProps {
  title: string;
  items: MenuItem[];
  description?: string;
}

export default function MenuSection({ title, items, description }: MenuSectionProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="py-8" id={title.toLowerCase().replace(/ /g, '-')}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">{title}</h2>
          {description && (
            <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </motion.div>
        
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items available in this category</p>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {items.map(item => (
              <FoodCard key={item.id} item={item} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
