import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";

const RenderLogin = () => {
    const router = useRouter();

    return (
        <AuthContainer
            title="Bem-vindo"
            subtitle="Faça seu login para continuar!"
            icon="hotel">

            {/* children */}
            <TextField
                label="E-mail"
                icon={{lib: "MaterialIcons", name: "email"}}
                placeholder="user@email.com"
                keyboardType="email-address"
            />

            <PasswordField
                label="Senha"
                icon={{lib: "MaterialIcons", name: "lock"}}
                placeholder="*********"
            />

            <TouchableOpacity style={[global.primaryButton]} 
            onPress={() => router.push("/(tabs)/explorer")}>
                <Text style={global.primaryButtonText}>Login</Text>
            </TouchableOpacity>
            <View style={global.authLinks}>
                <TouchableOpacity onPress={() => router.push("/(auth)/resetPassword")}>
                    <Text style={global.inlineLink}>Esqueci minha senha</Text>
                </TouchableOpacity>
                <View style={global.divider} />
                <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                    <Text style={global.inlineLink}>Não possui uma conta?{"\n"}Cadastre-se agora!</Text>
                </TouchableOpacity>
            </View>
        </AuthContainer>
    )};

export default RenderLogin;