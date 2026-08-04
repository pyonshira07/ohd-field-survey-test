/** 面積入力・表示を小数第2位までに統一する共通処理。 */
export const isTwoDecimalAreaInput = (value: string) =>
  value === '' || /^\d*(?:\.\d{0,2})?$/.test(value);

export const normaliseAreaInput = (value: string) => {
  if (value === '') return '';

  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return '';

  return String(Math.round((numberValue + Number.EPSILON) * 100) / 100);
};

export const toAreaHundredths = (value: string | number) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? Math.round((numberValue + Number.EPSILON) * 100) : 0;
};

export const formatAreaValue = (value: string | number) => {
  const numberValue = Number(value);
  if (!Number.isFinite(numberValue)) return '';

  const rounded = Math.round((numberValue + Number.EPSILON) * 100) / 100;
  return rounded.toFixed(2).replace(/\.?0+$/, '');
};
