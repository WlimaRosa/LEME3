class App {
    constructor() {
        this.components = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.initializeComponents();
            });
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        try {
            console.log('Inicializando componentes...');
            const app = document.getElementById('app');
            if (!app) {
                throw new Error('Elemento #app não encontrado');
            }
            // Limpar o app antes de inserir componentes
            app.innerHTML = '';
            // Inicializar e inserir componentes principais em ordem
            const orderedComponents = [
                { name: 'Header', class: window.Header },
                { name: 'Hero', class: window.Hero },
                { name: 'Localizacao', class: window.Localizacao },
                { name: 'Contato', class: window.Contato },
                { name: 'Footer', class: window.Footer }
            ];
            orderedComponents.forEach(({ name, class: ComponentClass }) => {
                if (ComponentClass) {
                    try {
                        const component = new ComponentClass();
                        this.components.push(component);
                        console.log(`✅ ${name} inicializado`);
                    } catch (error) {
                        console.error(`❌ Erro ao inicializar ${name}:`, error);
                    }
                } else {
                    console.warn(`⚠️ ${name} não encontrado`);
                }
            });
            // Inicializar componentes auxiliares (modais, scroll, etc)
            const auxComponents = [
                { name: 'ScrollToTop', class: window.ScrollToTop },
                { name: 'SmoothScroll', class: window.SmoothScroll },
                { name: 'LoginModal', class: window.LoginModal },
                { name: 'SuccessModal', class: window.SuccessModal },
                { name: 'CheckinModal', class: window.CheckinModal },
                { name: 'MyCheckinsModal', class: window.MyCheckinsModal },
                { name: 'UserProfileModal', class: window.UserProfileModal }
            ];
            auxComponents.forEach(({ name, class: ComponentClass }) => {
                if (ComponentClass) {
                    try {
                        const component = new ComponentClass();
                        this.components.push(component);
                        console.log(`✅ ${name} inicializado`);
                    } catch (error) {
                        console.error(`❌ Erro ao inicializar ${name}:`, error);
                    }
                } else {
                    console.warn(`⚠️ ${name} não encontrado`);
                }
            });
            console.log(`Leme App initialized with ${this.components.length} components`);
        } catch (error) {
            console.error('Erro ao inicializar componentes:', error);
        }
    }

    // Method to get a specific component instance
    getComponent(componentName) {
        return this.components.find(component => 
            component.constructor.name === componentName
        );
    }

    // Method to destroy all components (cleanup)
    destroy() {
        this.components.forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
        this.components = [];
    }
}

// Initialize the app when the script is loaded
if (typeof window !== 'undefined') {
    window.App = App;
    
    // Auto-initialize if Firebase is ready
    if (window.firebaseReady) {
        window.lemeApp = new App();
    } else {
        // Wait for Firebase to be ready
        const checkFirebase = setInterval(() => {
            if (window.firebaseReady) {
                window.lemeApp = new App();
                clearInterval(checkFirebase);
            }
        }, 100);
    }
} 