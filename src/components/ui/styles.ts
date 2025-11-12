import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
export const global = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f3e5f5"
    },
    keyboardAvoiding: {
        flex: 1
    },
    container: {
        paddingHorizontal: width * 0.07,
        paddingVertical: height * 0.07
    },
    header: {
        alignItems: "center",
        marginBottom: height * 0.03
    },
    title: {
        fontSize: 25,
        fontWeight: "800",
        color: "#6a1b9a"
    },
    subtitle: {
        fontSize: 17,
        color: "#6a1b9a",
        marginTop: height * 0.01
    },
    content: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: width * 0.02,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2
    },

    //inputs
    inputGrup: {
        marginBottom: height * 0.02
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#000",
        marginBottom: height * 0.01
    },
    inputIcon: {
        borderWidth: 1,
        borderColor: "#6a1b9a",
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: width * 0.02
    },
    inputError: {
        backgroundColor: "#fed5d5ff",
        borderColor: "rgba(139, 0, 0, 1)"
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: "#000",
        fontWeight: "600",
        paddingHorizontal: width * 0.02    
    }, 
    errorText: {
        color: "red",
        fontSize: 12,
        marginTop: height * 0.01
    }
})  