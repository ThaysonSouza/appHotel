import { useRouter } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import PasswordField from "../ui/PasswordField";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";

const RenderLogin = () => {
    const router = useRouter();
    const { width, height } = Dimensions.get("window");

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
            <View style={{alignItems: "center", marginTop: height * 0.03}}>
                <TouchableOpacity onPress={() => router.push("/(auth)/resetPassword")}>
                    <Text style={{color: "#6E3482", fontSize: 16, fontWeight: "600"}}>Esqueci minha senha</Text>
                </TouchableOpacity>
                <View style={{backgroundColor: "#A56ABD", width: width * 0.55, height: 2,
                    borderRadius: 10, marginTop: height * 0.03}}></View>
                <TouchableOpacity onPress={() => router.push("/(auth)/register")} style={{ marginTop: height * 0.03}}>
                    <Text style={{color: "#49225B", fontWeight: "600", fontSize: 16, textAlign: "center"}}>Não possui uma conta?
                        {"\n"}Cadastre-se agora!
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthContainer>
    )};

export default RenderLogin;