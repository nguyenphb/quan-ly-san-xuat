import { API_URL_DEV,API_URL_PROD } from '@/common/contanst/index';
import vietnam_location from '@/helpers/tree.json';
import { getAccessToken } from '@/utils/localStorage';
import { SortOrder } from 'antd/es/table/interface';
import { isArray } from 'lodash';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import * as XLSX from 'xlsx';

export const generateAPIPath = (url: string) => {
  // let HOST = API_URL_LOCAL;
  let HOST = API_URL_DEV;
  if (process.env.NODE_ENV === 'production') {
    HOST = API_URL_PROD;
  }
  // HOST = 'http://localhost:4005'
  return `${HOST}/${url}`;
};

export const groupDataByKey = async ({
  data,
  group_by,
  child_keys,
  child_name,
  key_detect_null = '',
}: {
  data: any;
  group_by: string;
  child_keys: string[];
  child_name: string;
  key_detect_null?: string;
}) => {
  let result: any = [];
  let temp_data = data;
  let match_key = '';
  temp_data.map((d: any) => {
    const group_by_value = d[group_by];
    const group_by_exits = result.filter((e: any) => {
      return e[group_by] === group_by_value;
    });
    if (group_by_exits.length < 1) {
      match_key = group_by_value;
      const matchs = temp_data.filter((e: any) => {
        return e[group_by] === group_by_value;
      });

      let parent_data: any = {};
      let child_value = matchs.map((e: any) => {
        let child_data: any = {};
        const keys = Object.keys(e);
        keys.map((key: any) => {
          //Check key is child key
          const is_child_key = child_keys.filter((k) => k == key).length > 0;
          const key_value = e[key];
          if (is_child_key) {
            child_data[key] = key_value;
          } else {
            parent_data[key] = key_value;
          }
        });
        child_data.parent = group_by_value;
        return child_data;
      });
      if (key_detect_null) {
        child_value = child_value.filter((e: any) => e[key_detect_null]);
      }
      parent_data[child_name] = child_value;
      result.push(parent_data);
    }
  });
  return result;
};
// This function converts the string to lowercase, then perform the conversion
export const toLowerCaseNonAccentVietnamese = (str: string) => {
  if (!str) return '';
  str = str.toLowerCase();
  //     We can also use this instead of from line 11 to line 17
  //     str = str.replace(/\u00E0|\u00E1|\u1EA1|\u1EA3|\u00E3|\u00E2|\u1EA7|\u1EA5|\u1EAD|\u1EA9|\u1EAB|\u0103|\u1EB1|\u1EAF|\u1EB7|\u1EB3|\u1EB5/g, "a");
  //     str = str.replace(/\u00E8|\u00E9|\u1EB9|\u1EBB|\u1EBD|\u00EA|\u1EC1|\u1EBF|\u1EC7|\u1EC3|\u1EC5/g, "e");
  //     str = str.replace(/\u00EC|\u00ED|\u1ECB|\u1EC9|\u0129/g, "i");
  //     str = str.replace(/\u00F2|\u00F3|\u1ECD|\u1ECF|\u00F5|\u00F4|\u1ED3|\u1ED1|\u1ED9|\u1ED5|\u1ED7|\u01A1|\u1EDD|\u1EDB|\u1EE3|\u1EDF|\u1EE1/g, "o");
  //     str = str.replace(/\u00F9|\u00FA|\u1EE5|\u1EE7|\u0169|\u01B0|\u1EEB|\u1EE9|\u1EF1|\u1EED|\u1EEF/g, "u");
  //     str = str.replace(/\u1EF3|\u00FD|\u1EF5|\u1EF7|\u1EF9/g, "y");
  //     str = str.replace(/\u0111/g, "d");
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
};

export const getProvinceNameWithTypeByCode = (code: string) => { };

export const getProvinceCodeByName = (name: string) => {
  let province_match_code = '';
  Object.values(vietnam_location).map((v, index) => {
    if (v.name === name || v.name_with_type === name) {
      province_match_code = Object.keys(vietnam_location)[index];
    }
  });
  return province_match_code;
};
export const getDistristCodeByName = (provice_code: string, name: string) => {
  let district_list = vietnam_location[provice_code]['quan-huyen'];
  let district_match_code = '';
  Object.values(district_list).map((v: any) => {
    if (v.name === name || v.name_with_type === name) {
      district_match_code = v.code;
    }
  });
  return district_match_code;
};
export const getWardCodeByName = (provice_code: string, district_code: string, name: string) => {
  let ward_list = vietnam_location[provice_code]['quan-huyen'][district_code]['xa-phuong'];
  let ward_match_code = '';
  Object.values(ward_list).map((v: any) => {
    if (v.name === name || v.name_with_type === name) {
      ward_match_code = v.code;
    }
  });
  return ward_match_code;
};

