import { SurveyReport } from '../types';

export function formatReportToText(report: SurveyReport): string {
  const lines: string[] = [];

  lines.push('現地調査 報告FMT');
  lines.push('新案件管理連携用｜写真・謄本スキャンなし');
  lines.push('');
  lines.push('＜案件概要＞');
  lines.push(`【現場住所】※半角数字 *`);
  lines.push(report.siteAddress || '（未記入）');
  lines.push(`【調査担当】*`);
  lines.push(report.inspector || '（未記入）');
  lines.push(`【調査日】*`);
  lines.push(report.surveyDate || '');
  lines.push(`【依頼主 / 元請】※手入力可`);
  lines.push(report.clientType || '');
  lines.push('');

  lines.push('＜基本情報＞※不要な欄は空白でOK！');
  lines.push('【確認事項】');
  lines.push(report.notesAndPrecautions || 'なし');
  lines.push('【使用ダンプ】');
  lines.push(report.dumpTruckType || '（選択なし）');
  lines.push('【道路規制】');
  lines.push(report.roadRestriction || 'なし');
  lines.push('【道路幅/歩道幅/間口幅】');
  if (report.isDeadEnd) {
    lines.push('どんつき');
  }
  lines.push('※物理的にダンプが通れる最も広い幅を記入');
  lines.push(`道路幅: ${report.roadWidth ? report.roadWidth + 'm' : ''}`);
  lines.push(`歩道幅: ${report.sidewalkWidth ? report.sidewalkWidth + 'm' : ''}`);
  lines.push(`間口幅: ${report.frontageWidth ? report.frontageWidth + 'm' : ''}`);
  if (report.roadNote) {
    lines.push(report.roadNote);
  }
  lines.push('【交通量】🚗 🚙 🚶‍♂️🚶');
  lines.push(report.trafficVolume || '（未選択）');
  lines.push('【手運び】');
  lines.push(`距離: ${report.manualCarryDistance ? report.manualCarryDistance + 'm' : ''}`);
  if (report.manualCarryNote) {
    lines.push(report.manualCarryNote);
  }
  lines.push('【足場可否】');
  lines.push(`右→ ${report.scaffoldRight || 'ー'}`);
  lines.push(`左→ ${report.scaffoldLeft || 'ー'}`);
  lines.push(`後→ ${report.scaffoldBack || 'ー'}`);
  if (report.scaffoldNote) {
    lines.push(`補足: ${report.scaffoldNote}`);
  }
  lines.push('');

  lines.push('＜構造物＞');
  lines.push('【土間/アスファルト】');
  lines.push(`土間：${report.domaArea ? report.domaArea + '㎡' : 'ー'} / アス：${report.asphaltArea ? report.asphaltArea + '㎡' : 'ー'}`);
  lines.push('【樹木類/庭石類】');
  lines.push(`樹木：${report.treeVolume ? report.treeVolume + '㎥' : 'ー'} / 庭石：${report.stoneVolume ? report.stoneVolume + '㎥' : 'ー'}`);
  if (report.hiddenStoneRatio) {
    lines.push(`見えない庭石（%）：${report.hiddenStoneRatio}％`);
  }
  lines.push('【残置物】');
  if (report.interiorChecked) {
    lines.push('室内確認済');
  }
  lines.push(`室外：${report.outdoorLeftoverVolume ? report.outdoorLeftoverVolume + '㎥' : 'ー'} / 室内：${report.indoorLeftoverVolume ? report.indoorLeftoverVolume + '㎥' : 'ー'}`);
  lines.push('【ブロック塀】※道路面のみ');
  lines.push(`コンクリ：${report.concreteBlockArea ? report.concreteBlockArea + '㎡' : 'ー'}`);
  lines.push(`万年塀：${report.mannenBlockArea ? report.mannenBlockArea + '㎡' : 'ー'}`);
  lines.push(`フェンス：${report.fenceArea ? report.fenceArea + '㎡' : 'ー'}`);
  lines.push(`大谷石：${report.otaniStoneArea ? report.otaniStoneArea + '㎡' : 'ー'}`);
  if (report.hasRetainingWall) {
    lines.push('擁壁あり');
  }
  lines.push('＜その他構造物＞ ※複数選択可');
  if (report.otherStructures && report.otherStructures.length > 0) {
    lines.push(report.otherStructures.join('、'));
  }
  if (report.otherStructuresCustom) {
    lines.push(`補足: ${report.otherStructuresCustom}`);
  }
  if ((!report.otherStructures || report.otherStructures.length === 0) && !report.otherStructuresCustom) {
    lines.push('なし');
  }
  lines.push('');

  lines.push('＜建物情報＞');
  if (report.buildings && report.buildings.length > 0) {
    report.buildings.forEach((b, index) => {
      lines.push(`＜建物情報 ${index + 1}＞`);
      lines.push('【建物の構造】');
      lines.push(b.structure || 'ー');
      lines.push('【築年数】');
      lines.push(b.ageUnknown ? '不明' : (b.ageYears ? `${b.ageYears}年` : 'ー'));
      lines.push('【屋根】');
      lines.push(b.roofAsRegistry ? '謄本通り' : (b.roofType || 'ー'));
      lines.push('【外壁】');
      lines.push(b.exteriorWall || 'ー');
      lines.push('【手壊し割合】');
      lines.push(`${b.manualDemolitionRatio}%`);
      if (b.manualDemolitionNote) {
        lines.push(b.manualDemolitionNote);
      }
      lines.push('【実寸面積】');
      if (b.areaAsRegistry) {
        lines.push('謄本通り');
      }
      if (b.area1F) lines.push(`1F: ${b.area1F}㎡`);
      if (b.area2F) lines.push(`2F: ${b.area2F}㎡`);
      if (b.area3F) lines.push(`3F: ${b.area3F}㎡`);
      if (b.areaBasement) lines.push(`地下: ${b.areaBasement}㎡`);
      if (b.note) lines.push(b.note);
      lines.push('');
    });
  } else {
    lines.push('建物情報なし');
    lines.push('');
  }

  return lines.join('\n').trim();
}

