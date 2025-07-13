class Localizacao {
    constructor() {
        this.init();
    }

    init() {
        this.createLocalizacao();
    }

    createLocalizacao() {
        const cfg = window.LEME_CONFIG?.site || {};
        const localizacao = document.createElement('section');
        localizacao.id = 'localizacao';
        localizacao.className = 'localizacao';
        localizacao.innerHTML = `
            <div class="container">
                <h2>Onde nos encontrar</h2>
                <div class="localizacao-content">
                    <div class="mapa-container">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3463.261738929626!2d-51.14514912449481!3d-29.770072318607383!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x951969f7b208f2a3%3A0x1d6e00016ecf1f05!2sLeme%20Convenience%20Store!5e0!3m2!1spt-BR!2sbr!4v1751510754675!5m2!1spt-BR!2sbr" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div class="localizacao-info">
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <h4>Endereço</h4>
                                <p>${cfg.address || ''}</p>
                                <p>${cfg.city || ''}</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <h4>Horário de Funcionamento</h4>
                                <p>Terça a Domingo: 19h - 02h</p>
                                <p>Segunda: Fechado</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-car"></i>
                            <div>
                                <h4>Como Chegar</h4>
                                <p>Metrô: Ao lado da estação São Leopoldo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after hero section
        const hero = document.querySelector('#home');
        if (hero) {
            hero.parentNode.insertBefore(localizacao, hero.nextSibling);
        } else {
            document.body.appendChild(localizacao);
        }
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Localizacao;
} else {
    window.Localizacao = Localizacao;
} 