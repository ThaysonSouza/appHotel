// PALETA DE CORES PREMIUM
export const colors = {
  // Cores de Marca (Midnight Lavender)
  primary: "#6D28D9",         // Roxo Vibrante (Moderno)
  primaryDark: "#4C1D95",     // Roxo Profundo para estados pressed
  secondary: "#10B981",       // Esmeralda para sucesso/confirmação (Airbnb style)
  accent: "#F59E0B",          // Âmbar para destaques/estrelas

  // Escala de Cinzas (Neutros)
  background: "#F9FAFB",      // Fundo super limpo
  surface: "#FFFFFF",         // Superfície de cards e modais
  border: "#E5E7EB",          // Bordas sutis
  borderFocus: "#C4B5FD",     // Borda ao focar input

  // Cores de Texto
  textPrimary: "#111827",     // Quase preto para leitura máxima
  textSecondary: "#4B5563",   // Cinza escuro para descrições
  textTertiary: "#9CA3AF",    // Cinza claro para labels e hints
  white: "#FFFFFF",

  // Estados
  error: "#EF4444",
  success: "#10B981",
  warning: "#F59E0B",
  disabled: "#D1D5DB",

  // Overlay
  overlay: "rgba(0, 0, 0, 0.45)",
  lightOverlay: "rgba(255, 255, 255, 0.9)",
} as const;

// ESPAÇAMENTOS (Base 4)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

// TIPOGRAFIA (Inter style)
export const typography = {
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 28,
    title: 32,
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    black: "900",
  },
} as const;

// BORDAS (Mais arredondadas)
export const borderRadius = {
  none: 0,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  round: 9999,
} as const;

// SOMBRAS (Elevations Modernas)
export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;

// DIMENSÕES
export const dimensions = {
  buttonHeight: 56,
  inputHeight: 56,
  tabBarHeight: 75,
  iconSize: {
    sm: 18,
    md: 24,
    lg: 32,
  },
} as const;

