import { toLowerCaseNonAccentVietnamese } from '@/services/utils';
import { cloneDeep, isNumber, isUndefined, omit, pick } from 'lodash';

export function isObjectNotEmpty(obj: any) {
  if (typeof obj === 'object' && Object.keys(obj).length > 0) {
    return true;
  }
  return false;
}

export const formatNumber = <T>(
  num: any,
  options?: {
    defaultValue?: T;
    digits?: number;
  },
) => {
  if (typeof num === 'number') return parseFloat(num.toFixed(options?.digits || 2));
  return isUndefined(options?.defaultValue) ? undefined : options?.defaultValue;
};
export const formatNumberVi = <T>(
  num: any,
  options?: {
    defaultValue?: T;
    digits?: number;
  },
) => {
  if (typeof num === 'number') return num.toLocaleString('vi');
  return isUndefined(options?.defaultValue) ? undefined : options?.defaultValue;
};

export const getHourFromSeconds = (time?: number) => {
  if (isNumber(time)) return parseFloat((time / 60 / 60).toFixed(2));
  return null;
};

export const filterArrayBySearch = <T extends object = object>(
  arr: T[],
  search: string | null | undefined,
  options?: {
    omitKeys?: Array<keyof T>;
    pickKeys?: Array<keyof T>;
  },
): T[] => {
  if (search && search.trim() !== '' && arr.length > 0) {
    const _search = toLowerCaseNonAccentVietnamese(search.trim());
    return arr.filter((item) => {
      let itemData: any = item;

      if (options?.pickKeys && options.pickKeys.length > 0) {
        itemData = pick(cloneDeep(item), [...options?.pickKeys]);
      } else if (options?.omitKeys && options.omitKeys.length > 0) {
        itemData = omit(cloneDeep(item), [...options?.omitKeys]);
      }

      const check = Object.values(itemData).find((item) =>
        toLowerCaseNonAccentVietnamese(item?.toString() || '').includes(_search),
      );
      return !(typeof check === 'undefined');
    });
  }
  return arr;
};
export const filterArrayBySearchAsync = <T extends object = object>(
  arr: T[],
  search: string | null | undefined,
  options?: {
    omitKeys?: Array<keyof T>;
    pickKeys?: Array<keyof T>;
  },
): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    try {
      const res = filterArrayBySearch(arr, search, options);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export function getRandomInt(min: number, max: number) {
  const _min = Math.ceil(min);
  const _max = Math.floor(max);
  return Math.floor(Math.random() * (_max - _min) + _min); // The maximum is exclusive and the minimum is inclusive
}

export const sleep = async (time = getRandomInt(100, 500)): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};
