import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { SurveyReport } from './types';
import { createEmptyReport, createSampleReport } from './utils/sampleData';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { BasicInfoSection } from './components/BasicInfoSection';
import { StructuresSection } from './components/StructuresSection';
import { BuildingInfoSection } from './components/BuildingInfoSection';
import { ReportPreviewModal } from './components/ReportPreviewModal';
import { HistoryListModal } from './components/HistoryListModal';
import { QuickToast } from './components/QuickToast';

const LOCAL_STORAGE_HISTORY_KEY = 'demolition_survey_reports_history';
const LOCAL_STORAGE_DRAFT_KEY = 'demolition_survey_report_draft';
const SURVEY_AUTOMATION_API_URL = 'https://script.google.com/macros/s/AKfycbyyYtJpyynOyv4WcfstPfATl-G7YzoKp4o8kZtJ92eodnXbTJL34T-zpjc6iMu6u1qN/exec';

export default function App() {
  const [report, setReport] = useState<SurveyReport>(() => {
    try {
      const savedDraft = localStorage.getItem(LOCAL_STORAGE_DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        // 旧テンプレートの例文だけを、入力値ではなくplaceholderとして扱うための一度きりの移行。
        const dumpTruckTypeMap: Record<string, string> = {
          '2tダンプ': '2t',
          '3tダンプ': '3t',
          '4tダンプ': '4t',
          '4tロング': '4t',
          '10tダンプ': '大型',
        };
        const legacyOtherStructure = '越境物、電線、電柱等';

        return {
          ...parsed,
          inspector: ['萩嶋', '浅野', '星川', '白戸'].includes(parsed.inspector) ? parsed.inspector : '',
          dumpTruckType: dumpTruckTypeMap[parsed.dumpTruckType] ?? parsed.dumpTruckType,
          dumpTruckReason: parsed.dumpTruckReason ?? '',
          roadRestriction: parsed.roadRestriction === '3t規制' ? '' : parsed.roadRestriction,
          otherStructures: Array.isArray(parsed.otherStructures)
            ? parsed.otherStructures.filter((item: string) => item !== legacyOtherStructure)
            : [],
          otherStructuresCustom:
            Array.isArray(parsed.otherStructures) && parsed.otherStructures.includes(legacyOtherStructure) && !parsed.otherStructuresCustom
              ? legacyOtherStructure
              : parsed.otherStructuresCustom,
          buildings: Array.isArray(parsed.buildings)
            ? parsed.buildings.map((building: any) => ({
                ...building,
                manualDemolitionNote:
                  building.manualDemolitionNote === '2,3F全部と1F少し' ? '' : building.manualDemolitionNote,
                note:
                  building.note === '2階が増築っぽい。外壁リフォームしてる？' ? '' : building.note,
              }))
            : parsed.buildings,
        };
      }
    } catch (e) {
      console.error('Failed to parse draft from localStorage', e);
    }
    return createEmptyReport();
  });

  const [savedReports, setSavedReports] = useState<SurveyReport[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse history from localStorage', e);
    }
    return [];
  });

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSubmissionCompleteOpen, setIsSubmissionCompleteOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResubmission, setIsResubmission] = useState(false);
  const [isNewReportConfirmOpen, setIsNewReportConfirmOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Auto-save draft on report change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_DRAFT_KEY, JSON.stringify(report));
    } catch (e) {
      console.error('Failed to save draft', e);
    }
  }, [report]);

  // Save history array on change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(savedReports));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  }, [savedReports]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleUpdateReport = (updatedFields: Partial<SurveyReport>) => {
    setReport((prev) => ({
      ...prev,
      ...updatedFields,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSaveReportToHistory = (reportToSave: SurveyReport) => {
    setSavedReports((prev) => {
      const index = prev.findIndex((r) => r.id === reportToSave.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = { ...reportToSave, updatedAt: new Date().toISOString() };
        return updated;
      } else {
        return [
          { ...reportToSave, updatedAt: new Date().toISOString() },
          ...prev,
        ];
      }
    });
  };

  const handleDeleteReport = (id: string) => {
    setSavedReports((prev) => prev.filter((r) => r.id !== id));
  };

  const handleNewReport = () => {
    setIsNewReportConfirmOpen(true);
  };

  const createNewReport = () => {
    const newEmpty = createEmptyReport();
    setReport(newEmpty);
    try {
      localStorage.setItem(LOCAL_STORAGE_DRAFT_KEY, JSON.stringify(newEmpty));
    } catch (e) {
      console.error('Failed to prepare new report draft', e);
    }
    setIsNewReportConfirmOpen(false);
    setIsSubmissionCompleteOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('新しい現地調査を開始できます');
  };

  const handleLoadSample = () => {
    const sample = createSampleReport();
    setReport(sample);
    showToast('サンプルデータを入力欄に適用しました');
  };

  const handleDraftSave = () => {
    const draftReport: SurveyReport = {
      ...report,
      status: 'draft',
      updatedAt: new Date().toISOString(),
    };
    setReport(draftReport);
    handleSaveReportToHistory(draftReport);
    showToast('下書きを一時保存しました！一覧からいつでも再編集できます');
  };

  const handleOpenSubmissionPreview = () => {
    if (!report.siteAddress.trim() || !report.inspector.trim() || !report.surveyDate.trim() || !report.dumpTruckType.trim()) {
      showToast('必須項目（現場住所・調査担当・調査日・使用ダンプ）を入力してください');
      return;
    }

    setIsPreviewOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (isSubmitting) return;
    const isResubmitting = report.status === 'submitted';

    const submittedReport: SurveyReport = {
      ...report,
      status: 'submitted',
      updatedAt: new Date().toISOString(),
    };

    setIsSubmitting(true);
    const payload = JSON.stringify({ report: submittedReport });
    try {
      // 見積書の複製・計算はGAS側で数十秒かかる。ブラウザが処理完了を待つと
      // 現場では通信切断のように見えるため、送信をキューへ渡した時点で画面を完了にする。
      // sendBeacon は画面遷移後も送信を継続でき、同一 report.id はGAS側で重複作成しない。
      const body = new Blob([payload], { type: 'text/plain;charset=utf-8' });
      const queued = typeof navigator.sendBeacon === 'function'
        && navigator.sendBeacon(SURVEY_AUTOMATION_API_URL, body);

      if (!queued) {
        void fetch(SURVEY_AUTOMATION_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          keepalive: true,
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: payload,
        });
      }
    } catch {
      showToast('送信の受付を開始できませんでした。通信状況を確認して、もう一度送信してください。');
      return;
    } finally {
      setIsSubmitting(false);
    }

    setIsResubmission(isResubmitting);
    handleSaveReportToHistory(submittedReport);
    // 送信済み案件のIDを入力画面に残すと、次の現場が再送信として同じ見積書を更新してしまう。
    // 履歴には送信内容を残し、画面と自動保存用下書きは必ず新規IDの白紙案件へ切り替える。
    const nextReport = createEmptyReport();
    setReport(nextReport);
    try {
      localStorage.setItem(LOCAL_STORAGE_DRAFT_KEY, JSON.stringify(nextReport));
    } catch (e) {
      console.error('Failed to prepare next report draft', e);
    }
    setIsPreviewOpen(false);
    setIsSubmissionCompleteOpen(true);
    showToast('報告を受け付けました。案件フォルダ・見積書をバックグラウンドで作成します。');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      <Header
        onNewReport={handleNewReport}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onLoadSample={handleLoadSample}
        savedCount={savedReports.length}
      />

      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-6 space-y-6">
        {/* Main Survey Form */}
        {/* Deliberately not a <form>: mobile IME "決定" / Enter must never open the send preview. */}
        <div className="space-y-6">
          <OverviewSection report={report} onChange={handleUpdateReport} onDraftSave={handleDraftSave} />
          <BasicInfoSection report={report} onChange={handleUpdateReport} onDraftSave={handleDraftSave} />
          <StructuresSection report={report} onChange={handleUpdateReport} onDraftSave={handleDraftSave} />
          <BuildingInfoSection report={report} onChange={handleUpdateReport} onDraftSave={handleDraftSave} />

          <div className="pt-2 pb-4">
            <button
              type="button"
              onClick={handleOpenSubmissionPreview}
              className="w-full py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-[0.99] border border-amber-400"
            >
              <Send className="w-5 h-5" />
              <span>調査内容を確認・送信</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 py-6 bg-slate-900 border-t border-slate-800 text-slate-400 text-xs text-center">
        <p className="font-semibold text-slate-300">解体業 現地調査報告システム FMT</p>
        <p className="text-[11px] text-slate-500 mt-1">新案件管理連携用｜写真・謄本スキャンなし</p>
      </footer>

      {/* Modals & Toast */}
      <ReportPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        report={report}
        onConfirmSubmit={handleConfirmSubmit}
        isSubmitting={isSubmitting}
      />

      {isSubmissionCompleteOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-label="報告送信完了" className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-emerald-500" />
            <h2 className="text-lg font-extrabold text-slate-900">報告送信完了。画面を閉じてOKです。</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">見積もり作成には1〜2分ほどかかります。</p>
            {isResubmission && (
              <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-left text-xs font-bold leading-relaxed text-amber-900">自動作成した見積書の計算結果が更新されました。</p>
            )}
            <p className="mt-4 text-left text-xs leading-relaxed text-slate-500">送信後に再び内容を変更したい場合は、画面上の保存履歴から対象の案件を選択して編集・再送信が可能です。</p>
            <button type="button" onClick={createNewReport} className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-extrabold text-amber-400 transition-colors hover:bg-slate-800">新規案件を作成</button>
          </div>
        </div>
      )}

      {isNewReportConfirmOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-label="新規案件作成の確認" className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <h2 className="text-lg font-extrabold text-slate-900">新規案件を作成しますか？</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">現在入力している内容は白紙になります。必要な内容は先に一時保存してください。</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => setIsNewReportConfirmOpen(false)} className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 transition-colors hover:bg-slate-50">いいえ</button>
              <button type="button" onClick={createNewReport} className="flex-1 rounded-xl bg-amber-500 px-4 py-3 text-sm font-extrabold text-slate-950 transition-colors hover:bg-amber-400">はい、新規作成</button>
            </div>
          </div>
        </div>
      )}

      <HistoryListModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        reports={savedReports}
        onSelectReport={(selected) => setReport(selected)}
        onDeleteReport={handleDeleteReport}
        showToast={showToast}
      />

      <QuickToast message={toastMessage} />
    </div>
  );
}
