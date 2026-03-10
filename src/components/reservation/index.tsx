import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../context/CartContext";
import AuthContainer from "../ui/AuthContainer";
import InfoReserva from "../ui/InfoReserva";
import { colors, spacing, typography } from "../ui/designTokens";
import { global } from "../ui/styles";

const RenderReservation = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + item.preco, 0);

  const handleConfirmReservation = () => {
    if (cartItems.length === 0) return;

    console.log("Reserva confirmada:", {
      rooms: cartItems,
      totalPrice,
    });
    // Aqui viria a chamada para a API
    clearCart();
    router.replace("/(tabs)/explorer");
  };

  if (cartItems.length === 0) {
    return (
      <AuthContainer title="Reserva" icon="briefcase">
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: spacing.xl }}>
          <Feather name="shopping-cart" size={80} color={colors.lavender} style={{ marginBottom: spacing.lg }} />
          <Text style={[global.title, { textAlign: "center", marginBottom: spacing.md }]}>
            voce ainda nao tem quartos reservados
          </Text>
          <TouchableOpacity
            style={[global.primaryButton, { width: "100%" }]}
            onPress={() => router.push("/(tabs)/explorer")}
          >
            <Text style={global.primaryButtonText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer
      title="Sua Reserva"
      subtitle="Revise os detalhes antes de confirmar"
      icon="briefcase"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxxl * 2 }}
      >
        <View style={global.infoReservaContainer}>
          <Text style={[global.infoReservaTitle, { marginBottom: spacing.base }]}>
            Itens no Carrinho ({cartItems.length})
          </Text>

          {cartItems.map((item) => (
            <View
              key={`cart-item-${item.id}`}
              style={{
                flexDirection: "row",
                backgroundColor: colors.white,
                borderRadius: 12,
                padding: spacing.md,
                marginBottom: spacing.md,
                borderWidth: 1,
                borderColor: colors.lighter,
                alignItems: "center"
              }}
            >
              {item.imageUri && (
                <Image
                  source={{ uri: item.imageUri }}
                  style={{ width: 60, height: 60, borderRadius: 8, marginRight: spacing.md }}
                />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "bold", fontSize: 16, color: colors.textPrimary }}>{item.nome}</Text>
                <Text style={{ fontSize: 14, color: colors.textSecondary }}>R$ {item.preco} / noite</Text>
                {item.checkIn && (
                  <Text style={{ fontSize: 12, color: colors.textTertiary }}>
                    {item.checkIn} até {item.checkOut}
                  </Text>
                )}
              </View>
              <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                <Feather name="trash-2" size={20} color={colors.errorText} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Informações da Reserva */}
        <InfoReserva
          dateCheckin={cartItems[0]?.checkIn || "-"}
          dateCheckout={cartItems[0]?.checkOut || "-"}
          price={`R$ ${totalPrice.toFixed(2)}`}
        />

        <View style={[global.infoReservaContainer, { marginTop: spacing.base }]}>
          <Text style={[global.infoReservaTitle, { marginBottom: spacing.md }]}>
            Política de Cancelamento
          </Text>
          <Text
            style={{
              fontSize: typography.size.base,
              color: colors.textTertiary,
              lineHeight: typography.size.lg + 4,
            }}
          >
            Cancelamento gratuito até 24 horas antes do check-in. Após esse
            período, será cobrada uma taxa de 50% do valor total.
          </Text>
        </View>

        <TouchableOpacity
          style={[global.primaryButton, { marginTop: spacing.xl }]}
          onPress={handleConfirmReservation}
        >
          <Text style={global.primaryButtonText}>Finalizar Reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: spacing.base,
            alignItems: "center",
          }}
          onPress={() => router.push("/(tabs)/explorer")}
        >
          <Text style={global.inlineLink}>Continuar buscando</Text>
        </TouchableOpacity>
      </ScrollView>
    </AuthContainer>
  );
};

export default RenderReservation;
