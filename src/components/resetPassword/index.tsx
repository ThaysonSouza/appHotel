import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useState, useMemo } from "react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const RenderResetPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState<{ email?: boolean }>({});
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => {
    const error: Record<string, string> = {};

    if (touched.email && !email) error.email = "E-mail obrigatório";
    if (touched.email && email && !isValidEmail(email))
      error.email = "Digite um e-mail válido";

    return error;
  }, [email, touched]);

  const canSubmit =
    email && Object.keys(errors).length === 0 && !loading;

  const handleSubmit = async () => {
    router.back();
  };

  return (
    <AuthContainer
      title="Redefinição de senha"
      subtitle="Digite seu e-mail para receber o link"
      icon="lock"
      onBack={() => router.back()}
    >

      <TextField
        label="Seu e-mail"
        icon={{ lib: "MaterialIcons", name: "email" }}
        placeholder="user@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(input) => setEmail(input)}
        errorText={errors.email}
      />

      <TouchableOpacity
        style={[global.primaryButton]}
        disabled={!canSubmit}
        onPress={handleSubmit}
      >
        <Text style={global.primaryButtonText}>Enviar e-mail</Text>
      </TouchableOpacity>

      <View style={global.authLinks}>
        <Text style={global.helperText}>
          Verifique também sua caixa de spam.
        </Text>
      </View>
    </AuthContainer>
  );
};

export default RenderResetPassword;
