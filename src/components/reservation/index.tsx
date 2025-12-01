import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import InfoReserva from "../ui/InfoReserva";
import RenderRoomCard from "../ui/RoomCard";
import { colors, spacing, typography } from "../ui/designTokens";
import { global } from "../ui/styles";

type ReservationData = {
  checkIn: string;
  checkOut: string;
  roomName: string;
  price: string;
};

const RenderReservation = () => {
  const router = useRouter();

  // Dados da reserva (em produção viria de um contexto/estado global)
  const reservationData: ReservationData = {
    checkIn: "15/01/2025",
    checkOut: "18/01/2025",
    roomName: "Suite Junior",
    price: "R$ 450,00",
  };

  const handleConfirmReservation = () => {
    // Lógica para confirmar reserva
    console.log("Reserva confirmada:", reservationData);
  };

  return (
    <AuthContainer
      title="Minha Reserva"
      subtitle="Revise os detalhes antes de confirmar"
      icon="briefcase">
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxxl * 2 }}>
        
        <InfoReserva
          dateCheckin={reservationData.checkIn}
          dateCheckout={reservationData.checkOut}
          roomName={reservationData.roomName}
          price={reservationData.price}
        />

        <View style={global.infoReservaContainer}>
          <Text style={[global.infoReservaTitle, { marginBottom: spacing.base }]}>
            Quarto Selecionado
          </Text>
          <RenderRoomCard />
        </View>

        <View style={[global.infoReservaContainer, { marginTop: spacing.base }]}>
          <Text style={[global.infoReservaTitle, { marginBottom: spacing.md }]}>
            Política de Cancelamento
          </Text>
          <Text style={{
            fontSize: typography.size.base,
            color: colors.textTertiary,
            lineHeight: typography.size.lg + 4,
          }}>
            Cancelamento gratuito até 24 horas antes do check-in. 
            Após esse período, será cobrada uma taxa de 50% do valor total.
          </Text>
        </View>

        <TouchableOpacity 
          style={[global.primaryButton, { marginTop: spacing.xl }]}
          onPress={handleConfirmReservation}>
          <Text style={global.primaryButtonText}>Confirmar Reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            marginTop: spacing.base,
            alignItems: "center",
          }}
          onPress={() => router.push("/(tabs)/explorer")}>
          <Text style={global.inlineLink}>
            Voltar para busca
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AuthContainer>
  );
};

export default RenderReservation;

