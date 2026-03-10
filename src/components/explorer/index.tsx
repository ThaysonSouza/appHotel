import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import AuthContainer from "../ui/AuthContainer";
import DateSelector from "../ui/DateSelector";
import { borderRadius, colors, spacing, typography } from "../ui/designTokens";
import FeedbackButton from "../ui/FeedbackButton";
import InputSpin from "../ui/InputSpin";
import RoomCard from "../ui/RoomCard";
import Skeleton from "../ui/Skeleton";
import { global } from "../ui/styles";
import TextField from "../ui/textField";

const RenderExplorer = () => {
  const { width } = Dimensions.get("window");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [qntGuests, setQntGuests] = useState<number>(1);
  const [calendar, setCalendar] = useState<"checkin" | "checkout" | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { consulta, availableRooms } = useAuth();
  const { setSearchDates } = useCart();
  const { showToast } = useToast();
  const closeCalendar = () => setCalendar(null);

  const handleSearch = async () => {
    if (!checkIn || !checkOut) {
      showToast("Selecione as datas de entrada e saída.", "error");
      return;
    }

    if (checkOut <= checkIn) {
      showToast("A saída deve ser depois da entrada.", "error");
      return;
    }

    try {
      setIsSearching(true);
      setSearchDates(checkIn, checkOut);
      await consulta(checkIn, checkOut, qntGuests);

      if (availableRooms.length === 0) {
      }
    } catch (erro: any) {
      showToast(erro?.message || "Erro ao buscar quartos.", "error");
    } finally {
      setIsSearching(false);
    }
  };

  // Efeito para exibir aviso de "sem resultados" de forma mais confiável
  React.useEffect(() => {
    if (!isSearching && checkIn && checkOut && availableRooms.length === 0) {
      // Mostra apenas se uma busca foi feita e não retornou quartos
      showToast("Nenhum quarto encontrado para as datas selecionadas.", "info");
    }
  }, [isSearching, availableRooms, checkIn, checkOut, showToast]);


  // Dados mockados para as seções de exploração
  const popularRooms = [
    { id: 101, nome: "Suíte Presidencial", preco: 500, fotos: ["https://images.unsplash.com/photo-1578683010236-d716f9a3f461"], camaCasal: 1, camaSolteiro: 0 },
    { id: 102, nome: "Bangalô Luxo", preco: 350, fotos: ["https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"], camaCasal: 1, camaSolteiro: 1 },
  ];

  const recommendedRooms = [
    { id: 201, nome: "Quarto Família", preco: 280, fotos: ["https://images.unsplash.com/photo-15666657977391674de7a421a"], camaCasal: 2, camaSolteiro: 1 },
    { id: 202, nome: "Suíte Executiva", preco: 400, fotos: ["https://images.unsplash.com/photo-1590490360182-c33d57733427"], camaCasal: 1, camaSolteiro: 0 },
  ];

  return (
    <AuthContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxxl * 2 }}>
        <View style={{ paddingHorizontal: spacing.xl, paddingTop: spacing.md }}>
          <Text style={[global.title, { marginBottom: spacing.xs, fontSize: 28 }]}>Descubra o seu</Text>
          <Text style={[global.title, { color: colors.primary, marginBottom: spacing.xl, fontSize: 32 }]}>próximo destino</Text>

          <View style={[global.content, { padding: spacing.lg, borderRadius: borderRadius.xl, marginBottom: spacing.xxl }]}>
            <Text style={[global.label, { marginBottom: spacing.md }]}>Onde e quando?</Text>

            <View style={{ gap: spacing.md }}>
              <View style={{ flexDirection: 'row', gap: spacing.md }}>
                <TouchableOpacity style={{ flex: 1 }} onPress={() => setCalendar("checkin")}>
                  <TextField
                    label="Check-in"
                    icon={{ lib: "FontAwesome5", name: "calendar-check" }}
                    placeholder="Entrada"
                    value={checkIn}
                    editable={false}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={{ flex: 1 }} onPress={() => setCalendar("checkout")}>
                  <TextField
                    label="Check-out"
                    icon={{ lib: "FontAwesome5", name: "calendar-minus" }}
                    placeholder="Saída"
                    value={checkOut}
                    editable={false}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Text style={global.label}>Hóspedes</Text>
                <InputSpin
                  guests={qntGuests}
                  onSelectSpin={(guests) => setQntGuests(guests)}
                  minGuests={1}
                  maxGuests={6}
                  step={1}
                  colorMin={colors.primary}
                  colorMax={colors.primary}
                />
              </View>

              <FeedbackButton
                title={isSearching ? "Buscando..." : "Pesquisar Disponibilidade"}
                onPress={handleSearch}
                disabled={isSearching}
                style={{ marginTop: spacing.base }}
              />
            </View>
          </View>
        </View>

        {/* SEÇÃO: QUARTOS DISPONÍVEIS */}
        {(isSearching || availableRooms.length > 0) && (
          <View style={{ marginBottom: spacing.xxl }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: spacing.xl, marginBottom: spacing.md }}>
              <Text style={{ fontSize: typography.size.lg, fontWeight: "bold", color: colors.textPrimary }}>
                Quartos Disponíveis
              </Text>
              {!isSearching && <Text style={{ color: colors.primary, fontWeight: 'bold' }}>{availableRooms.length} encontrados</Text>}
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: spacing.xl }}
            >
              {isSearching ? (
                [1, 2, 3].map((i) => (
                  <View key={`skel-${i}`} style={{ marginRight: spacing.xl }}>
                    <Skeleton width={280} height={180} radius={borderRadius.xl} />
                    <Skeleton width={200} height={20} style={{ marginTop: spacing.md }} />
                    <Skeleton width={100} height={20} style={{ marginTop: spacing.xs }} />
                  </View>
                ))
              ) : (
                availableRooms.map((room, index) => (
                  <RoomCard
                    key={`room-avail-${room.id}-${index}`}
                    id={room.id}
                    roomName={room.nome}
                    beds={room.camaCasal + room.camaSolteiro}
                    price={room.preco}
                    imageUri={room.fotos && room.fotos.length > 0 ? room.fotos[0] : undefined}
                  />
                ))
              )}
            </ScrollView>
          </View>
        )}

        {/* SEÇÃO: POPULARES */}
        <View style={{ marginBottom: spacing.xxl }}>
          <Text style={[global.label, { marginLeft: spacing.xl, fontSize: typography.size.lg, marginBottom: spacing.md, textTransform: 'none' }]}>
            Mais Procurados
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.xl }}
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

        {/* SEÇÃO: RECOMENDADOS */}
        <View style={{ marginBottom: spacing.xxxl }}>
          <Text style={[global.label, { marginLeft: spacing.xl, fontSize: typography.size.lg, marginBottom: spacing.md, textTransform: 'none' }]}>
            Recomendados para você
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: spacing.xl }}
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
          <View style={[global.modalView, { padding: spacing.xl }]}>
            <Text style={[global.title, { fontSize: 20, marginBottom: spacing.lg, textAlign: 'center' }]}>
              Selecione a Data
            </Text>
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
          </View>
        </Pressable>
      </Modal>
    </AuthContainer>
  );
};

export default RenderExplorer;
