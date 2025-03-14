
import React, { useState } from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TournamentCard, { TournamentCardProps } from '@/components/TournamentCard';
import PlayerCard, { PlayerCardProps } from '@/components/PlayerCard';
import { cn } from '@/lib/utils';
import { useScrollReveal } from '@/utils/animations';

// Mock data for tournaments
const tournaments: TournamentCardProps[] = [
  {
    id: '1',
    title: 'Aether Championship Series',
    game: 'League of Legends',
    prize: '$50,000',
    entryFee: '0.1 ETH',
    date: 'May 15, 2023',
    status: 'upcoming',
    participants: { current: 128, max: 256 },
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Battle Royale Masters',
    game: 'Fortnite',
    prize: '$25,000',
    entryFee: '0.05 ETH',
    date: 'Apr 28, 2023',
    status: 'live',
    participants: { current: 75, max: 100 },
    image: 'https://images.unsplash.com/photo-1580327344181-c1163234e5a0?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'CS:GO Pro Circuit',
    game: 'Counter-Strike',
    prize: '$35,000',
    date: 'Apr 10, 2023',
    status: 'completed',
    participants: { current: 32, max: 32 },
    image: 'https://images.unsplash.com/photo-1548686304-89d188a80029?q=80&w=2030&auto=format&fit=crop'
  }
];

// Mock data for players
const players: PlayerCardProps[] = [
  {
    id: '1',
    name: 'Alex "NightFox" Johnson',
    username: 'nightfox',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rank: 1,
    winRate: 68,
    earnings: '$124,500',
    mainGame: 'League of Legends',
    achievements: [
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/trophy.png', name: 'Tournament Champion' },
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/crown.png', name: 'Legend Status' }
    ],
    sbtImage: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=1974&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Sarah "Viper" Chen',
    username: 'viper',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rank: 2,
    winRate: 72,
    earnings: '$98,200',
    mainGame: 'Valorant',
    achievements: [
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/trophy.png', name: 'Tournament Champion' }
    ],
    sbtImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Marcus "Blaze" Wilson',
    username: 'blaze',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rank: 3,
    winRate: 65,
    earnings: '$87,300',
    mainGame: 'Fortnite',
    achievements: [
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/medal2.png', name: 'Rising Star' }
    ],
    sbtImage: 'https://images.unsplash.com/photo-1608306448197-e83633f1261c?q=80&w=1974&auto=format&fit=crop'
  }
];

const Index = () => {
  const [setTournamentsRef, tournamentsVisible] = useScrollReveal();
  const [setPlayersRef, playersVisible] = useScrollReveal();
  const [setFeaturesRef, featuresVisible] = useScrollReveal();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Tournaments Section */}
        <section 
          className="py-20 px-6"
          ref={setTournamentsRef as React.Ref<HTMLDivElement>}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  Tournaments
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Featured Competitions</h2>
              </div>
              <a 
                href="/tournaments" 
                className="mt-4 md:mt-0 text-sm font-medium text-primary flex items-center hover:underline"
              >
                View All Tournaments
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                tournamentsVisible ? "animate-fade-in" : "opacity-0"
              )}
            >
              {tournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  {...tournament}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section 
          className="py-20 px-6 bg-muted/50"
          ref={setFeaturesRef as React.Ref<HTMLDivElement>}
        >
          <div 
            className={cn(
              "max-w-7xl mx-auto",
              featuresVisible ? "animate-fade-in" : "opacity-0"
            )}
          >
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Experience the Future of Esports</h2>
              <p className="text-muted-foreground">
                Aether Arena combines competitive gaming with blockchain technology to create a transparent, 
                secure, and rewarding environment for players and fans alike.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                    <path d="M4 22h16" />
                    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Verifiable Achievements</h3>
                <p className="text-muted-foreground">
                  All your gaming accomplishments stored on-chain as Soul-Bound Tokens (SBTs), 
                  providing indisputable proof of your skills and tournament history.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10" />
                    <path d="M7 12h10" />
                    <path d="M7 17h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Transparent Tournaments</h3>
                <p className="text-muted-foreground">
                  Smart contracts ensure fair play, transparent prize distributions, and 
                  tamper-proof tournament brackets. View match results and stats in real-time.
                </p>
              </div>
              
              <div className="glass-card p-8 rounded-2xl text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                  >
                    <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
                    <line x1="18" x2="12" y1="9" y2="15" />
                    <line x1="12" x2="18" y1="9" y2="15" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Decentralized Prize Pools</h3>
                <p className="text-muted-foreground">
                  Instantly receive your tournament winnings directly to your wallet. 
                  Contribute to and track prize pools with complete transparency.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Players Section */}
        <section 
          className="py-20 px-6"
          ref={setPlayersRef as React.Ref<HTMLDivElement>}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                  Players
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Top Competitors</h2>
              </div>
              <a 
                href="/players" 
                className="mt-4 md:mt-0 text-sm font-medium text-primary flex items-center hover:underline"
              >
                View All Players
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </a>
            </div>
            
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                playersVisible ? "animate-fade-in" : "opacity-0"
              )}
            >
              {players.map((player) => (
                <PlayerCard
                  key={player.id}
                  {...player}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="glass-card p-12 rounded-3xl relative overflow-hidden">
              {/* Background Elements */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-aether-300/20 rounded-full blur-3xl"></div>
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Join the Arena?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                  Connect your wallet to start competing in tournaments, earning achievements, 
                  and becoming part of the next generation of esports.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="min-w-40 px-8 py-3 rounded-full bg-primary text-white font-medium shadow-lg hover:opacity-90 transition-all">
                    Connect Wallet
                  </button>
                  <button className="min-w-40 px-8 py-3 rounded-full bg-card border shadow hover:shadow-md transition-all">
                    Browse Tournaments
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
