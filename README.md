# Truck Finder - React Native App

Aplicativo de logística para conectar clientes que precisam transportar mercadorias com transportadoras disponíveis.

## 🚀 Funcionalidades

### Para Clientes
- ✅ Cadastro e autenticação via SMS
- ✅ Criação de pedidos de transporte
- 🔄 Busca de motoristas disponíveis
- 🔄 Acompanhamento em tempo real
- 🔄 Sistema de pagamento
- 🔄 Histórico de pedidos

### Para Transportadoras
- 🔄 Cadastro e verificação de documentos
- 🔄 Recebimento de pedidos
- 🔄 Sistema de gestão
- 🔄 Pagamento de comissões
- 🔄 Relatórios financeiros

## 🛠️ Tecnologias Utilizadas

- **React Native** com Expo
- **TypeScript** para tipagem
- **React Navigation** para navegação
- **Zustand** para gerenciamento de estado
- **AsyncStorage** para persistência
- **Expo Location** para geolocalização
- **Expo Camera** para captura de documentos
- **React Native Paper** para componentes UI

## 📱 Instalação e Execução

### Pré-requisitos
- Node.js 18+
- Expo CLI
- Android Studio (para Android)
- Xcode (para iOS)

### Instalação
```bash
# Clone o repositório
git clone <repository-url>
cd TruckFinder

# Instale as dependências
npm install

# Inicie o projeto
npm start
```

### Scripts Disponíveis
```bash
# Desenvolvimento
npm start          # Inicia o Expo Dev Server
npm run android    # Executa no Android
npm run ios        # Executa no iOS

# Build para produção
npm run build:android  # Build para Android (.apk/.aab)
npm run build:ios      # Build para iOS (.ipa)
npm run build:all      # Build para ambas plataformas
```

## 🏗️ Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── common/         # Componentes básicos (Button, Input, etc.)
├── contexts/           # Contexts do React
│   └── ThemeContext.tsx
├── navigation/         # Configuração de navegação
│   └── AppNavigator.tsx
├── screens/           # Telas da aplicação
│   ├── WelcomeScreen.tsx
│   ├── LoginScreen.tsx
│   └── ...
├── store/             # Gerenciamento de estado (Zustand)
│   └── useAppStore.ts
├── theme/             # Sistema de cores e tema
│   ├── colors.ts
│   └── index.ts
└── types/             # Definições de tipos TypeScript
    └── index.ts
```

## 🎨 Sistema de Tema

O aplicativo suporta tema claro e escuro com persistência automática:

```typescript
// Usar o tema atual
const { theme, isDarkMode, toggleTheme } = useTheme();

// Cores disponíveis
theme.colors.primary
theme.colors.secondary
theme.colors.background
// ... outras cores
```

## 📊 Gerenciamento de Estado

Utilizamos Zustand para gerenciamento de estado global:

```typescript
// Acessar o store
const { user, setUser, orders, addOrder } = useAppStore();

// Estado é persistido automaticamente no AsyncStorage
```

## 🔐 Permissões

O aplicativo solicita as seguintes permissões:

### Android
- `ACCESS_FINE_LOCATION` - Localização precisa
- `ACCESS_COARSE_LOCATION` - Localização aproximada
- `CAMERA` - Acesso à câmera
- `READ_EXTERNAL_STORAGE` - Leitura de arquivos
- `WRITE_EXTERNAL_STORAGE` - Escrita de arquivos

### iOS
- `NSLocationWhenInUseUsageDescription` - Localização em uso
- `NSCameraUsageDescription` - Acesso à câmera
- `NSPhotoLibraryUsageDescription` - Acesso à galeria

## 🚀 Deploy

### Android
```bash
# Build APK para teste
eas build --platform android --profile preview

# Build AAB para produção
eas build --platform android --profile production
```

### iOS
```bash
# Build para teste
eas build --platform ios --profile preview

# Build para App Store
eas build --platform ios --profile production
```

## 📝 Próximos Passos

- [ ] Implementar telas restantes
- [ ] Integração com API real
- [ ] Sistema de notificações push
- [ ] Mapas e geolocalização
- [ ] Sistema de pagamento
- [ ] Testes unitários e E2E
- [ ] Otimizações de performance

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.