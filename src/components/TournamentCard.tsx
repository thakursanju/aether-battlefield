
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { format, parseISO } from 'date-fns';

export interface TournamentCardProps {
  id: string;
  title: string;
  game: string;
  prize: string;
  entryFee?: string;
  date: string;
  status: 'upcoming' | 'live' | 'completed';
  participants: {
    current: number;
    max: number;
  };
  image: string;
  className?: string;
}

const TournamentCard: React.FC<TournamentCardProps> = ({
  id,
  title,
  game,
  prize,
  entryFee,
  date,
  status,
  participants,
  image,
  className,
}) => {
  const statusColors = {
    upcoming: 'bg-muted text-muted-foreground',
    live: 'bg-green-100 text-green-700',
    completed: 'bg-yellow-100 text-yellow-700',
  };

  // Format the date to be more readable
  const formattedDate = (() => {
    try {
      // Check if date is already in ISO format, if not, assume it's in a readable format
      if (date.includes('-') || date.includes('T')) {
        return format(new Date(date), 'd MMMM yyyy');
      }
      // If it's already in a readable format like "May 15, 2025", return as is
      return date;
    } catch (error) {
      console.error("Error formatting date:", error);
      return date; // Return original if parsing fails
    }
  })();

  // Calculate time remaining for upcoming tournaments
  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  
  useEffect(() => {
    // Only set up countdown for upcoming tournaments
    if (status !== 'upcoming') return;
    
    const tournamentDate = new Date(date);
    const now = new Date();
    
    // Calculate initial time remaining
    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = tournamentDate.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setTimeRemaining('Starting soon!');
        setProgress(100);
        return;
      }
      
      // Calculate days, hours, minutes
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      // Format the countdown text
      let countdownText = '';
      if (days > 0) {
        countdownText = `${days}d ${hours}h ${minutes}m`;
      } else if (hours > 0) {
        countdownText = `${hours}h ${minutes}m`;
      } else {
        countdownText = `${minutes}m`;
      }
      
      setTimeRemaining(countdownText);
      
      // Calculate progress (inverse - closer to date = higher progress)
      // Assuming 30 days is the max display window
      const maxWindow = 30 * 24 * 60 * 60 * 1000; // 30 days in ms
      const progressValue = Math.min(100, Math.max(0, 100 - (timeDiff / maxWindow) * 100));
      setProgress(progressValue);
    };
    
    // Update immediately and then every minute
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    
    return () => clearInterval(interval);
  }, [date, status]);

  return (
    <div
      className={cn(
        'glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] group',
        className
      )}
    >
      <div className="aspect-[16/9] overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        
        {/* Status Badge */}
        <div
          className={cn(
            'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium',
            statusColors[status]
          )}
        >
          {status === 'live' ? 'LIVE NOW' : status === 'upcoming' ? 'UPCOMING' : 'COMPLETED'}
        </div>
        
        {/* Game Badge */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-sm rounded-full text-xs font-medium">
          {game}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-muted-foreground">{formattedDate}</div>
          <div className="text-sm">{participants.current}/{participants.max} Players</div>
        </div>
        
        {/* Add countdown for upcoming tournaments */}
        {status === 'upcoming' && timeRemaining && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-muted-foreground">Starts in</span>
              <span className="text-xs font-medium">{timeRemaining}</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>
        )}
        
        {/* For live tournaments, show a pulsing indicator */}
        {status === 'live' && (
          <div className="mb-4 flex items-center">
            <span className="h-2.5 w-2.5 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm text-green-600 font-medium">Tournament in progress</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Prize Pool</div>
            <div className="text-lg font-bold text-primary">{prize}</div>
          </div>
          
          {entryFee && (
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">Entry Fee</div>
              <div className="text-sm">{entryFee}</div>
            </div>
          )}
        </div>
        
        <button className="w-full mt-5 px-4 py-2.5 rounded-full bg-primary text-white font-medium transition-all hover:opacity-90">
          {status === 'upcoming' ? 'Register Now' : status === 'live' ? 'Watch Live' : 'View Results'}
        </button>
      </div>
    </div>
  );
};

export default TournamentCard;
