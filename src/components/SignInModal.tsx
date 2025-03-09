
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from '@/context/AuthContext';

export default function SignInModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, adminLogin } = useAuth();
  const [loginType, setLoginType] = useState<'student' | 'admin'>('student');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const modalVariants = {
    closed: { 
      opacity: 0,
      scale: 0.95
    },
    open: { 
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300
      }
    }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      if (loginType === 'student') {
        if (!name.trim() || !mobile.trim()) {
          throw new Error('Please enter your name and mobile number');
        }
        
        if (!/^[0-9]{10}$/.test(mobile)) {
          throw new Error('Please enter a valid 10-digit mobile number');
        }
        
        await login(name, mobile);
      } else {
        if (!username.trim() || !password.trim()) {
          throw new Error('Please enter username and password');
        }
        
        const success = await adminLogin(username, password);
        if (!success) {
          throw new Error('Invalid admin credentials');
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthModalOpen) return null;

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/30 z-50"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={() => setIsAuthModalOpen(false)}
          />
          
          <motion.div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div
              className="bg-white rounded-lg shadow-lg w-full max-w-md"
              variants={modalVariants}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-medium">Sign In</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsAuthModalOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="p-6">
                <RadioGroup 
                  value={loginType} 
                  onValueChange={(value) => setLoginType(value as 'student' | 'admin')}
                  className="flex space-x-4 mb-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin">Admin</Label>
                  </div>
                </RadioGroup>
                
                {error && (
                  <div className="mb-4 p-2 bg-destructive/10 text-destructive text-sm rounded-md">
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {loginType === 'student' ? (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="name"
                              placeholder="Enter your name"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <Input 
                            id="mobile"
                            placeholder="10-digit mobile number"
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            maxLength={10}
                            pattern="[0-9]{10}"
                            required
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="username"
                              placeholder="Enter admin username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input 
                              id="password"
                              type="password"
                              placeholder="Enter admin password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="pl-10"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full mt-6"
                    disabled={loading}
                  >
                    {loading ? 'Signing in...' : 'Sign In'}
                  </Button>
                </form>
                
                {loginType === 'admin' && (
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    Admin credentials: username: "admin", password: "admin123"
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
