import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface QuickToastProps {
  message: string | null;
}

export const QuickToast: React.FC<QuickToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-slate-950 text-white text-xs font-bold rounded-2xl shadow-2xl border border-slate-800 animate-bounce">
      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      <span>{message}</span>
    </div>
  );
};
