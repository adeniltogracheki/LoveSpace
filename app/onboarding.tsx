import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Share,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCouple } from '@/hooks/useCouple';
import { useAlert } from '@/template';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { couple, createInvitation, joinCouple, operationLoading } = useCouple();
  const { showAlert } = useAlert();
  
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [inviteCode, setInviteCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(
    couple?.status === 'pending' ? couple.invite_code : null
  );

  const handleCreateInvite = async () => {
    const result = await createInvitation();
    if (result.error) {
      showAlert('Erro', result.error);
    } else {
      setGeneratedCode(result.inviteCode || null);
      showAlert('Sucesso', 'Código de convite criado! Compartilhe com seu parceiro(a)');
    }
  };

  const handleJoinCouple = async () => {
    if (!inviteCode.trim()) {
      showAlert('Erro', 'Por favor, insira o código de convite');
      return;
    }

    const result = await joinCouple(inviteCode.trim().toUpperCase());
    if (result.error) {
      showAlert('Erro', result.error);
    } else {
      showAlert('Sucesso', 'Parabéns! Você se conectou com seu parceiro(a) 💕', [
        { text: 'OK', onPress: () => router.replace('/(tabs)') }
      ]);
    }
  };

  const handleShareCode = async () => {
    if (!generatedCode) return;
    
    try {
      await Share.share({
        message: `Vamos começar nossa jornada juntos no LoveSpace! 💕\n\nUse meu código de convite: ${generatedCode}\n\nBaixe o app e vamos criar memórias incríveis juntos!`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#FF69B4', '#FFB6C1', '#FFF0F5']}
      style={[styles.container, { paddingTop: insets.top + 20 }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialIcons name="favorite" size={60} color="#fff" />
          <Text style={styles.title}>Conecte-se ao Seu Amor</Text>
          <Text style={styles.subtitle}>
            Crie ou use um código para começar sua jornada juntos
          </Text>
        </View>

        <View style={styles.modeSelector}>
          <TouchableOpacity
            style={[styles.modeButton, mode === 'create' && styles.modeButtonActive]}
            onPress={() => setMode('create')}
          >
            <MaterialIcons 
              name="add-circle" 
              size={24} 
              color={mode === 'create' ? '#fff' : '#FF69B4'} 
            />
            <Text style={[styles.modeButtonText, mode === 'create' && styles.modeButtonTextActive]}>
              Criar Convite
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.modeButton, mode === 'join' && styles.modeButtonActive]}
            onPress={() => setMode('join')}
          >
            <MaterialIcons 
              name="link" 
              size={24} 
              color={mode === 'join' ? '#fff' : '#FF69B4'} 
            />
            <Text style={[styles.modeButtonText, mode === 'join' && styles.modeButtonTextActive]}>
              Usar Código
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {mode === 'create' ? (
            <>
              {generatedCode ? (
                <View style={styles.codeDisplay}>
                  <MaterialIcons name="card-giftcard" size={48} color="#FF69B4" />
                  <Text style={styles.codeLabel}>Seu Código de Convite</Text>
                  <View style={styles.codeBox}>
                    <Text style={styles.codeText}>{generatedCode}</Text>
                  </View>
                  <Text style={styles.codeInfo}>
                    Compartilhe este código com seu parceiro(a) para se conectarem
                  </Text>
                  
                  <TouchableOpacity
                    style={styles.shareButton}
                    onPress={handleShareCode}
                  >
                    <MaterialIcons name="share" size={24} color="#fff" />
                    <Text style={styles.shareButtonText}>Compartilhar Código</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={styles.iconContainer}>
                    <MaterialIcons name="favorite-border" size={80} color="#FF69B4" />
                  </View>
                  <Text style={styles.description}>
                    Gere um código único para convidar seu parceiro(a) a se juntar a você no LoveSpace
                  </Text>
                  
                  <TouchableOpacity
                    style={[styles.button, operationLoading && styles.buttonDisabled]}
                    onPress={handleCreateInvite}
                    disabled={operationLoading}
                  >
                    {operationLoading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <>
                        <MaterialIcons name="add-circle-outline" size={24} color="#fff" />
                        <Text style={styles.buttonText}>Gerar Código de Convite</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : (
            <>
              <View style={styles.iconContainer}>
                <MaterialIcons name="link" size={80} color="#FF69B4" />
              </View>
              <Text style={styles.description}>
                Insira o código de convite que seu parceiro(a) compartilhou com você
              </Text>
              
              <View style={styles.inputContainer}>
                <MaterialIcons name="vpn-key" size={24} color="#FF69B4" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="CÓDIGO-CONVITE"
                  placeholderTextColor="#FFB6C1"
                  value={inviteCode}
                  onChangeText={setInviteCode}
                  autoCapitalize="characters"
                  maxLength={8}
                  editable={!operationLoading}
                />
              </View>

              <TouchableOpacity
                style={[styles.button, operationLoading && styles.buttonDisabled]}
                onPress={handleJoinCouple}
                disabled={operationLoading}
              >
                {operationLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <MaterialIcons name="favorite" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Conectar</Text>
                  </>
                )}
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
    opacity: 0.9,
  },
  modeSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 16,
    padding: 4,
    marginBottom: 24,
  },
  modeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  modeButtonActive: {
    backgroundColor: '#FF69B4',
  },
  modeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF69B4',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  contentContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#FFB6C1',
    width: '100%',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF69B4',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  codeDisplay: {
    alignItems: 'center',
    width: '100%',
  },
  codeLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 16,
  },
  codeBox: {
    backgroundColor: '#FFF0F5',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 32,
    borderWidth: 3,
    borderColor: '#FF69B4',
    borderStyle: 'dashed',
    marginBottom: 16,
  },
  codeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF69B4',
    letterSpacing: 4,
  },
  codeInfo: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  shareButton: {
    backgroundColor: '#FF69B4',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#FF69B4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});