
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PlayerCard, { PlayerCardProps } from '@/components/PlayerCard';
import { cn } from '@/lib/utils';

// Mock players data
const allPlayers: PlayerCardProps[] = [
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
  },
  {
    id: '4',
    name: 'Elena "Phoenix" Rodriguez',
    username: 'phoenix',
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    rank: 4,
    winRate: 71,
    earnings: '$76,800',
    mainGame: 'Apex Legends',
    achievements: [
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/trophy.png', name: 'Tournament Champion' },
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/medal2.png', name: 'Rising Star' }
    ],
    sbtImage: 'https://images.unsplash.com/photo-1496065187959-7f07b8353c55?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'David "Titan" Brown',
    username: 'titan',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rank: 5,
    winRate: 63,
    earnings: '$65,400',
    mainGame: 'Counter-Strike',
    achievements: [
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/medal2.png', name: 'Rising Star' }
    ],
    sbtImage: 'https://images.unsplash.com/photo-1605979257913-1704eb7b6246?q=80&w=1970&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'Min-Ji "Storm" Park',
    username: 'storm',
    avatar: 'https://randomuser.me/api/portraits/women/62.jpg',
    rank: 6,
    winRate: 67,
    earnings: '$58,900',
    mainGame: 'Overwatch',
    achievements: [
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/trophy.png', name: 'Tournament Champion' }
    ],
    sbtImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '7',
    name: 'Carlos "Shadow" Martinez',
    username: 'shadow',
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    rank: 7,
    winRate: 61,
    earnings: '$54,200',
    mainGame: 'Fortnite',
    achievements: [
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/medal2.png', name: 'Rising Star' }
    ],
    sbtImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '8',
    name: 'Emma "Glacier" White',
    username: 'glacier',
    avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
    rank: 8,
    winRate: 59,
    earnings: '$49,700',
    mainGame: 'League of Legends',
    achievements: [
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/medal2.png', name: 'Rising Star' }
    ],
    sbtImage: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=2066&auto=format&fit=crop'
  },
  {
    id: '9',
    name: 'Jamal "Kingpin" Jackson',
    username: 'kingpin',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    rank: 9,
    winRate: 58,
    earnings: '$45,300',
    mainGame: 'Rocket League',
    achievements: [
      { icon: 'https://img.icons8.com/ios-filled/50/ffffff/medal2.png', name: 'Rising Star' }
    ],
    sbtImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop'
  }
];

const gameOptions = [
  'All Games',
  'League of Legends',
  'Valorant',
  'Fortnite',
  'Counter-Strike',
  'Apex Legends',
  'Overwatch',
  'Rocket League'
];

const Players = () => {
  const [selectedGame, setSelectedGame] = useState('All Games');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  
  // Apply filters and sorting
  const filteredPlayers = allPlayers
    .filter((player) => {
      // Game filter
      const gameMatch = selectedGame === 'All Games' || player.mainGame === selectedGame;
      
      // Search term
      const searchMatch = 
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        player.username.toLowerCase().includes(searchTerm.toLowerCase());
      
      return gameMatch && searchMatch;
    })
    .sort((a, b) => {
      // Sorting
      if (sortBy === 'rank') {
        return (a.rank || 999) - (b.rank || 999);
      } else if (sortBy === 'earnings') {
        const aValue = parseFloat((a.earnings || '$0').replace('$', '').replace(',', ''));
        const bValue = parseFloat((b.earnings || '$0').replace('$', '').replace(',', ''));
        return bValue - aValue;
      } else if (sortBy === 'winRate') {
        return (b.winRate || 0) - (a.winRate || 0);
      }
      return 0;
    });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-28 pb-20">
        {/* Page Header */}
        <div className="relative bg-muted/50 py-16 mb-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Players</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover top esports athletes, view their achievements, and explore their on-chain gaming credentials.
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
                    placeholder="Search players..."
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
              
              {/* Sort By */}
              <div>
                <label htmlFor="sortBy" className="block text-sm font-medium mb-1">
                  Sort By
                </label>
                <select
                  id="sortBy"
                  className="w-full px-4 py-2 rounded-lg border bg-background/50 focus:ring-2 focus:ring-primary focus:outline-none"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="rank">Rank</option>
                  <option value="earnings">Earnings</option>
                  <option value="winRate">Win Rate</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Players Grid */}
        <div className="max-w-7xl mx-auto px-6">
          {filteredPlayers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPlayers.map((player) => (
                <PlayerCard
                  key={player.id}
                  {...player}
                  className="animate-scale-in"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-3xl font-bold mb-2">No Players Found</div>
              <p className="text-muted-foreground">
                Try adjusting your filters or search term to find players.
              </p>
            </div>
          )}
          
          {/* Pagination (Static for Now) */}
          {filteredPlayers.length > 0 && (
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

export default Players;
