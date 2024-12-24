import { useState } from 'react';  // Add useState import
import { Link } from "react-router-dom";
import { Code2, ChevronDown, Search, Menu } from 'lucide-react';
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import AuthModal from './authmodal';  // Import AuthModal with correct path

export default function NavBar() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState('signin');

  const handleAuthClick = (type) => {
    setAuthType(type)
    setShowAuthModal(true)
  }
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed w-full top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-16 items-center px-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2"> {/* Use `to` for Link */}
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <Code2 className="h-6 w-6" />
            </motion.div>
            <motion.span 
              className="font-bold"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              Code On
            </motion.span>
          </Link>
          
          <div className="hidden md:flex space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2 group">
                  Features 
                  <motion.div
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="group-hover:rotate-180"
                  >
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </motion.div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Code Editor</DropdownMenuItem>
                <DropdownMenuItem>Collaboration</DropdownMenuItem>
                <DropdownMenuItem>Version Control</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 px-2 group">
                  Solutions 
                  <motion.div
                    animate={{ rotate: 180 }}
                    transition={{ duration: 0.3 }}
                    className="group-hover:rotate-180"
                  >
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </motion.div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>For Teams</DropdownMenuItem>
                <DropdownMenuItem>For Education</DropdownMenuItem>
                <DropdownMenuItem>For Enterprise</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" className="h-8 px-2">
              Pricing
            </Button>
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <motion.div 
            className="hidden md:flex"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8 w-64 backdrop-blur-sm bg-white/10"
              />
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button 
              variant="ghost" 
              onClick={() => handleAuthClick('signin')}
            >
              Sign in
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button 
              variant="default"
              onClick={() => handleAuthClick('signup')}
              className="bg-white text-black hover:bg-gray-200"
            >
              Sign up
            </Button>
          </motion.div>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        type={authType}
      />
    </motion.nav>
  );
}
