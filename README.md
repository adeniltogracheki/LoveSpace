# 💕 LoveSpace - App de Casal Gamificado

Um aplicativo completo para casais com gamificação, avatares personalizáveis, pet virtual e muito mais!

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação Local](#instalação-local)
- [Configuração do Backend](#configuração-do-backend)
- [Executando o App](#executando-o-app)
- [Testando em Dispositivo Real](#testando-em-dispositivo-real)
- [Build para Produção](#build-para-produção)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

LoveSpace é um aplicativo de relacionamento gamificado que permite aos casais:
- Criar avatares personalizados
- Cuidar de um pet virtual juntos
- Decorar um espaço virtual compartilhado
- Gerenciar memórias e listas de desejos
- Acompanhar humor diário
- Calendário de eventos importantes

---

## ✨ Funcionalidades

### Fase 1 (Implementada) ✅
- ✅ Sistema de autenticação completo (Email + OTP + Senha)
- ✅ Sistema de convite único para vinculação de casais
- ✅ Perfis de usuário e casal
- ✅ Dashboard do relacionamento
- ✅ Estatísticas e contadores
- ✅ Sistema de moeda interna (corações)
- ✅ Navegação por tabs

### Fase 2 (Planejada) 🔜
- 🔜 Customização completa de avatares
- 🔜 Pet virtual interativo com sistema de cuidados
- 🔜 Loja de itens e decorações
- 🔜 Sistema de níveis e recompensas

### Fase 3 (Planejada) 🔜
- 🔜 Chat privado criptografado
- 🔜 Calendário compartilhado
- 🔜 Lista de desejos colaborativa
- 🔜 Diário de humor diário

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Obrigatórios:
- **Node.js** (v18 ou superior) - [Download](https://nodejs.org/)
- **Git** - [Download](https://git-scm.com/)
- **npm** ou **yarn** (vem com Node.js)

### Para Desenvolvimento Mobile:
- **Expo Go App** (iOS/Android) - [Download na App Store](https://apps.apple.com/app/expo-go/id982107779) ou [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Para Build Nativo (Opcional):
- **EAS CLI**: `npm install -g eas-cli`
- **Conta Expo**: [Criar conta](https://expo.dev/signup)

---

## 🚀 Instalação Local

### Passo 1: Clone o Projeto

```bash
# Se ainda não clonou do OnSpace
git clone [URL_DO_SEU_REPOSITORIO]
cd lovespace-app

# Ou se já está no diretório do projeto, pule este passo
```

### Passo 2: Instale as Dependências

```bash
# Usando npm
npm install

# OU usando yarn
yarn install
```

**Tempo estimado**: 2-5 minutos

### Passo 3: Verifique a Instalação

```bash
# Verifique se todas as dependências foram instaladas
npm list --depth=0

# Você deve ver pacotes como:
# - expo
# - react-native
# - @supabase/supabase-js
# - expo-router
# etc.
```

---

## ⚙️ Configuração do Backend

### ✅ Backend Já Configurado!

**Boa notícia**: O backend já está 100% configurado através do OnSpace Spaces! Você não precisa:
- ❌ Instalar servidor separado
- ❌ Configurar banco de dados manualmente
- ❌ Gerenciar variáveis de ambiente
- ❌ Configurar autenticação

### O que já está funcionando:

1. **Banco de Dados PostgreSQL**
   - 8 tabelas criadas automaticamente
   - Políticas de segurança (RLS) ativas
   - Índices otimizados

2. **Autenticação**
   - Sistema de email + senha
   - Verificação via OTP
   - Gerenciamento de sessão

3. **Storage**
   - Pronto para upload de imagens
   - Políticas de acesso configuradas

4. **Variáveis de Ambiente**
   - Geradas automaticamente
   - Sincronizadas com o app

### Verificar Configuração do Backend

1. **Acesse o Dashboard** no OnSpace
2. Vá para a aba **"Data"**
3. Você deve ver as seguintes tabelas:
   - ✅ `user_profiles`
   - ✅ `couples`
   - ✅ `avatars`
   - ✅ `pets`
   - ✅ `spaces`
   - ✅ `user_currency`
   - ✅ `memories`
   - ✅ `calendar_events`
   - ✅ `mood_entries`

Se todas as tabelas estiverem lá, **seu backend está 100% funcional**! 🎉

---

## 🏃 Executando o App

### Desenvolvimento Local (Web)

```bash
# Inicie o servidor de desenvolvimento
npm start

# OU
npx expo start
```

O aplicativo abrirá em:
- **Web**: http://localhost:8081
- **Metro Bundler**: http://localhost:8081

### Testando no Navegador

```bash
# Pressione 'w' no terminal após iniciar
# OU acesse diretamente:
npx expo start --web
```

### Testando no Simulador iOS (apenas Mac)

```bash
# Pressione 'i' no terminal após iniciar
# OU:
npx expo start --ios
```

**Pré-requisito**: Xcode instalado

### Testando no Emulador Android

```bash
# Pressione 'a' no terminal após iniciar
# OU:
npx expo start --android
```

**Pré-requisito**: Android Studio instalado

---

## 📱 Testando em Dispositivo Real

### Método 1: Expo Go (Mais Fácil) ✅

#### iOS:
1. Instale o **Expo Go** da App Store
2. Execute `npm start`
3. Escaneie o QR Code com a câmera do iPhone
4. O app abrirá automaticamente no Expo Go

#### Android:
1. Instale o **Expo Go** da Google Play
2. Execute `npm start`
3. Abra o Expo Go e escaneie o QR Code
4. Ou pressione 'a' para abrir diretamente

### Método 2: Build de Desenvolvimento

```bash
# Instale EAS CLI (uma vez)
npm install -g eas-cli

# Configure sua conta Expo
eas login

# Build para iOS (Development)
eas build --platform ios --profile development

# Build para Android (Development)
eas build --platform android --profile development
```

---

## 📦 Build para Produção

### Build Android (APK ou AAB)

```bash
# Build APK (para testes)
eas build --platform android --profile preview

# Build AAB (para Google Play)
eas build --platform android --profile production
```

**Tempo estimado**: 10-20 minutos

**Resultado**: Link para download do APK/AAB

### Build iOS (IPA)

```bash
# Build para TestFlight
eas build --platform ios --profile production
```

**Pré-requisitos**:
- Apple Developer Account ($99/ano)
- Certificados configurados

### Configurar Builds (app.json)

```json
{
  "expo": {
    "name": "LoveSpace",
    "slug": "lovespace",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.seudominio.lovespace",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.seudominio.lovespace",
      "versionCode": 1
    }
  }
}
```

---

## 🗂️ Estrutura do Projeto

```
lovespace-app/
├── app/                      # Rotas (Expo Router)
│   ├── (tabs)/              # Navegação por tabs
│   │   ├── _layout.tsx      # Configuração dos tabs
│   │   ├── index.tsx        # Home (Dashboard do casal)
│   │   ├── avatar.tsx       # Customização de avatar
│   │   ├── memories.tsx     # Memórias e planos
│   │   └── profile.tsx      # Perfil e configurações
│   ├── _layout.tsx          # Layout raiz
│   ├── index.tsx            # Autenticação + Router
│   ├── login.tsx            # Tela de login/registro
│   └── onboarding.tsx       # Vinculação de casais
│
├── contexts/                # Estados globais
│   └── CoupleContext.tsx    # Contexto do casal
│
├── hooks/                   # Hooks customizados
│   └── useCouple.tsx        # Hook do casal
│
├── services/                # Lógica de negócio
│   └── coupleService.ts     # Serviços do casal
│
├── types/                   # TypeScript types
│   └── couple.ts            # Tipos do domínio
│
├── assets/                  # Recursos estáticos
│   ├── fonts/              # Fontes customizadas
│   └── images/             # Imagens
│
├── .env                     # Variáveis de ambiente (auto-gerado)
├── app.json                 # Configuração do Expo
├── package.json             # Dependências
└── tsconfig.json           # Configuração TypeScript
```

---

## 🔧 Troubleshooting

### Problema: "Metro Bundler não inicia"

**Solução**:
```bash
# Limpe o cache
npx expo start -c

# OU
rm -rf node_modules
npm install
npx expo start
```

### Problema: "Erro de autenticação no backend"

**Verificações**:
1. Confirme que as variáveis de ambiente estão configuradas:
   ```bash
   # Verifique .env
   cat .env
   
   # Deve conter:
   EXPO_PUBLIC_SUPABASE_URL=https://...
   EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJ...
   ```

2. Verifique o Dashboard no OnSpace:
   - Aba "Data" → Tabela `user_profiles` existe?
   - RLS policies estão ativas?

### Problema: "App não carrega no dispositivo"

**Soluções**:
1. Certifique-se de estar na mesma rede WiFi
2. Desative VPN se estiver usando
3. Reinicie o Expo Go
4. Reinicie o servidor: `npx expo start -c`

### Problema: "Erro ao criar convite de casal"

**Verificação**:
```sql
-- Acesse o Dashboard > SQL Editor e execute:
SELECT * FROM couples WHERE user1_id = 'SEU_USER_ID';
```

Se não retornar nada, a função `generate_invite_code` pode não estar criada.

**Solução**: Re-execute o SQL no Dashboard

### Problema: "Build falha no EAS"

**Verificações**:
1. Certifique-se de estar logado:
   ```bash
   eas whoami
   ```

2. Verifique o arquivo `eas.json`:
   ```bash
   cat eas.json
   ```

3. Veja os logs completos:
   ```bash
   eas build:list
   ```

---

## 🎨 Personalização

### Mudar Cores do Tema

Edite os arquivos de cada tela. Exemplo em `app/(tabs)/index.tsx`:

```typescript
// Cores atuais (rosa/roxo)
colors={['#FFE4E1', '#FFF0F5', '#FFFFFF']}

// Cores azul/verde (exemplo)
colors={['#E0F7FA', '#E1F5FE', '#FFFFFF']}
```

### Adicionar Novos Ícones

```typescript
import { MaterialIcons } from '@expo/vector-icons';

<MaterialIcons name="nome-do-icone" size={24} color="#FF69B4" />
```

[Lista completa de ícones](https://icons.expo.fyi/)

---

## 📊 Monitoramento

### Ver Usuários Cadastrados

**Dashboard OnSpace** → Aba "Data" → Tabela `user_profiles`

### Ver Casais Ativos

**Dashboard OnSpace** → Aba "Data" → Tabela `couples`

### Ver Logs do Backend

**Dashboard OnSpace** → Aba "Logs" (em breve)

---

## 🚢 Deploy para Produção

### Deploy do App

1. **Configure os builds** em `app.json`
2. **Execute o build**:
   ```bash
   eas build --platform all --profile production
   ```
3. **Publique**:
   - iOS: [App Store Connect](https://appstoreconnect.apple.com/)
   - Android: [Google Play Console](https://play.google.com/console)

### Backend (Já Deployado)

Seu backend Spaces já está em produção! Não precisa fazer deploy separado.

---

## 📝 Próximos Passos

1. ✅ Testar o app localmente
2. ✅ Criar conta de casal de teste
3. ✅ Verificar funcionamento do sistema de convite
4. 🔜 Implementar Fase 2 (Gamificação completa)
5. 🔜 Implementar Fase 3 (Chat e features sociais)
6. 🔜 Adicionar notificações push
7. 🔜 Configurar analytics

---

## 🆘 Suporte

### Documentação Oficial
- [Expo Docs](https://docs.expo.dev/)
- [React Native Docs](https://reactnative.dev/)
- [Supabase Docs](https://supabase.com/docs)

### Comunidade
- [Expo Discord](https://chat.expo.dev/)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/expo)

### Precisa de Ajuda?
Entre em contato via OnSpace chat ou abra uma issue no GitHub.

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com 💕 usando OnSpace AI**