import RenderDatePicker from '@/components/ui/DatePicker';
import { View } from 'react-native';
import RenderRoomCard from '@/components/ui/RoomCard';

const RenderExplorer = () => {
  return (
      <View>
      <RenderDatePicker />
      <RenderRoomCard  />
    </View>
      
  );
};

export default RenderExplorer;