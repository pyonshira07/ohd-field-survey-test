import React, { useState } from 'react';
import { X, Copy, Check, Share2, Printer, Save, Download } from 'lucide-react';
import { SurveyReport } from '../types';
import { formatReportToText } from '../utils/formatReport';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: SurveyReport;
  onSaveReport: (report: SurveyReport) => void;
  showToast: (msg: string) => void;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  isOpen,
  onClose,
  report,
  onSaveReport,
  showToast,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const formattedText = formatReportToText(report);

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    showToast('報告テキストをクリップボードにコピーしました！');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSave = () => {
    onSaveReport(report);
    showToast('報告書を履歴に保存しました！');
    onClose();
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([formattedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `現地調査報告_${report.siteAddress || '案件'}_${report.surveyDate.replace(/\//g, '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('テキストファイルをダウンロードしました');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <Share2 className="w-5 h-5 text-amber-400" />
              報告送信・確認プレビュー
            </h3>
            <p className="text-xs text-slate-400">下記フォーマットのテキストをコピーして案件管理やLINEに送信できます</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Previews */}
        <div className="p-5 overflow-y-auto flex-1 space-y-4 bg-slate-50">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-inner">
            <pre className="font-mono text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed select-all">
              {formattedText}
            </pre>
          </div>
        </div>

        {/* Modal Footer / Actions */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadTxt}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>.txt保存</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Printer className="w-4 h-4 text-slate-600" />
              <span>印刷/PDF</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all active:scale-95 shadow-sm"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span>履歴に保存</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all active:scale-95 shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-400 text-slate-950'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>コピー完了！</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>テキストをコピー</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
