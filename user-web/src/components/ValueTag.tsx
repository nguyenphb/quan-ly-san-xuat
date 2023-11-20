import { ColorValues, ThemeConfig } from '@/config/theme.config';
import { Tag } from 'antd';
import { createStyles } from 'antd-use-styles';
import React, { FC, ReactNode } from 'react';

interface ValueTagProps {
  children?: ReactNode;
  type?: ColorValues;
}
const useStyles = createStyles(({ token }) => ({
  tagWrapper: {
    fontWeight: token.fontWeightStrong + 100,
  },
}));
const ValueTag: FC<ValueTagProps> = ({ children, type = 'default' }) => {
  const styles = useStyles();
  return (
    <span
      className={styles.tagWrapper}
      style={{
        color: ThemeConfig.color[type],
      }}
    >
      {children}
    </span>
  );
  return (
    <Tag className={styles.tagWrapper} color={ThemeConfig.color[type]}>
      {children}
    </Tag>
  );
};

export default ValueTag;
