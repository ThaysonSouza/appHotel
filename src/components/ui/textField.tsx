import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { global } from "./styles";


type Props = TextInputProps & {
    label: string;
    errorText?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
}
const TextField = ({label, errorText, icon, ...restInputProps } : Props) => {
    return (
        <View style={global.inputGrup}>
            <Text style={global.label}>{label}</Text>
            <View style={[global.inputIcon, errorText ? global.inputError : null]}>
                {!! icon && (
                    <View>
                        <MaterialIcons name={icon} size={24} color="#6a1b9a" />
                    </View>
                )}
                <TextInput
                    keyboardAppearance="dark"
                    placeholderTextColor="#9ca3af"
                    style={[global.input]}
                    /* const TextField = ({label, errorText, icon, ...restInputProps} : Props-+) => {
                        style
                        value 
                        onChangeText
                        } */
                    {... restInputProps }
                />
            </View>  
            (!! errorText &&
                <Text style={global.errorText}>(errorText)</Text>
            )  
        </View>
    )
};

export default TextField;