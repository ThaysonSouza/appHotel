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
import AuthContainer from "../ui/AuthContainer";
import CustomModal from "../ui/CustomModal";
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
  const closeCalendar = () => setCalendar(null);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      Alert.alert("Erro", "Por favor, selecione as datas de check-in e check-out.");
      return;
    }

    // Comparação de datas (YYYY/MM/DD)
    if (checkOut <= checkIn) {
      Alert.alert("Erro", "A data de check-out deve ser posterior à data de check-in.");
      return;
    }

    try {
      await consulta(checkIn, checkOut, qntGuests);
      if (availableRooms.length === 0) {
        // Nota: availableRooms pode demorar um render para atualizar, 
        // mas a consulta é awaitable. 
      }
    } catch (erro: any) {
      Alert.alert(
        "Busca",
        erro?.message || "Erro ao realizar a busca de quartos."
      );
    }
  };

  return (
    <AuthContainer>
      <View style={{ display: "flex", justifyContent: "center" }}>
        {/* CHECK-IN */}
        <View style={{ display: "flex", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => setCalendar("checkin")}>
            <View style={{ width: width * 0.8 }}>
              <TextField
                label="Check-in"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkIn}
                editable={false}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* CHECK-OUT */}
        <View style={{ display: "flex", flexDirection: "column" }}>
          <TouchableOpacity onPress={() => setCalendar("checkout")}>
            <View style={{ width: width * 0.8 }}>
              <TextField
                label="Check-out"
                icon={{ lib: "FontAwesome5", name: "calendar-alt" }}
                placeholder="Selecione a data"
                value={checkOut}
                editable={false}
              />
            </View>
          </TouchableOpacity>
        </View>

        {/* Modal para fechar calendário ao clicar fora */}
        <Modal
          transparent
          animationType="fade"
          visible={calendar !== null}
          onRequestClose={closeCalendar}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0, 0.29)",
            }}
            onPress={closeCalendar}
          >
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

        {/* QUANTIDADE DE HÓSPEDES */}
        <View>
          <Text style={global.label}>Quantidade de hóspedes</Text>
          <InputSpin
            guests={qntGuests}
            onSelectSpin={(guests) => {
              setQntGuests(guests);
            }}
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
          style={{
            width: width * 0.8,
            marginTop: spacing.md,
            backgroundColor: colors.primary,
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
            elevation: 3,
          }}
          onPress={handleSearch}
        >
          <Text
            style={{
              color: "#FFF",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Buscar
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1, marginTop: spacing.base }}>
        <Text style={[global.label, { marginLeft: spacing.lg, marginBottom: 0 }]}>
          {availableRooms.length > 0 ? "Quartos Disponíveis" : "Nenhum quarto encontrado"}
        </Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: spacing.lg,
            paddingRight: spacing.lg,
            paddingTop: spacing.sm,
            paddingBottom: spacing.xxxl * 5.0,
          }}
        >
          {availableRooms.map((room, index) => {
            return (
              <RoomCard
                key={`room-${room.id}-${index}`}
                roomName={room.nome}
                beds={room.camaCasal + room.camaSolteiro}
                price={`R$ ${room.preco} por noite`}
                imageUri={room.fotos && room.fotos.length > 0 ? room.fotos[0] : undefined}
                onPress={() => setSelectedRoom(room)}
              />
            );
          })}
        </ScrollView>
      </View>

      <CustomModal
        visible={selectedRoom !== null}
        onClose={() => setSelectedRoom(null)}
        title={selectedRoom?.nome || ""}
      >
        <View style={{ alignItems: "center", paddingVertical: spacing.lg }}>
          <Text
            style={{
              fontSize: typography.size.lg,
              color: colors.textPrimary,
              marginBottom: spacing.base,
            }}
          >
            R$ {selectedRoom?.preco} por noite
          </Text>
          <Text
            style={{
              fontSize: typography.size.md,
              color: colors.textSecondary,
              marginBottom: spacing.lg,
            }}
          >
            Capacidade: {selectedRoom?.camaCasal * 2 + selectedRoom?.camaSolteiro} pessoas
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xl,
              borderRadius: spacing.lg,
              marginTop: spacing.lg,
            }}
            onPress={() => setSelectedRoom(null)}
          >
            <Text
              style={{
                color: colors.white,
                fontWeight: "bold",
                fontSize: typography.size.md,
              }}
            >
              Fechar
            </Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
    </AuthContainer>
  );
};

export default RenderExplorer;
