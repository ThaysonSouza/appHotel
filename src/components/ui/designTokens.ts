// PALETA DE CORES
export const colors = {
  // Cores principais (Roxo/Lilás)
  deepPurple: "#49225B",      // Títulos, textos principais
  primary: "#6E3482",         // Botões, links, ícones ativos
  lavender: "#A56ABD",        // Bordas, placeholders
  light: "#E7DBEF",           // Cards, backgrounds secundários
  lighter: "#F5EBFA",         // Background principal, inputs
  
  // Cores neutras
  white: "#FFFFFF",
  black: "#000000",
  
  // Cores de estado
  error: "#fed5d5ff",
  errorBorder: "rgba(139, 0, 0, 1)",
  errorText: "red",
  disabled: "#9ca3af",
  
  // Cores de overlay
  overlay: "rgba(0,0,0,0.35)",
  
  // Cores de texto
  textPrimary: "#49225B",
  textSecondary: "#6E3482",
  textTertiary: "#7A6A8C",
  textPlaceholder: "#A56ABD",
} as const;

//ESPAÇAMENTOS
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

// TIPOGRAFIA HIERÁRQUICA
export const typography = {
  // Tamanhos de fonte
  size: {
    xs: 12,
    sm: 13,
    base: 14,
    md: 15,
    lg: 16,
    xl: 17,
    xxl: 18,
    title: 26,
  },
  
  // Pesos de fonte
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },
} as const;

// BORDAS
export const borderRadius = {
  sm: 10,
  md: 12,
  lg: 16,
  xl: 18,
  xxl: 24,
  xxxl: 28,
  pill: 30,
  round: 999,
} as const;

//SOMBRAS
export const shadows = {
  sm: {
    shadowColor: colors.deepPurple,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  md: {
    shadowColor: colors.deepPurple,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  lg: {
    shadowColor: colors.deepPurple,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
} as const;

// DIMENSÕES FIXAS (para componentes)
export const dimensions = {
  // Botões
  buttonHeight: 48,
  buttonPaddingVertical: 14,
  buttonPaddingHorizontal: 22,
  
  // Inputs
  inputHeight: 48,
  inputPaddingHorizontal: 12,
  inputIconSize: 23,
  
  // Cards
  cardWidth: 240,
  cardImageHeight: 150,
  cardPadding: 14,
  
  // TabBar
  tabBarHeight: 68,
  tabBarIconSize: 24,
  
  // Ícones
  iconSize: {
    sm: 20,
    md: 23,
    lg: 30,
  },
} as const;

