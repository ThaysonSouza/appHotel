import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import CustomModal from "./CustomModal";
import { stylesRoom } from "./stylesRoom";

type RoomCardProps = {
  onPress?: () => void;
  roomName?: string;
  price?: string;
  imageUri?: string;
  beds?: number;
};

const RenderRoomCard = ({ 
  onPress, 
  roomName = "Suite Junior", 
  price = "R$ 150 por 1 noite",
  imageUri = "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  beds = 1
}: RoomCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const handlePress = () => {
    setShowDetails(true);
  };

  const roomData = {
    name: roomName,
    price: price,
    imageUri: imageUri,
    beds: beds,
    description: "Uma suíte confortável e elegante, perfeita para sua estadia. Com decoração moderna e todas as comodidades que você precisa.",
    amenities: ["Ar-condicionado", "TV a cabo", "Wi-Fi gratuito", "Frigobar", "Cofre", "Serviço de quarto 24h"]
  };

  const handleAddToCart = () => {
    setShowDetails(false);
    router.push("/(tabs)/reservation");
  };

  return (
    <>
      <TouchableOpacity 
        style={stylesRoom.container}
        onPress={handlePress}
        activeOpacity={0.85}>
        <Image
          source={{ uri: imageUri }}
          style={stylesRoom.image}
        />

        <View style={stylesRoom.infoSection}>
          <Text style={stylesRoom.title}>{roomName}</Text>
          <Text style={stylesRoom.price}>{price}</Text>
          <Text style={stylesRoom.beds}>{beds} {beds === 1 ? 'cama' : 'camas'}</Text>
        </View>
      </TouchableOpacity>

      <CustomModal
        visible={showDetails}
        onClose={() => setShowDetails(false)}
        title="Detalhes do Quarto"
      >
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16, marginBottom: 10, textAlign: "center" }}>
            {roomData.name}
          </Text>
          
          <Text style={{ fontSize: 14, marginBottom: 15, textAlign: "center" }}>
            {roomData.description}
          </Text>
          
          <Text style={{ fontSize: 16, marginBottom: 10, textAlign: "center" }}>
            Comodidades:
          </Text>
          
          <Text style={{ fontSize: 14, lineHeight: 20, textAlign: "center" }}>
            {roomData.amenities.join(' • ')}
          </Text>
          
          <TouchableOpacity 
            style={{ 
              backgroundColor: "#6E3482", 
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
        </View>
      </CustomModal>
    </>
  );
};

export default RenderRoomCard;
