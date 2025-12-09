/*Função: definir o fluxo de navegação entre as telas disponíveis em Tab Navigator:
Explorar, Reservas, Perfil*/
import { colors } from '@/components/ui/designTokens';
import { global } from '@/components/ui/styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.lavender,
        tabBarStyle: global.tabBar,
        tabBarLabelStyle: global.tabBarLabel,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="reservation"
        options={{
          title: 'Reservation',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={focused ? 28 : 24} name="suitcase" color={color} />
          ),
        }}
      />
      <Tabs.Screen  
        name="explorer"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={focused ? 28 : 24} name="search" color={color} />
          ),
        }}
      />
      <Tabs.Screen 
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome size={focused ? 28 : 24} name="user" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default Layout;