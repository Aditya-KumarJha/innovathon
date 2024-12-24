'use client'
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Github, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

export default function AuthModal({ isOpen, onClose, type }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [successMessage, setSuccessMessage] = useState(''); // New state for the success message
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
      setSuccessMessage(''); // Reset the success message when modal closes
    }
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'signup') {
      // Simulate successful registration
      setSuccessMessage('Registration Successful!');
      onClose(); // Close the modal
    } else if (type === 'signin') {
      // Simulate sign-in and navigate to Home
      navigate('./home');
    }
  };

  const renderSignInFields = () => (
    <>
      <div className="space-y-2">
        <Label htmlFor="signin-email" className="text-gray-300">Email or username</Label>
        <Input
          id="signin-email"
          name="email"
          type="text"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          placeholder="Enter your email or username"
          required
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="signin-password" className="text-gray-300">Password</Label>
          <Button
            variant="link"
            className="text-sm text-blue-500 hover:text-blue-400 px-0 h-auto py-0"
          >
            Forgot password?
          </Button>
        </div>
        <Input
          id="signin-password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
          required
        />
      </div>
    </>
  );

  const renderSignUpFields = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-username" className="text-gray-300">Username</Label>
          <Input
            id="signup-username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="Pick a username"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-gray-300">Email address</Label>
          <Input
            id="signup-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="you@example.com"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
          <Input
            id="signup-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="Create a strong password"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Must be at least 8 characters including a number and a letter
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-confirm-password" className="text-gray-300">Confirm password</Label>
          <Input
            id="signup-confirm-password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-gray-900 border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            placeholder="Confirm your password"
            required
          />
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent
            className="fixed top-[70%] left-[50%] transform -translate-x-[50%] 
            w-[90%] sm:w-[440px] max-h-[90vh] overflow-y-auto bg-[#0d1117] 
            text-white border border-gray-800 rounded-xl shadow-2xl p-6"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {successMessage && (
              <div className="mb-4 text-center text-green-500 font-semibold">
                {successMessage}
              </div>
            )}

            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold text-center text-white">
                {type === 'signin' ? 'Welcome back' : 'Create your account'}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6">
              <Button
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-gray-700 hover:bg-gray-800 hover:border-gray-600 transition-all py-5"
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#0d1117] text-gray-400">or</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {type === 'signin' ? renderSignInFields() : renderSignUpFields()}

                <Button
                  type="submit"
                  className="w-full bg-[#238636] hover:bg-[#2ea043] text-white py-5 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
                >
                  {type === 'signin' ? 'Sign in' : 'Create account'}
                </Button>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
