import { useRouter } from "expo-router";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import TextField from "../ui/TextField";
import { global } from "../ui/styles";


const RenderResetPassword = () => {
    const router = useRouter();
    const { width, height } = Dimensions.get("window");

    return (
        <AuthContainer
            title="Redefinição de senha"
            subtitle="Digite seu email para receber redefinir sua senha">

            <TextField
                label="Seu E-mail"
                icon={{lib: "MaterialIcons", name: "email"}}
                placeholder="user@email.com"
                keyboardType="email-address"
            />
            <TouchableOpacity style={[global.primaryButton]}>
                <Text style={global.primaryButtonText}>Enviar e-mail</Text>
            </TouchableOpacity>
            <View style={{backgroundColor: "#A56ABD", width: width * 0.55, height: 2,
                    borderRadius: 10, marginTop: height * 0.04}}></View>
            <View style={{alignItems: "center", marginTop: height * 0.01}}>
                <TouchableOpacity
                    style={{ marginTop: height * 0.02 }}
                    onPress={() => router.back()}>
                    <Text style={{ color: "#6E3482", fontWeight: "600" }}>
                        Voltar ao Login
                    </Text>
                </TouchableOpacity>
            </View>
        </AuthContainer>
    )};

export default RenderResetPassword;