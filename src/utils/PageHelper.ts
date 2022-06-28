import type { RequestData } from '@ant-design/pro-table';

export type Page = {
  pageNum?: number;
  pageSize?: number;
};

export interface ResponsePage<T> {
  success?: boolean;
  list: T[];
  total?: number;
  pageNum: number;
  pageSize: number;
  size?: number;

  [key: string]: any;
}

/**
 * 处理分页参数
 * @param responsePage
 */
export const process = async (responsePage: any = {}) => {
  const page = responsePage;
  return {
    data: page.list,
    total: page.total,
    current: page.pageNum,
    pageSize: page.pageSize,
    size: page.size,
  } as RequestData<any>;
};

export default {
  process,
};
