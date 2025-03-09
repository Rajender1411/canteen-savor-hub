
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { MenuItem } from '@/hooks/useMenu';

interface DailySpecialProps {
  specialItems: MenuItem[];
}

export default function DailySpecial({ specialItems }: DailySpecialProps) {
  if (!specialItems.length) return null;

  return (
    <section className="py-16 relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 -z-10"
        style={{
          clipPath: "polygon(0 0, 100% 15%, 100% 85%, 0 100%)"
        }}
      />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-screen-xl mx-auto text-center mb-10"
        >
          <Badge variant="outline" className="mb-3">Today's Highlights</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Daily Specials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enjoy our chef's special creations of the day, prepared with fresh ingredients and unique flavors.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200"
            >
              <div className="h-48 relative overflow-hidden">
                <motion.img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                />
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                  <h3 className="text-xl font-medium text-white">{item.name}</h3>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <Badge variant="secondary" className="bg-primary/10">Special</Badge>
                  <span className="font-semibold">₹{item.price}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <Link to="/menu">
                  <Button className="w-full">
                    Order Now <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Link to="/menu">
            <Button variant="outline" size="lg">
              View Full Menu <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
