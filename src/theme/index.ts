/**
 * Sistema de tema da aplicação
 */

import { lightColors, darkColors, Colors } from './colors';

export interface Theme {
  colors: Colors;
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    h1: {
      fontSize: number;
      fontWeight: '600';
      lineHeight: number;
    };
    h2: {
      fontSize: number;
      fontWeight: '600';
      lineHeight: number;
    };
    h3: {
      fontSize: number;
      fontWeight: '600';
      lineHeight: number;
    };
    body: {
      fontSize: number;
      fontWeight: '400';
      lineHeight: number;
    };
    button: {
      fontSize: number;
      fontWeight: '700';
      lineHeight: number;
    };
  };
}

const baseTheme = {
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },
  typography: {
    h1: {
      fontSize: 24,
      fontWeight: '600' as const,
      lineHeight: 32,
    },
    h2: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    h3: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
    body: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    button: {
      fontSize: 16,
      fontWeight: '700' as const,
      lineHeight: 24,
    },
  },
};

export const lightTheme: Theme = {
  ...baseTheme,
  colors: lightColors,
};

export const darkTheme: Theme = {
  ...baseTheme,
  colors: darkColors,
};

export { lightColors, darkColors };
export type { Colors };