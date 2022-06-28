import React from 'react';
import _ from 'lodash';
import type { IEnum, IPlainObject } from '@/common/constant';
import { DatePicker } from 'antd';
import { formatMessage } from '@/utils/utils';

// 时间类型
export enum TTimeDimension {
  TIME,
  DAY,
  MONTH,
  YEAR,
}

export interface ITimeDimensionModel extends IEnum {
  code: TTimeDimension;
}

export const TIME_DIMENSION: IPlainObject<ITimeDimensionModel> = {
  [TTimeDimension.DAY]: {
    code: TTimeDimension.DAY,
    name: formatMessage({ id: 'enum.common.time-duration.day' }),
  },
  [TTimeDimension.MONTH]: {
    code: TTimeDimension.MONTH,
    name: formatMessage({ id: 'enum.common.time-duration.month' }),
  },
  [TTimeDimension.YEAR]: {
    code: TTimeDimension.YEAR,
    name: formatMessage({ id: 'enum.common.time-duration.year' }),
  },
};

export const TIME_DIMENSION_ARR: ITimeDimensionModel[] = _.values(TIME_DIMENSION);

/**
 * 公共valueTypeMap，用于扩展ProComponents的valueType
 */
export const VALUE_TYPE_MAP = {
  dateRangeMonth: {
    render: (text: any) => text,
    renderFormItem: (text: any, props: any) => (
      <DatePicker.RangePicker {...props?.fieldProps} picker={'month'} format={'YYYY-MM'} />
    ),
  },
};
