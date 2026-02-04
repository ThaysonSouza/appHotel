import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import AuthContainer from "../ui/AuthContainer";
import InfoReserva from "../ui/InfoReserva";
import RenderRoomCard from "../ui/RoomCard";
import { colors, dimensions, spacing, typography } from "../ui/designTokens";
import { global } from "../ui/styles";

type Room = {
  id: string;
  name: string;
  price: number;
  imageUri: string;
};

const RenderReservation = () => {
  const router = useRouter();

  // Dados da reserva (em produção viria de um contexto/estado global)
  const reservationData = {
    checkIn: "15/01/2025",
    checkOut: "18/01/2025",
  };

  // Lista de quartos disponíveis
  const availableRooms: Room[] = [
    {
      id: "1",
      name: "Suite Junior",
      price: 150,
      imageUri: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    },
    {
      id: "2",
      name: "Suite Master",
      price: 200,
      imageUri: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    },
  ];

  const [selectedRooms, setSelectedRooms] = useState<string[]>(["1", "2"]); // Máximo 2 quartos selecionados

  const toggleRoomSelection = (roomId: string) => {
    setSelectedRooms((prev) => {
      // Se está desmarcando, remove
      if (prev.includes(roomId)) {
        return prev.filter((id) => id !== roomId);
      }

      // Se está marcando e já tem 2 selecionados, não permite
      if (prev.length >= 2) {
        return prev;
      }

      // Adiciona o quarto
      return [...prev, roomId];
    });
  };

  const selectedRoomsData = availableRooms.filter((room) =>
    selectedRooms.includes(room.id)
  );
  const totalPrice = selectedRoomsData.reduce(
    (sum, room) => sum + room.price,
    0
  );

  const handleConfirmReservation = () => {
    // Lógica para confirmar reserva
    console.log("Reserva confirmada:", {
      ...reservationData,
      rooms: selectedRoomsData,
      totalPrice,
    });
  };

  return (
    <AuthContainer
      title="Sobre sua reserva"
      subtitle="Revise os detalhes antes de confirmar"
      icon="briefcase"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.xxxl * 2 }}
      >
        <View style={global.infoReservaContainer}>
          <Text
            style={[global.infoReservaTitle, { marginBottom: spacing.base }]}
          >
            Quartos Disponíveis ({selectedRooms.length} selecionados)
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingRight: spacing.base }}
          >
            {availableRooms.map((room) => {
              const isSelected = selectedRooms.includes(room.id);
              const isDisabled = !isSelected && selectedRooms.length >= 2;

              return (
                <TouchableOpacity
                  key={room.id}
                  onPress={() => toggleRoomSelection(room.id)}
                  disabled={isDisabled}
                  style={{ position: "relative", marginRight: spacing.base }}
                >
                  <View style={{ opacity: isDisabled ? 0.5 : 1 }}>
                   <RenderRoomCard
                      roomName={room.name}
                      price={`R$ ${room.price.toFixed(2)}`}
                      imageUri={room.imageUri}
                      onPress={() => {}}
                    />
                  </View>
                  <View
                    style={{
                      position: "absolute",
                      top: spacing.sm,
                      right: spacing.sm,
                      backgroundColor: isSelected
                        ? colors.primary
                        : colors.white,
                      borderRadius: spacing.lg,
                      padding: spacing.xs,
                      borderWidth: 2,
                      borderColor: isSelected ? colors.primary : colors.light,
                    }}
                  >
                    <Feather
                      name={isSelected ? "check" : "square"}
                      size={dimensions.iconSize.sm}
                      color={isSelected ? colors.white : colors.textTertiary}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Informações da Reserva - Agora embaixo dos quartos */}
        <InfoReserva
          dateCheckin={reservationData.checkIn}
          dateCheckout={reservationData.checkOut}
          price={`R$ ${totalPrice.toFixed(2)}`}
        />

        <View
          style={[global.infoReservaContainer, { marginTop: spacing.base }]}
        >
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
          <Text style={global.primaryButtonText}>Confirmar Reserva</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            marginTop: spacing.base,
            alignItems: "center",
          }}
          onPress={() => router.push("/(tabs)/explorer")}
        >
          <Text style={global.inlineLink}>Voltar para busca</Text>
        </TouchableOpacity>
      </ScrollView>
    </AuthContainer>
  );
};

export default RenderReservation;
