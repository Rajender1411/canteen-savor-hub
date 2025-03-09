
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, UtensilsCrossed, Coffee, ShoppingBag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DailySpecial from '@/components/DailySpecial';
import Testimonial from '@/components/Testimonial';
import { useMenu } from '@/hooks/useMenu';

const Index = () => {
  const { loading, getSpecialItems } = useMenu();
  const specialItems = getSpecialItems();

  // Hero section background animation
  const backgroundVariants = {
    initial: { 
      backgroundPosition: '0% 0%'
    },
    animate: { 
      backgroundPosition: '100% 100%',
      transition: { 
        duration: 20, 
        ease: "linear", 
        repeat: Infinity, 
        repeatType: "reverse" 
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 overflow-hidden"
        variants={backgroundVariants}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#111_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row items-center gap-8">
            <motion.div
              className="lg:w-1/2 text-center lg:text-left space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4 py-1.5">Welcome to Canteen Savor Hub</Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="block">Delicious Food,</span>
                <span className="block">Fast Service!</span>
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto lg:mx-0">
                Enjoy a wide variety of freshly prepared meals, snacks and beverages at our student-friendly canteen.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" asChild>
                  <Link to="/menu">
                    Explore Menu <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  View Daily Specials
                </Button>
              </div>
            </motion.div>
            
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1000" 
                  alt="Delicious food" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -right-6 -bottom-6 bg-white rounded-xl p-3 shadow-lg">
                  <div className="text-2xl font-bold">25+</div>
                  <div className="text-sm text-muted-foreground">Daily Items</div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-screen-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <UtensilsCrossed className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh Ingredients</h3>
              <p className="text-muted-foreground">All our dishes are prepared daily with fresh, high-quality ingredients.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
              <p className="text-muted-foreground">Quick preparation and service to accommodate your busy schedule.</p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="p-3 bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Ordering</h3>
              <p className="text-muted-foreground">Seamless digital ordering system for a hassle-free experience.</p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-6 left-0 right-0 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="animate-bounce p-2 rounded-full">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </motion.div>
      </motion.section>
      
      {/* Daily Specials Section */}
      <DailySpecial specialItems={specialItems} />
      
      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1581349485608-9469c8b0b28d?q=80&w=1000" 
                alt="Our Canteen" 
                className="rounded-2xl shadow-lg"
              />
            </motion.div>
            
            <motion.div
              className="md:w-1/2 space-y-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-2">About Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold">We Serve Quality Food</h2>
              <p className="text-muted-foreground">
                Our canteen is dedicated to providing nutritious and delicious meals for students and staff. 
                With a focus on quality ingredients and diverse menu options, we cater to various tastes and dietary preferences.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                  <span>Wide variety of food categories</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                  <span>Accommodates special dietary requirements</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                  <span>Hygienic preparation and serving</span>
                </li>
                <li className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                  <span>Affordable pricing for students</span>
                </li>
              </ul>
              <Button variant="outline" asChild>
                <Link to="/menu">Explore Our Menu</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-secondary" id="testimonials">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-3">What Our Customers Say</Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Testimonials</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
              Hear from our satisfied customers about their experience with our food and service.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Testimonial 
              name="Rahul Singh"
              text="The masala dosa is absolutely delicious, and the service is super quick. Perfect for a busy college day!"
              rating={5}
              date="15 May 2023"
            />
            <Testimonial 
              name="Priya Patel"
              text="I love the variety of options available. The daily specials are always a pleasant surprise, and the quality is consistently good."
              rating={4}
              date="20 June 2023"
            />
            <Testimonial 
              name="Amit Kumar"
              text="Great food at affordable prices. The digital ordering system makes it so convenient to get food between classes."
              rating={5}
              date="5 July 2023"
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Order?</h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              Browse our menu and place your order now for a delicious meal experience.
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/menu">
                Explore Menu <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
