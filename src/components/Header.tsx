import React from 'react';
import { ClipboardList, PlusCircle, History, Sparkles, Trash2 } from 'lucide-react';

interface HeaderProps {
  onNewReport: () => void;
  onOpenHistory: () => void;
  onLoadSample: () => void;
  savedCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onNewReport,
  onOpenHistory,
  onLoadSample,
  savedCount,
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-sm shrink-0">
            <ClipboardList className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-white leading-tight tracking-wide flex items-center gap-2">
              現地調査報告【OHD専用】
            </h1>
            <p className="text-xs text-slate-400">入力自動保存・下書き保存機能搭載</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onLoadSample}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-medium transition-colors border border-slate-700 active:scale-95"
            title="サンプルデータを読み込む"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>サンプル入力</span>
          </button>

          <button
            onClick={onOpenHistory}
            type="button"
            className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700 active:scale-95"
          >
            <History className="w-3.5 h-3.5" />
            <span>保存履歴</span>
            {savedCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onNewReport}
            type="button"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors active:scale-95 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>新規作成</span>
          </button>
        </div>
      </div>
    </header>
  );
};
