import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import AuthContainer from "../ui/AuthContainer";
import FeedbackButton from "../ui/FeedbackButton";
import { borderRadius, colors, shadows, spacing } from "../ui/designTokens";
import { global } from "../ui/styles";

const RenderReservation = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const { showToast } = useToast();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.preco, 0);

  const handleConfirmReservation = () => {
    if (cartItems.length === 0) return;

    showToast("Reserva confirmada com sucesso! Prepando seu quarto...", "success");
    // Chamada para a API de confirmação de reserva
    setTimeout(() => {
      clearCart();
      router.replace("/(tabs)/explorer");
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <AuthContainer>
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: spacing.xxl }}>
          <View style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: colors.background,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: spacing.xl
          }}>
            <Feather name="shopping-bag" size={50} color={colors.primary} />
          </View>
          <Text style={[global.title, { textAlign: "center", marginBottom: spacing.md, fontSize: 24 }]}>
            Sua sacola está vazia
          </Text>
          <Text style={{ textAlign: "center", color: colors.textSecondary, marginBottom: spacing.xxl, lineHeight: 22 }}>
            Parece que você ainda não escolheu o seu refúgio ideal. Vamos encontrar um?
          </Text>
          <FeedbackButton
            title="Explorar destinos"
            onPress={() => router.push("/(tabs)/explorer")}
            style={{ width: "100%" }}
          />
        </View>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxxl * 2, paddingHorizontal: spacing.xl }}
      >
        <Text style={[global.title, { marginBottom: spacing.sm, fontSize: 28 }]}>Sua Reserva</Text>
        <Text style={{ color: colors.textSecondary, marginBottom: spacing.xl }}>{cartItems.length} {cartItems.length === 1 ? 'item selecionado' : 'itens selecionados'}</Text>

        <View style={{ gap: spacing.md, marginBottom: spacing.xxl }}>
          {cartItems.map((item) => (
            <View
              key={`cart-item-${item.id}`}
              style={{
                flexDirection: "row",
                backgroundColor: colors.surface,
                borderRadius: borderRadius.lg,
                padding: spacing.md,
                ...shadows.sm,
                borderWidth: 1,
                borderColor: colors.border,
                alignItems: "center"
              }}
            >
              {item.imageUri && (
                <Image
                  source={{ uri: item.imageUri }}
                  style={{ width: 80, height: 80, borderRadius: borderRadius.md, marginRight: spacing.md }}
                />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: colors.textPrimary, marginBottom: 4 }}>{item.nome}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Feather name="calendar" size={12} color={colors.primary} style={{ marginRight: 4 }} />
                  <Text style={{ fontSize: 12, color: colors.textSecondary }}>
                    {item.checkIn} - {item.checkOut}
                  </Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: 'bold', color: colors.primary }}>R$ {item.preco}</Text>
              </View>
              <FeedbackButton
                title=""
                variant="ghost"
                onPress={() => removeFromCart(item.id)}
                style={{ width: 44, height: 44, paddingHorizontal: 0 }}
                textStyle={{ fontSize: 0 }}
              >
                <Feather name="x" size={20} color={colors.textTertiary} />
              </FeedbackButton>
            </View>
          ))}
        </View>

        {/* Resumo Financeiro */}
        <View style={[global.content, { padding: spacing.lg, marginBottom: spacing.xl }]}>
          <Text style={[global.label, { marginBottom: spacing.base }]}>Resumo do Valor</Text>
          <View style={{ gap: spacing.sm }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.textSecondary }}>Subtotal</Text>
              <Text style={{ color: colors.textPrimary, fontWeight: 'medium' }}>R$ {totalPrice.toFixed(2)}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.textSecondary }}>Taxas de serviço</Text>
              <Text style={{ color: colors.success, fontWeight: 'bold' }}>Grátis</Text>
            </View>
            <View style={{ height: 1, backgroundColor: colors.border, marginVertical: spacing.sm }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: colors.textPrimary, fontWeight: 'bold', fontSize: 18 }}>Total</Text>
              <Text style={{ color: colors.primary, fontWeight: 'black', fontSize: 20 }}>R$ {totalPrice.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <FeedbackButton
          title="Confirmar e Pagar"
          onPress={handleConfirmReservation}
        />

        {/* Link para continuar comprando */}
        <FeedbackButton
          title="Adicionar mais quartos"
          onPress={() => router.push("/(tabs)/explorer")}
          variant="ghost"
          style={{ marginTop: spacing.xl }}
          textStyle={{ textDecorationLine: 'underline' }}
        />
      </ScrollView>
    </AuthContainer>
  );
};

export default RenderReservation;
