import { Feather, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors, dimensions } from "./designTokens";
import { global } from "./styles";

type Props = {
  title?: string;
  subtitle?: string;
  icon?: keyof typeof FontAwesome6.glyphMap;
  children: React.ReactNode;
  onBack?: () => void;
};

const AuthContainer = ({ title, subtitle, icon, children, onBack }: Props) => {
  return (
    <SafeAreaView style={global.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={global.keyboardAvoiding}
      >
        <ScrollView 
          contentContainerStyle={[global.container, { flexGrow: 1 }]}
          showsVerticalScrollIndicator={false}>
          <View style={global.header}>
            {onBack && (
              <TouchableOpacity style={global.backButton} onPress={onBack}>
                <Feather name="chevron-left" size={dimensions.iconSize.sm} color={colors.primary} />
              </TouchableOpacity>
            )}
            {!!icon && <FontAwesome6 name={icon} size={dimensions.iconSize.lg} color={colors.primary} />}   
            {!!title && <Text style={global.title}>{title}</Text>}
            {!!subtitle && <Text style={global.subtitle}>{subtitle}</Text>}     

          </View>
          <View style={{ flex: 1 }}>{children}</View> {/* Retirada a estilização global.content para não impactar no
          componente AuthContainer a ser chamado em outras telas */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default AuthContainer;
