import { ThemeConfig } from '@/config/theme.config';
import { createStyles } from 'antd-use-styles';
import React, { FC, ReactNode } from 'react';

interface CardGroupProps {
  children?: ReactNode;
  title?: ReactNode;
}
const useStyles = createStyles(({ token }) => ({
  wrapper: {
    backgroundColor: ThemeConfig.color.primary,
    padding: token.paddingXS,
    borderRadius: token.borderRadius,
    display: 'flex',
  },
  titleWrapper: {
    paddingBlock: token.paddingLG,
    paddingInline: token.paddingLG,

    fontSize: token.fontSizeHeading3,
    fontWeight: token.fontWeightStrong,
    color: token.colorBgBase,
    textAlign: 'center',
    textOrientation: 'sideways',
    writingMode: 'vertical-rl',
    transform: 'rotate(-180deg)',
  },
}));

const CardGroup: FC<CardGroupProps> = ({ children, title }) => {
  const styles = useStyles();
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>{title}</div>
      {children}
    </div>
  );
};

export default CardGroup;
