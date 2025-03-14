
import React from 'react';
import { cn } from '@/lib/utils';

export interface PlayerCardProps {
  id: string;
  name: string;
  username: string;
  avatar: string;
  rank?: number;
  winRate?: number;
  earnings?: string;
  mainGame?: string;
  achievements?: {
    icon: string;
    name: string;
  }[];
  sbtImage?: string;
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  id,
  name,
  username,
  avatar,
  rank,
  winRate,
  earnings,
  mainGame,
  achievements = [],
  sbtImage,
  className,
}) => {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px]',
        className
      )}
    >
      {/* Player Header */}
      <div className="relative">
        {/* SBT Background */}
        {sbtImage && (
          <div className="w-full aspect-[16/9] overflow-hidden">
            <img 
              src={sbtImage} 
              alt="Player SBT" 
              className="w-full h-full object-cover opacity-40"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-background/30" />
          </div>
        )}
        
        {/* Profile Section */}
        <div className="absolute bottom-0 left-0 w-full p-6 flex items-end space-x-4">
          {/* Avatar */}
          <div className="relative">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-4 border-background">
              <img 
                src={avatar} 
                alt={name} 
                className="w-full h-full object-cover"
                loading="lazy" 
              />
            </div>
            {rank && (
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                #{rank}
              </div>
            )}
          </div>
          
          {/* Name & Username */}
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>
        </div>
      </div>
      
      {/* Player Stats */}
      <div className="p-6 pt-16">
        <div className="grid grid-cols-3 gap-2 mb-4">
          {winRate !== undefined && (
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
              <div className="text-lg font-medium">{winRate}%</div>
            </div>
          )}
          
          {earnings && (
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Earnings</div>
              <div className="text-lg font-medium">{earnings}</div>
            </div>
          )}
          
          {mainGame && (
            <div className="text-center">
              <div className="text-xs text-muted-foreground mb-1">Main Game</div>
              <div className="text-lg font-medium truncate">{mainGame}</div>
            </div>
          )}
        </div>
        
        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-muted-foreground mb-2">Achievements</div>
            <div className="flex flex-wrap gap-2">
              {achievements.map((achievement, index) => (
                <div 
                  key={index} 
                  className="w-8 h-8 rounded-md bg-muted flex items-center justify-center tooltip-wrapper"
                  title={achievement.name}
                >
                  <img 
                    src={achievement.icon} 
                    alt={achievement.name} 
                    className="w-5 h-5" 
                  />
                  <span className="tooltip">{achievement.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* View Profile Button */}
        <button className="w-full mt-5 px-4 py-2.5 rounded-full bg-background border shadow hover:shadow-md transition-all text-sm font-medium">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default PlayerCard;