export function formatReportsToCSV(reports: SurveyReport[]): string {
  if (!reports || reports.length === 0) return '';

  const headers = [
    'ステータス',
    '調査日',
    '現場住所',
    '調査担当',
    '依頼主/元請',
    '確認事項',
    '使用ダンプ',
    '道路規制',
    'どんつき',
    '道路幅(m)',
    '歩道幅(m)',
    '間口幅(m)',
    '道路補足',
    '交通量',
    '手運び距離(m)',
    '手運び補足',
    '足場右',
    '足場左',
    '足場後',
    '足場補足',
    '土間(㎡)',
    'アスファルト(㎡)',
    '樹木(㎥)',
    '庭石(㎥)',
    '見えない庭石(%)',
    '室内確認済',
    '残置物室外(㎥)',
    '残置物室内(㎥)',
    'ブロック塀コンクリ(㎡)',
    '万年塀(㎡)',
    'フェンス(㎡)',
    '大谷石(㎡)',
    '擁壁あり',
    'その他構造物',
    'その他補足',
    '建物情報概要'
  ];

  const escapeCSV = (str: string | number | boolean | undefined | null) => {
    if (str === undefined || str === null) return '""';
    const s = String(str).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = reports.map((r) => {
    const bldgSummary = (r.buildings || [])
      .map((b, i) => {
        return `[建物${i + 1}] 構造:${b.structure} 築年:${b.ageUnknown ? '不明' : b.ageYears + '年'} 屋根:${b.roofAsRegistry ? '謄本通り' : b.roofType} 外壁:${b.exteriorWall} 手壊し:${b.manualDemolitionRatio}% 1F:${b.area1F}㎡ 2F:${b.area2F}㎡`;
      })
      .join(' / ');

    return [
      escapeCSV(r.status === 'draft' ? '一時保存(下書き)' : '送信済み'),
      escapeCSV(r.surveyDate),
      escapeCSV(r.siteAddress),
      escapeCSV(r.inspector),
      escapeCSV(r.clientType),
      escapeCSV(r.notesAndPrecautions),
      escapeCSV(r.dumpTruckType),
      escapeCSV(r.roadRestriction),
      escapeCSV(r.isDeadEnd ? 'あり' : 'なし'),
      escapeCSV(r.roadWidth),
      escapeCSV(r.sidewalkWidth),
      escapeCSV(r.frontageWidth),
      escapeCSV(r.roadNote),
      escapeCSV(r.trafficVolume),
      escapeCSV(r.manualCarryDistance),
      escapeCSV(r.manualCarryNote),
      escapeCSV(r.scaffoldRight),
      escapeCSV(r.scaffoldLeft),
      escapeCSV(r.scaffoldBack),
      escapeCSV(r.scaffoldNote),
      escapeCSV(r.domaArea),
      escapeCSV(r.asphaltArea),
      escapeCSV(r.treeVolume),
      escapeCSV(r.stoneVolume),
      escapeCSV(r.hiddenStoneRatio),
      escapeCSV(r.interiorChecked ? '確認済' : '未確認'),
      escapeCSV(r.outdoorLeftoverVolume),
      escapeCSV(r.indoorLeftoverVolume),
      escapeCSV(r.concreteBlockArea),
      escapeCSV(r.mannenBlockArea),
      escapeCSV(r.fenceArea),
      escapeCSV(r.otaniStoneArea),
      escapeCSV(r.hasRetainingWall ? 'あり' : 'なし'),
      escapeCSV((r.otherStructures || []).join(', ')),
      escapeCSV(r.otherStructuresCustom),
      escapeCSV(bldgSummary)
    ].join(',');
  });

  return [headers.join(','), ...rows].join('\n');
}
