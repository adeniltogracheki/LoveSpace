import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function MemoriesScreen() {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={['#FFE4E1', '#FFF0F5', '#FFFFFF']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialIcons name="photo-album" size={60} color="#FF69B4" />
          <Text style={styles.title}>Memórias & Planos</Text>
          <Text style={styles.subtitle}>Em breve na Fase 3!</Text>
        </View>

        <View style={styles.placeholderCard}>
          <MaterialIcons name="construction" size={80} color="#FFB6C1" />
          <Text style={styles.placeholderText}>
            Lista de desejos, calendário compartilhado e diário de humor serão implementados na próxima fase
          </Text>
        </View>
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
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
  placeholderCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 24,
  },
});