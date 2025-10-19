import { AuthRouter } from '@/template';
import { Redirect } from 'expo-router';
import { useCouple } from '@/hooks/useCouple';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

function RouteDispatcher() {
  const { couple, loading } = useCouple();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF69B4" />
      </View>
    );
  }

  // If no couple or pending status, go to onboarding
  if (!couple || couple.status === 'pending') {
    return <Redirect href="/onboarding" />;
  }

  // If active couple, go to main tabs
  return <Redirect href="/(tabs)" />;
}

export default function RootScreen() {
  return (
    <AuthRouter loginRoute="/login">
      <RouteDispatcher />
    </AuthRouter>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
  },
});