
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useParallax } from '@/utils/animations';

const Hero = () => {
  const parallax = useParallax(0.05);
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const offsetX = (x - centerX) / 50;
      const offsetY = (y - centerY) / 50;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      elements.forEach((el, i) => {
        const depth = (i + 1) * 0.1;
        const moveX = offsetX * depth;
        const moveY = offsetY * depth;
        
        (el as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-aether-300/30 rounded-full blur-3xl animate-pulse-soft parallax-element" />
        <div className="absolute bottom-1/3 -right-32 w-80 h-80 bg-blush-300/20 rounded-full blur-3xl animate-pulse-soft delay-700 parallax-element" />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse-soft delay-1000 parallax-element" />
      </div>
      
      {/* Grid Lines (Optional) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div 
          className="mb-4 px-4 py-1.5 inline-flex items-center rounded-full border bg-background/50 backdrop-blur-sm"
          style={parallax.style}
        >
          <span className="inline-block size-2 rounded-full bg-primary mr-2"></span>
          <span className="text-xs font-medium">The Next Generation of Esports</span>
        </div>
        
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          style={{transform: `translateY(${-parallax.y * 0.5}px)`}}
        >
          Where <span className="text-transparent bg-clip-text aether-gradient">Gaming</span> and <span className="text-transparent bg-clip-text blush-gradient">Blockchain</span> Collide
        </h1>
        
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          style={{transform: `translateY(${-parallax.y * 0.3}px)`}}
        >
          Aether Arena brings competitive gaming into the Web3 era with transparent tournaments, verifiable achievements, and decentralized prize pools.
        </p>
        
        <div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{transform: `translateY(${-parallax.y * 0.1}px)`}}
        >
          <button className="px-8 py-3 rounded-full bg-primary text-white font-medium shadow-lg hover:opacity-90 transition-all">
            Explore Tournaments
          </button>
          <button className="px-8 py-3 rounded-full bg-card border shadow hover:shadow-md transition-all">
            View Players
          </button>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-6xl pointer-events-none">
        <div className="relative w-full h-32 md:h-48">
          <div className="absolute left-4 md:left-8 top-0 w-32 h-32 glass-card rounded-2xl p-4 flex items-center justify-center animate-float parallax-element">
            <div className="text-center">
              <div className="text-2xl font-bold">100K+</div>
              <div className="text-xs text-muted-foreground">Players</div>
            </div>
          </div>
          
          <div className="absolute right-4 md:right-8 bottom-0 w-32 h-32 glass-card rounded-2xl p-4 flex items-center justify-center animate-float delay-300 parallax-element">
            <div className="text-center">
              <div className="text-2xl font-bold">$500K</div>
              <div className="text-xs text-muted-foreground">Prize Pool</div>
            </div>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-36 h-36 glass-card rounded-2xl p-4 flex items-center justify-center animate-float delay-700 parallax-element">
            <div className="text-center">
              <div className="text-2xl font-bold">250+</div>
              <div className="text-xs text-muted-foreground">Tournaments</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-foreground rounded-full animate-slide-down"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
