
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import moment from 'moment';
import { FC, useEffect } from 'react';
import Avatar from './AvatarDropdown';

import { TeamReminderType } from '@/types/teamReminder.type';
import { useDispatch, useSelector } from 'react-redux';

import NoticeIconView from '../NoticeIcon';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: FC = () => {
  const { initialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;

  const convertNoticeData = (data: TeamReminderType[]) => {
    if (!data.length) {
      return [];
    }
    return data.map<API.NoticeIconItem>((d) => {
      return {
        id: d.name.toString(),
        title: d.message,
        datetime: moment(d.created_at).format('YYYY-MM-DD HH:mm:ss'),
        description: `From: ${d.from_team} - To: ${d.to_team}`,
      };
    });
  };

  useEffect(() => {

  }, []);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className}>
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
