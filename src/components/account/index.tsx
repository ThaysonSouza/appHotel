import { useAuth } from "@/context/AuthContext";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { formatWithMask } from "react-native-mask-input";
import AuthContainer from "../ui/AuthContainer";
import { colors, spacing } from "../ui/designTokens";
import PasswordField from "../ui/PasswordField";
import { global } from "../ui/styles";
import TextField from "../ui/textField";

// Máscaras
const CPF_MASK = [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
const PHONE_MASK = ["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/];

const RenderAccount = () => {
  const { signOut, getUserProfile, updatePassword, updateProfile, isLoading: isLoadingAuth } = useAuth();
  const router = useRouter();

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
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
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
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    try {
      setLoading(true);
      await updateProfile(name, email, phone);
      Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao atualizar dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    try {
      await updatePassword(oldPassword, newPassword);
      Alert.alert("Sucesso", "Senha alterada com sucesso!");
      setModalVisible(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Erro ao atualizar senha.");
    }
  };

  return (
    <AuthContainer
      title="Minha Conta"
      subtitle="Gerencie suas informações"
      icon="user"
    >
      <View style={global.content}>
        <TextField
          label="Nome"
          value={name}
          onChangeText={setName}
          icon={{ lib: "MaterialIcons", name: "person" }}
          placeholder="Seu nome completo"
        />

        {/* CPF */}
        <TextField
          label="CPF"
          value={cpf}
          editable={false}
          icon={{ lib: "MaterialIcons", name: "badge" }}
          style={{ backgroundColor: colors.light, opacity: 0.7 }}
        />

        {/* TELEFONE COM TEXTFIELD */}

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

        <TouchableOpacity
          style={[global.primaryButton, { marginTop: spacing.md }]}
          onPress={handleUpdateData}
        >
          <Text style={global.primaryButtonText}>Salvar Alterações</Text>
        </TouchableOpacity>

        <View style={global.divider} />

        <TouchableOpacity
          style={[global.outlineButton, { marginTop: spacing.lg }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={global.outlineButtonText}>Alterar senha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[global.outlineButton, { marginTop: spacing.lg }]}
          onPress={async () => {
            await signOut();
            router.replace("/(auth)");
          }}
        >
          <Text style={global.outlineButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL */}

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={global.centerView}>
          <View style={global.modalView}>
            <Text
              style={[
                global.title,
                {
                  fontSize: 20,
                  marginBottom: spacing.base,
                  textAlign: "center",
                },
              ]}
            >
              {" "}
              Alterar Senha{" "}
            </Text>

            <PasswordField
              label="Senha Antiga"
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
              label="Confirmar Nova Senha"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              icon={{ lib: "MaterialIcons", name: "lock-outline" }}
              placeholder="********"
            />

            <View style={global.modalButtons}>
              <TouchableOpacity
                style={[global.modalButton, global.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={global.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[global.modalButton, global.saveButton]}
                onPress={handleUpdatePassword}
              >
                <Text style={global.saveButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </AuthContainer>
  );
};
export default RenderAccount;
