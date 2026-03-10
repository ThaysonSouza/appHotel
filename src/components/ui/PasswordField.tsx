import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { colors, dimensions } from "./designTokens";
import TextField from "./textField";

type Props = React.ComponentProps<typeof TextField>;

const PasswordField = (props: Props) => {
  const [show, setShow] = useState(false);

  return (
    <TextField
      {...props}
      secureTextEntry={!show}
      autoCapitalize="none"
      autoCorrect={false}
      rightElement={
        <TouchableOpacity
          onPress={() => setShow(!show)}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name={show ? "eye-outline" : "eye-off-outline"}
            size={dimensions.iconSize.md}
            color={colors.primary}
          />
        </TouchableOpacity>
      }
    />
  );
};

export default PasswordField;
