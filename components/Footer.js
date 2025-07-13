class Footer {
    constructor() {
        this.init();
    }

    init() {
        this.createFooter();
    }

    createFooter() {
        // Remover footer antigo se existir
        const oldFooter = document.querySelector('footer');
        if (oldFooter) oldFooter.remove();
        const cfg = window.LEME_CONFIG?.site || {};
        const footer = document.createElement('footer');
        footer.className = 'footer';
        footer.innerHTML = `
            <div class="container">
                <div class="footer-content">
                    <div class="footer-brand">
                        <h3>LEME</h3>
                        <p>O lugar da galera desde 2020</p>
                    </div>
                    <div class="footer-links">
                        <h4>Links Rápidos</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#localizacao">Localização</a></li>
                            <li><a href="#contato">Contato</a></li>
                        </ul>
                    </div>
                    <div class="footer-contact">
                        <h4>Contato</h4>
                        <p>${cfg.address || ''}</p>
                        <p>${cfg.city || ''}</p>
                        <p>${cfg.email || ''}</p>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2024 Leme. Todos os direitos reservados.</p>
                </div>
            </div>
        `;
        document.body.appendChild(footer);
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Footer;
} else {
    window.Footer = Footer;
} 