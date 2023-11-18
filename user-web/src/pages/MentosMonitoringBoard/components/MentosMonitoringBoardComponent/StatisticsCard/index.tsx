import StatisticSimple, { StatisticSimpleProps } from '@/components/StatisticSimple';
import { ThemeConfig } from '@/config/theme.config';
import { Flex } from 'antd';
import { createStyles } from 'antd-use-styles';
import { FC, ReactNode, useMemo } from 'react';
import PieChart from './PieChart';

interface StatisticsCardProps {
  children?: ReactNode;
  title?: ReactNode;
  statistics: {
    target: number;
    actual: number;
    diff: number;
  };
}
const useStyles = createStyles(({ token }) => ({
  wrapper: {
    backgroundColor: token.colorBgBase,
    padding: token.padding,
    borderRadius: token.borderRadiusLG + 12,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: token.colorSuccessBorder,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    color: ThemeConfig.color.primary,
    fontWeight: token.fontWeightStrong,
    fontSize: token.fontSizeHeading4,
    marginBlockEnd: token.marginSM,
  },
  pieChartWrapper: {
    marginBlockEnd: token.marginLG,
  },
}));
const StatisticsCard: FC<StatisticsCardProps> = ({ title, children, statistics }) => {
  const styles = useStyles();
  const data: StatisticSimpleProps[] = useMemo(
    () => [
      {
        label: {
          text: 'Target',
        },
        value: {
          text: statistics?.target,
        },
      },
      {
        label: {
          text: 'Actual',
        },
        value: {
          text: statistics?.actual,
          color: statistics.actual >= statistics.target ? 'success' : 'danger',
        },
      },
      {
        label: {
          text: 'Diff',
        },
        value: {
          text: statistics.diff,
          color: statistics.diff >= 0 ? 'success' : 'danger',
        },
      },
    ],
    [statistics.target, statistics.actual, statistics.diff],
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.pieChartWrapper}>
        <PieChart
          data={{
            actual: statistics.actual,
            target: statistics.target,
          }}
        />
      </div>
      <Flex wrap="wrap" justify="space-between" gap={'small'}>
        {data.map((item, index) => (
          <StatisticSimple direction="vertical" size="small" key={index} {...item} />
        ))}
      </Flex>
    </div>
  );
};

export default StatisticsCard;
