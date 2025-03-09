
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

interface TestimonialProps {
  name: string;
  text: string;
  rating: number;
  date: string;
}

export default function Testimonial({ name, text, rating, date }: TestimonialProps) {
  return (
    <motion.div 
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>
        </div>
        <Quote className="h-5 w-5 text-primary/20" />
      </div>
      
      <p className="text-sm mb-4 text-left">{text}</p>
      
      <div className="flex justify-between items-center text-xs text-muted-foreground">
        <span className="font-medium">{name}</span>
        <span>{date}</span>
      </div>
    </motion.div>
  );
}
