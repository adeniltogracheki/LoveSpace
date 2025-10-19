# ⚡ Guia Rápido de Instalação - 5 Minutos

Para desenvolvedores com pressa. Se encontrar problemas, consulte o `README.md` completo.

---

## 🚀 Setup Rápido (3 comandos)

```bash
# 1. Instale dependências (2-3 min)
npm install

# 2. Inicie o servidor
npm start

# 3. Pressione 'w' para abrir no navegador
# OU escaneie o QR Code com Expo Go no celular
```

**Pronto! O app está rodando.** 🎉

---

## 📱 Testar no Celular (30 segundos)

### iPhone:
1. Baixe **Expo Go** na App Store
2. Abra a câmera e escaneie o QR Code no terminal
3. App abre automaticamente

### Android:
1. Baixe **Expo Go** na Google Play
2. Abra o Expo Go e escaneie o QR Code
3. App abre automaticamente

---

## ✅ Verificação Rápida

### Backend Está Funcionando?

1. Abra o OnSpace
2. Clique em **"Dashboard"** (painel direito)
3. Vá para aba **"Data"**
4. Você deve ver 9 tabelas:
   - ✅ user_profiles
   - ✅ couples
   - ✅ avatars
   - ✅ pets
   - ✅ spaces
   - ✅ user_currency
   - ✅ memories
   - ✅ calendar_events
   - ✅ mood_entries

**Se ver todas = Backend OK ✅**

---

## 🧪 Teste Rápido do App

1. **Crie primeira conta**:
   - Email: `teste1@email.com`
   - Senha: `123456`
   - Confirme senha: `123456`
   - Clique "Enviar Código" → Espere OTP no email
   - Digite o código de 6 dígitos
   - Clique "Verificar e Criar Conta"

2. **Crie convite de casal**:
   - Clique "Gerar Código de Convite"
   - Copie o código (ex: `A1B2C3D4`)

3. **Crie segunda conta** (use outro navegador/dispositivo):
   - Email: `teste2@email.com`
   - Senha: `123456`
   - Clique "Usar Código"
   - Cole o código do passo 2
   - Clique "Conectar"

4. **Sucesso!** 🎉
   - Você deve ver o dashboard do casal
   - Status: "Você & teste2"
   - Dias juntos: 0

---

## 🛠️ Comandos Úteis

```bash
# Limpar cache (se der erro)
npx expo start -c

# Abrir no iOS (apenas Mac)
npx expo start --ios

# Abrir no Android
npx expo start --android

# Abrir no navegador
npx expo start --web

# Ver logs detalhados
npx expo start --dev-client
```

---

## 🐛 Problemas Comuns (1 min cada)

### "Metro Bundler não inicia"
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### "Não recebo email de OTP"
- Verifique spam/lixo eletrônico
- Use email real (Gmail, Outlook)
- Aguarde até 2 minutos

### "Erro ao criar convite"
- Verifique Dashboard > Data
- Tabela `couples` deve existir
- Se não existir, execute SQL novamente

### "App não abre no celular"
- Mesma rede WiFi que o PC?
- VPN desligada?
- Reinicie Expo Go
- Reinicie com `npx expo start -c`

---

## 📦 Build para Testar com Amigos

```bash
# Instale EAS CLI (uma vez)
npm install -g eas-cli

# Faça login
eas login

# Build Android (APK)
eas build --platform android --profile preview

# Aguarde 10-15 min
# Baixe o APK e compartilhe!
```

---

## 🎯 Checklist de Sucesso

- [ ] `npm install` completou sem erros
- [ ] `npm start` iniciou o Metro Bundler
- [ ] Dashboard mostra 9 tabelas
- [ ] Consegui criar conta de teste
- [ ] Recebi código OTP por email
- [ ] Consegui verificar conta
- [ ] Gerei código de convite
- [ ] Segunda conta conseguiu conectar
- [ ] Dashboard do casal aparece

**Todos marcados? Você está pronto! 🚀**

---

## 📚 Próximos Passos

1. Leia `README.md` para entender a estrutura
2. Explore o código em `app/` e `services/`
3. Personalize cores e ícones
4. Implemente Fase 2 (avatares e pet)
5. Teste em dispositivos reais

---

## 🆘 Precisa de Ajuda?

- **Problemas técnicos**: Consulte `README.md` seção Troubleshooting
- **Erros de backend**: Verifique Dashboard > Data
- **Dúvidas de código**: Pergunte no OnSpace chat
- **Bugs do Expo**: [Expo Discord](https://chat.expo.dev/)

---

**Tempo total estimado: 5-10 minutos** ⏱️

Vá direto para o código e comece a desenvolver! 💻