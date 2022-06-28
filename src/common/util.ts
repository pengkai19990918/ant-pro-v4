import _ from 'lodash';
import accounting from 'accounting';
import moment from 'moment';
import { TTimeDimension } from '@/common/enums';
import { EMPTY } from '@/common/constant';

export const DEFAULT_PRECISION = 2;

export const API_DATETIME_FMT = 'YYYY-MM-DD HH:mm:ss';
export const API_DATETIME_FMT_YEAR = 'YYYY';
export const API_DATETIME_FMT_MONTH = 'YYYYMM';
export const API_DATETIME_FMT_MONTH_HYPHEN = 'YYYY-MM';
export const API_DATETIME_FMT_DAY = 'YYYYMMDD';
export const API_DATETIME_FMT_DAY_HYPHEN = 'YYYY-MM-DD';

// 时间格式化，统一处理
export const formatTime = (
  time?: moment.Moment[] | moment.Moment,
  timeDimension: TTimeDimension = TTimeDimension.DAY,
  formatter?: {
    YEAR?: string;
    MONTH?: string;
    DAY?: string;
  },
) => {
  const formattedTime: {
    startTime?: string;
    endTime?: string;
  } = {};

  if (time && _.isArray(time)) {
    if (time.length === 2) {
      switch (timeDimension) {
        case TTimeDimension.YEAR:
          formattedTime.startTime = time[0].format(formatter?.YEAR || API_DATETIME_FMT_YEAR);
          formattedTime.endTime = time[1].format(formatter?.YEAR || API_DATETIME_FMT_YEAR);
          break;
        case TTimeDimension.MONTH:
          formattedTime.startTime = time[0].format(
            formatter?.MONTH || API_DATETIME_FMT_MONTH_HYPHEN,
          );
          formattedTime.endTime = time[1].format(formatter?.MONTH || API_DATETIME_FMT_MONTH_HYPHEN);
          break;
        case TTimeDimension.DAY:
          formattedTime.startTime = time[0].format(formatter?.DAY || API_DATETIME_FMT_DAY_HYPHEN);
          formattedTime.endTime = time[1].format(formatter?.DAY || API_DATETIME_FMT_DAY_HYPHEN);
          break;
        default:
          formattedTime.startTime = time[0].format(formatter?.DAY || API_DATETIME_FMT_DAY_HYPHEN);
          formattedTime.endTime = time[1].format(formatter?.DAY || API_DATETIME_FMT_DAY_HYPHEN);
          break;
      }
    }
  } else if (time) {
    switch (timeDimension) {
      case TTimeDimension.YEAR:
        formattedTime.startTime = (time as moment.Moment).format(
          formatter?.YEAR || API_DATETIME_FMT_YEAR,
        );
        formattedTime.endTime = (time as moment.Moment).format(
          formatter?.YEAR || API_DATETIME_FMT_YEAR,
        );
        break;
      case TTimeDimension.MONTH:
        formattedTime.startTime = (time as moment.Moment).format(
          formatter?.MONTH || API_DATETIME_FMT_MONTH_HYPHEN,
        );
        formattedTime.endTime = (time as moment.Moment).format(
          formatter?.MONTH || API_DATETIME_FMT_MONTH_HYPHEN,
        );
        break;
      case TTimeDimension.DAY:
        formattedTime.startTime = (time as moment.Moment).format(
          formatter?.DAY || API_DATETIME_FMT_DAY_HYPHEN,
        );
        formattedTime.endTime = (time as moment.Moment).format(
          formatter?.DAY || API_DATETIME_FMT_DAY_HYPHEN,
        );
        break;
      default:
        formattedTime.startTime = (time as moment.Moment).format(
          formatter?.DAY || API_DATETIME_FMT_DAY_HYPHEN,
        );
        formattedTime.endTime = (time as moment.Moment).format(
          formatter?.DAY || API_DATETIME_FMT_DAY_HYPHEN,
        );
        break;
    }
  }
  return formattedTime;
};

/**
 * 格式化日期
 * @param time
 * @param format
 * @param parseFormat
 */
export const formatSimpleTime = (
  time?: moment.Moment | number | string,
  format: string = API_DATETIME_FMT,
  parseFormat: string = API_DATETIME_FMT,
) => {
  if (!_.isNil(time)) {
    if (moment.isMoment(time)) {
      return time.format(format);
    }
    if (_.isString(time)) {
      return moment(time, parseFormat).format(format);
    }
    if (_.isNumber(time)) {
      return moment(time, parseFormat).format(format);
    }
  }
  return time;
};
// 格式化日期 显示年月日
export const simpleTime = (times: string) => {
  const time_arr = times.replace(' ', ':').replace(/:/g, '-').split('-');
  const time_str = `${time_arr[0]}-${time_arr[1]}-${time_arr[2]}`;
  return time_str;
};

/**
 // * @deprecated
 * 处理空字符串或数值的format
 * @param value
 */
export const formatEmpty = (value?: any) => {
  // undefine，null, ""
  if (_.isNil(value) || (_.isString(value) && _.isEmpty(value))) {
    return EMPTY;
  }
  return value;
};

/**
 * 强制format数值为正确的格式
 * @param value 数值
 * @param precision 精度
 * @param trimTails0 是否除去小数点尾部的0
 */
export const formatNumber = (
  value: any,
  precision: number = DEFAULT_PRECISION,
  trimTails0: boolean = false,
) => {
  let formatValue = value;
  if (_.isNumber(formatValue)) {
    formatValue = accounting.toFixed(formatValue, precision);
  }

  if (_.isString(formatValue)) {
    // TODO 后续看有没有更优雅的方式
    // 去除小数点后的0，再次去除小数点
    return trimTails0
      ? formatValue.replace(/(\.)((0*[1-9])*)0*$/g, '$1$2').replace(/\.$/, '')
      : formatValue;
  }

  return formatValue;
};

export function antDSelectFilterOption(input: string, opt: any) {
  if (opt && opt.props && opt.props.children)
    return opt.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) > -1;
  return false;
}
