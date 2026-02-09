import React, { useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { formatWithMask } from "react-native-mask-input";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { spacing } from "../ui/designTokens";
import { global } from "../ui/styles";

// Máscaras
const CPF_MASK = [
  /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/,
];

const PHONE_MASK = [
  "(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/,
];

const RenderAccount = () => {
  const [name, setName] = useState("Fulano de Tal");
  const [cpf, setCpf] = useState("123.456.789-00");
  const [phone, setPhone] = useState("(11) 91234-5678");
  const [email, setEmail] = useState("fulano@example.com");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateData = () => {
    Alert.alert("Sucesso", "Dados atualizados com sucesso!");
    console.log({
      name,
      cpf,
      phone,
      email,
      password,
    });
  };

  const handleUpdatePassword = () => {
    if (!oldPassword || !newPassword) {
      Alert.alert("Erro", "Preencha todos os campos de senha.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    Alert.alert("Sucesso", "Senha alterada com sucesso!");
    setModalVisible(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
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
          onChangeText={(text) => {
            const { masked } = formatWithMask({
              text,
              mask: CPF_MASK,
            });
            setCpf(masked);
          }}
          icon={{ lib: "MaterialIcons", name: "badge" }}
          placeholder="000.000.000-00"
          keyboardType="numeric"
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

        <PasswordField
          label="Senha"
          value={password}
          onChangeText={setPassword}
          icon={{ lib: "MaterialIcons", name: "lock" }}
          placeholder="********"
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
                ]}>
              {" "}Alterar Senha{" "}
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
