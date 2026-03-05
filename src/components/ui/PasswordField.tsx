import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { colors, dimensions } from "./designTokens";
import { global } from "./styles";
import TextField from "./textField";

type Props = React.ComponentProps<typeof TextField>;

const PasswordField = (props: Props) => {
  /** React.useState */
  const [show, setShow] = useState(false);

  return (
    <View>
      <TextField
        {...props}
        secureTextEntry={!show}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <TouchableOpacity
        style={global.eyeIcon}
        onPress={() => setShow((showTrue) => !showTrue)}
      >
        <Ionicons
          name={show ? "eye-outline" : "eye-off-outline"}
          size={dimensions.iconSize.sm}
          color={colors.primary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PasswordField;
