import { StyleSheet } from "react-native";
import { borderRadius, colors, dimensions, shadows, spacing, typography } from "./designTokens";

export const global = StyleSheet.create({
    // ============================================
    // LAYOUT & CONTAINERS
    // ============================================
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    keyboardAvoiding: {
        flex: 1
    },
    container: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.xxxl
    },
    header: {
        alignItems: "center",
        marginBottom: spacing.xxl,
        position: "relative"
    },
    backButton: {
        position: "absolute",
        left: 0,
        top: 0,
        padding: spacing.md,
        borderRadius: borderRadius.md,
        backgroundColor: colors.surface,
        ...shadows.sm
    },
    title: {
        fontSize: typography.size.title,
        fontWeight: typography.weight.black,
        color: colors.textPrimary,
        letterSpacing: -0.5
    },
    subtitle: {
        fontSize: typography.size.base,
        color: colors.textSecondary,
        marginTop: spacing.sm,
        textAlign: "center",
        lineHeight: 22
    },
    content: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.xl,
        padding: spacing.xl,
        ...shadows.md,
    },
    divider: {
        height: 1,
        width: "60%",
        backgroundColor: colors.border,
        borderRadius: borderRadius.round,
        alignSelf: "center",
        marginVertical: spacing.xl
    },
    inlineLink: {
        color: colors.primary,
        fontWeight: typography.weight.bold,
        fontSize: typography.size.base,
        textAlign: "center"
    },

    // ============================================
    // INPUTS (Modern & Minimal)
    // ============================================
    inputGroup: {
        marginBottom: spacing.lg
    },
    label: {
        fontSize: typography.size.sm,
        fontWeight: typography.weight.bold,
        color: colors.textPrimary,
        marginBottom: spacing.sm,
        textTransform: "uppercase",
        letterSpacing: 1
    },
    inputIcon: {
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: borderRadius.md,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: spacing.base,
        height: dimensions.inputHeight,
        backgroundColor: colors.surface
    },
    input: {
        flex: 1,
        fontSize: typography.size.base,
        color: colors.textPrimary,
        fontWeight: typography.weight.medium,
        paddingHorizontal: spacing.sm,
        height: "100%",
    },
    errorText: {
        color: colors.error,
        fontSize: typography.size.xs,
        marginTop: spacing.xs,
        fontWeight: typography.weight.medium
    },

    // ============================================
    // BUTTONS (Premium Feel)
    // ============================================
    primaryButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.lg,
        height: dimensions.buttonHeight,
        alignItems: "center",
        justifyContent: "center",
        ...shadows.md,
    },
    primaryButtonText: {
        color: colors.white,
        fontWeight: typography.weight.bold,
        fontSize: typography.size.base,
        letterSpacing: 0.5
    },
    outlineButton: {
        height: dimensions.buttonHeight,
        borderRadius: borderRadius.lg,
        borderWidth: 2,
        borderColor: colors.primary,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
    },
    outlineButtonText: {
        color: colors.primary,
        fontSize: typography.size.base,
        fontWeight: typography.weight.bold,
    },

    // ============================================
    // TABBAR (Floating Design)
    // ============================================
    tabBar: {
        position: "absolute",
        left: spacing.xl,
        right: spacing.xl,
        bottom: spacing.xl,
        backgroundColor: colors.surface,
        borderRadius: borderRadius.xxl,
        height: dimensions.tabBarHeight,
        ...shadows.lg,
        borderWidth: 0,
        paddingTop: spacing.xs,
        paddingBottom: spacing.sm
    },
    tabBarLabel: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.bold,
    },

    // ============================================
    // MODAL & CARDS
    // ============================================
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.overlay,
        paddingHorizontal: spacing.xl
    },
    modalView: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.xl,
        width: "100%",
        padding: spacing.xl,
        ...shadows.lg,
    },
    infoReservaContainer: {
        backgroundColor: colors.surface,
        borderRadius: borderRadius.lg,
        padding: spacing.lg,
        marginTop: spacing.base,
        ...shadows.sm,
        borderWidth: 1,
        borderColor: colors.border
    },
    infoReservaTitle: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.bold,
        color: colors.textPrimary,
    },
});
