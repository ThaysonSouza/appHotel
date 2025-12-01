import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { colors, dimensions } from "./designTokens";
import { global } from "./styles";

type IconConfig =
    | { lib: "MaterialIcons"; name: keyof typeof MaterialIcons.glyphMap }
    | { lib: "FontAwesome6"; name: keyof typeof FontAwesome6.glyphMap }
    | { lib: "FontAwesome5"; name: keyof typeof FontAwesome5.glyphMap };

type Props = TextInputProps & {
    label: string;
    errorText?: string;
    icon?: IconConfig;
}
const TextField = ({label, errorText, icon, style, ...restInputProps } : Props) => {
    return (
        <View style={global.inputGroup}>
            <Text style={global.label}>{label}</Text>
            <View style={[global.inputIcon, errorText ? global.inputError : null]}>
                {!! icon && (
                    <View>
                        {icon.lib === "MaterialIcons" && (
                            <MaterialIcons name={icon.name} size={dimensions.inputIconSize} color={colors.primary} />
                        )}
                        {icon.lib === "FontAwesome6" && (
                            <FontAwesome6 name={icon.name} size={dimensions.inputIconSize} color={colors.primary} />
                        )}
                        {icon.lib === "FontAwesome5" && (
                            <FontAwesome5 name={icon.name} size={dimensions.inputIconSize} color={colors.primary} />
                        )}
                    </View>
                )}
                <TextInput
                    keyboardAppearance="dark"
                    placeholderTextColor={colors.textPlaceholder}
                    style={[global.input, style]}
                    {...restInputProps}
                />
            </View>   
            {!! errorText &&
                <Text style={global.errorText}>{errorText}</Text>
            }
        </View>
    )
};

export default TextField;
