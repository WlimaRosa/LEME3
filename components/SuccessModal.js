class SuccessModal {
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
        this.modal.id = 'successModal';
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content success-modal">
                <div class="success-container">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h2>Login realizado com sucesso!</h2>
                    <p>Bem-vindo ao Leme! Agora você tem acesso a todos os recursos exclusivos.</p>
                    <button id="successCloseBtn" class="btn-success-close">
                        <i class="fas fa-times"></i>
                        Fechar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
    }

    setupEventListeners() {
        // Close button
        this.modal.querySelector('#successCloseBtn').addEventListener('click', () => {
            this.hide();
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
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.hide();
        }, 3000);
    }

    hide() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SuccessModal;
} else {
    window.SuccessModal = SuccessModal;
} 