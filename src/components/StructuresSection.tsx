import React from 'react';
import { Box, TreeDeciduous, Trash, Fence, CheckSquare } from 'lucide-react';
import { SurveyReport } from '../types';
import { OTHER_STRUCTURE_OPTIONS } from '../utils/sampleData';

interface StructuresSectionProps {
  report: SurveyReport;
  onChange: (updated: Partial<SurveyReport>) => void;
  onDraftSave: () => void;
}

export const StructuresSection: React.FC<StructuresSectionProps> = ({ report, onChange, onDraftSave }) => {
  const toggleOtherStructure = (item: string) => {
    const current = report.otherStructures || [];
    if (current.includes(item)) {
      onChange({ otherStructures: current.filter((x) => x !== item) });
    } else {
      onChange({ otherStructures: [...current, item] });
    }
  };

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-5">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
          3
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-900">＜構造物＞</h2>
          <p className="text-xs text-slate-500">外構、樹木・庭石、残置物、ブロック塀等の解体数量</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 【土間/アスファルト】 */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
            <Box className="w-3.5 h-3.5 text-amber-600" />
            【土間 / アスファルト】
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <span className="block text-[11px] font-semibold text-slate-600 mb-1">土間 (㎡)</span>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={report.domaArea}
                  onChange={(e) => onChange({ domaArea: e.target.value })}
                  placeholder="0"
                  className="w-full px-3 py-2 pr-7 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
                />
                <span className="absolute right-2 top-2.5 text-xs text-slate-400 font-bold">㎡</span>
              </div>
            </div>
            <div>
              <span className="block text-[11px] font-semibold text-slate-600 mb-1">アスファルト (㎡)</span>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={report.asphaltArea}
                  onChange={(e) => onChange({ asphaltArea: e.target.value })}
                  placeholder="0"
                  className="w-full px-3 py-2 pr-7 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
                />
                <span className="absolute right-2 top-2.5 text-xs text-slate-400 font-bold">㎡</span>
              </div>
            </div>
          </div>
        </div>

        {/* 【樹木類/庭石類】 */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
          <label className="block text-xs font-bold text-slate-800 flex items-center gap-1">
            <TreeDeciduous className="w-3.5 h-3.5 text-amber-600" />
            【樹木類 / 庭石類】
          </label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="block text-[11px] font-semibold text-slate-600 mb-1">樹木 (㎥)</span>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={report.treeVolume}
                  onChange={(e) => onChange({ treeVolume: e.target.value })}
                  placeholder="0"
                  className="w-full px-2.5 py-2 pr-6 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
                />
                <span className="absolute right-1.5 top-2.5 text-xs text-slate-400 font-bold">㎥</span>
              </div>
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-slate-600 mb-1">庭石 (㎥)</span>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  value={report.stoneVolume}
                  onChange={(e) => onChange({ stoneVolume: e.target.value })}
                  placeholder="0"
                  className="w-full px-2.5 py-2 pr-6 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
                />
                <span className="absolute right-1.5 top-2.5 text-xs text-slate-400 font-bold">㎥</span>
              </div>
            </div>

            <div>
              <span className="block text-[11px] font-semibold text-slate-600 mb-1">見えない庭石</span>
              <div className="relative">
                <input
                  type="number"
                  step="1"
                  min="0"
                  max="100"
                  value={report.hiddenStoneRatio}
                  onChange={(e) => onChange({ hiddenStoneRatio: e.target.value })}
                  placeholder="0"
                  className="w-full px-2.5 py-2 pr-6 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
                />
                <span className="absolute right-1.5 top-2.5 text-xs text-slate-400 font-bold">％</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 【残置物】 */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1">
            <Trash className="w-3.5 h-3.5 text-amber-600" />
            【残置物】
          </label>
          <label className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 rounded-lg text-amber-900 text-xs font-bold cursor-pointer hover:bg-amber-200 transition-colors">
            <input
              type="checkbox"
              checked={report.interiorChecked}
              onChange={(e) => onChange({ interiorChecked: e.target.checked })}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
            />
            室内確認済
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <span className="block text-[11px] font-semibold text-slate-600 mb-1">室外 (㎥)</span>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={report.outdoorLeftoverVolume}
                onChange={(e) => onChange({ outdoorLeftoverVolume: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 pr-7 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
              />
              <span className="absolute right-2.5 top-2.5 text-xs text-slate-400 font-bold">㎥</span>
            </div>
          </div>

          <div>
            <span className="block text-[11px] font-semibold text-slate-600 mb-1">室内 (㎥)</span>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={report.indoorLeftoverVolume}
                onChange={(e) => onChange({ indoorLeftoverVolume: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 pr-7 rounded-lg border border-slate-300 text-sm font-semibold bg-white"
              />
              <span className="absolute right-2.5 top-2.5 text-xs text-slate-400 font-bold">㎥</span>
            </div>
          </div>
        </div>
      </div>

      {/* 【ブロック塀】※道路面のみ */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1">
            <Fence className="w-3.5 h-3.5 text-amber-600" />
            【ブロック塀】※道路面のみ
          </label>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div>
            <span className="block text-[11px] font-semibold text-slate-600 mb-1">コンクリ (㎡)</span>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={report.concreteBlockArea}
                onChange={(e) => onChange({ concreteBlockArea: e.target.value })}
                placeholder="0"
                className="w-full px-2.5 py-1.5 pr-6 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
              />
              <span className="absolute right-2 top-2 text-[11px] text-slate-400 font-bold">㎡</span>
            </div>
          </div>

          <div>
            <span className="block text-[11px] font-semibold text-slate-600 mb-1">万年塀 (㎡)</span>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={report.mannenBlockArea}
                onChange={(e) => onChange({ mannenBlockArea: e.target.value })}
                placeholder="0"
                className="w-full px-2.5 py-1.5 pr-6 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
              />
              <span className="absolute right-2 top-2 text-[11px] text-slate-400 font-bold">㎡</span>
            </div>
          </div>

          <div>
            <span className="block text-[11px] font-semibold text-slate-600 mb-1">フェンス (㎡)</span>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={report.fenceArea}
                onChange={(e) => onChange({ fenceArea: e.target.value })}
                placeholder="0"
                className="w-full px-2.5 py-1.5 pr-6 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
              />
              <span className="absolute right-2 top-2 text-[11px] text-slate-400 font-bold">㎡</span>
            </div>
          </div>

          <div>
            <span className="block text-[11px] font-semibold text-slate-600 mb-1">大谷石 (㎡)</span>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={report.otaniStoneArea}
                onChange={(e) => onChange({ otaniStoneArea: e.target.value })}
                placeholder="0"
                className="w-full px-2.5 py-1.5 pr-6 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
              />
              <span className="absolute right-2 top-2 text-[11px] text-slate-400 font-bold">㎡</span>
            </div>
          </div>
        </div>
      </div>

      {/* ＜その他構造物＞ ※複数選択可 */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
        <label className="block text-xs font-bold text-slate-900 flex items-center gap-1">
          <CheckSquare className="w-3.5 h-3.5 text-amber-600" />
          【その他構造物】 ※複数選択可
        </label>

        <div className="flex flex-wrap gap-2">
          {OTHER_STRUCTURE_OPTIONS.map((item) => {
            const selected = (report.otherStructures || []).includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => toggleOtherStructure(item)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  selected
                    ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                }`}
              >
                <span>{selected ? '✓' : '＋'}</span>
                <span>{item}</span>
              </button>
            );
          })}
        </div>

        <div>
          <input
            type="text"
            value={report.otherStructuresCustom}
            onChange={(e) => onChange({ otherStructuresCustom: e.target.value })}
            placeholder="越境物、電線、電柱等"
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
