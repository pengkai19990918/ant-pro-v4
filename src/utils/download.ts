import { saveAs } from 'file-saver';
import request from './request';

const DEFAULT_TIMEOUT = 60 * 60 * 1000; // 请求超时配置;
/**
 * 提取文件名.
 * @param response axios的response
 * @description 从response header的content-disposition中提取文件名.
 */
const extractFilenameFromResponseHeader = (response: Response): string => {
  // content-disposition: "attachment; filename=xxxx.docx;"
  const contentDisposition = response.headers.get('content-disposition') || '';
  const pattern = new RegExp("filename(?:\\*)?=(?:.*'')?([^;]+\\.[^\\.;]+);*");
  const result = pattern.exec(contentDisposition) as RegExpExecArray;
  let filename = '';

  if (result) {
    filename = result.length > 0 ? result[1] : '';
  }

  // 解码之前尝试去除空格和双引号
  // content-disposition: "attachment; filename=\"xxxx.docx\";"
  // content-disposition: "attachment; filename*=UTF-8''\"xxxx.docx\";"
  return decodeURIComponent(filename.trim().replace(new RegExp('"', 'g'), ''));
};

export const download = async (url: string, options = {}) => {
  const { response, data } = await request(url, {
    ...options,
    timeout: DEFAULT_TIMEOUT, // 请求超时配置
    responseType: 'blob',
    // parseResponse: false,
    getResponse: true,
  });

  if (!response || response.status < 200 || response.status > 400) {
    return;
  }
  const resBlob = data; // <--- store the blob if it is
  let respData = null;

  // 如果确定接口response.data是二进制，所以请求失败时是JSON.
  // 这里只对response.data做JSON的尝试解析
  try {
    const respText = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener('abort', reject);
      reader.addEventListener('error', reject);
      reader.addEventListener('loadend', () => {
        resolve(reader.result as string);
      });
      reader.readAsText(resBlob);
    });
    respData = JSON.parse(respText as string); // <--- try to parse as json evantually
  } catch (err) {
    // ignore
  }
  // 如果response.data能够确定是二进制，则respData = null说明请求成功
  // 否则 respData !== null说明请求失败
  if (respData === null) {
    // 触发浏览器下载
    // 如果没有传递filename尝试从Content-Disposition提取
    const filename = extractFilenameFromResponseHeader(response);
    saveAs(resBlob, filename);
    // 方便调用者有进一步的 then().catch()处理
  }

  // eslint-disable-next-line consistent-return
  return response;
};
