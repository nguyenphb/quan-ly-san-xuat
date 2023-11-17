import { filterArrayBySearch, filterArrayBySearchAsync } from '@/utils/common';
import { useDeepCompareEffect } from '@ant-design/pro-components';
import { useState } from 'react';
import { useIsMounted } from './useIsMounted';


export function useSearchArrayObjByKey<T extends object = object>(
  ...arg: Parameters<typeof filterArrayBySearch<T>>
) {
  const allData = arg[0];
  const searchKey = arg[1];
  const options = arg[2];
  //
  const [searching, setSearching] = useState(false);
  const [dataFilter, setData] = useState<typeof allData>([]);
  //
  const isMounted = useIsMounted();

  useDeepCompareEffect(() => {
    const onSearch = async () => {
      setSearching(true);
      const res = await filterArrayBySearchAsync(allData, searchKey, options);

      // await sleep(50);
      if (isMounted()) {
        setData(res);
        setSearching(false);
      }
    };
    onSearch();
  }, [searchKey, allData, options]);
  return {
    searching,
    dataFilter,
  };
}
