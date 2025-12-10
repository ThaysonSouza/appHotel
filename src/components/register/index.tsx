import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { colors, spacing, typography } from "../ui/designTokens";
import { global } from "../ui/styles";
import { useMemo, useState } from "react";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(telefone: string) {
  return /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(telefone);
}

const RenderRegister = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const [touched, setTouched] = useState<{
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    password?: boolean;
    confirm?: boolean;
  }>({});

  const errors = useMemo(() => {
    const error: Record<string, string> = {};

    if (touched.name && !name) error.name = "Nome obrigatório";
    if (touched.email && !email) error.email = "E-mail obrigatório";
    if (touched.email && email && !isValidEmail(email))
      error.email = "Digite um e-mail válido";
    if (touched.phone && !telefone) error.phone = "Telefone obrigatório";
    if (touched.phone && telefone && !isValidPhone(telefone))
      error.phone = "Digite um telefone válido";

    if (touched.password && !password)
      error.password = "Senha obrigatória";
    if (touched.password && password.length < 6)
      error.password = "No mínimo 6 caracteres";

    if (touched.confirm && !confirm)
      error.confirm = "Confirme sua senha";
    if (touched.confirm && confirm !== password)
      error.confirm = "As senhas não coincidem";

    return error;
  }, [name, email, telefone, password, confirm, touched]);

  const canSubmit =
    name &&
    email &&
    telefone &&
    password &&
    confirm &&
    Object.keys(errors).length === 0 &&
    !loading;

  const handleSubmit = async () => {

    router.replace("/(tabs)/explorer");
  };

  return (
    <AuthContainer
      title="Crie sua conta"
      subtitle="Preencha os dados e comece a reservar!"
      icon="user"
    >

      <TextField
        label="Nome completo"
        placeholder="Digite seu nome"
        icon={{ lib: "FontAwesome6", name: "user" }}
        autoCapitalize="words"
        value={name}
        onChangeText={(input) => setName(input)}
        errorText={errors.name}
      />

      <TextField
        label="E-mail"
        placeholder="user@email.com"
        keyboardType="email-address"
        icon={{ lib: "MaterialIcons", name: "email" }}
        autoCapitalize="none"
        value={email}
        onChangeText={(input) => setEmail(input)}
        errorText={errors.email}
      />

      <TextField
        label="Telefone"
        placeholder="(11) 99999-9999"
        keyboardType="phone-pad"
        icon={{ lib: "MaterialIcons", name: "phone" }}
        value={telefone}
        onChangeText={(input) => setTelefone(input)}
        errorText={errors.phone}
      />

      <PasswordField
        label="Senha"
        placeholder="********"
        icon={{ lib: "MaterialIcons", name: "lock" }}
        value={password}
        onChangeText={(input) => setPassword(input)}
        errorText={errors.password}
      />

      <PasswordField
        label="Confirmar senha"
        placeholder="Repita a senha"
        icon={{ lib: "MaterialIcons", name: "lock" }}
        value={confirm}
        onChangeText={(input) => setConfirm(input)}
        errorText={errors.confirm}
      />

      <TouchableOpacity
        style={global.primaryButton}
        disabled={!canSubmit}
        onPress={handleSubmit}
      >
        <Text style={global.primaryButtonText}>Criar conta</Text>
      </TouchableOpacity>

      <View style={{ alignItems: "center", marginTop: spacing.lg }}>
        <Text
          style={{
            color: colors.textPrimary,
            fontSize: typography.size.sm,
            textAlign: "center",
          }}
        >
          Ao continuar você concorda com nossos Termos e Política de privacidade.
        </Text>

        <TouchableOpacity
          style={{ marginTop: spacing.lg }}
          onPress={() => router.back()}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: typography.weight.semibold,
            }}
          >
            Já possui conta? Faça login
          </Text>
        </TouchableOpacity>
      </View>
    </AuthContainer>
  );
};

export default RenderRegister;
