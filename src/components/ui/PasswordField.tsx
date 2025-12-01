import React, { useState } from "react";
import TextField from "./TextField";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, dimensions } from "./designTokens";
import { global } from "./styles";

type Props = React.ComponentProps<typeof TextField>;

const PasswordField = (props : Props) => {

    /** React.useState */
    const[show, setShow] = useState(false);
    return (
        <View>
            <TextField
            {...props}
            secureTextEntry={!show}
            autoCapitalize="none"
            autoCorrect={false}
            />

            <TouchableOpacity style={global.eyeIcon} onPress={() => setShow((showTrue) => !showTrue)}>
                <Ionicons name={show ? "eye-outline" : "eye-off-outline"} size={dimensions.iconSize.sm}
                color={colors.primary}/>
            </TouchableOpacity>

        </View>
    );
};
export default PasswordField;