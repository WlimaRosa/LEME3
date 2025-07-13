class Contato {
    constructor() {
        this.init();
    }

    init() {
        this.createContato();
    }

    createContato() {
        const contato = document.createElement('section');
        contato.id = 'contato';
        contato.className = 'contato';
        contato.innerHTML = `
            <div class="container">
                <h2>Entre em contato</h2>
                <div class="contato-content">
                    <div class="contato-info">
                        <p class="contato-descricao">Siga-nos nas redes sociais e fique por dentro de tudo que rola no Leme!</p>
                        <div class="social-links">
                            <a href="https://www.instagram.com/lemeconveniencia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" class="social-link instagram">
                                <i class="fab fa-instagram"></i>
                                <span>@lemeconveniencia</span>
                            </a>
                            <a href="https://wa.me/5511999999999" target="_blank" class="social-link whatsapp">
                                <i class="fab fa-whatsapp"></i>
                                <span>(11) 99999-9999</span>
                            </a>
                        </div>
                        <div class="contato-horario">
                            <h3>Horário de Funcionamento</h3>
                            <p><strong>Terça a Domingo:</strong> 19h - 02h</p>
                            <p><strong>Segunda:</strong> Fechado</p>
                        </div>
                    </div>
                    <div class="contato-image">
                        <div class="image-placeholder">
                            <i class="fas fa-camera"></i>
                            <p>Fotos do Ambiente</p>
                            <small>Siga no Instagram para ver mais</small>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after localizacao section
        const localizacao = document.querySelector('#localizacao');
        if (localizacao) {
            localizacao.parentNode.insertBefore(contato, localizacao.nextSibling);
        } else {
            document.body.appendChild(contato);
        }
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Contato;
} else {
    window.Contato = Contato;
} 