export const capitalizeSentence = (mySentence: string) => {
  if (!mySentence) return '';
  let words = mySentence?.split(' ');
  words = words.map((word: string) => {
    word = word?.toLocaleLowerCase();
    if (word) word = word[0].toUpperCase() + word.substring(1);
    return word;
  });
  return words.join(' ');
};

export const getParamsReqTable = ({
  doc_name,
  tableReqParams,
  concatFilter,
}: {
  doc_name: string;
  tableReqParams: {
    params: {
      pageSize?: number;
      current?: number;
      keyword?: string;
      [key: string]: any;
    };
    sort: Record<string, SortOrder>;
    filter: Record<string, (string | number)[] | null>;
  };
  concatFilter?: Array<any[]>;
}) => {
  const params = tableReqParams.params;
  const sort = tableReqParams.sort;
  const current = params.current || 1;
  const pageSize = params.pageSize || 20; // default;

  let order_by = 'modified desc';
  if (Object.keys(sort).length) {
    order_by = `${Object.keys(sort)[0]} ${Object.values(sort)[0] === 'ascend' ? 'asc' : 'desc'}`;
  }

  type fieldKeyType = keyof typeof params;
  const searchFields = Object.keys(params).filter((field: string) => {
    const value = params[field as fieldKeyType];
    return field !== 'current' && field !== 'pageSize' && value !== 'all';
  });
  const filterArr = searchFields.map((field) => {
    const value = params[field as fieldKeyType];
    if (doc_name) return [doc_name, field, 'like', `%${value}%`];
    else return [field, 'like', `%${value}%`];
  });

  return {
    page: current,
    size: pageSize,
    order_by: order_by,
    filters: JSON.stringify(filterArr.concat((concatFilter ||[] )as any).filter((item) => item)),
  };
};

export const getParamsReqList = (params?: API.ListParamsReq) => {
  try {
    if (!params) return params;
    return {
      page: params.page || 1,
      size: params.size || 20,
      fields: isArray(params.fields) ? JSON.stringify(params.fields) : params.fields,
      filters: isArray(params.filters) ? JSON.stringify(params.filters) : params.filters,
      or_filters: isArray(params.or_filters)
        ? JSON.stringify(params.or_filters)
        : params.or_filters,
      order_by: params.order_by,
      group_by: params.group_by,
    };
  } catch (error) {
    return params;
  }
};

export const getFileUrl = ({
  src,
}: {
  src?: string | null; // src
}): null | string | undefined => {
  if (typeof src !== 'string') return null;
  const accessToken = getAccessToken();
  return generateAPIPath(`api/v2/file/download?file_url=${src}&token=${accessToken}`);
};

export const getListFileUrlFromString = ({
  arrUrlString,
}: {
  arrUrlString?: string | null;
  // doctype: string;
  // name: string;
}) => {
  let arrUrl: string[] = [];
  if (typeof arrUrlString !== 'string') return arrUrl;
  try {
    // arrUrl = JSON.parse(arrUrlString);
    arrUrl = arrUrlString.split(',');
    if (Array.isArray(arrUrl)) {
      return arrUrl
        .filter((item) => typeof item === 'string')
        .map((item) =>
          getFileUrl({
            src: item,
          }),
        );
    }
  } catch (error) { }
  return arrUrl;
};

export const getFileUrlV2 = ({
  src,
  useToken,
}: {
  src?: string | null; // src
  useToken?: boolean;
}): null | string | undefined => {
  if (typeof src !== 'string') return null;
  if (useToken) {
    const accessToken = getAccessToken();
    return generateAPIPath(`api/v2/file/download?file_url=${src}&token=${accessToken}`);
  }
  return generateAPIPath(`api/v2/file/download?file_url=${src}`);
};
export const getListFileUrlFromStringV2 = ({
  arrUrlString,
}: {
  arrUrlString?: string | null;
  // doctype: string;
  // name: string;
}) => {
  let arrUrl: string[] = [];
  if (typeof arrUrlString !== 'string' || arrUrlString === '') return arrUrl;
  try {
    arrUrl = arrUrlString.split(',');
    if (Array.isArray(arrUrl)) {
      return arrUrl
        .filter((item) => typeof item === 'string')
        .map((item) =>
          getFileUrlV2({
            src: item,
          }),
        );
    }
  } catch (error) {
    console.log(error);
  }
  return arrUrl;
};

export const downloadExcelData = (reqData: any, fileName?: string) => {

  if (reqData.length < 1)
    return;
  const heades = Object.keys(reqData[0]);
  let test = [];
  test.push(heades);
  for (let i = 0; i < reqData.length; i++) {
    test.push(Object.values(reqData[i]));
  }
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';
  const ws = XLSX.utils.json_to_sheet(test, { skipHeader: true });
  const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  if (fileName)
    FileSaver.saveAs(data, fileName + fileExtension);
  else
    FileSaver.saveAs(data, "Export Data - " + moment().unix() + fileExtension);
}
