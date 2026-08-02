import React from 'react';
import { Truck, ShieldAlert, Navigation, Car, PackageCheck, Layers } from 'lucide-react';
import { ScaffoldStatus, SurveyReport } from '../types';
import { DUMP_TRUCK_OPTIONS } from '../utils/sampleData';

interface BasicInfoSectionProps {
  report: SurveyReport;
  onChange: (updated: Partial<SurveyReport>) => void;
  onDraftSave: () => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({ report, onChange, onDraftSave }) => {
  const scaffoldOptions: ScaffoldStatus[] = ['⚪︎', '△', '×'];

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">＜基本情報＞</h2>
            <p className="text-xs text-slate-500">※不要な欄は空白のままでOKです</p>
          </div>
        </div>
      </div>

      {/* 【確認事項】 */}
      <div>
        <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
          【確認事項】（住人状況、治安、クレーム対策等）
        </label>
        <textarea
          rows={2}
          value={report.notesAndPrecautions}
          onChange={(e) => onChange({ notesAndPrecautions: e.target.value })}
          placeholder="住人近隣状況、近隣挨拶、治安、作業時間制限、クレーム予防対策など"
          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-slate-50 focus:bg-white transition-all"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 【使用ダンプ】 */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-amber-600" />
            【使用ダンプ】 <span className="text-red-500">※</span>
          </label>
          <select
            value={report.dumpTruckType}
            onChange={(e) => onChange({ dumpTruckType: e.target.value })}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-sm font-medium text-slate-900 bg-slate-50 focus:bg-white"
          >
            {DUMP_TRUCK_OPTIONS.map((opt) => (
              <option key={opt} value={opt === '選択してください' ? '' : opt}>
                {opt}
              </option>
            ))}
          </select>
          <label className="mt-3 block text-xs font-bold text-slate-700">
            【使用ダンプの根拠】
            <span className="ml-1 text-[10px] font-medium text-slate-500">※納得できる根拠を提示すること</span>
          </label>
          <textarea
            rows={3}
            value={report.dumpTruckReason}
            onChange={(e) => onChange({ dumpTruckReason: e.target.value })}
            placeholder="例: 道路規制により。正面は広いが来る途中に4tで曲がれない狭さの一本道あり。"
            className="mt-1 w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-slate-50 focus:bg-white transition-all"
          />
        </div>

        {/* 【道路規制】 */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-amber-600" />
            【道路規制】
          </label>
          <textarea
            rows={3}
            value={report.roadRestriction}
            onChange={(e) => onChange({ roadRestriction: e.target.value })}
            placeholder="3t規制"
            className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-amber-500 text-sm text-slate-900 bg-slate-50 focus:bg-white"
          />
        </div>
      </div>

      {/* 【道路幅/歩道幅/間口幅】 */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1">
            【道路幅/歩道幅/間口幅】
          </label>
          <label className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100/70 rounded-lg text-amber-900 text-xs font-bold cursor-pointer hover:bg-amber-100 transition-colors">
            <input
              type="checkbox"
              checked={report.isDeadEnd}
              onChange={(e) => onChange({ isDeadEnd: e.target.checked })}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
            />
            どんつき
          </label>
        </div>
        <p className="text-[11px] text-slate-500 italic">
          ※物理的にダンプが通れる最も広い幅を記入
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <span className="block text-[11px] font-semibold text-slate-600 mb-1">道路幅 (m)</span>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={report.roadWidth}
                onChange={(e) => onChange({ roadWidth: e.target.value })}
                placeholder="4.0"
                className="w-full px-3 py-2 pr-7 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
              />
              <span className="absolute right-2.5 top-2.5 text-xs text-slate-400 font-bold">m</span>
            </div>
          </div>

          <div>
            <span className="block text-[11px] font-semibold text-slate-600 mb-1">歩道幅 (m)</span>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={report.sidewalkWidth}
                onChange={(e) => onChange({ sidewalkWidth: e.target.value })}
                placeholder="1.0"
                className="w-full px-3 py-2 pr-7 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
              />
              <span className="absolute right-2.5 top-2.5 text-xs text-slate-400 font-bold">m</span>
            </div>
          </div>

          <div>
            <span className="block text-[11px] font-semibold text-slate-600 mb-1">間口幅 (m)</span>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={report.frontageWidth}
                onChange={(e) => onChange({ frontageWidth: e.target.value })}
                placeholder="3.5"
                className="w-full px-3 py-2 pr-7 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
              />
              <span className="absolute right-2.5 top-2.5 text-xs text-slate-400 font-bold">m</span>
            </div>
          </div>
        </div>

        <div>
          <input
            type="text"
            value={report.roadNote}
            onChange={(e) => onChange({ roadNote: e.target.value })}
            placeholder="補足メモ (例: カーポート壊せば4t余裕)"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 bg-white"
          />
        </div>
      </div>

      {/* 【交通量】 & 【手運び】 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 【交通量】 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-amber-600" />
            【交通量】
          </label>
          <div className="space-y-3">
            {[
              { key: 'trafficPedestrians', label: '通行人', value: report.trafficPedestrians ?? 1 },
              { key: 'trafficCars', label: '車', value: report.trafficCars ?? 1 }
            ].map((item) => (
              <div key={item.key} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <div className="flex w-[42%] shrink-0 items-center justify-between text-xs font-bold text-slate-700">
                  <span>{item.label}</span><span>{item.value} / 5</span>
                </div>
                <div className="min-w-0 flex-1">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="1"
                    value={item.value}
                    aria-label={`${item.label}の交通量`}
                    onChange={(e) => onChange({ [item.key]: Number(e.target.value) })}
                    className="w-full cursor-pointer accent-amber-500"
                  />
                  <div className="flex justify-between px-1 text-[10px] text-slate-500">
                    <span>少</span><span>多</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 【手運び】 */}
        <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
            <PackageCheck className="w-3.5 h-3.5 text-amber-600" />
            【手運び】
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-600 shrink-0">距離</span>
            <div className="relative flex-1">
              <input
                type="number"
                value={report.manualCarryDistance}
                onChange={(e) => onChange({ manualCarryDistance: e.target.value })}
                placeholder="10"
                className="w-full px-3 py-1.5 pr-7 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
              />
              <span className="absolute right-2.5 top-2 text-xs text-slate-400 font-bold">m</span>
            </div>
          </div>
          <input
            type="text"
            value={report.manualCarryNote}
            onChange={(e) => onChange({ manualCarryNote: e.target.value })}
            placeholder="補足 (例: 道路面ブロック取りなら手運び不要)"
            className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
          />
        </div>
      </div>

      {/* 【足場可否】 */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
        <label className="block text-xs font-bold text-slate-900 flex items-center gap-1">
          <Layers className="w-3.5 h-3.5 text-amber-600" />
          【足場可否】
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* 右 */}
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block text-center">右側</span>
            <div className="grid grid-cols-3 gap-1">
              {scaffoldOptions.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onChange({ scaffoldRight: st })}
                  className={`py-1.5 rounded-lg font-bold text-sm border transition-all ${
                    report.scaffoldRight === st
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* 左 */}
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block text-center">左側</span>
            <div className="grid grid-cols-3 gap-1">
              {scaffoldOptions.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onChange({ scaffoldLeft: st })}
                  className={`py-1.5 rounded-lg font-bold text-sm border transition-all ${
                    report.scaffoldLeft === st
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* 後 */}
          <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block text-center">後ろ側</span>
            <div className="grid grid-cols-3 gap-1">
              {scaffoldOptions.map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => onChange({ scaffoldBack: st })}
                  className={`py-1.5 rounded-lg font-bold text-sm border transition-all ${
                    report.scaffoldBack === st
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <input
            type="text"
            value={report.scaffoldNote}
            onChange={(e) => onChange({ scaffoldNote: e.target.value })}
            placeholder="補足メモ (例: 裏手狭小につき足場一部単管組み)"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 bg-white"
          />
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
