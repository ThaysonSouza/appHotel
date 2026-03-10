import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import { colors, spacing, typography } from "../ui/designTokens";
import InputSpin from "../ui/InputSpin";
import RoomCard from "../ui/RoomCard";
import { global } from "../ui/styles";
import TextField from "../ui/textField";

const RenderExplorer = () => {
  const { width } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState<number>(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const { consulta, availableRooms } = useAuth();
  const { setSearchDates } = useCart();
  const closeCalendar = () => setCalendar(null);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      Alert.alert("Erro", "Por favor, selecione as datas de check-in e check-out.");
      return;
    }

    if (checkOut <= checkIn) {
      Alert.alert("Erro", "A data de check-out deve ser posterior à data de check-in.");
      return;
    }

    try {
      setSearchDates(checkIn, checkOut);
      await consulta(checkIn, checkOut, qntGuests);
    } catch (erro: any) {
      Alert.alert(
        "Busca",
        erro?.message || "Erro ao realizar a busca de quartos."
      );
    }
  };

  // Dados mockados para as seções de exploração
  const popularRooms = [
    { id: 101, nome: "Suíte Presidencial", preco: 500, fotos: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461"], camaCasal: 1, camaSolteiro: 0 },
    { id: 102, nome: "Bangalô Luxo", preco: 350, fotos: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"], camaCasal: 1, camaSolteiro: 1 },
  ];

  const recommendedRooms = [
    { id: 201, nome: "Quarto Família", preco: 280, fotos: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a"], camaCasal: 2, camaSolteiro: 1 },
    { id: 202, nome: "Suíte Executiva", preco: 400, fotos: ["https://images.unsplash.com/photo-1590490360182-c33d57733427"], camaCasal: 1, camaSolteiro: 0 },
  ];

  return (
    <AuthContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxxl * 2 }}>
        <View style={{ display: "flex", justifyContent: "center", paddingHorizontal: spacing.lg }}>
          <Text style={[global.title, { marginBottom: spacing.md, textAlign: "center" }]}>Encontre seu Refúgio</Text>

          {/* CHECK-IN */}
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <TextField
              label="Check-in"
              icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
              placeholder="Selecione a data"
              value={checkIn}
              editable={false}
            />
          </TouchableOpacity>

          {/* CHECK-OUT */}
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <TextField
              label="Check-out"
              icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
              placeholder="Selecione a data"
              value={checkOut}
              editable={false}
            />
          </TouchableOpacity>

          {/* QUANTIDADE DE HÓSPEDES */}
          <View style={{ marginBottom: spacing.md }}>
            <Text style={global.label}>Quantidade de hóspedes</Text>
            <InputSpin
              guests={qntGuests}
              onSelectSpin={(guests) => setQntGuests(guests)}
              minGuests={1}
              maxGuests={6}
              step={1}
              colorMin={"#420350ff"}
              colorMax={"#420350ff"}
            />
          </View>

          {/* BOTÃO BUSCAR */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[global.primaryButton, { width: '100%', alignSelf: 'center' }]}
            onPress={handleSearch}
          >
            <Text style={global.primaryButtonText}>Buscar Disponibilidade</Text>
          </TouchableOpacity>
        </View>

        {/* SEÇÃO: QUARTOS DISPONÍVEIS (RESULTADO DA BUSCA) */}
        {availableRooms.length > 0 && (
          <View style={{ marginTop: spacing.xl }}>
            <Text style={[global.label, { marginLeft: spacing.lg, fontSize: typography.size.xl, color: colors.primary }]}>
              Quartos Disponíveis
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }}
            >
              {availableRooms.map((room, index) => (
                <RoomCard
                  key={`room-avail-${room.id}-${index}`}
                  id={room.id}
                  roomName={room.nome}
                  beds={room.camaCasal + room.camaSolteiro}
                  price={room.preco}
                  imageUri={room.fotos && room.fotos.length > 0 ? room.fotos[0] : undefined}
                />
              ))}
            </ScrollView>
          </View>
        )}

        {/* SEÇÃO: POPULARES (APENAS EXPLORAÇÃO) */}
        <View style={{ marginTop: spacing.xl }}>
          <Text style={[global.label, { marginLeft: spacing.lg, fontSize: typography.size.xl }]}>Quartos Populares</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }}
          >
            {popularRooms.map((room) => (
              <RoomCard
                key={`room-pop-${room.id}`}
                roomName={room.nome}
                beds={room.camaCasal + room.camaSolteiro}
                price={room.preco}
                imageUri={room.fotos[0]}
                hideAddToCart={true}
              />
            ))}
          </ScrollView>
        </View>

        {/* SEÇÃO: RECOMENDADOS (APENAS EXPLORAÇÃO) */}
        <View style={{ marginTop: spacing.xl }}>
          <Text style={[global.label, { marginLeft: spacing.lg, fontSize: typography.size.xl }]}>Recomendados para Você</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.sm }}
          >
            {recommendedRooms.map((room) => (
              <RoomCard
                key={`room-rec-${room.id}`}
                roomName={room.nome}
                beds={room.camaCasal + room.camaSolteiro}
                price={room.preco}
                imageUri={room.fotos[0]}
                hideAddToCart={true}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* MODAL DE CALENDÁRIO */}
      <Modal
        transparent
        animationType="fade"
        visible={calendar !== null}
        onRequestClose={closeCalendar}
      >
        <Pressable style={global.centerView} onPress={closeCalendar}>
          <Pressable onPress={() => { }}>
            {calendar === "checkin" && (
              <DateSelector
                onSelectDate={(date) => {
                  setCheckIn(date);
                  closeCalendar();
                }}
              />
            )}
            {calendar === "checkout" && (
              <DateSelector
                onSelectDate={(date) => {
                  setCheckOut(date);
                  closeCalendar();
                }}
              />
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </AuthContainer>
  );
};

export default RenderExplorer;
