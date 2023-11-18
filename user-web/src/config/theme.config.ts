import { theme } from 'antd';

const designToken = theme.getDesignToken();

export const ThemeConfig = {
  color: {
    primary: '#001d61',
    success: '#23e274' || designToken.colorSuccess,
    danger: designToken.colorError,
    default: '#001d61',
  },
};
export type ColorValues = keyof Pick<typeof ThemeConfig.color, 'danger' | 'default' | 'success'>;
