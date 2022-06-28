export type WithFalse<T> = T | false;

export type IPlainObject<T> = Record<string, T>;

// 枚举基类
export interface IEnum {
  code: string | number;
  name: string;
  color?: string;
  animation?: boolean;
  icon?: JSX.Element; // 带图标
}

/**
 * 空字符
 */
export const EMPTY = '-';

/**
 * 归一化毫秒单位的时间
 */
export const ONE_SECOND = 1000;
export const ONE_MINUTE = 60 * ONE_SECOND;
export const ONE_HOUR = 60 * ONE_MINUTE;
export const ONE_DAY = 24 * ONE_HOUR;
