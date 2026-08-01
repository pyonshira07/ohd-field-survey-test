import React from 'react';
import { Home, Plus, Trash2, Layers3 } from 'lucide-react';
import { BuildingInfo, SurveyReport } from '../types';

interface BuildingInfoSectionProps {
  report: SurveyReport;
  onChange: (updated: Partial<SurveyReport>) => void;
  onDraftSave: () => void;
}

export const BuildingInfoSection: React.FC<BuildingInfoSectionProps> = ({ report, onChange, onDraftSave }) => {
  const buildings = report.buildings || [];
  const [pendingDeleteIndex, setPendingDeleteIndex] = React.useState<number | null>(null);

  const calculateTotalFloorArea = (building: BuildingInfo) =>
    [building.area1F, building.area2F, building.area3F, building.areaBasement]
      .reduce((total, value) => total + (Number.parseFloat(value) || 0), 0);

  const updateBuilding = (index: number, updated: Partial<BuildingInfo>) => {
    const nextBuildings = [...buildings];
    nextBuildings[index] = { ...nextBuildings[index], ...updated };
    onChange({ buildings: nextBuildings });
  };

  const addBuilding = () => {
    const newBldg: BuildingInfo = {
      id: 'bldg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
      structure: '木造',
      structureSecondary: '',
      structureNote: '',
      ageUnknown: false,
      ageYears: '',
      roofAsRegistry: true,
      roofUnregistered: false,
      roofType: '瓦',
      roofTypeSecondary: '',
      roofNote: '',
      exteriorWall: 'モルタル',
      exteriorWallNote: '',
      manualDemolitionRatio: 0,
      manualDemolitionNote: '',
      areaAsRegistry: true,
      areaUnregistered: false,
      area1F: '',
      area2F: '',
      area3F: '',
      areaBasement: '',
      note: ''
    };
    onChange({ buildings: [...buildings, newBldg] });
  };

  const removeBuilding = (index: number) => {
    setPendingDeleteIndex(index);
  };

  const confirmDeleteBuilding = () => {
    if (pendingDeleteIndex === null) return;
    const nextBuildings = buildings.filter((_, i) => i !== pendingDeleteIndex);
    onChange({ buildings: nextBuildings });
    setPendingDeleteIndex(null);
  };

  return (
    <section className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">＜建物情報＞</h2>
          </div>
        </div>

        <button
          type="button"
          onClick={addBuilding}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <span>🏠 ＋建物を追加</span>
        </button>
      </div>

      <div className="space-y-6">
        {buildings.map((bldg, index) => (
          <div
            key={bldg.id || index}
            className="rounded-2xl border-2 border-slate-200 bg-slate-50/70 p-4 sm:p-5 space-y-4 relative"
          >
            {/* Header for individual building */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <span className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
                <Home className="w-4 h-4 text-amber-600" />
                ＜建物情報 {index + 1}＞
              </span>

                <button
                  type="button"
                  onClick={() => removeBuilding(index)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold border border-red-200 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>この建物を削除</span>
                </button>
            </div>

            {/* 【建物の構造】 & 【築年数】 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 【建物の構造】 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">【建物の構造】</label>
                <div className="flex items-center gap-2">
                  <select
                    value={bldg.structure}
                    onChange={(e) => updateBuilding(index, { structure: e.target.value })}
                    className="min-w-0 flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                  >
                    {['木造', '軽量鉄骨', '重量鉄骨', 'RC造', 'SRC造', '土蔵造', 'CB造'].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="shrink-0 text-lg font-extrabold text-amber-600" aria-label="複合構造">＋</span>
                  <select
                    value={bldg.structureSecondary || ''}
                    onChange={(e) => updateBuilding(index, { structureSecondary: e.target.value })}
                    className="min-w-0 flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                  >
                    <option value="">（なし）</option>
                    {['木造', '軽量鉄骨', '重量鉄骨', 'RC造', 'SRC造', '土蔵造', 'CB造'].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">複合構造の場合は、2つ目も選択してください。</p>
                <input
                  type="text"
                  value={bldg.structureNote || ''}
                  onChange={(e) => updateBuilding(index, { structureNote: e.target.value })}
                  placeholder="補足メモ（例：登記上は木・鉄骨造）"
                  className="mt-2 w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                />
              </div>

              {/* 【築年数】 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">【築年数】</label>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200/80 rounded-lg text-slate-800 text-xs font-bold cursor-pointer hover:bg-slate-200">
                    <input
                      type="checkbox"
                      checked={bldg.ageUnknown}
                      onChange={(e) => updateBuilding(index, { ageUnknown: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                    />
                    不明
                  </label>

                  {!bldg.ageUnknown && (
                    <div className="flex flex-1 items-center gap-2">
                      <select
                        value={bldg.ageEra || ''}
                        onChange={(e) => updateBuilding(index, { ageEra: e.target.value })}
                        aria-label="築年数の元号"
                        className="w-20 shrink-0 px-2 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                      >
                        <option value="">元号</option>
                        {['令和', '平成', '昭和', '大正'].map((era) => (
                          <option key={era} value={era}>{era}</option>
                        ))}
                      </select>
                      <div className="relative flex-1">
                        <input
                          type="number"
                          value={bldg.ageYears}
                          onChange={(e) => updateBuilding(index, { ageYears: e.target.value })}
                          placeholder="年数"
                          autoComplete="off"
                          className="w-full px-3 py-1.5 pr-8 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
                        />
                        <span className="absolute right-2.5 top-1.5 text-xs text-slate-500 font-bold">年</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* 【屋根】 & 【外壁】 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 【屋根】 */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <label className="text-xs font-bold text-slate-800">【屋根】</label>
                  <label className="inline-flex items-center gap-1.5 text-amber-900 text-[11px] font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bldg.roofAsRegistry}
                      onChange={(e) => updateBuilding(index, { roofAsRegistry: e.target.checked, roofUnregistered: e.target.checked ? false : bldg.roofUnregistered })}
                      className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    謄本通り
                  </label>
                  <label className="inline-flex items-center gap-1.5 text-slate-700 text-[11px] font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={bldg.roofUnregistered || false}
                      onChange={(e) => updateBuilding(index, { roofUnregistered: e.target.checked, roofAsRegistry: e.target.checked ? false : bldg.roofAsRegistry })}
                      className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500"
                    />
                    未登記
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={bldg.roofType}
                    onChange={(e) => updateBuilding(index, { roofType: e.target.value })}
                    className="min-w-0 flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                  >
                    {['瓦', 'スレート', 'トタン', '陸屋根', 'コンクリ', '草葺', '見えない'].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  <span className="shrink-0 text-lg font-extrabold text-amber-600" aria-label="複合屋根">＋</span>
                  <select
                    value={bldg.roofTypeSecondary || ''}
                    onChange={(e) => updateBuilding(index, { roofTypeSecondary: e.target.value })}
                    className="min-w-0 flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                  >
                    <option value="">（なし）</option>
                    {['瓦', 'スレート', 'トタン', '陸屋根', 'コンクリ', '草葺'].map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                <p className="mt-1 text-[11px] text-slate-500">複合屋根の場合は、2つ目も選択してください。</p>
                <input
                  type="text"
                  value={bldg.roofNote || ''}
                  onChange={(e) => updateBuilding(index, { roofNote: e.target.value })}
                  placeholder="補足メモ（例：一部陸屋根）"
                  className="mt-2 w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                />
              </div>

              {/* 【外壁】 */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">【外壁】</label>
                <select
                  value={bldg.exteriorWall}
                  onChange={(e) => updateBuilding(index, { exteriorWall: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-900 bg-white"
                >
                  {['モルタル', 'トタン', '木材', 'ALC', 'サイディング', 'タイル', 'コンクリ', 'スレート', '土壁', '不明'].map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={bldg.exteriorWallNote || ''}
                  onChange={(e) => updateBuilding(index, { exteriorWallNote: e.target.value })}
                  placeholder="補足メモ（例：一部タイル貼り）"
                  className="mt-2 w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-white"
                />
              </div>
            </div>

            {/* 【手壊し割合】 */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-800">【手壊し割合】</label>
              <div className="relative max-w-40">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={bldg.manualDemolitionRatio === 0 ? '' : bldg.manualDemolitionRatio}
                  onChange={(e) => {
                    const digits = e.target.value.replace(/[^0-9]/g, '');
                    updateBuilding(index, { manualDemolitionRatio: digits ? Number(digits) : 0 });
                  }}
                  placeholder="例：30"
                  className="w-full px-3 py-2 pr-8 rounded-lg border border-slate-300 text-sm font-semibold text-slate-900 bg-white"
                />
                <span className="absolute right-3 top-2.5 text-sm text-slate-500 font-bold">%</span>
              </div>
              <input
                type="text"
                value={bldg.manualDemolitionNote}
                onChange={(e) => updateBuilding(index, { manualDemolitionNote: e.target.value })}
                placeholder="補足メモ（例：2、3F全部と1F少し）"
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-slate-50"
              />
            </div>

            {/* 【実寸面積】 */}
            <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <Layers3 className="w-3.5 h-3.5 text-amber-600" />
                  【実寸面積】
                </label>
                <label className="inline-flex items-center gap-1.5 text-amber-900 text-[11px] font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bldg.areaAsRegistry}
                    onChange={(e) => updateBuilding(index, { areaAsRegistry: e.target.checked, areaUnregistered: e.target.checked ? false : bldg.areaUnregistered })}
                    className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500"
                  />
                  謄本通り
                </label>
                <label className="inline-flex items-center gap-1.5 text-slate-700 text-[11px] font-bold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={bldg.areaUnregistered || false}
                    onChange={(e) => updateBuilding(index, { areaUnregistered: e.target.checked, areaAsRegistry: e.target.checked ? false : bldg.areaAsRegistry })}
                    className="w-3.5 h-3.5 rounded text-amber-600 focus:ring-amber-500"
                  />
                  未登記
                </label>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div>
                  <span className="block text-[11px] font-semibold text-slate-600 mb-1">1F (㎡)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={bldg.area1F}
                      onChange={(e) => updateBuilding(index, { area1F: e.target.value })}
                      placeholder="0"
                      className="w-full px-2.5 py-1.5 pr-6 rounded-lg border border-slate-300 text-xs font-semibold bg-slate-50"
                    />
                    <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-bold">㎡</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-slate-600 mb-1">2F (㎡)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={bldg.area2F}
                      onChange={(e) => updateBuilding(index, { area2F: e.target.value })}
                      placeholder="0"
                      className="w-full px-2.5 py-1.5 pr-6 rounded-lg border border-slate-300 text-xs font-semibold bg-slate-50"
                    />
                    <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-bold">㎡</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-slate-600 mb-1">3F (㎡)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={bldg.area3F}
                      onChange={(e) => updateBuilding(index, { area3F: e.target.value })}
                      placeholder="0"
                      className="w-full px-2.5 py-1.5 pr-6 rounded-lg border border-slate-300 text-xs font-semibold bg-slate-50"
                    />
                    <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-bold">㎡</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[11px] font-semibold text-slate-600 mb-1">地下 (㎡)</span>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={bldg.areaBasement}
                      onChange={(e) => updateBuilding(index, { areaBasement: e.target.value })}
                      placeholder="0"
                      className="w-full px-2.5 py-1.5 pr-6 rounded-lg border border-slate-300 text-xs font-semibold bg-slate-50"
                    />
                    <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-bold">㎡</span>
                  </div>
                </div>
              </div>

              <p className="text-sm font-extrabold text-red-600">
                延べ床面積：{calculateTotalFloorArea(bldg).toLocaleString('ja-JP', { maximumFractionDigits: 1 })}㎡
              </p>

              <div>
                <input
                  type="text"
                  value={bldg.note}
                  onChange={(e) => updateBuilding(index, { note: e.target.value })}
                  placeholder="補足メモ (例: 2階が増築っぽい。外壁リフォームしてる？)"
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs text-slate-900 bg-slate-50"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={addBuilding}
          className="w-full max-w-xs py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold border border-slate-300 transition-colors flex items-center justify-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4 text-amber-600" />
          <span>🏠 ＋建物を追加</span>
        </button>
      </div>


      {pendingDeleteIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div role="dialog" aria-modal="true" aria-label="建物削除の確認" className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-200">
            <h3 className="text-base font-extrabold text-slate-900">建物を削除しますか？</h3>
            <p className="mt-2 text-sm text-slate-600">この操作は元に戻せません。</p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setPendingDeleteIndex(null)}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50"
              >
                キャンセル
              </button>
              <button
                type="button"
                onClick={confirmDeleteBuilding}
                className="flex-1 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-red-700"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="pt-4 flex justify-end">
        <button type="button" onClick={onDraftSave} className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 text-sm font-bold border border-slate-700 transition-all active:scale-95">
          一時保存【下書き】
        </button>
      </div>
    </section>
  );
};
