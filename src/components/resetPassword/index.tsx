import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";

const RenderResetPassword = () => {
    const router = useRouter();

    return (
        <AuthContainer
            title="Redefinição de senha"
            subtitle="Digite seu e-mail para receber o link"
            icon="lock"
            onBack={() => router.back()}>

            <TextField
                label="Seu e-mail"
                icon={{lib: "MaterialIcons", name: "email"}}
                placeholder="user@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TouchableOpacity style={[global.primaryButton]}>
                <Text style={global.primaryButtonText}>Enviar e-mail</Text>
            </TouchableOpacity>

            <View style={global.authLinks}>
                <Text style={global.helperText}>Verifique também sua caixa de spam.</Text>
            </View>
        </AuthContainer>
    )};

export default RenderResetPassword;
