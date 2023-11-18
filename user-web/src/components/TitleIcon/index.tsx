import { Typography } from 'antd';
import { createStyles } from 'antd-use-styles';
import { FC,ReactNode } from 'react';

interface TitleIconProps {
  icon?: ReactNode;
  title?: ReactNode;
}
const useStyles = createStyles(({ token }) => ({
  icon: {
    marginInlineEnd: token.marginSM,
  },
  title: {
    fontSize: token.fontSizeHeading5
  }
}));
const TitleIcon: FC<TitleIconProps> = ({  icon, title }) => {
  const styles = useStyles()
  return (
    <div>
      {icon && <span className={styles.icon}>{icon}</span>}
      {title && (
        <Typography.Text strong className={styles.title}>
          {title}
        </Typography.Text>
      )}
    </div>
  );
};

export default TitleIcon;
