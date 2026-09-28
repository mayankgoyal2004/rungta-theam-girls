import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function CountdownTimer() {
  const targetDate = new Date('2026-10-21T09:00:00+05:30').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-slate-900/90 via-[#061c3b]/90 to-slate-900/90 border border-amber-500/30 rounded-2xl p-2.5 sm:p-3 shadow-xl shadow-black/40 backdrop-blur-md">
      <div className="flex items-center gap-2 px-3 text-amber-400 font-heading tracking-wider uppercase text-sm border-b sm:border-b-0 sm:border-r border-white/10 pb-2 sm:pb-0">
        <Clock className="w-4 h-4 text-red-500 animate-spin-slow" />
        <span className="font-bold">TOURNAMENT STARTS IN</span>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {units.map((unit, idx) => (
          <div key={idx} className="flex items-center gap-1.5 sm:gap-2">
            <div className="flex flex-col items-center bg-black/40 border border-white/10 rounded-xl px-2.5 py-1 min-w-[54px] sm:min-w-[60px]">
              <span className="font-heading font-black text-xl sm:text-2xl text-white tracking-wider leading-none">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-bold text-amber-400/90 tracking-widest mt-0.5">
                {unit.label}
              </span>
            </div>
            {idx < units.length - 1 && (
              <span className="text-amber-500 font-bold text-lg -mt-2 animate-pulse">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
