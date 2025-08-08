import { FontAwesome } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useTheme } from '../../constants/ThemeContext';
import { useThemeColors } from '../../constants/useThemeColors';

export default function TabsLayout() {
  const { colors } = useTheme();
  const globalColors = useThemeColors();

  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: colors.tabIconSelected,
      tabBarInactiveTintColor: colors.tabIconDefault,
      tabBarStyle: {
        backgroundColor: colors.background,
        borderTopColor: colors.icon + '20',
      },

      headerTintColor: '#fff',
      headerShown: false, 
      tabBarShowLabel: false,
    }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
} 