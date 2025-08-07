import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useTheme } from '../../constants/ThemeContext';

export default function ProfileScreen() {
  const { colors } = useTheme();

  const menuItems = [
    { icon: 'person-outline', title: 'Editar Perfil', onPress: () => {} },
    { icon: 'notifications-outline', title: 'Notificações', onPress: () => {} },
    { icon: 'shield-outline', title: 'Privacidade', onPress: () => {} },
    { icon: 'help-circle-outline', title: 'Ajuda', onPress: () => {} },
    { icon: 'log-out-outline', title: 'Sair', onPress: () => {} },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.tint }]}>
          <Ionicons name="person" size={40} color="#fff" />
        </View>
        <Text style={[styles.name, { color: colors.text }]}>Usuário</Text>
        <Text style={[styles.email, { color: colors.icon }]}>usuario@email.com</Text>
      </View>

      <ThemeToggle />

      <View style={styles.menuSection}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { borderBottomColor: colors.icon + '20' }]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon as any} size={24} color={colors.icon} />
              <Text style={[styles.menuItemText, { color: colors.text }]}>
                {item.title}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.icon} />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
  },
  menuSection: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 12,
  },
});
