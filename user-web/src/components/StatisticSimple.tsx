import { ColorValues, ThemeConfig } from '@/config/theme.config';
import { createStyles } from 'antd-use-styles';
import { FC } from 'react';

export interface StatisticSimpleProps {
  size?: 'default' | 'small';
  direction?: 'vertical' | 'horizontal';
  label?: {
    text?: string;
  };
  value?: {
    text?: string | number | null;
    color?: ColorValues;
  };
}

const useStyles = createStyles(
  ({ token }, params?: Pick<StatisticSimpleProps, 'size' | 'direction'>) => ({
    wrapper: {
      borderColor: ThemeConfig.color.primary,
      borderWidth: 1,
      borderStyle: 'solid',
      display: 'inline-flex',
      alignItems: 'center',
      fontWeight: token.fontWeightStrong + 100,
      fontSize: params?.size === 'small' ? token.fontSizeHeading5 : token.fontSizeHeading4,
      textAlign: 'center',
      flexDirection: params?.direction === 'vertical' ? 'column' : 'row',
    },
    label: {
      color: token.colorBgBase,
      backgroundColor: ThemeConfig.color.primary,
      paddingInline: params?.size === 'small' ? token.padding : token.paddingLG,
      paddingBlock: params?.size === 'small' ? token.paddingXS - 2 : token.paddingXS,
    },
    value: {
      paddingInline: params?.size === 'small' ? token.padding : token.paddingLG,
      paddingBlock: params?.size === 'small' ? token.paddingXS - 2 : token.paddingXS,
    },
  }),
);
const StatisticSimple: FC<StatisticSimpleProps> = ({
  label,
  value,
  direction = 'horizontal',
  size,
}) => {
  const styles = useStyles({ direction, size });
  return (
    <div className={styles.wrapper}>
      <div className={styles.label}>{label?.text}</div>
      <div
        className={styles.value}
        style={{
          color: ThemeConfig.color[value?.color || 'default'],
        }}
      >
        {value?.text}
      </div>
    </div>
  );
};

export default StatisticSimple;
