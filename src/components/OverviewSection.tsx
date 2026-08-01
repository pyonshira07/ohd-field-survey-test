import React from 'react';
import { MapPin, User, Calendar, Briefcase } from 'lucide-react';
import { SurveyReport } from '../types';
import { INSPECTOR_OPTIONS } from '../utils/sampleData';

interface OverviewSectionProps {
  report: SurveyReport;
  onChange: (updated: Partial<SurveyReport>) => void;
  onDraftSave: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ report, onChange, onDraftSave }) => {
  React.useEffect(() => {
    if (report.clientType === '依頼主' || report.clientType === '') {
      onChange({ clientType: 'オープンハウス' });
    }
  }, [report.clientType]);

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
          1
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-1.5">
            ＜案件概要＞
          </h2>
          <p className="text-xs text-slate-500">※現場住所、調査担当、調査日は必須入力です</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 【現場住所】 */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            【現場住所】※半角数字 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={report.siteAddress}
            onChange={(e) => onChange({ siteAddress: e.target.value })}
            placeholder="例: 東京都世田谷区桜丘1-2-3"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white transition-all"
            required
          />
        </div>

        {/* 【案件名】 */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            【案件名】
          </label>
          <input
            type="text"
            value={report.caseName || ''}
            onChange={(e) => onChange({ caseName: e.target.value })}
            placeholder="例：東大泉123II②"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white transition-all"
          />
        </div>

        {/* 【調査担当】 */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <User className="w-3.5 h-3.5 text-amber-600" />
            【調査担当】 <span className="text-red-500">*</span>
          </label>
          <select
            value={report.inspector}
            onChange={(e) => onChange({ inspector: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white transition-all"
          >
            <option value="">（選択してください）</option>
            {INSPECTOR_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>

        {/* 【調査日】 */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            【調査日】 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={report.surveyDate}
            onChange={(e) => onChange({ surveyDate: e.target.value })}
            placeholder="2026/07/29"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white transition-all"
            required
          />
        </div>

        {/* 【取引先】 */}
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-amber-600" />
            【取引先】
          </label>
          <p className="text-[11px] text-slate-500 mb-2">施主や元請けを記入</p>
          <div className="space-y-2">
            <input
              type="text"
              value={report.clientType}
              onChange={(e) => onChange({ clientType: e.target.value })}
              placeholder="オープンハウス"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-sm font-medium text-slate-900 bg-slate-50"
            />
          </div>
        </div>
      </div>
      <div className="pt-4 flex justify-end">
        <button type="button" onClick={onDraftSave} className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-sm font-bold border border-slate-700 transition-all active:scale-95">
          一時保存【下書き】
        </button>
      </div>
    </section>
  );
};
