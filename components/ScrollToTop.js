class ScrollToTop {
    constructor() {
        this.button = null;
        this.init();
    }

    init() {
        this.createButton();
        this.setupEventListeners();
    }

    createButton() {
        this.button = document.createElement('button');
        this.button.id = 'btn-top';
        this.button.title = 'Voltar ao topo';
        this.button.innerHTML = '<i class="fas fa-arrow-up"></i>';
        
        document.body.appendChild(this.button);
    }

    setupEventListeners() {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            this.toggleButtonVisibility();
        });

        // Scroll to top when button is clicked
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    toggleButtonVisibility() {
        if (window.pageYOffset > 300) {
            this.button.style.display = 'block';
        } else {
            this.button.style.display = 'none';
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollToTop;
} else {
    window.ScrollToTop = ScrollToTop;
} 