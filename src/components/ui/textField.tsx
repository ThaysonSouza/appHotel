import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, TextInput, TextInputProps, Text } from "react-native";

type Props = TextInputProps & {
    label: string;
    errorText?: string;
    icon?: keyof typeof MaterialIcons.glyphMap;
}

export default function TextField ({label, errorText, icon} : Props){
    return (
        <View>
            <Text>{label}</Text>
            <View>
                {!! icon && (
                    <View>
                        <FontAwesome6 name={icon} size={18} color="purple" />
                    </View>
                )}
                <TextInput
                
                />
            </View>
        </View>
    )
}