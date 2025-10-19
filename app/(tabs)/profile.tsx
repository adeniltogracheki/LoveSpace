import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth, useAlert } from '@/template';
import { useCouple } from '@/hooks/useCouple';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { couple, partner } = useCouple();
  const { showAlert } = useAlert();

  const handleLogout = () => {
    showAlert('Sair', 'Tem certeza que deseja sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/login');
        },
      },
    ]);
  };

  return (
    <LinearGradient
      colors={['#FFE4E1', '#FFF0F5', '#FFFFFF']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <MaterialIcons name="person" size={60} color="#fff" />
          </View>
          <Text style={styles.username}>{user?.email?.split('@')[0] || 'Usuário'}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>

        {couple && (
          <View style={styles.coupleSection}>
            <Text style={styles.sectionTitle}>Informações do Casal</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <MaterialIcons name="favorite" size={24} color="#FF69B4" />
                <Text style={styles.infoText}>
                  Conectado(a) com {partner?.username || 'seu amor'}
                </Text>
              </View>
              {couple.relationship_start && (
                <View style={styles.infoRow}>
                  <MaterialIcons name="calendar-today" size={24} color="#FF69B4" />
                  <Text style={styles.infoText}>
                    Desde {new Date(couple.relationship_start).toLocaleDateString('pt-BR')}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="notifications" size={24} color="#666" />
            <Text style={styles.menuText}>Notificações</Text>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="privacy-tip" size={24} color="#666" />
            <Text style={styles.menuText}>Privacidade</Text>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="help" size={24} color="#666" />
            <Text style={styles.menuText}>Ajuda e Suporte</Text>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="info" size={24} color="#666" />
            <Text style={styles.menuText}>Sobre o App</Text>
            <MaterialIcons name="chevron-right" size={24} color="#999" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="#FF69B4" />
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FF69B4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#999',
  },
  coupleSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#FF69B4',
    marginTop: 8,
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF69B4',
    marginLeft: 12,
  },
});