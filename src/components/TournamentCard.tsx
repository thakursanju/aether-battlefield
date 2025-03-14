
import React from 'react';
import { cn } from '@/lib/utils';

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
          <div className="text-sm text-muted-foreground">{date}</div>
          <div className="text-sm">{participants.current}/{participants.max} Players</div>
        </div>
        
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
