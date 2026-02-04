import { StyleSheet } from "react-native";
import { borderRadius, colors, dimensions, shadows, spacing, typography } from "./designTokens";

export const global = StyleSheet.create({
    // ============================================
    // LAYOUT
    // ============================================
    safeArea: {
        flex: 1,
        backgroundColor: colors.lighter,
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
        marginBottom: spacing.lg,
        position: "relative"
    },
    backButton: {
        position: "absolute",
        left: 0,
        top: 0,
        padding: spacing.sm,
        borderRadius: borderRadius.round,
        backgroundColor: colors.lighter,
        ...shadows.sm
    },
    title: {
        fontSize: typography.size.title,
        fontWeight: typography.weight.extrabold,
        color: colors.textPrimary
    },
    subtitle: {
        fontSize: typography.size.lg,
        color: colors.textSecondary,
        marginTop: spacing.xs,
        textAlign: "center"
    },
    helperText: {
        fontSize: typography.size.base,
        color: colors.textTertiary,
        marginTop: spacing.base,
        textAlign: "center"
    },
    content: {
        backgroundColor: colors.light,
        borderRadius: borderRadius.xl,
        padding: spacing.base,
        ...shadows.md
    },
    divider: {
        height: 1,
        width: "50%",
        backgroundColor: colors.lavender,
        borderRadius: borderRadius.sm,
        alignSelf: "center",
        marginTop: spacing.lg
    },
    authLinks: {
        alignItems: "center",
        marginTop: spacing.lg,
        gap: spacing.base
    },
    inlineLink: {
        color: colors.primary,
        fontWeight: typography.weight.semibold,
        fontSize: typography.size.md,
        textAlign: "center"
    },

    // ============================================
    // INPUTS
    // ============================================
    inputGroup: {
        marginBottom: spacing.base
    },
    label: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.semibold,
        color: colors.textPrimary,
        marginBottom: spacing.xs
    },
    inputIcon: {
        borderWidth: 1,
        borderColor: colors.lavender,
        borderRadius: borderRadius.md,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: spacing.md,
        backgroundColor: colors.lighter
    },
    inputError: {
        backgroundColor: colors.error,
        borderColor: colors.errorBorder
    },
    input: {
        flex: 1,
        fontSize: typography.size.lg,
        color: colors.textPrimary,
        fontWeight: typography.weight.medium,
        paddingHorizontal: spacing.md
    },
    inputPlaceholder: {
        color: colors.textPlaceholder
    },
    eyeIcon: {
        position: "absolute",
        right: spacing.base,
        top: 35
    },
    errorText: {
        color: colors.errorText,
        fontSize: typography.size.md,
        marginTop: spacing.sm
    },

    // ============================================
    // BUTTONS
    // ============================================
    primaryButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.pill,
        paddingVertical: dimensions.buttonPaddingVertical,
        alignItems: "center",
        marginTop: spacing.md
    },
    primaryButtonDisabled: {
        backgroundColor: colors.disabled
    },
    primaryButtonText: {
        color: colors.lighter,
        fontWeight: typography.weight.bold,
        fontSize: typography.size.xl
    },

    // ============================================
    // TABBAR
    // ============================================
    tabBar: {
        position: "absolute",
        left: spacing.lg,
        right: spacing.lg,
        bottom: spacing.base,
        backgroundColor: colors.lighter,
        borderRadius: borderRadius.xxl,
        height: dimensions.tabBarHeight,
        borderWidth: 1,
        borderColor: colors.light,
        ...shadows.lg,
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xs,
        paddingBottom: spacing.sm
    },
    tabBarLabel: {
        fontSize: typography.size.xs,
        fontWeight: typography.weight.bold,
        marginTop: -spacing.xs
    },

    // ============================================
    // MODAL
    // ============================================
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.base,
        backgroundColor: colors.overlay
    },
    modalView: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxxl,
        width: "100%",
        padding: spacing.xl,
        alignItems: "center",
        shadowColor: colors.deepPurple,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: spacing.xs,
        elevation: 6,
    },

    // ============================================
    // DATEPICKER
    // ============================================
    datePickerWrapper: {
        marginHorizontal: spacing.lg,
        marginTop: spacing.xl,
        gap: spacing.sm,
    },
    datePickerLabel: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.semibold,
        color: colors.textPrimary,
    },
    datePickerTrigger: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xxl,
        borderWidth: 1,
        borderColor: colors.light,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.base,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        ...shadows.md,
    },
    datePickerValue: {
        fontSize: typography.size.xxl,
        fontWeight: typography.weight.bold,
        color: colors.primary,
    },
    datePickerHint: {
        fontSize: typography.size.sm,
        color: colors.textTertiary,
        marginTop: spacing.xs,
    },
    datePickerIconBubble: {
        backgroundColor: colors.lighter,
        borderRadius: spacing.lg,
        padding: spacing.sm,
    },
    datePickerModalTitle: {
        fontSize: typography.size.xxl,
        fontWeight: typography.weight.bold,
        color: colors.textPrimary,
        marginBottom: spacing.md,
    },
    datePickerActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: spacing.md,
        width: "100%",
        marginTop: spacing.base,
    },
    datePickerGhostButton: {
        paddingHorizontal: spacing.base,
        paddingVertical: spacing.sm,
    },
    datePickerGhostText: {
        color: colors.primary,
        fontWeight: typography.weight.semibold,
    },
    datePickerPrimaryButton: {
        backgroundColor: colors.primary,
        borderRadius: borderRadius.xxl,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.sm,
    },
    datePickerPrimaryText: {
        color: colors.lighter,
        fontWeight: typography.weight.bold,
    },

    // ============================================
    // INFO RESERVA
    // ============================================
    infoReservaContainer: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginTop: spacing.base,
        ...shadows.md,
    },
    infoReservaHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        marginBottom: spacing.base,
        paddingBottom: spacing.base,
        borderBottomWidth: 1,
        borderBottomColor: colors.light,
    },
    infoReservaTitle: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        color: colors.textPrimary,
    },
    infoReservaContent: {
        gap: spacing.sm,
    },
    infoReservaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: spacing.xs,
    },
    infoReservaLabelContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.sm,
        flex: 1,
    },
    infoReservaLabel: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.medium,
        color: colors.textTertiary,
    },
    infoReservaValue: {
        fontSize: typography.size.md,
        fontWeight: typography.weight.semibold,
        color: colors.textPrimary,
        textAlign: "right",
        flex: 1,
    },
    infoReservaPrice: {
        fontSize: typography.size.lg,
        fontWeight: typography.weight.bold,
        color: colors.primary,
    },
    infoReservaDivider: {
        height: 1,
        backgroundColor: colors.light,
        marginVertical: spacing.xs,
    },

    
    // ============================================
    // ACCOUNT/PERFIL
    // ============================================
    
    outlineButton: { 
        paddingVertical: dimensions.buttonPaddingVertical,  
        paddingHorizontal: dimensions.buttonPaddingHorizontal, 
        borderRadius: borderRadius.pill,  borderWidth: 1.5,  
        borderColor: colors.primary,  
        alignItems: "center",  
        justifyContent: "center",
        backgroundColor: "transparent",
    }, 
    outlineButtonText: { 
        color: colors.primary, 
        fontSize: dimensions.iconSize.sm,
        fontWeight: "700",  
    }, 
    modalButtons: {  
        flexDirection: "row", 
        justifyContent: "space-between", 
        marginTop: spacing.lg,  gap: spacing.md,
    },
    modalButton: {  flex: 1,  
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,  
        alignItems: "center",  justifyContent: "center",
    },
    cancelButton: {
        backgroundColor: colors.white, 
        borderWidth: 1,  
        borderColor: colors.disabled, 
    }, 
    saveButton: { 
        backgroundColor: colors.primary,  
    },
    cancelButtonText: {
        color: colors.textTertiary,   
     }, 
    saveButtonText: { 
        color: colors.white, 
        fontWeight: "bold", 
    },


});
