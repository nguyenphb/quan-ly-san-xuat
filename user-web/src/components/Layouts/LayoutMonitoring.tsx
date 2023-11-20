import { ThemeConfig } from '@/config/theme.config';
import { Flex, Spin } from 'antd';
import { createStyles } from 'antd-use-styles';
import { FC, ReactNode } from 'react';
import StatisticSimple, { StatisticSimpleProps } from '../StatisticSimple';

interface LayoutMonitoringProps {
  title?: ReactNode;
  subTitle?: ReactNode[];
  statistics?: StatisticSimpleProps[];
  children?: ReactNode;
  loading?: boolean;
}
const useStyles = createStyles(({ token }) => ({
  headerTitle: {
    backgroundColor: ThemeConfig.color.primary,
    color: token.colorBgBase,
    fontSize: token.fontSizeHeading2,
    fontWeight: token.fontWeightStrong,
    textAlign: 'center',
    marginBlockEnd: token.marginXS,
  },
  timeInfoWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: token.paddingLG,
    color: ThemeConfig.color.primary,
    fontWeight: token.fontWeightStrong + 100,
    fontSize: token.fontSizeHeading5,
    marginBlockEnd: token.marginLG,
  },
  statisticsWrapper: {
    marginBlockEnd: token.margin,
  },
}));
const LayoutMonitoring: FC<LayoutMonitoringProps> = ({
  title,
  subTitle,
  statistics,
  children,
  loading = false,
}) => {
  const styles = useStyles();

  return (
    <Spin spinning={loading}>
      <div className={styles.headerTitle}>{title}</div>
      <div className={styles.timeInfoWrapper}>
        {subTitle?.map((item, index) => <span key={index}>{item}</span>)}
      </div>
      <Flex justify="space-between" gap="middle" className={styles.statisticsWrapper}>
        {statistics?.map((item, index) => <StatisticSimple key={index} {...item} />)}
      </Flex>
      {children}
    </Spin>
  );
};

export default LayoutMonitoring;
