# Leme - Estrutura de Componentes

Este projeto foi refatorado para usar uma arquitetura de componentes extremamente modular. Cada funcionalidade está separada em seu próprio arquivo JavaScript.

## Estrutura de Componentes

### Componentes Principais

1. **App.js** - Componente principal que inicializa todos os outros componentes
2. **Header.js** - Header com navegação e autenticação
3. **Hero.js** - Seção hero com carrossel de imagens
4. **Localizacao.js** - Seção de localização com mapa
5. **Contato.js** - Seção de contato com redes sociais
6. **Footer.js** - Rodapé do site

### Componentes de Modal

7. **LoginModal.js** - Modal de login com Google
8. **SuccessModal.js** - Modal de sucesso após login
9. **CheckinModal.js** - Modal de check-in
10. **MyCheckinsModal.js** - Modal com histórico de check-ins
11. **UserProfileModal.js** - Modal de edição de perfil

### Componentes Utilitários

12. **ScrollToTop.js** - Botão de voltar ao topo
13. **SmoothScroll.js** - Navegação suave entre seções

## Como Usar

### Inicialização
O componente `App.js` inicializa automaticamente todos os outros componentes quando a página carrega:

```javascript
// A aplicação é inicializada automaticamente
window.lemeApp = new App();
```

### Acessando Componentes
Você pode acessar qualquer componente através da instância da aplicação:

```javascript
// Obter um componente específico
const headerComponent = window.lemeApp.getComponent('Header');
const heroComponent = window.lemeApp.getComponent('Hero');
```

### Adicionando Novos Componentes

1. Crie um novo arquivo na pasta `components/`
2. Defina uma classe com métodos `init()` e `constructor()`
3. Adicione o script ao `index.html`
4. Registre o componente no `App.js`

Exemplo de novo componente:

```javascript
class NovoComponente {
    constructor() {
        this.init();
    }

    init() {
        this.createComponent();
        this.setupEventListeners();
    }

    createComponent() {
        // Criar elemento HTML
    }

    setupEventListeners() {
        // Configurar event listeners
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NovoComponente;
} else {
    window.NovoComponente = NovoComponente;
}
```

## Vantagens da Componentização

1. **Modularidade**: Cada funcionalidade está isolada
2. **Manutenibilidade**: Fácil de modificar componentes individuais
3. **Reutilização**: Componentes podem ser reutilizados
4. **Testabilidade**: Cada componente pode ser testado independentemente
5. **Escalabilidade**: Fácil adicionar novos componentes

## Estrutura de Arquivos

```
components/
├── App.js              # Componente principal
├── Header.js           # Header e navegação
├── Hero.js             # Seção hero
├── Localizacao.js      # Seção localização
├── Contato.js          # Seção contato
├── Footer.js           # Rodapé
├── LoginModal.js       # Modal de login
├── SuccessModal.js     # Modal de sucesso
├── CheckinModal.js     # Modal de check-in
├── MyCheckinsModal.js  # Modal de histórico
├── UserProfileModal.js # Modal de perfil
├── ScrollToTop.js      # Botão voltar ao topo
├── SmoothScroll.js     # Navegação suave
└── README.md           # Esta documentação
```

## Dependências

- Firebase (autenticação e banco de dados)
- Font Awesome (ícones)
- Google Fonts (Inter)
- CSS personalizado (leme.css)

## Compatibilidade

Todos os componentes são compatíveis com:
- Navegadores modernos (ES6+)
- Módulos ES6 (quando disponível)
- Fallback para carregamento global 