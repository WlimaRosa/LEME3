// Exemplo de como criar um novo componente
// Este arquivo serve como template para novos componentes

class ExampleComponent {
    constructor() {
        this.element = null;
        this.init();
    }

    init() {
        this.createComponent();
        this.setupEventListeners();
    }

    createComponent() {
        // Criar o elemento HTML do componente
        this.element = document.createElement('div');
        this.element.className = 'example-component';
        this.element.innerHTML = `
            <div class="example-content">
                <h3>Componente de Exemplo</h3>
                <p>Este é um exemplo de como criar um novo componente.</p>
                <button class="example-btn">Clique aqui</button>
            </div>
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(this.element);
    }

    setupEventListeners() {
        // Configurar event listeners
        const button = this.element.querySelector('.example-btn');
        if (button) {
            button.addEventListener('click', () => {
                this.handleButtonClick();
            });
        }
    }

    handleButtonClick() {
        console.log('Botão do componente de exemplo clicado!');
        alert('Componente funcionando!');
    }

    // Método para mostrar o componente
    show() {
        if (this.element) {
            this.element.style.display = 'block';
        }
    }

    // Método para esconder o componente
    hide() {
        if (this.element) {
            this.element.style.display = 'none';
        }
    }

    // Método para destruir o componente (cleanup)
    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Export para uso em outros componentes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ExampleComponent;
} else {
    window.ExampleComponent = ExampleComponent;
}

/*
INSTRUÇÕES PARA USAR ESTE TEMPLATE:

1. Copie este arquivo e renomeie para seu componente
2. Substitua "ExampleComponent" pelo nome do seu componente
3. Modifique o HTML no método createComponent()
4. Adicione seus event listeners no setupEventListeners()
5. Implemente a lógica específica do seu componente
6. Adicione o script ao index.html
7. Registre o componente no App.js

EXEMPLO DE USO:

// No index.html, adicione:
<script src="components/SeuComponente.js"></script>

// No App.js, adicione na lista de componentes:
new SeuComponente()

// Para acessar o componente:
const meuComponente = window.lemeApp.getComponent('SeuComponente');
*/ 