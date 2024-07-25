import { ThemeConfig, extendTheme } from "@chakra-ui/react";

export const API_URL = 'http://localhost:5000/api';

const themeConfig: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
};

export enum Colors {
  C1 = '#000000',
  C2 = '#101010',
  C3 = '#202020',
  C4 = '#262626',
  C5 = '#3E3E3E',
  C6 = '#8D8D8D',
  C7 = '#A9A9A9',
  C8 = '#FFFFFF'
}
  
export const theme = extendTheme({ config: themeConfig });

