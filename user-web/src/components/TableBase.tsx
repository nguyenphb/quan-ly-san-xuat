import { ThemeConfig } from '@/config/theme.config';
import { ParamsType, ProTable, ProTableProps } from '@ant-design/pro-components';
import { createStyles } from 'antd-use-styles';
import { cloneDeep, merge } from 'lodash';
import { useMemo } from 'react';
import './tableBase.less'

interface ProTableCommonProps<
  DataType extends object = object,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
> extends ProTableProps<DataType, Params, ValueType> {
  myCustomProps?: {
    allData?: DataType[];
    omitSearchKeys?: (keyof DataType)[];
    pickSearchKeys?: (keyof DataType)[];
    onSearchKey?: (val: string) => void;
  };
}
const useStyles = createStyles(({ token }) => ({
  tableWrapper: {
    '& .ant-table-thead .ant-table-cell': {
      backgroundColor: ThemeConfig.color.primary,
      color: token.colorBgBase,
    },
  },
}));
const TableBase = <
  DataType extends Record<string, any>,
  Params extends ParamsType = ParamsType,
  ValueType = 'text',
>({
  myCustomProps,
  ...props
}: ProTableCommonProps<DataType, Params, ValueType>) => {
  const styles = useStyles();

  const defaultTableProps = useMemo<ProTableProps<DataType, Params, ValueType>>(
    () => ({
      // pagination: {
      //   pageSize: 20,
      // },
      pagination: false,
      className: 'table-striped',
      // scroll: { x: 'max-content' },
      bordered: true,
      search: false,
      rootClassName: styles.tableWrapper,
      size: 'small',
    }),
    [styles],
  );
  const propsMerge = useMemo(() => merge(cloneDeep(defaultTableProps), props), [props]);

  return (
    <ProTable<DataType, Params, ValueType> ghost search={false} options={false} {...propsMerge} />
  );
};

export default TableBase;