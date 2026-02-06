import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
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
  return (
    <TouchableOpacity 
      style={stylesRoom.container}
      onPress={onPress}
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
  );
};

export default RenderRoomCard;
