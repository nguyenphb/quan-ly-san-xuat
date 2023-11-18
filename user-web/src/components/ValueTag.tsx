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
    fontWeight: token.fontWeightStrong,
  },
}));
const ValueTag: FC<ValueTagProps> = ({ children, type = 'default' }) => {
  const styles = useStyles();
  return (
    <Tag className={styles.tagWrapper} color={ThemeConfig.color[type]}>
      {children}
    </Tag>
  );
};

export default ValueTag;
