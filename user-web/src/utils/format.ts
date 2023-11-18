export const formatNumberSummary = (num: number) => {
  let formatter = Intl.NumberFormat('en', { notation: 'compact' });
  return formatter.format(num || 0);
};
export const formatNumberWithSpe = (num: number) => {
  try {
    const n = new Intl.NumberFormat('ja-JP').format(num);
    return Number(n);
  } catch (error) {
    return NaN;
  }
};

const formatNumber = <T>(
  num: any,
  options?: {
    defaultValue?: T;
    digits?: number;
  },
) => {
  if (typeof num === 'number') return parseFloat(num.toFixed(options?.digits || 2));
  return typeof options?.defaultValue === 'undefined' ? undefined : options?.defaultValue;
};
/**
 * @description 2.434333333333 || '2.434333333333' => 2.43
 */
export const formatNumberOrString = (
  stringLikeNumber: number | string | null,
  options: {
    min?: number;
    max?: number;
    default: number;
    parseFloat?: boolean;
    digits?: number;
  },
) => {
  try {
    let num =
      options.parseFloat || (options.digits && options.digits > 0)
        ? parseFloat(stringLikeNumber as any)
        : parseInt(stringLikeNumber as any);
    num = num || options.default;
    if (options?.min) {
      num = num <= options.min ? options.min : num;
    }
    if (options?.max) {
      num = num >= options.max ? options.max : num;
    }

    return formatNumber(num, {
      defaultValue: options.default,
      digits: options.digits,
    });
  } catch (error) {
    return options.default;
  }
};
