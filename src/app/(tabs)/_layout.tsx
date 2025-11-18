/*Função: definir o fluxo de navegação entre as telas disponíveis em Tab Navigator:
Explorar, Reservas, Perfil*/
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { global } from '@/components/ui/styles';

const Layout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#6E3482' }}>
      <Tabs.Screen
        name="explorer"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="reservation"
        options={{
          title: 'Reservation',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="suitcase" color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default Layout;