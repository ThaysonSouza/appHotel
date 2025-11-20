import RenderDatePicker from '@/components/ui/DatePicker';
import RenderRoomCard from '@/components/ui/RoomCard';
import { ScrollView, View } from 'react-native';

const RenderExplorer = () => {
  return (
    <View>
      <RenderDatePicker />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingRight: 4 }}
        style={{ marginTop: 16 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <RenderRoomCard key={`room-${index}`} />
        ))}
      </ScrollView>
    </View>
  );
};

export default RenderExplorer;