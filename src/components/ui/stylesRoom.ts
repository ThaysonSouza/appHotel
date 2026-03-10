import { StyleSheet } from "react-native";
import { borderRadius, colors, shadows, spacing, typography } from "./designTokens";

export const stylesRoom = StyleSheet.create({
  container: {
    width: 280, // Larger for modern feel
    backgroundColor: colors.surface,
    borderRadius: borderRadius.xl,
    overflow: "hidden",
    marginRight: spacing.xl,
    ...shadows.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  image: {
    width: "100%",
    height: 160,
  },
  infoSection: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.size.md,
    fontWeight: typography.weight.bold,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginTop: spacing.xs,
  },
  price: {
    fontSize: typography.size.base,
    fontWeight: typography.weight.black,
    color: colors.primary,
  },
  perNight: {
    fontSize: typography.size.xs,
    color: colors.textTertiary,
    marginLeft: spacing.xs,
  },
  beds: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    fontWeight: typography.weight.medium,
  },
});
