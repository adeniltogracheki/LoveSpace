import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth, useAlert } from '@/template';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function AuthScreen() {
  const insets = useSafeAreaInsets();
  const { signUpWithPassword, signInWithPassword, sendOTP, verifyOTPAndLogin, operationLoading } = useAuth();
  const { showAlert } = useAlert();
  
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      showAlert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const result = await signInWithPassword(email, password);
    if (result.error) {
      showAlert('Erro', result.error);
    }
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      showAlert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      showAlert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      showAlert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (!showOtpInput) {
      const result = await sendOTP(email);
      if (result.error) {
        showAlert('Erro', result.error);
      } else {
        setShowOtpInput(true);
        showAlert('Sucesso', 'Código de verificação enviado para seu email');
      }
    } else {
      if (!otp || otp.length !== 6) {
        showAlert('Erro', 'Por favor, insira o código de 6 dígitos');
        return;
      }

      const result = await verifyOTPAndLogin(email, otp, { password });
      if (result.error) {
        showAlert('Erro', result.error);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#FF69B4', '#FFB6C1', '#FFF0F5']}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <MaterialIcons name="favorite" size={80} color="#fff" />
            <Text style={styles.title}>LoveSpace</Text>
            <Text style={styles.subtitle}>
              {mode === 'login' 
                ? 'Bem-vindo de volta! 💕' 
                : 'Crie sua história de amor 💑'}
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <MaterialIcons name="email" size={24} color="#FF69B4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#FFB6C1"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                editable={!operationLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={24} color="#FF69B4" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#FFB6C1"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!operationLoading}
              />
            </View>

            {mode === 'register' && (
              <>
                <View style={styles.inputContainer}>
                  <MaterialIcons name="lock-outline" size={24} color="#FF69B4" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Confirmar Senha"
                    placeholderTextColor="#FFB6C1"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    editable={!operationLoading}
                  />
                </View>

                {showOtpInput && (
                  <View style={styles.inputContainer}>
                    <MaterialIcons name="verified-user" size={24} color="#FF69B4" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Código de Verificação (6 dígitos)"
                      placeholderTextColor="#FFB6C1"
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="number-pad"
                      maxLength={6}
                      editable={!operationLoading}
                    />
                  </View>
                )}
              </>
            )}

            <TouchableOpacity
              style={[styles.button, operationLoading && styles.buttonDisabled]}
              onPress={mode === 'login' ? handleLogin : handleRegister}
              disabled={operationLoading}
            >
              {operationLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>
                  {mode === 'login' 
                    ? 'Entrar' 
                    : showOtpInput 
                      ? 'Verificar e Criar Conta' 
                      : 'Enviar Código'}
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.switchButton}
              onPress={() => {
                setMode(mode === 'login' ? 'register' : 'login');
                setShowOtpInput(false);
                setOtp('');
              }}
              disabled={operationLoading}
            >
              <Text style={styles.switchText}>
                {mode === 'login' 
                  ? 'Não tem conta? Cadastre-se' 
                  : 'Já tem conta? Faça login'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FFB6C1',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF69B4',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
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
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#FF69B4',
    fontSize: 16,
    fontWeight: '600',
  },
});