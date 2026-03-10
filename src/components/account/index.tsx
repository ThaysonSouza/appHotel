import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { formatWithMask } from "react-native-mask-input";
import { useToast } from "../../context/ToastContext";
import AuthContainer from "../ui/AuthContainer";
import { colors, shadows, spacing } from "../ui/designTokens";
import FeedbackButton from "../ui/FeedbackButton";
import PasswordField from "../ui/PasswordField";
import { global } from "../ui/styles";
import TextField from "../ui/textField";

// Máscaras
const CPF_MASK = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
const PHONE_MASK = ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

const RenderAccount = () => {
  const { signOut, getUserProfile, updatePassword, updateProfile, isLoading: isLoadingAuth } = useAuth();
  const router = useRouter();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userData = await getUserProfile();
        setName(userData.nome || "");
        setEmail(userData.email || "");

        // Formatar CPF e Telefone se vierem sem máscara
        const { masked: maskedCpf } = formatWithMask({ text: userData.cpf || "", mask: CPF_MASK });
        const { masked: maskedPhone } = formatWithMask({ text: userData.telefone || "", mask: PHONE_MASK });

        setCpf(maskedCpf);
        setPhone(maskedPhone);
      } catch (error: any) {
        showToast("Não foi possível carregar os dados do perfil.", "error");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading || isLoadingAuth) {
    return (
      <AuthContainer title="Minha Conta" icon="user">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </AuthContainer>
    );
  }

  const handleUpdateData = async () => {
    if (!name || !email || !phone) {
      showToast("Por favor, preencha todos os campos.", "error");
      return;
    }

    try {
      setLoading(true);
      await updateProfile(name, email, phone);
      showToast("Dados atualizados com sucesso!", "success");
    } catch (error: any) {
      showToast(error.message || "Erro ao atualizar dados.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      showToast("Preencha todos os campos.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("As senhas não coincidem.", "error");
      return;
    }

    try {
      await updatePassword(oldPassword, newPassword);
      showToast("Senha alterada com sucesso!", "success");
      setModalVisible(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      showToast(error.message || "Erro ao atualizar senha.", "error");
    }
  };

  return (
    <AuthContainer>
      <View style={{ alignItems: 'center', marginBottom: spacing.xxl }}>
        <View style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: spacing.md,
          ...shadows.md
        }}>
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: colors.white }}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={[global.title, { fontSize: 24 }]}>{name}</Text>
        <Text style={{ color: colors.textSecondary }}>{email}</Text>
      </View>

      <View style={[global.content, { marginBottom: spacing.xxxl }]}>
        <Text style={[global.label, { marginBottom: spacing.lg }]}>Informações Pessoais</Text>

        <TextField
          label="Nome Completo"
          value={name}
          onChangeText={setName}
          icon={{ lib: "MaterialIcons", name: "person" }}
          placeholder="Seu nome completo"
        />

        <TextField
          label="CPF"
          value={cpf}
          editable={false}
          icon={{ lib: "MaterialIcons", name: "badge" }}
          style={{ backgroundColor: colors.background }}
        />

        <TextField
          label="Telefone"
          value={phone}
          onChangeText={(text) => {
            const { masked } = formatWithMask({
              text,
              mask: PHONE_MASK,
            });
            setPhone(masked);
          }}
          icon={{ lib: "MaterialIcons", name: "phone" }}
          placeholder="(00) 00000-0000"
          keyboardType="numeric"
        />

        <TextField
          label="E-mail"
          value={email}
          onChangeText={setEmail}
          icon={{ lib: "MaterialIcons", name: "email" }}
          placeholder="seuemail@exemplo.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FeedbackButton
          title="Atualizar Perfil"
          onPress={handleUpdateData}
          style={{ marginTop: spacing.md }}
        />

        <View style={global.divider} />

        <View style={{ gap: spacing.md }}>
          <FeedbackButton
            title="Alterar minha senha"
            onPress={() => setModalVisible(true)}
            variant="outline"
          />

          <FeedbackButton
            title="Sair da conta"
            onPress={async () => {
              await signOut();
              router.replace("/(auth)");
            }}
            variant="outline"
            style={{ borderColor: colors.error }}
            textStyle={{ color: colors.error }}
          />
        </View>
      </View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={global.centerView}>
          <View style={global.modalView}>
            <Text style={[global.title, { fontSize: 22, marginBottom: spacing.xl, textAlign: "center" }]}>
              Nova Senha
            </Text>

            <PasswordField
              label="Senha Atual"
              value={oldPassword}
              onChangeText={setOldPassword}
              icon={{ lib: "MaterialIcons", name: "lock" }}
              placeholder="********"
            />

            <PasswordField
              label="Nova Senha"
              value={newPassword}
              onChangeText={setNewPassword}
              icon={{ lib: "MaterialIcons", name: "lock-outline" }}
              placeholder="********"
            />

            <PasswordField
              label="Confirmar"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              icon={{ lib: "MaterialIcons", name: "lock-outline" }}
              placeholder="********"
            />

            <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.xl }}>
              <View style={{ flex: 1 }}>
                <FeedbackButton
                  title="Cancelar"
                  onPress={() => setModalVisible(false)}
                  variant="outline"
                  style={{ borderColor: colors.border }}
                  textStyle={{ color: colors.textSecondary }}
                />
              </View>

              <View style={{ flex: 1 }}>
                <FeedbackButton
                  title="Confirmar"
                  onPress={handleUpdatePassword}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </AuthContainer>
  );
};
export default RenderAccount;
