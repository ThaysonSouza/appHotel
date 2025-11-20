import { Feather, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { global } from "./styles";

type Props = {
   title: string;
   subtitle?: string;
   icon?: keyof typeof FontAwesome6.glyphMap;
   children: React.ReactNode;
   onBack?: () => void;
}

const AuthContainer = ({ title, subtitle, icon, children, onBack }: Props) => {
  return (
    <SafeAreaView style={global.safeArea}>
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={global.keyboardAvoiding}>
      <ScrollView contentContainerStyle={global.container}>
        <View style={global.header}>
          {onBack && (
            <TouchableOpacity style={global.backButton} onPress={onBack}>
              <Feather name="chevron-left" size={20} color="#6E3482" />
            </TouchableOpacity>
          )}
          {!!icon && <FontAwesome6 name={icon} size={30} color="#6E3482" />}
          <Text style={global.title}>{title}</Text>
          {!!subtitle && <Text style={global.subtitle}>{subtitle}</Text>}
        </View>
        <View style={global.content}>
        { children }
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default AuthContainer;