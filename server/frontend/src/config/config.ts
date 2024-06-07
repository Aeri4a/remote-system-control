import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const API_URL = 'http://localhost:5000/api';

const themeConfig: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
  };
  
export const theme = extendTheme({ config: themeConfig });

