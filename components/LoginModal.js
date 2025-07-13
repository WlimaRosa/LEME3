class LoginModal {
    constructor() {
        this.modal = null;
        this.init();
    }

    init() {
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        this.modal = document.createElement('div');
        this.modal.id = 'loginModal';
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <div class="login-container">
                    <h2>Entrar no Leme</h2>
                    <p>Faça login para acessar recursos exclusivos!</p>
                    <button id="googleLoginBtn" class="btn-google-login">
                        <i class="fab fa-google"></i>
                        Entrar com Google
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
    }

    setupEventListeners() {
        // Close button
        this.modal.querySelector('.close').addEventListener('click', () => {
            this.hide();
        });

        // Google login button
        this.modal.querySelector('#googleLoginBtn').addEventListener('click', () => {
            this.handleGoogleLogin();
        });

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
    }

    show() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async handleGoogleLogin() {
        try {
            const result = await window.signInWithPopup(window.auth, window.provider);
            this.hide();
            this.showSuccessModal();
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Erro ao fazer login. Tente novamente.');
        }
    }

    showSuccessModal() {
        const successModal = new SuccessModal();
        successModal.show();
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoginModal;
} else {
    window.LoginModal = LoginModal;
} 