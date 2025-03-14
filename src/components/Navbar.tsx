
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tournaments', path: '/tournaments' },
    { name: 'Players', path: '/players' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 px-6 lg:px-12',
        scrolled
          ? 'py-4 glass-card bg-white/80 backdrop-blur-lg'
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold tracking-tight"
        >
          <span className="inline-block size-8 rounded-full aether-gradient"></span>
          <span className="relative">
            Aether Arena
            <span className="absolute -top-1 -right-4 text-xs font-normal text-muted-foreground">
              β
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary relative group',
                isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {item.name}
              <span
                className={cn(
                  'absolute left-0 bottom-0 w-full h-0.5 transform origin-left transition-transform duration-300',
                  isActive(item.path) 
                    ? 'bg-primary scale-x-100' 
                    : 'bg-primary scale-x-0 group-hover:scale-x-100'
                )}
              />
            </Link>
          ))}
        </div>

        {/* Connect Wallet Button */}
        <button className="hidden md:block px-6 py-2 rounded-full bg-primary text-white font-medium shadow-lg hover:opacity-90 transition-all">
          Connect Wallet
        </button>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="w-6 flex flex-col space-y-1.5">
            <span 
              className={cn(
                "block h-0.5 bg-foreground transition-transform", 
                menuOpen && "translate-y-2 rotate-45"
              )} 
            />
            <span 
              className={cn(
                "block h-0.5 bg-foreground transition-opacity", 
                menuOpen && "opacity-0"
              )} 
            />
            <span 
              className={cn(
                "block h-0.5 bg-foreground transition-transform", 
                menuOpen && "-translate-y-2 -rotate-45"
              )} 
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "absolute top-full left-0 w-full bg-white/80 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden md:hidden",
          menuOpen ? "max-h-56 border-t" : "max-h-0"
        )}
      >
        <div className="px-6 py-4 flex flex-col space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'text-sm font-medium py-2',
                isActive(item.path) ? 'text-primary' : 'text-muted-foreground'
              )}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button className="w-full mt-2 px-6 py-2 rounded-full bg-primary text-white font-medium shadow-lg hover:opacity-90 transition-all">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
