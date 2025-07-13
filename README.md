# Leme - Sistema de Login Firebase

## Sobre o Projeto

O Leme é um site para um estabelecimento que agora inclui um sistema de autenticação completo usando Firebase Authentication com login via Google.

## Funcionalidades Implementadas

### 🔐 Sistema de Autenticação
- **Login via Google**: Autenticação segura usando Google OAuth
- **Interface Moderna**: Modal de login com design responsivo
- **Perfil do Usuário**: Exibe avatar, nome e botão de logout
- **Persistência**: Mantém o usuário logado entre sessões
- **Sistema de Check-in**: Controle de visitas dos usuários

### 🎨 Design e UX
- **Modal Elegante**: Interface de login com animações suaves
- **Responsivo**: Funciona perfeitamente em mobile e desktop
- **Feedback Visual**: Animações de loading e sucesso
- **Integração Seamless**: Sistema integrado ao design existente

## Configuração do Firebase

### 1. Configuração do Projeto
O Firebase já está configurado com as seguintes credenciais:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyCPQIhUe3_pXwKrPGBj7Ub_1jeDFDt818o",
  authDomain: "lemedb420.firebaseapp.com",
  projectId: "lemedb420",
  storageBucket: "lemedb420.firebasestorage.app",
  messagingSenderId: "301708672004",
  appId: "1:301708672004:web:706f45d2a94e94d6e88951"
};
```

### 2. Habilitar Autenticação Google
No Console do Firebase:
1. Vá para **Authentication** > **Sign-in method**
2. Habilite **Google** como provedor
3. Configure o domínio autorizado (seu domínio de produção)

### 3. Configurações de Segurança
- Adicione seu domínio na lista de domínios autorizados
- Configure as regras de segurança do Firestore (se necessário)

## Como Usar

### Para Usuários
1. Clique no botão "Entrar" no header
2. Clique em "Entrar com Google"
3. Autorize o acesso na janela do Google
4. Pronto! Você está logado e tem acesso a recursos exclusivos

### Para Desenvolvedores
O sistema está modularizado e fácil de estender:

```javascript
// Verificar se usuário está logado
const user = window.auth?.currentUser;
if (user) {
  console.log('Usuário logado:', user.displayName);
}

// Adicionar funcionalidades exclusivas
function addExclusiveFeature() {
  const user = window.auth?.currentUser;
  if (user) {
    // Código para usuários logados
  }
}
```

## Estrutura dos Arquivos

```
Leme/
├── index.html          # Página principal com Firebase SDK
├── leme.css           # Estilos incluindo sistema de login
├── leme.js            # JavaScript com autenticação Firebase
├── imgs/              # Imagens do site
└── README.md          # Este arquivo
```

## Recursos Técnicos

### Firebase SDK
- **Firebase App**: Inicialização do projeto
- **Firebase Auth**: Autenticação com Google
- **onAuthStateChanged**: Listener para mudanças de estado

### CSS Features
- **Modal Responsivo**: Adapta-se a diferentes telas
- **Animações**: Transições suaves e feedback visual
- **Design System**: Consistente com o tema do site

### JavaScript Features
- **Async/Await**: Código assíncrono limpo
- **Error Handling**: Tratamento de erros robusto
- **Event Listeners**: Sistema de eventos bem estruturado

## Próximos Passos

### Funcionalidades Futuras
- [ ] Sistema de reservas para usuários logados
- [ ] Histórico de visitas
- [ ] Notificações push
- [ ] Sistema de pontos/fidelidade
- [ ] Área administrativa

### Melhorias Técnicas
- [ ] Implementar Firestore para dados do usuário
- [ ] Adicionar mais provedores de login (Facebook, Apple)
- [ ] Sistema de roles/permissões
- [ ] Analytics de uso

## Suporte

Para dúvidas ou problemas:
1. Verifique o console do navegador para erros
2. Confirme se o Firebase está configurado corretamente
3. Teste em diferentes navegadores

## Licença

Este projeto é privado e pertence ao Leme.

---

**Desenvolvido com ❤️ para o Leme** 