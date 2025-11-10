import {FontAwesome5} from "@expo/vector-icons"
import {KeyboardAvoidingView, Platform, Text} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    title: string;
    subtitle?: string;
    icon?: keyof typeof FontAwesome5.glyphMap;
    // children: React.ReactNode;
}

export default function AuthContainer({title, subtitle, icon, /*children*/}: Props) {
    return (
        <SafeAreaView style={global.safeArea}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={global.container}>
                <View style={global.header}>
                    {!!icon && <FontAwesome name={icon} size={30} color="purple"}
                    <Text style={global.title}>{title}</Text>
                    {!!subtitle && <Text style={global.subtitle}>{subtitle}</Text>}
                </View>
                <View style={global.content}>
                {/*{children} */}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    );
}