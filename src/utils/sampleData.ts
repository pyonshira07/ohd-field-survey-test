import { SurveyReport } from '../types';

export const INSPECTOR_OPTIONS = [
  '萩嶋',
  '浅野',
  '星川',
  '白戸'
];

export const DUMP_TRUCK_OPTIONS = [
  '選択してください',
  '搬入不可',
  '3t',
  '4t',
  '軽トラ',
  '2t',
  '大型'
];

export const ROAD_RESTRICTION_OPTIONS = [
  '3t規制',
  '4t規制',
  '大型規制',
  '通行止め規制あり',
  '規制なし'
];

export const STRUCTURE_OPTIONS = [
  '木造',
  '鉄骨造',
  '軽量鉄骨造',
  'RC造 (鉄筋コンクリート)',
  'SRC造 (鉄骨鉄筋コンクリート)',
  'CB造 (コンクリートブロック)'
];

export const ROOF_OPTIONS = [
  '瓦',
  'スレート',
  'ガルバリウム鋼板',
  'コロニアル',
  '陸屋根 (防水シート/モルタル)',
  'トタン'
];

export const EXTERIOR_WALL_OPTIONS = [
  'モルタル',
  'サイディング',
  'ALC板',
  'タイル貼り',
  'トタン',
  'コンクリート打ちっぱなし'
];

export const OTHER_STRUCTURE_OPTIONS = [
  '浄化槽',
  '井戸',
  'カーポート',
  '物置'
];

export function createEmptyReport(): SurveyReport {
  const todayStr = new Date().toISOString().split('T')[0].replace(/-/g, '/');
  return {
    id: 'report_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'draft',

    siteAddress: '',
    inspector: '',
    surveyDate: todayStr,
    clientType: '依頼主',

    notesAndPrecautions: '',
    dumpTruckType: '',
    roadRestriction: '',
    isDeadEnd: false,
    roadWidth: '',
    sidewalkWidth: '',
    frontageWidth: '',
    roadNote: '',
    trafficVolume: '少',
    manualCarryDistance: '',
    manualCarryNote: '',
    scaffoldRight: '⚪︎',
    scaffoldLeft: '⚪︎',
    scaffoldBack: '⚪︎',
    scaffoldNote: '',

    domaArea: '',
    asphaltArea: '',
    treeVolume: '',
    stoneVolume: '',
    hiddenStoneRatio: '',
    interiorChecked: false,
    outdoorLeftoverVolume: '',
    indoorLeftoverVolume: '',
    concreteBlockArea: '',
    mannenBlockArea: '',
    fenceArea: '',
    otaniStoneArea: '',
    blockWallNote: '',
    hasRetainingWall: false,
    otherStructures: [],
    otherStructuresCustom: '',

    buildings: [
      {
        id: 'bldg_1',
        structure: '木造',
        ageUnknown: false,
        ageYears: '',
        roofAsRegistry: true,
        roofType: '瓦',
        exteriorWall: 'モルタル',
        manualDemolitionRatio: 0,
        manualDemolitionNote: '2,3F全部と1F少し',
        areaAsRegistry: true,
        area1F: '',
        area2F: '',
        area3F: '',
        areaBasement: '',
        note: '2階が増築っぽい。外壁リフォームしてる？'
      }
    ]
  };
}

export function createSampleReport(): SurveyReport {
  return {
    id: 'sample_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'submitted',

    siteAddress: '東京都世田谷区桜丘1-2-3',
    inspector: '山田太郎',
    surveyDate: '2026/07/29',
    clientType: '依頼主',

    notesAndPrecautions: '住人近隣挨拶済。治安良好。朝8:30前の重機作業NG。隣家からのクレーム予防に防音シート必須。',
    dumpTruckType: '3tダンプ',
    roadRestriction: '3t規制',
    isDeadEnd: true,
    roadWidth: '4.2',
    sidewalkWidth: '1.2',
    frontageWidth: '3.8',
    roadNote: 'カーポート壊せば4t余裕',
    trafficVolume: '少',
    manualCarryDistance: '10',
    manualCarryNote: '道路面ブロック取りなら手運び不要',
    scaffoldRight: '⚪︎',
    scaffoldLeft: '△',
    scaffoldBack: '×',
    scaffoldNote: '左側隣家と50cm狭小につき単管足場、後方は越境擁壁につき足場不可',

    domaArea: '18',
    asphaltArea: '0',
    treeVolume: '3',
    stoneVolume: '1',
    hiddenStoneRatio: '15',
    interiorChecked: true,
    outdoorLeftoverVolume: '2',
    indoorLeftoverVolume: '6',
    concreteBlockArea: '15',
    mannenBlockArea: '0',
    fenceArea: '10',
    otaniStoneArea: '0',
    hasRetainingWall: true,
    otherStructures: ['浄化槽', 'カーポート', '物置'],
    otherStructuresCustom: '電線が敷地中央を横切っているため高所作業時注意',

    buildings: [
      {
        id: 'bldg_sample_1',
        structure: '木造',
        ageUnknown: false,
        ageYears: '38',
        roofAsRegistry: false,
        roofType: '瓦',
        exteriorWall: 'モルタル',
        manualDemolitionRatio: 30,
        manualDemolitionNote: '2,3F全部と1F少し',
        areaAsRegistry: false,
        area1F: '52.5',
        area2F: '45.0',
        area3F: '0',
        areaBasement: '0',
        note: '2階が増築っぽい。外壁リフォームしてる？'
      },
      {
        id: 'bldg_sample_2',
        structure: '軽量鉄骨造',
        ageUnknown: true,
        ageYears: '',
        roofAsRegistry: true,
        roofType: '波板トタン',
        exteriorWall: 'サイディング',
        manualDemolitionRatio: 0,
        manualDemolitionNote: '',
        areaAsRegistry: false,
        area1F: '15.0',
        area2F: '',
        area3F: '',
        areaBasement: '',
        note: '裏手の物置小屋（未未登記）'
      }
    ]
  };
}
