import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";
import { useMemo, useState } from "react";
import { Alert } from "react-native";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const RenderLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState<{
    email?: boolean;
    password?: boolean;
  }>({});

  const errors = useMemo(() => {
    const error: Record<string, string> = {};

    if (touched.email && !email) error.email = "E-mail obrigatório";
    if (touched.email && email && !isValidEmail(email))
      error.email = "Digite um e-mail válido";

    if (touched.password && !password) error.password = "Senha obrigatória";
    if (touched.password && password.length < 6)
      error.password = "No mínimo 6 caracteres";

    return error;
  }, [email, password, touched]);

  const canSubmit =
    email && password && Object.keys(errors).length === 0 && !loading;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log("[LOGIN]  Tentando login com: ", {
        email: email,
        password: password
      });
      await new Promise((req) => setTimeout(req, 2000));
      if (email === "t@t.c" && password === "123") {
        Alert.alert("login realizado!!");
        router.replace("/(tabs)/explorer");
      }else{
        Alert.alert("login invalido!");
        return;
      }
    } catch (erro){
      Alert.alert("Erro", "Falha ao tentar logar. Tente novamente")
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <AuthContainer
      title="Bem-vindo"
      subtitle="Faça seu login para continuar!"
      icon="hotel"
    >
      <TextField
        label="E-mail"
        icon={{ lib: "MaterialIcons", name: "email" }}
        placeholder="user@email.com"
        keyboardType="email-address"
        value={email}
        onChangeText={(input) => setEmail(input)}
        errorText={errors.email}
      />

      <PasswordField
        label="Senha"
        icon={{ lib: "MaterialIcons", name: "lock" }}
        placeholder="*********"
        value={password}
        onChangeText={(input) => setPassword(input)}
        errorText={errors.password}
      />

      <TouchableOpacity
        style={[global.primaryButton]}
        disabled={!canSubmit}
        onPress={handleSubmit}
      >
        <Text style={global.primaryButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={global.authLinks}>
        <TouchableOpacity onPress={() => router.push("/(auth)/resetPassword")}>
          <Text style={global.inlineLink}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <View style={global.divider} />

        <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
          <Text style={global.inlineLink}>
            Não possui uma conta?{"\n"}Cadastre-se agora!
          </Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default RenderLogin;
