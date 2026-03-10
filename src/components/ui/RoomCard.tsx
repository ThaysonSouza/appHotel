import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../../context/CartContext";
import CustomModal from "./CustomModal";
import { colors } from "./designTokens";
import { stylesRoom } from "./stylesRoom";

type RoomCardProps = {
  onPress?: () => void;
  id?: number;
  roomName?: string;
  price?: string | number;
  imageUri?: string;
  beds?: number;
  amenities?: string[];
  description?: string;
  hideAddToCart?: boolean;
};

const RenderRoomCard = ({
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
  const [showDetails, setShowDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const router = useRouter();
  const { addToCart, searchDates } = useCart();

  const defaultImageUri = require("../../../assets/images/suiteJunior.jpg");
  const remoteImageUri = imageUri || "https://images.unsplash.com/photo-1505691938895-1758d7feb511";

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      setShowDetails(true);
    }
  };

  const handleAddToCart = () => {
    if (id) {
      addToCart({
        id,
        nome: roomName,
        preco: typeof price === 'string' ? parseFloat(price.replace('R$ ', '')) : price,
        imageUri: remoteImageUri,
        checkIn: searchDates.checkIn,
        checkOut: searchDates.checkOut,
      });
      setShowDetails(false);
      router.push("/(tabs)/reservation");
    }
  };

  const handleImageLoadStart = () => {
    setIsLoading(true);
  };

  const handleImageLoadEnd = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    console.warn("Erro ao carregar imagem remota, usando imagem local");
    setImageError(true);
    setIsLoading(false);
  };

  return (
    <>
      <TouchableOpacity
        style={stylesRoom.container}
        onPress={handlePress}
        activeOpacity={0.85}>
        <View style={{ position: "relative", width: "100%", height: 130 }}>
          <Image
            source={imageError ? defaultImageUri : { uri: remoteImageUri }}
            style={stylesRoom.image}
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
          <Text style={stylesRoom.title}>{roomName}</Text>
          <Text style={stylesRoom.price}>R$ {price} por noite</Text>
          <Text style={stylesRoom.beds}>{beds} {beds === 1 ? 'cama' : 'camas'}</Text>
        </View>
      </TouchableOpacity>

      <CustomModal
        visible={showDetails}
        onClose={() => setShowDetails(false)}
        title="Detalhes do Quarto"
      >
        <View style={{ padding: 20 }}>
          <Image
            source={imageError ? defaultImageUri : { uri: remoteImageUri }}
            style={{ width: "100%", height: 200, borderRadius: 10, marginBottom: 15 }}
            resizeMode="cover"
          />

          <Text style={{ fontSize: 16, marginBottom: 10, textAlign: "center", fontWeight: "bold", color: colors.primary }}>
            {roomName}
          </Text>

          <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "center", color: colors.textSecondary }}>
            {description}
          </Text>

          <Text style={{ fontSize: 16, marginBottom: 10, textAlign: "center", fontWeight: "semibold" }}>
            Comodidades:
          </Text>

          <Text style={{ fontSize: 14, lineHeight: 20, textAlign: "center", color: colors.textTertiary }}>
            {amenities.join(' • ')}
          </Text>

          {!hideAddToCart && (
            <TouchableOpacity
              style={{
                backgroundColor: colors.primary,
                padding: 15,
                borderRadius: 10,
                alignItems: "center",
                marginTop: 20
              }}
              onPress={handleAddToCart}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Adicionar ao Carrinho
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </CustomModal>
    </>
  );
};

export default RenderRoomCard;
