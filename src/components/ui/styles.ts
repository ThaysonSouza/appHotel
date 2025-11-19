import { Tabs } from "expo-router";
import { screenOptionsFactory } from "expo-router/build/useScreens";
import { StyleSheet } from "react-native";

export const global = StyleSheet.create({
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
        marginBottom: 20
    },
    title: {
        fontSize: 26,
        fontWeight: "800",
        color: "#49225B"
    },
    subtitle: {
        fontSize: 16,
        color: "#6E3482",
        marginTop: 6
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

    //inputs
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

    //TabBar
    screenOptions:  {
        backgroundColor: "#E7DBEF",
        borderRadius: 20
    },

    centerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: "90%",
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E7DBEF",
        borderRadius: 18,
        padding: 16,
        shadowColor: "#49225B",
        shadowOpacity: 0.1,
        shadowRadius: 16,
    },
    image: {
        width: 200,
        height: 150,
        resizeMode: "cover"
    },
    infoSection: {
        justifyContent: "center",
        alignItems: "center"
    },
    price: {
        justifyContent: "center",
        alignItems: "center"
    }

    
})