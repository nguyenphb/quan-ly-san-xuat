import {
  LogoutOutlined, SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useEffect } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick = useCallback(
    async (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') {
        // await loginOut();
        localStorage.removeItem('token');
        history.push('/user/login');
        await setInitialState((s) => ({ ...s, currentUser: undefined }));
        return;
      }
      history.push(`/account/${key}`);
    },
    [setInitialState],
  );

  useEffect(() => {
    const logo: any = document
      ?.getElementsByClassName?.('ant-pro-global-header-logo')?.[0]
      ?.getElementsByTagName?.('img')?.[0];
    if (logo) {
      logo.style.height = '40px';
    }
  }, []);

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      {/* <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      /> */}
      <Avatar size="small" className={styles.avatar} icon={<UserOutlined />} />
      <span className={`${styles.name} anticon`}>{"Demo User"}</span>
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.user_id) {
    return loading;
  }

  const menuItems: ItemType[] = [
    ...(menu
      ? [
        {
          key: 'center',
          icon: <UserOutlined />,
          label: '个人中心',
        },
        {
          key: 'settings',
          icon: <SettingOutlined />,
          label: '个人设置',
        },
        {
          type: 'divider' as const,
        },
      ]
      : []),
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Đăng xuất',
    },
  ];

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );
  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        {currentUser.user_image ? (
          <Avatar
            size="small"
            className={styles.avatar}
            src={currentUser.user_image}
            alt="avatar"
          />
        ) : (
          <Avatar size="small" className={styles.avatar} icon={<UserOutlined />} />
        )}
        <span className={`${styles.name} anticon`}>{currentUser.full_name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
