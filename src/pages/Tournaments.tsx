
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TournamentCard, { TournamentCardProps } from '@/components/TournamentCard';
import { cn } from '@/lib/utils';

// Mock tournaments data
const allTournaments: TournamentCardProps[] = [
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
  },
  {
    id: '4',
    title: 'Valorant Champions Tour',
    game: 'Valorant',
    prize: '$30,000',
    entryFee: '0.08 ETH',
    date: 'May 22, 2023',
    status: 'upcoming',
    participants: { current: 56, max: 64 },
    image: 'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '5',
    title: 'Apex Legends Invitational',
    game: 'Apex Legends',
    prize: '$20,000',
    entryFee: '0.04 ETH',
    date: 'Apr 30, 2023',
    status: 'live',
    participants: { current: 60, max: 60 },
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1947&auto=format&fit=crop'
  },
  {
    id: '6',
    title: 'Rocket League Championship',
    game: 'Rocket League',
    prize: '$15,000',
    date: 'Apr 5, 2023',
    status: 'completed',
    participants: { current: 16, max: 16 },
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '7',
    title: 'Dota 2 International',
    game: 'Dota 2',
    prize: '$100,000',
    entryFee: '0.15 ETH',
    date: 'Jun 10, 2023',
    status: 'upcoming',
    participants: { current: 12, max: 16 },
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2065&auto=format&fit=crop'
  },
  {
    id: '8',
    title: 'Overwatch League',
    game: 'Overwatch',
    prize: '$40,000',
    entryFee: '0.1 ETH',
    date: 'May 5, 2023',
    status: 'upcoming',
    participants: { current: 10, max: 12 },
    image: 'https://images.unsplash.com/photo-1519326844852-704caea5679e?q=80&w=2034&auto=format&fit=crop'
  },
  {
    id: '9',
    title: 'Super Smash Bros Ultimate Cup',
    game: 'Super Smash Bros',
    prize: '$10,000',
    date: 'Mar 20, 2023',
    status: 'completed',
    participants: { current: 64, max: 64 },
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop'
  }
];

const gameOptions = [
  'All Games',
  'League of Legends',
  'Fortnite',
  'Counter-Strike',
  'Valorant',
  'Apex Legends',
  'Rocket League',
  'Dota 2',
  'Overwatch',
  'Super Smash Bros'
];

const statusOptions = ['All', 'Upcoming', 'Live', 'Completed'];

const Tournaments = () => {
  const [selectedGame, setSelectedGame] = useState('All Games');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Apply filters
  const filteredTournaments = allTournaments.filter((tournament) => {
    // Game filter
    const gameMatch = selectedGame === 'All Games' || tournament.game === selectedGame;
    
    // Status filter
    const statusMatch = 
      selectedStatus === 'All' || 
      tournament.status === selectedStatus.toLowerCase();
    
    // Search term
    const searchMatch = 
      tournament.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tournament.game.toLowerCase().includes(searchTerm.toLowerCase());
    
    return gameMatch && statusMatch && searchMatch;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        {/* Page Header */}
        <div className="relative bg-muted/50 py-16 mb-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Tournaments</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse and join competitive gaming tournaments powered by blockchain technology.
              Compete, win, and earn verifiable achievements.
            </p>
          </div>
        </div>
        
        {/* Filters */}
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="glass-card p-6 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium mb-1">
                  Search
                </label>
                <div className="relative">
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                  <input
                    id="search"
                    type="text"
                    className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background/50 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Search tournaments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Game Filter */}
              <div>
                <label htmlFor="game" className="block text-sm font-medium mb-1">
                  Game
                </label>
                <select
                  id="game"
                  className="w-full px-4 py-2 rounded-lg border bg-background/50 focus:ring-2 focus:ring-primary focus:outline-none"
                  value={selectedGame}
                  onChange={(e) => setSelectedGame(e.target.value)}
                >
                  {gameOptions.map((game) => (
                    <option key={game} value={game}>
                      {game}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Status Filter */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium mb-1">
                  Status
                </label>
                <div className="flex space-x-2">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      className={cn(
                        "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all",
                        selectedStatus === status
                          ? "bg-primary text-white"
                          : "bg-card border hover:bg-muted/50"
                      )}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tournaments Grid */}
        <div className="max-w-7xl mx-auto px-6">
          {filteredTournaments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTournaments.map((tournament) => (
                <TournamentCard
                  key={tournament.id}
                  {...tournament}
                  className="animate-scale-in"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-3xl font-bold mb-2">No Tournaments Found</div>
              <p className="text-muted-foreground">
                Try adjusting your filters or search term to find tournaments.
              </p>
            </div>
          )}
          
          {/* Pagination (Static for Now) */}
          {filteredTournaments.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-muted/50">
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
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-muted/50">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-muted/50">
                  3
                </button>
                <span className="w-8 h-8 flex items-center justify-center">...</span>
                <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-muted/50">
                  8
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded border hover:bg-muted/50">
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
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tournaments;
