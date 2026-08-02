import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface QuickToastProps {
  message: string | null;
}

export const QuickToast: React.FC<QuickToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed left-1/2 top-[40%] z-50 flex w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-2xl border border-slate-800 bg-slate-950 px-5 py-4 text-sm font-bold leading-relaxed text-white shadow-2xl animate-bounce">
      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
      <span>{message}</span>
    </div>
  );
};
