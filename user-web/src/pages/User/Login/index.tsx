import Footer from '@/components/Footer';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormText } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, message, Row } from 'antd';
import { createStyles } from 'antd-use-styles';
import React, { useEffect } from 'react';
import styles from './index.less';

const useStyles = createStyles(({ token }) => ({

  slideFooter: {
    color: 'white',
  },
  textLarge: {
    fontSize: token.fontSizeHeading1 + 10,
    fontWeight: 700,
  },
  textMedium: {
    fontSize: token.fontSizeHeading3,
    fontWeight: token.fontWeightStrong,
  },
  text: {
    fontSize: token.fontSizeHeading4,
    fontWeight: token.fontWeightStrong,
    lineHeight: 1.5,
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
}));

const Login: React.FC = () => {
  const style = useStyles();
  const { initialState, setInitialState } = useModel('@@initialState');

  const fetchUserInfo = async (onSuccess?: any) => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((s: any) => ({ ...s, currentUser: userInfo }));
      onSuccess?.();
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      // 登录
      const userdata = {
        "user_id": "21603a10-a3a1-11ed-991b-bbc65059a131",
        "first_name": "Demo",
        "last_name": "Account",
        "email": "demo@example.com",
        "customer_id": "09cb98f0-e0f5-11ec-b13b-4376e531a14a",
        "is_admin": 1,
        "iot_dynamic_role": "90ce101c90",
        "sections": "SYSTEM_ADMIN,SYSTEM_ADMIN,SYSTEM_ADMIN,SYSTEM_ADMIN,SYSTEM_ADMIN,SYSTEM_ADMIN,SYSTEM_ADMIN,SYSTEM_ADMIN,SYSTEM_ADMIN,STORAGE_CREATE,STORAGE_READ,STORAGE_UPDATE,STORAGE_DELETE,SYSTEM_ADMIN,SYSTEM_ADMIN",
        "credential_id": "21614b80-a3a1-11ed-991b-bbc65059a131",
        "enable": 0,
        "user_role": [
          "ADMIN_WAREHOUSE",
          "TECHNICIAN_EMPLOYEE"
        ]
      };
      // console.log(userdata, "userdata");
      localStorage.setItem('token', JSON.stringify(
        {
          "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjE2MDNhMTAtYTNhMS0xMWVkLTk5MWItYmJjNjUwNTlhMTMxIiwiZmlyc3RfbmFtZSI6IkRlbW8iLCJsYXN0X25hbWUiOiJBY2NvdW50IiwiZW1haWwiOiJkZW1vQGV4YW1wbGUuY29tIiwiY3VzdG9tZXJfaWQiOiIwOWNiOThmMC1lMGY1LTExZWMtYjEzYi00Mzc2ZTUzMWExNGEiLCJpc19hZG1pbiI6MSwiaW90X2R5bmFtaWNfcm9sZSI6IjkwY2UxMDFjOTAiLCJzZWN0aW9ucyI6IlNZU1RFTV9BRE1JTixTWVNURU1fQURNSU4sU1lTVEVNX0FETUlOLFNZU1RFTV9BRE1JTixTWVNURU1fQURNSU4sU1lTVEVNX0FETUlOLFNZU1RFTV9BRE1JTixTWVNURU1fQURNSU4sU1lTVEVNX0FETUlOLFNUT1JBR0VfQ1JFQVRFLFNUT1JBR0VfUkVBRCxTVE9SQUdFX1VQREFURSxTVE9SQUdFX0RFTEVURSxTWVNURU1fQURNSU4sU1lTVEVNX0FETUlOIiwiY3JlZGVudGlhbF9pZCI6IjIxNjE0YjgwLWEzYTEtMTFlZC05OTFiLWJiYzY1MDU5YTEzMSIsImVuYWJsZSI6MCwidXNlcl9yb2xlIjpbIkFETUlOX1dBUkVIT1VTRSIsIlRFQ0hOSUNJQU5fRU1QTE9ZRUUiXX0.HVdzB--fjTibUUN80ddmz4UaDjpFgtcCo9DlEh46PHMsoKGRU55cdxamz5n8hoBRPVVokR09LVIJsEq82mmsSg",
          "accessToken": "",
          "user": userdata
        }
      ));
      await setInitialState((s: any) => ({ ...s, currentUser: userdata }));
      window.location.href = window.location.origin;
    } catch (error) {
      message.error('Login Failed, Try Again!');
    }
  };

  useEffect(() => {
    if (!initialState?.currentUser?.user_id) fetchUserInfo();
    const urlParams = new URL(window.location.href).searchParams;
    // history.push(urlParams.get('redirect') || '/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialState?.currentUser?.user_id]);

  return (
    <Row className={styles.container}>

      <Col md={24} xs={24}>
        <div className={styles.content}>
          <LoginForm
            logo={<img style={{ width: '150px' }} alt="logo" src="/logo.svg" />}
            title={<div style={{ marginTop: '50px', marginBottom: '20px' }}>ĐĂNG NHẬP VÀO HỆ THỐNG</div>}

            initialValues={{
              autoLogin: true,
            }}
            onFinish={async (values) => {
              await handleSubmit(values as API.RequestLogin);
            }}
            submitter={{
              searchConfig: {
                submitText: 'Đăng nhập',
              },
            }}
          >
            <ProFormText
              initialValue={"demo@example.com"}
              name="usr"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Email'}
              rules={[
                {
                  required: true,
                  message: 'field required',
                },
              ]}
            />
            <ProFormText.Password
              initialValue={"123456"}
              name="pwd"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={'Mật khẩu'}
              rules={[
                {
                  required: true,
                  message: 'field required',
                },
              ]}
            />

            {/* <div
              style={{
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  float: 'right',
                }}
              >
                <Link to={'/user/forgot-password'}>Bạn quên mật khẩu?</Link>
              </div>
            </div> */}
          </LoginForm>
        </div>
        <Footer />
      </Col>
    </Row>
  );
};

export default Login;
