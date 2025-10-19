import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useCouple } from '@/hooks/useCouple';
import { useAuth } from '@/template';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const { couple, partner, loading } = useCouple();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF69B4" />
      </View>
    );
  }

  const calculateDaysTogether = () => {
    if (!couple?.relationship_start) return 0;
    const start = new Date(couple.relationship_start);
    const today = new Date();
    const diff = today.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <LinearGradient
      colors={['#FFE4E1', '#FFF0F5', '#FFFFFF']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Olá, {user?.email?.split('@')[0] || 'Amor'} 💕</Text>
          <Text style={styles.subGreeting}>Bem-vindo ao seu espaço de amor</Text>
        </View>

        <View style={styles.coupleCard}>
          <LinearGradient
            colors={['#FF69B4', '#FF1493']}
            style={styles.coupleCardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.coupleInfo}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  <MaterialIcons name="person" size={40} color="#fff" />
                </View>
                <MaterialIcons name="favorite" size={32} color="#fff" style={styles.heartIcon} />
                <View style={styles.avatar}>
                  <MaterialIcons name="person" size={40} color="#fff" />
                </View>
              </View>
              
              <Text style={styles.partnerName}>
                Você & {partner?.username || 'Seu Amor'}
              </Text>
              
              {couple?.relationship_start && (
                <View style={styles.daysContainer}>
                  <MaterialIcons name="calendar-today" size={20} color="#fff" />
                  <Text style={styles.daysText}>
                    {calculateDaysTogether()} dias juntos
                  </Text>
                </View>
              )}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.featuresGrid}>
          <TouchableOpacity style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#FFE4E1' }]}>
              <MaterialIcons name="pets" size={40} color="#FF69B4" />
            </View>
            <Text style={styles.featureTitle}>Nosso Pet</Text>
            <Text style={styles.featureSubtitle}>Cuidar juntos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#E1F5FF' }]}>
              <MaterialIcons name="home" size={40} color="#4169E1" />
            </View>
            <Text style={styles.featureTitle}>Nosso Espaço</Text>
            <Text style={styles.featureSubtitle}>Decorar casa</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#FFF3E0' }]}>
              <MaterialIcons name="list" size={40} color="#FF8C00" />
            </View>
            <Text style={styles.featureTitle}>Lista de Desejos</Text>
            <Text style={styles.featureSubtitle}>Planos juntos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: '#F3E5F5' }]}>
              <MaterialIcons name="mood" size={40} color="#9C27B0" />
            </View>
            <Text style={styles.featureTitle}>Humor Hoje</Text>
            <Text style={styles.featureSubtitle}>Como está?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <MaterialIcons name="favorite" size={32} color="#FF69B4" />
            <Text style={styles.statNumber}>100</Text>
            <Text style={styles.statLabel}>Corações</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialIcons name="cake" size={32} color="#FFB6C1" />
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Memórias</Text>
          </View>

          <View style={styles.statCard}>
            <MaterialIcons name="star" size={32} color="#FFD700" />
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Nível</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
  },
  coupleCard: {
    marginBottom: 24,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  coupleCardGradient: {
    padding: 24,
  },
  coupleInfo: {
    alignItems: 'center',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  heartIcon: {
    marginHorizontal: 16,
  },
  partnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  daysContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  daysText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  featureIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    textAlign: 'center',
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
});