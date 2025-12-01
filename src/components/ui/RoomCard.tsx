import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { stylesRoom } from "./stylesRoom";

type RoomCardProps = {
  onPress?: () => void;
  roomName?: string;
  price?: string;
  imageUri?: string;
};

const RenderRoomCard = ({ 
  onPress, 
  roomName = "Suite Junior", 
  price = "R$ 150 por 1 noites",
  imageUri = "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
}: RoomCardProps) => {
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push("/(tabs)/reservation");
    }
  };

  return (
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
      </View>
    </TouchableOpacity>
  );
}

export default RenderRoomCard;