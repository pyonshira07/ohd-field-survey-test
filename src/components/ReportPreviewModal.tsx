import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { SurveyReport } from '../types';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: SurveyReport;
  onConfirmSubmit: () => void;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  isOpen,
  onClose,
  report,
  onConfirmSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/60 p-4 backdrop-blur-sm sm:items-center" role="dialog" aria-modal="true" aria-label="調査内容の確認">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-bold tracking-wide text-amber-600">送信前確認</p>
            <h2 className="mt-1 text-lg font-extrabold text-slate-900">調査内容を確認してください</h2>
          </div>
          <button type="button" onClick={onClose} aria-label="確認画面を閉じる" className="rounded-xl p-2 text-slate-500 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[55vh] overflow-y-auto bg-slate-50 p-4">
          <pre className="whitespace-pre-wrap break-words rounded-xl border border-slate-200 bg-white p-4 text-xs leading-6 text-slate-700">{JSON.stringify(report, null, 2)}</pre>
        </div>
        <div className="flex gap-3 border-t border-slate-200 bg-white p-4">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700">修正する</button>
          <button type="button" onClick={onConfirmSubmit} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-extrabold text-slate-950 shadow-sm hover:bg-amber-400">
            <CheckCircle2 className="h-4 w-4" /> 報告を送信
          </button>
        </div>
      </div>
    </div>
  );
};
