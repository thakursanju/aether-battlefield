import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { format } from 'date-fns';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/contexts/WalletContext';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

const registrationSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  agreeToRules: z.boolean().refine(val => val === true, {
    message: "You must agree to tournament rules.",
  }),
});

const paymentSchema = z.object({
  amount: z.string().min(1, {
    message: "Please enter the payment amount.",
  }),
});

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const { address, isConnected, connectWallet } = useWallet();
  const statusColors = {
    upcoming: 'bg-muted text-muted-foreground',
    live: 'bg-green-100 text-green-700',
    completed: 'bg-yellow-100 text-yellow-700',
  };

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      username: "",
      email: "",
      agreeToRules: false,
    },
  });
  
  const paymentForm = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      amount: entryFee ? entryFee.replace(/[^0-9.]/g, '') : "",
    },
  });

  const formattedDate = (() => {
    try {
      if (date.includes('-') || date.includes('T')) {
        return format(new Date(date), 'd MMMM yyyy');
      }
      return date;
    } catch (error) {
      console.error("Error formatting date:", error);
      return date;
    }
  })();

  const [timeRemaining, setTimeRemaining] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  
  useEffect(() => {
    if (status !== 'upcoming') return;
    
    const tournamentDate = new Date(date);
    const now = new Date();
    
    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = tournamentDate.getTime() - now.getTime();
      
      if (timeDiff <= 0) {
        setTimeRemaining('Starting soon!');
        setProgress(100);
        return;
      }
      
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      
      let countdownText = '';
      if (days > 0) {
        countdownText = `${days}d ${hours}h ${minutes}m`;
      } else if (hours > 0) {
        countdownText = `${hours}h ${minutes}m`;
      } else {
        countdownText = `${minutes}m`;
      }
      
      setTimeRemaining(countdownText);
      
      const maxWindow = 30 * 24 * 60 * 60 * 1000;
      const progressValue = Math.min(100, Math.max(0, 100 - (timeDiff / maxWindow) * 100));
      setProgress(progressValue);
    };
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    
    return () => clearInterval(interval);
  }, [date, status]);

  const handleButtonClick = () => {
    if (status === 'upcoming') {
      setIsDialogOpen(true);
    } else if (status === 'live') {
      window.open(`/tournaments/${id}/watch`, '_blank');
    } else {
      window.open(`/tournaments/${id}/results`, '_blank');
    }
  };

  const nextStep = () => {
    if (formStep === 0) {
      setFormStep(1);
    } else if (formStep === 1) {
      setFormStep(2);
    }
  };

  const handlePayment = (values: z.infer<typeof paymentSchema>) => {
    console.log(`Processing payment of ${values.amount} for tournament: ${id}`);
    
    setFormStep(2);
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "You can connect your wallet later before the tournament starts.",
        variant: "default",
      });
    }
  };

  const handleRegister = (values: z.infer<typeof registrationSchema>) => {
    console.log(`Registering for tournament: ${id}`, values);
    
    if (!isConnected) {
      toast({
        title: "Registration Complete",
        description: `You've registered for ${title}. Remember to connect your wallet before the tournament starts.`,
      });
    } else {
      toast({
        title: "Registration Successful",
        description: `You have successfully registered for ${title}`,
      });
    }
    
    setIsDialogOpen(false);
    setFormStep(0);
    form.reset();
    paymentForm.reset();
  };

  return (
    <>
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
          
          <div
            className={cn(
              'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium',
              statusColors[status]
            )}
          >
            {status === 'live' ? 'LIVE NOW' : status === 'upcoming' ? 'UPCOMING' : 'COMPLETED'}
          </div>
          
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
          
          {status === 'upcoming' && timeRemaining && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-muted-foreground">Starts in</span>
                <span className="text-xs font-medium">{timeRemaining}</span>
              </div>
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
          
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
          
          <button 
            className="w-full mt-5 px-4 py-2.5 rounded-full bg-primary text-white font-medium transition-all hover:opacity-90"
            onClick={handleButtonClick}
          >
            {status === 'upcoming' ? 'Register Now' : status === 'live' ? 'Watch Live' : 'View Results'}
          </button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={(open) => {
        setIsDialogOpen(open);
        if (!open) {
          setFormStep(0);
          form.reset();
          paymentForm.reset();
        }
      }}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="pt-2">
              {formStep === 0 ? "Tournament Details" : 
               formStep === 1 ? "Payment Information" : 
               "Registration Form"}
            </DialogDescription>
          </DialogHeader>
          
          {formStep === 0 && (
            <div className="space-y-4 my-4">
              <div className="aspect-[16/9] overflow-hidden rounded-md">
                <img src={image} alt={title} className="w-full h-full object-cover" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Game</p>
                  <p className="font-medium">{game}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Prize Pool</p>
                  <p className="font-medium text-primary">{prize}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entry Fee</p>
                  <p className="font-medium">{entryFee || 'Free'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="font-medium">{participants.current}/{participants.max}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{status}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-1">Tournament Rules</p>
                <p className="text-sm">
                  Players must follow all game-specific rules and tournament guidelines. 
                  Fair play is expected and any form of cheating will result in disqualification.
                </p>
              </div>
              
              {status === 'upcoming' && timeRemaining && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Starts in</p>
                  <p className="font-medium">{timeRemaining}</p>
                </div>
              )}
            </div>
          )}

          {formStep === 1 && (
            <Form {...paymentForm}>
              <form onSubmit={paymentForm.handleSubmit(handlePayment)} className="space-y-4 py-4">
                <FormField
                  control={paymentForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Amount</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                          <Input 
                            type="number" 
                            placeholder="0.00" 
                            className="pl-8" 
                            {...field} 
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Entry fee for tournament: {entryFee || 'Free'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground mb-1">Payment Method</p>
                  <p className="text-sm font-medium">Cryptocurrency (ETH)</p>
                  {isConnected ? (
                    <div className="mt-2 p-2 bg-green-50 rounded border border-green-200 text-green-700 text-sm">
                      Wallet connected: {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : ''}
                    </div>
                  ) : (
                    <div className="mt-2 p-2 bg-amber-50 rounded border border-amber-200 text-amber-700 text-sm">
                      <div className="flex flex-col gap-2">
                        <span>Wallet not connected. You can connect now or later.</span>
                        <Button 
                          type="button" 
                          onClick={connectWallet} 
                          className="bg-amber-600 hover:bg-amber-700 text-white"
                        >
                          Connect Wallet
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                
                <DialogFooter className="mt-6">
                  <Button type="button" variant="outline" onClick={() => setFormStep(0)}>Back</Button>
                  <Button type="submit">Continue to Registration</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
          
          {formStep === 2 && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegister)} className="space-y-4 py-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gamer Tag</FormLabel>
                      <FormControl>
                        <Input placeholder="Your in-game name" {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be displayed to other participants.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormDescription>
                        We'll send tournament updates to this email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="agreeToRules"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 mt-1"
                          checked={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to the tournament rules and fair play guidelines
                        </FormLabel>
                        <FormDescription>
                          Breaking these rules may result in disqualification
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {!isConnected && (
                  <div className="p-3 bg-blue-50 rounded border border-blue-200 text-blue-700 text-sm mt-4">
                    <p className="mb-2">You haven't connected your wallet yet. You can still register now and connect your wallet later.</p>
                    <Button 
                      type="button" 
                      onClick={connectWallet} 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                )}
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setFormStep(1)}>Back</Button>
                  <Button type="submit">Complete Registration</Button>
                </DialogFooter>
              </form>
            </Form>
          )}
          
          {formStep === 0 && (
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={nextStep}>Register Now</Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TournamentCard;
