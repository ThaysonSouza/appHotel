import { StyleSheet } from "react-native";

export const global = StyleSheet.create({
    // Layout
    safeArea: {
        flex: 1,
        backgroundColor: "#F5EBFA"
    },
    keyboardAvoiding: {
        flex: 1
    },
    container: {
        paddingHorizontal: 24,
        paddingVertical: 40
    },
    header: {
        alignItems: "center",
        marginBottom: 20,
        position: "relative"
    },
    backButton: {
        position: "absolute",
        left: 0,
        top: 0,
        padding: 10,
        borderRadius: 999,
        backgroundColor: "#F5EBFA",
        shadowColor: "#49225B",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#49225B"
    },
    subtitle: {
        fontSize: 16,
        color: "#6E3482",
        marginTop: 6,
        textAlign: "center"
    },
    helperText: {
        fontSize: 14,
        color: "#7A6A8C",
        marginTop: 14,
        textAlign: "center"
    },
    content: {
        backgroundColor: "#E7DBEF",
        borderRadius: 18,
        padding: 16,
        shadowColor: "#49225B",
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4
    },
    divider: {
        height: 1,
        width: "50%",
        backgroundColor: "#D9C8EA",
        borderRadius: 10,
        alignSelf: "center",
        marginTop: 20
    },
    authLinks: {
        alignItems: "center",
        marginTop: 20,
        gap: 16
    },
    inlineLink: {
        color: "#6E3482",
        fontWeight: "600",
        fontSize: 15,
        textAlign: "center"
    },

    // Inputs
    inputGroup: {
        marginBottom: 16
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#49225B",
        marginBottom: 6
    },
    inputIcon: {
        borderWidth: 1,
        borderColor: "#A56ABD",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 12,
        backgroundColor: "#F5EBFA"
    },
    inputError: {
        backgroundColor: "#fed5d5ff",
        borderColor: "rgba(139, 0, 0, 1)"
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#49225B",
        fontWeight: "500",
        paddingHorizontal: 12
    },
    eyeIcon: {
        position: "absolute",
        right: 18,
        top: 45
    },
    errorText: {
        color: "red",
        fontSize: 15,
        marginTop: 8
    },

    // Buttons
    primaryButton: {
        backgroundColor: "#6E3482",
        borderRadius: 30,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 12
    },
    primaryButtonDisabled:{
        backgroundColor: "#9ca3af"

    },
    primaryButtonText: {
        color: "#F5EBFA",
        fontWeight: "700",
        fontSize: 17
    },

    // TabBar
    tabBar:  {
        position: "absolute",
        left: 20,
        right: 20,
        bottom: 18,
        backgroundColor: "#F5EBFA",
        borderRadius: 26,
        height: 68,
        borderWidth: 1,
        borderColor: "#E7DBEF",
        shadowColor: "#49225B",
        shadowOpacity: 0.12,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
        paddingHorizontal: 20,
        paddingTop: 6,
        paddingBottom: 10
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: "700",
        marginTop: -4
    },

    // Modal
    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "rgba(0,0,0,0.35)"
    },
    modalView: {
        backgroundColor: "#FFFFFF",
        borderRadius: 28,
        width: "100%",
        padding: 24,
        alignItems: "center",
        shadowColor: "#49225B",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 6,
    },

    // DatePicker
    datePickerWrapper: {
        marginHorizontal: 20,
        marginTop: 24,
        gap: 8,
    },
    datePickerLabel: {
        fontSize: 15,
        fontWeight: "600",
        color: "#49225B",
    },
    datePickerTrigger: {
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#E7DBEF",
        paddingHorizontal: 20,
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        shadowColor: "#49225B",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    datePickerValue: {
        fontSize: 18,
        fontWeight: "700",
        color: "#6E3482",
    },
    datePickerHint: {
        fontSize: 13,
        color: "#7A6A8C",
        marginTop: 4,
    },
    datePickerIconBubble: {
        backgroundColor: "#F5EBFA",
        borderRadius: 20,
        padding: 10,
    },
    datePickerModalTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#49225B",
        marginBottom: 12,
    },
    datePickerActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 12,
        width: "100%",
        marginTop: 16,
    },
    datePickerGhostButton: {
        paddingHorizontal: 18,
        paddingVertical: 10,
    },
    datePickerGhostText: {
        color: "#6E3482",
        fontWeight: "600",
    },
    datePickerPrimaryButton: {
        backgroundColor: "#6E3482",
        borderRadius: 22,
        paddingHorizontal: 22,
        paddingVertical: 10,
    },
    datePickerPrimaryText: {
        color: "#F5EBFA",
        fontWeight: "700",
    },
});