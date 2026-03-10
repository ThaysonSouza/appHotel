import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import CustomModal from "./CustomModal";
import FeedbackButton from "./FeedbackButton";
import { borderRadius, colors, spacing, typography } from "./designTokens";
import { stylesRoom } from "./stylesRoom";

type RoomCardProps = {
  onPress?: () => void;
  id?: number;
  roomName: string;
  price: string | number;
  imageUri?: string;
  beds: number;
  amenities?: string[];
  description?: string;
  hideAddToCart?: boolean;
};

const RoomCard = ({
  onPress,
  id,
  roomName = "Suite Junior",
  price = 150,
  imageUri = undefined,
  beds = 1,
  amenities = ["Ar-condicionado", "TV a cabo", "Wi-Fi gratuito", "Frigobar", "Cofre", "Serviço de quarto 24h"],
  description = "Uma suíte confortável e elegante, perfeita para sua estadia. Com decoração moderna e todas as comodidades que você precisa.",
  hideAddToCart = false
}: RoomCardProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const { addToCart, searchDates } = useCart();
  const { showToast } = useToast();

  // Definição de URLs de imagem
  const defaultImageUri = require("../../../assets/images/suiteJunior.jpg");
  const remoteImageUri = imageUri || "https://images.unsplash.com/photo-1505691938895-1758d7feb511";

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setModalVisible(true);
    }
  };

  const handleAddToCart = () => {
    if (id) {
      addToCart({
        id,
        nome: roomName,
        preco: typeof price === 'string' ? parseFloat(price.replace('R$ ', '')) : Number(price),
        imageUri: remoteImageUri,
        checkIn: searchDates.checkIn,
        checkOut: searchDates.checkOut,
      });
      showToast(`${roomName} adicionado à reserva!`, "success");
      setModalVisible(false);
    }
  };

  const handleImageLoadStart = () => {
    setIsLoading(true);
  };

  const handleImageLoadEnd = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <>
      <TouchableOpacity
        style={stylesRoom.container}
        onPress={handlePress}
        activeOpacity={0.85}>
        <View style={{ width: "100%", height: 160, overflow: "hidden" }}>
          <Image
            source={imageError ? defaultImageUri : { uri: remoteImageUri }}
            style={{ width: "100%", height: "100%" }}
            onLoadStart={handleImageLoadStart}
            onLoadEnd={handleImageLoadEnd}
            onError={handleImageError}
          />
          {isLoading && (
            <View style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.1)"
            }}>
              <ActivityIndicator size="large" color={colors.primary} />
            </View>
          )}
        </View>

        <View style={stylesRoom.infoSection}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={stylesRoom.title} numberOfLines={1}>{roomName}</Text>
            <Text style={{ color: colors.accent, fontWeight: 'bold' }}>★ 4.8</Text>
          </View>

          <Text style={stylesRoom.beds}>{beds} {beds === 1 ? 'cama' : 'camas'}</Text>

          <View style={stylesRoom.priceContainer}>
            <Text style={stylesRoom.price}>R$ {price}</Text>
            <Text style={stylesRoom.perNight}>/ noite</Text>
          </View>
        </View>
      </TouchableOpacity>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Detalhes da Unidade"
      >
        <View style={{ padding: spacing.xl }}>
          <Image
            source={imageError ? defaultImageUri : { uri: remoteImageUri }}
            style={{ width: "100%", height: 250, borderRadius: borderRadius.lg, marginBottom: spacing.lg }}
            resizeMode="cover"
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm }}>
            <Text style={{ fontSize: typography.size.lg, fontWeight: "bold", color: colors.textPrimary }}>
              {roomName}
            </Text>
            <View style={{ backgroundColor: colors.background, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 }}>
              <Text style={{ color: colors.accent, fontWeight: 'bold' }}>★ 4.8</Text>
            </View>
          </View>

          <Text style={{ fontSize: typography.size.sm, color: colors.textSecondary, marginBottom: spacing.base, lineHeight: 22 }}>
            {description}
          </Text>

          <Text style={{ fontSize: typography.size.base, fontWeight: "bold", marginBottom: spacing.sm }}>
            O que este lugar oferece:
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: spacing.xl }}>
            {amenities.map((item, idx) => (
              <View key={idx} style={{ backgroundColor: colors.background, padding: 8, borderRadius: 8 }}>
                <Text style={{ fontSize: 12, color: colors.textSecondary }}>{item}</Text>
              </View>
            ))}
          </View>

          {!hideAddToCart && (
            <FeedbackButton
              title="Adicionar à Reserva"
              onPress={handleAddToCart}
            />
          )}
        </View>
      </CustomModal>
    </>
  );
};

export default RoomCard;
