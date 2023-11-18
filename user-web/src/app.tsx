import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import { Settings as LayoutSettings } from '@ant-design/pro-components';
import { history, Link, RunTimeLayoutConfig } from '@umijs/max';
import { App, Button, ConfigProvider, Result, Space } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';

import defaultSettings from '../config/defaultSettings';
import { errorConfig } from './requestErrorConfig';
import { getUserInfo } from './services/user';

const loginPath = '/user/login';
const resetPass = '/user/update-password';
const forgotPass = '/user/forgot-password';
const isDev = process.env.NODE_ENV === 'development';
dayjs.locale('en');
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  collapsed?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const userdata = await getUserInfo();
      return userdata?.data;
    } catch (error: any) {
      if (error?.response.status === 401 || error?.response.status === 403) {
        history.push(loginPath);
      } else {
        console.log(error);
      }
    }
  };

  // 如果不是登录页面，执行
  const { location } = history;
  if (location.pathname === loginPath) {
    const currentUser = await fetchUserInfo();
    history.push('/dashboard');
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }

  if (
    location.pathname !== loginPath &&
    location.pathname !== resetPass &&
    location.pathname !== forgotPass
  ) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings as Partial<LayoutSettings>,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings as Partial<LayoutSettings>,
    collapsed: true,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    unAccessible: (
      <Result
        status="403"
        title="403"
        subTitle="Xin lỗi, bạn không được phép truy cập trang này."
        extra={
          <Button type="primary" onClick={() => history.replace('/')}>
            Về trang chủ
          </Button>
        }
      />
    ),
    rightContentRender: () => <RightContent />,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.full_name,
    // },
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
    },
    collapsed: initialState?.collapsed,
    onCollapse: (collapsed: boolean) => setInitialState({ ...initialState, collapsed }),
    layoutBgImgList: [
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
        left: 85,
        bottom: 100,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
        bottom: -68,
        right: -45,
        height: '303px',
      },
      {
        src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
        bottom: 0,
        left: 0,
        width: '331px',
      },
    ],
    links: isDev
      ? [
          <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      //  const locale: string = getLocale();
      // eslint-disable-next-line react-hooks/rules-of-hooks

      // if (initialState?.loading) return <PageLoading />;
      return (
        <ConfigProvider>
          <App>{children}</App>
        </ConfigProvider>
      );
    },
    menu: {
      locale: false,
      params: initialState,
      type: 'sub',
      request: async (params, defaultMenuData) => {
        // console.log('defaultMenuData: ', defaultMenuData);
        return defaultMenuData.map((item) => {
          if (item.path === '/farming-management') {
            return {
              ...item,
              children: item.children?.map((route: any) => {
                if (route.icon && route?.icon?.startsWith('/')) {
                  // console.log('route: ', route);

                  return {
                    ...route,
                    element: <img src={route?.icon} />,
                    name: (
                      <Space>
                        <img src={route?.icon} />
                        {route.name}
                      </Space>
                    ),
                    icon: <img src={route?.icon} />,
                  };
                }
                return route;
              }),
            };
          }
          return item;
        });
      },
    },

    ...initialState?.settings,
  };
};

/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
