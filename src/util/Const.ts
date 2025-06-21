// 47都道府県分の色
export const COLORS_FOR_PREFECTURES = [
  'IndianRed',
  'LightCoral',
  'LightSalmon',
  'Crimson',
  'Red',

  'DarkRed',
  'Pink',
  'HotPink',
  'DeepPink',
  'MediumVioletRed',

  'PaleVioletRed',
  'LightSalmon',
  'Tomato',
  'DarkOrange',
  'Gold',

  'Yellow',
  'PaleGoldenrod',
  'DarkKhaki',
  'Thistle',
  'Fuchsia',

  'RebeccaPurple',
  'Purple',
  'GreenYellow',
  'LimeGreen',
  'MediumSeaGreen',

  'DarkGreen',
  'LightSeaGreen',
  'Teal',
  'Aqua',
  'Aquamarine',

  'DarkTurquoise',
  'SkyBlue',
  'Blue',
  'Navy',
  'BlanchedAlmond',

  'BurlyWood',
  'RosyBrown',
  'DarkGoldenrod',
  'SaddleBrown',
  'Maroon',

  'Beige',
  'AntiqueWhite',
  'MistyRose',
  'LightGray',
  'Gray',

  'DarkSlateGray',
  'Black'
]

export type AreaType =
  | 'HOKKAIDO'
  | 'TOHOKU'
  | 'KANTO'
  | 'KINKI'
  | 'CHUBU'
  | 'CHUGOKU_SHIKOKU'
  | 'KYUSHU'

export const AREA_MAP: Record<AreaType, string[]> = {
  HOKKAIDO: ['北海道'],
  TOHOKU: ['青森県', '岩手県', '秋田県', '宮城県', '山形県', '福島県'],
  KANTO: ['東京都', '神奈川県', '千葉県', '埼玉県', '茨城県', '群馬県', '栃木県'],
  KINKI: ['京都府', '大阪府', '兵庫県', '奈良県', '三重県', '滋賀県', '和歌山県'],
  CHUBU: ['新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県', '岐阜県', '静岡県', '愛知県'],
  CHUGOKU_SHIKOKU: [
    '広島県',
    '鳥取県',
    '岡山県',
    '島根県',
    '山口県',
    '徳島県',
    '香川県',
    '愛媛県',
    '高知県'
  ],
  KYUSHU: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県']
}

export const AREA_NAME_MAP: Record<AreaType, string> = {
  HOKKAIDO: '北海道地方',
  TOHOKU: '東北地方',
  KANTO: '関東地方',
  KINKI: '近畿地方',
  CHUBU: '中部地方',
  CHUGOKU_SHIKOKU: '中国・四国地方',
  KYUSHU: '九州地方'
}
