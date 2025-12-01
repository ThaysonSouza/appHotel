import { StyleSheet } from "react-native";
import { borderRadius, colors, dimensions, shadows, spacing, typography } from "./designTokens";

/**
 * Estilos do RoomCard
 * 
 * Usa os design tokens para manter consistência
 * com o resto do sistema de design
 */

export const stylesRoom = StyleSheet.create({
  container: {
    width: dimensions.cardWidth,
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    overflow: "hidden",
    marginRight: spacing.base,
    ...shadows.md,
  },

  image: {
    width: "100%",
    height: dimensions.cardImageHeight,
  },

  infoSection: {
    padding: dimensions.cardPadding,
    gap: spacing.xs,
  },

  title: {
    fontSize: typography.size.lg,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
  },

  price: {
    fontSize: typography.size.base,
    color: colors.textTertiary,
  },
});
