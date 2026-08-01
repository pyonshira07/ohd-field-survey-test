import React, { useState } from 'react';
import { X, Search, FileText, Trash2, ExternalLink, Copy, Check, Download, Table } from 'lucide-react';
import { SurveyReport } from '../types';
import { formatReportToText, formatReportsToCSV } from '../utils/formatReport';

interface HistoryListModalProps {
  isOpen: boolean;
  onClose: () => void;
  reports: SurveyReport[];
  onSelectReport: (report: SurveyReport) => void;
  onDeleteReport: (id: string) => void;
  showToast: (msg: string) => void;
}

export const HistoryListModal: React.FC<HistoryListModalProps> = ({
  isOpen,
  onClose,
  reports,
  onSelectReport,
  onDeleteReport,
  showToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'submitted'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredReports = reports.filter((r) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      (r.siteAddress || '').toLowerCase().includes(term) ||
      (r.inspector || '').toLowerCase().includes(term) ||
      (r.surveyDate || '').includes(term) ||
      (r.notesAndPrecautions || '').toLowerCase().includes(term);

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'draft'
        ? r.status === 'draft'
        : r.status === 'submitted';

    return matchesSearch && matchesStatus;
  });

  const handleCopy = (report: SurveyReport) => {
    const text = formatReportToText(report);
    navigator.clipboard.writeText(text);
    setCopiedId(report.id);
    showToast('報告テキストをコピーしました');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportCSV = () => {
    const csvContent = formatReportsToCSV(filteredReports.length > 0 ? filteredReports : reports);
    if (!csvContent) {
      showToast('出力するデータがありません');
      return;
    }
    // Add UTF-8 BOM so Excel and Google Sheets display Japanese characters correctly
    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `現地調査報告_一覧データ_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('スプレッドシート用CSVを出力しました！');
  };

  const handleExportAll = () => {
    const blob = new Blob([JSON.stringify(reports, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `現地調査報告_履歴一括バックアップ_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('全件バックアップJSONを出力しました');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="text-base font-extrabold flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              保存・送信済み報告 一覧 ({reports.length}件)
            </h3>
            <p className="text-xs text-slate-400">下書き及び送信済みの調査報告を再編集できます。</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Actions bar */}
        <div className="p-3 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="住所、担当者、日付で検索..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-200 p-1 rounded-xl shrink-0">
              {(['all', 'draft', 'submitted'] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setStatusFilter(filter)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                    statusFilter === filter
                      ? 'bg-slate-900 text-amber-400 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {filter === 'all' ? 'すべて' : filter === 'draft' ? '一時保存' : '送信済'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {reports.length > 0 && (
              <>
                <button
                  type="button"
                  onClick={handleExportCSV}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                  title="Googleスプレッドシート / Excel用のCSVを出力"
                >
                  <Table className="w-3.5 h-3.5" />
                  <span>スプレッドシート用CSV出力</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-600" />
                  <span>JSONバックアップ</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* List Content */}
        <div className="p-4 overflow-y-auto flex-1 space-y-3 bg-slate-50">
          {filteredReports.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <FileText className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
              <p className="text-sm font-semibold">該当する報告書が見つかりません</p>
              <p className="text-xs text-slate-400">新しい現地調査報告を作成・一時保存してください</p>
            </div>
          ) : (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="p-4 bg-white rounded-xl border border-slate-200 hover:border-amber-400 shadow-sm transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded border ${
                          report.status === 'draft'
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        }`}
                      >
                        {report.status === 'draft' ? '一時保存(下書き)' : '送信済み'}
                      </span>
                      <h4 className="text-sm font-bold text-slate-900">
                        {report.siteAddress || '（住所未入力）'}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                      <span>担当: <strong className="text-slate-800">{report.inspector || '未設定'}</strong></span>
                      <span>調査日: <strong className="text-slate-800">{report.surveyDate || '未設定'}</strong></span>
                      <span>依頼区分: <strong className="text-slate-800">{report.clientType || 'ー'}</strong></span>
                      <span>建物数: <strong className="text-slate-800">{(report.buildings || []).length}棟</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleCopy(report)}
                      className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="テキストコピー"
                    >
                      {copiedId === report.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-slate-600" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onSelectReport(report);
                        onClose();
                        showToast('報告書を編集画面に読み込みました');
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>編集/開く</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (confirm('この報告書履歴を削除してもよろしいですか？')) {
                          onDeleteReport(report.id);
                          showToast('報告書を削除しました');
                        }
                      }}
                      className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                      title="削除"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {report.notesAndPrecautions && (
                  <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-2">
                    <strong className="text-slate-700">確認事項:</strong> {report.notesAndPrecautions}
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
