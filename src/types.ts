export type ScaffoldStatus = '⚪︎' | '△' | '×' | '';

export interface BuildingInfo {
  id: string;
  structure: string; // 1つ目の構造
  structureSecondary?: string; // 2つ目の構造（複合構造用）
  structureNote?: string; // 構造の補足メモ
  ageUnknown: boolean;
  ageEra?: string; // 元号（令和・平成・昭和・大正）
  ageYears: string; // 年数
  roofAsRegistry: boolean;
  roofUnregistered?: boolean;
  roofType: string; // 1つ目の屋根
  roofTypeSecondary?: string; // 2つ目の屋根（複合屋根用）
  roofNote?: string; // 屋根の補足メモ
  exteriorWall: string; // 外壁材
  exteriorWallNote?: string; // 外壁の補足メモ
  manualDemolitionRatio: number; // 0-100%
  manualDemolitionNote: string; // e.g. "2,3F全部と1F少し"
  areaAsRegistry: boolean;
  areaUnregistered?: boolean;
  area1F: string;
  area2F: string;
  area3F: string;
  areaBasement: string;
  note: string; // e.g. "2階が増築っぽい。外壁リフォームしてる？"
}

export interface SurveyReport {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'submitted'; // 一時保存(下書き) または 確定送信済み

  // ＜案件概要＞
  caseName: string; // 【案件名】
  siteAddress: string; // 【現場住所】※半角数字
  inspector: string; // 【調査担当】
  surveyDate: string; // 【調査日】 YYYY/MM/DD
  clientSearch?: string; // 【取引先】キーワード検索入力
  clientType: string; // 【取引先 / 依頼主 / 元請】

  // ＜基本情報＞
  notesAndPrecautions: string; // 【確認事項】 (住人状況、治安、クレーム対策等)
  dumpTruckType: string; // 【使用ダンプ】
  roadRestriction: string; // 【道路規制】 (3t規制, etc.)
  isDeadEnd: boolean; // どんつき
  roadWidth: string; // 道路幅 (m)
  sidewalkWidth: string; // 歩道幅 (m)
  frontageWidth: string; // 間口幅 (m)
  roadNote: string; // 補足メモ e.g. "カーポート壊せば4t余裕"
  trafficPedestrians?: number; // 【交通量】通行人 1-5
  trafficCars?: number; // 【交通量】車 1-5
  trafficVolume?: '少' | '多' | ''; // 【交通量】
  manualCarryDistance: string; // 手運び距離 (m)
  manualCarryNote: string; // 手運び補足
  scaffoldRight: ScaffoldStatus; // 足場可否 右
  scaffoldLeft: ScaffoldStatus; // 足場可否 左
  scaffoldBack: ScaffoldStatus; // 足場可否 後
  scaffoldNote: string; // 足場補足メモ

  // ＜構造物＞
  domaArea: string; // 土間 (㎡)
  asphaltArea: string; // アスファルト (㎡)
  treeVolume: string; // 樹木類 (㎥)
  stoneVolume: string; // 庭石類 (㎥)
  hiddenStoneRatio: string; // 見えない庭石 (%)
  interiorChecked: boolean; // 室内確認済
  outdoorLeftoverVolume: string; // 残置物 室外 (㎥)
  indoorLeftoverVolume: string; // 残置物 室内 (㎥)
  concreteBlockArea: string; // ブロック塀 コンクリ (㎡)
  mannenBlockArea: string; // 万年塀 (㎡)
  fenceArea: string; // フェンス (㎡)
  otaniStoneArea: string; // 大谷石 (㎡)
  hasRetainingWall?: boolean; // 擁壁あり
  otherStructures: string[]; // 浄化槽, 井戸, カーポート, 物置, 越境物、電線、電柱等
  otherStructuresCustom: string; // その他補足記入

  // ＜建物情報＞
  buildings: BuildingInfo[];
}
