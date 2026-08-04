import React from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { SurveyReport } from '../types';
import { formatAreaValue, toAreaHundredths } from '../utils/area';

interface ReportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: SurveyReport;
  onConfirmSubmit: () => void;
  isSubmitting: boolean;
}

export const ReportPreviewModal: React.FC<ReportPreviewModalProps> = ({
  isOpen,
  onClose,
  report,
  onConfirmSubmit,
  isSubmitting,
}) => {
  React.useEffect(() => {
    if (!isOpen) return;

    const scrollY = window.scrollY;
    const originalPosition = document.body.style.position;
    const originalTop = document.body.style.top;
    const originalWidth = document.body.style.width;
    const originalOverflow = document.body.style.overflow;

    // モバイルでポップアップの外側をスワイプしても、背面の入力画面は動かさない。
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.position = originalPosition;
      document.body.style.top = originalTop;
      document.body.style.width = originalWidth;
      document.body.style.overflow = originalOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const formatArea = (value: string) => (value ? `${formatAreaValue(value)}㎡` : '未入力');
  const formatLength = (value: string) => (value ? `${value}m` : '未入力');
  const NoteRow = ({ label, value }: { label: string; value?: string }) => (
    <>
      <dt className="col-span-2 mt-1 text-slate-500">{label}</dt>
      <dd className="col-span-2 whitespace-pre-wrap rounded-lg bg-slate-50 px-2.5 py-2 text-sm font-semibold leading-relaxed text-slate-800">
        {value?.trim() || 'なし'}
      </dd>
    </>
  );
  const formatBuilding = (building: SurveyReport['buildings'][number], index: number) => {
    const structure = [building.structure, building.structureSecondary].filter(Boolean).join(' ＋ ') || '未入力';
    const roof = [building.roofType, building.roofTypeSecondary].filter(Boolean).join(' ＋ ') || '未入力';
    const areas = [building.area1F, building.area2F, building.area3F, building.areaBasement];
    const hasArea = areas.some((value) => value !== '');
    const totalArea = areas.reduce((total, value) => total + toAreaHundredths(value), 0) / 100;

    return (
      <section key={building.id} className="rounded-xl border border-slate-200 bg-white p-4">
        <h3 className="text-sm font-extrabold text-slate-900">建物 {index + 1}</h3>
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <dt className="text-slate-500">構造</dt><dd className="font-semibold text-slate-800">{structure}</dd>
          <NoteRow label="構造の記述" value={building.structureNote} />
          <dt className="text-slate-500">築年数</dt><dd className="font-semibold text-slate-800">{building.ageUnknown ? '不明' : [building.ageEra, building.ageYears && `${building.ageYears}年`].filter(Boolean).join(' ') || '未入力'}</dd>
          <dt className="text-slate-500">屋根</dt><dd className="font-semibold text-slate-800">{roof}</dd>
          <NoteRow label="屋根の記述" value={building.roofNote} />
          <dt className="text-slate-500">外壁</dt><dd className="font-semibold text-slate-800">{building.exteriorWall || '未入力'}</dd>
          <NoteRow label="外壁の記述" value={building.exteriorWallNote} />
          <dt className="text-slate-500">手壊し割合</dt><dd className="font-semibold text-slate-800">{building.manualDemolitionRatio || 0}%</dd>
          <NoteRow label="手壊しの記述" value={building.manualDemolitionNote} />
          <dt className="text-slate-500">実寸面積</dt><dd className="font-semibold text-slate-800">{hasArea ? `${formatAreaValue(totalArea)}㎡` : '未入力'}</dd>
          <NoteRow label="実寸面積の記述" value={building.note} />
        </dl>
      </section>
    );
  };

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
        <div className="max-h-[55vh] space-y-3 overflow-y-auto overscroll-y-contain bg-slate-50 p-4">
          <div className="rounded-xl border border-red-300 bg-red-50 p-3 text-sm font-bold leading-relaxed text-red-800">
            <p>【重要】現地調査を不十分なまま報告すると、見積もりの精度が下がり、受注金額で負けたり大きな赤字につながるおそれがあります。</p>
            <p className="mt-1">すべての項目を現地で責任を持って確認し、正確に記入してください。</p>
          </div>
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-extrabold text-slate-900">案件概要</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-slate-500">案件名</dt><dd className="font-semibold text-slate-800">{report.caseName || '未入力'}</dd>
              <dt className="text-slate-500">現場住所</dt><dd className="font-semibold text-slate-800">{report.siteAddress || '未入力'}</dd>
              <dt className="text-slate-500">調査担当</dt><dd className="font-semibold text-slate-800">{report.inspector || '未入力'}</dd>
              <dt className="text-slate-500">調査日</dt><dd className="font-semibold text-slate-800">{report.surveyDate || '未入力'}</dd>
              <dt className="text-slate-500">取引先</dt><dd className="font-semibold text-slate-800">{report.clientType || '未入力'}</dd>
            </dl>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-extrabold text-slate-900">基本情報</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <NoteRow label="確認事項" value={report.notesAndPrecautions} />
              <dt className="text-slate-500">使用ダンプ</dt><dd className="font-semibold text-slate-800">{report.dumpTruckType || '未入力'}</dd>
              <NoteRow label="使用ダンプの根拠" value={report.dumpTruckReason} />
              <dt className="text-slate-500">道路規制</dt><dd className="font-semibold text-slate-800">{report.roadRestriction || 'なし'}</dd>
              <dt className="text-slate-500">道路幅 / 歩道幅 / 間口幅</dt><dd className="font-semibold text-slate-800">{[report.roadWidth, report.sidewalkWidth, report.frontageWidth].map(formatLength).join(' / ')}</dd>
              <dt className="text-slate-500">どんつき</dt><dd className="font-semibold text-slate-800">{report.isDeadEnd ? 'あり' : 'なし'}</dd>
              <NoteRow label="道路幅・歩道幅・間口幅の記述" value={report.roadNote} />
              <dt className="text-slate-500">交通量</dt><dd className="font-semibold text-slate-800">通行人 {report.trafficPedestrians ?? '-'} / 車 {report.trafficCars ?? '-'}</dd>
              <dt className="text-slate-500">手運び距離</dt><dd className="font-semibold text-slate-800">{formatLength(report.manualCarryDistance)}</dd>
              <NoteRow label="手運びの記述" value={report.manualCarryNote} />
              <dt className="text-slate-500">足場可否</dt><dd className="font-semibold text-slate-800">右 {report.scaffoldRight || '-'} / 左 {report.scaffoldLeft || '-'} / 後 {report.scaffoldBack || '-'}</dd>
              <NoteRow label="足場の記述" value={report.scaffoldNote} />
            </dl>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-extrabold text-slate-900">構造物</h3>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <dt className="text-slate-500">土間 / アスファルト</dt><dd className="font-semibold text-slate-800">{formatArea(report.domaArea)} / {formatArea(report.asphaltArea)}</dd>
              <dt className="text-slate-500">樹木 / 庭石</dt><dd className="font-semibold text-slate-800">{report.treeVolume || '未入力'}㎥ / {report.stoneVolume || '未入力'}㎥</dd>
              <dt className="text-slate-500">見えない庭石</dt><dd className="font-semibold text-slate-800">{report.hiddenStoneRatio ? `${report.hiddenStoneRatio}%` : '未入力'}</dd>
              <dt className="text-slate-500">残置物</dt><dd className="font-semibold text-slate-800">室外 {report.outdoorLeftoverVolume || '未入力'}㎥ / 室内 {report.indoorLeftoverVolume || '未入力'}㎥</dd>
              <dt className="text-slate-500">室内確認済</dt><dd className="font-semibold text-slate-800">{report.interiorChecked ? '確認済' : '未確認'}</dd>
              <dt className="text-slate-500">ブロック塀</dt><dd className="font-semibold text-slate-800">コンクリ {formatArea(report.concreteBlockArea)} / 万年塀 {formatArea(report.mannenBlockArea)} / フェンス {formatArea(report.fenceArea)} / 大谷石 {formatArea(report.otaniStoneArea)}</dd>
              <NoteRow label="ブロック塀の記述" value={report.blockWallNote} />
              <dt className="text-slate-500">その他構造物</dt><dd className="font-semibold text-slate-800">{report.otherStructures.length ? report.otherStructures.join('、') : 'なし'}</dd>
              <NoteRow label="その他構造物の記述" value={report.otherStructuresCustom} />
            </dl>
          </section>

          <div className="space-y-3">
            <h3 className="px-1 text-sm font-extrabold text-slate-900">建物情報</h3>
            {report.buildings.length ? report.buildings.map(formatBuilding) : <p className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">建物情報なし</p>}
          </div>
        </div>
        <div className="flex gap-3 border-t border-slate-200 bg-white p-4">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700">修正する</button>
          <button type="button" onClick={onConfirmSubmit} disabled={isSubmitting} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-extrabold text-slate-950 shadow-sm hover:bg-amber-400 disabled:cursor-wait disabled:opacity-70">
            <CheckCircle2 className="h-4 w-4" /> {isSubmitting ? '送信中...' : '報告を送信'}
          </button>
        </div>
      </div>
    </div>
  );
};
