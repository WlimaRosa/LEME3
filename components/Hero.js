class Hero {
    constructor() {
        this.currentSlide = 0;
        this.slides = [];
        this.init();
    }

    init() {
        this.createHero();
        this.setupEventListeners();
        this.startAutoSlide();
    }

    createHero() {
        const hero = document.createElement('section');
        hero.id = 'home';
        hero.className = 'hero';
        hero.innerHTML = `
            <div class="carousel">
                <div class="carousel-container">
                    <div class="carousel-slide active">
                        <div class="slide-content">
                            <h1 class="hero-title">LEME </h1>
                            <p class="hero-subtitle">Onde a galera se encontra!</p>
                            <div class="hero-buttons">
                                <a href="#localizacao" class="btn btn-primary">Como Chegar</a>
                                <a href="#contato" class="btn btn-secondary">Fale Conosco</a>
                            </div>
                        </div>
                        <div class="slide-bg" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('imgs/img2.png')"></div>
                    </div>
                    <div class="carousel-slide">
                        <div class="slide-bg" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('imgs/img3.png')"></div>
                    </div>
                    <div class="carousel-slide">
                        <div class="slide-bg" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('imgs/img4.png')"></div>
                    </div>
                    <div class="carousel-slide">
                        <div class="slide-bg" style="background-image: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('imgs/img5.png')"></div>
                    </div>
                </div>
                <!-- Carousel Controls -->
                <button class="carousel-btn prev" id="prevBtn">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carousel-btn next" id="nextBtn">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <!-- Carousel Indicators -->
                <div class="carousel-indicators">
                    <span class="indicator active" data-slide="0"></span>
                    <span class="indicator" data-slide="1"></span>
                    <span class="indicator" data-slide="2"></span>
                    <span class="indicator" data-slide="3"></span>
                </div>
            </div>
        `;
        // Inserir após o header dentro do #app
        const app = document.getElementById('app');
        const header = app ? app.querySelector('header') : null;
        if (app && header) {
            app.insertBefore(hero, header.nextSibling);
        } else if (app) {
            app.appendChild(hero);
        } else {
            document.body.appendChild(hero);
        }
        this.slides = hero.querySelectorAll('.carousel-slide');
        this.indicators = hero.querySelectorAll('.indicator');
    }

    setupEventListeners() {
        // Previous button
        document.getElementById('prevBtn').addEventListener('click', () => {
            this.changeSlide(-1);
        });

        // Next button
        document.getElementById('nextBtn').addEventListener('click', () => {
            this.changeSlide(1);
        });

        // Indicators
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.goToSlide(index);
            });
        });

        // Pause auto-slide on hover
        const carousel = document.querySelector('.carousel');
        carousel.addEventListener('mouseenter', () => {
            this.pauseAutoSlide();
        });

        carousel.addEventListener('mouseleave', () => {
            this.resumeAutoSlide();
        });
    }

    changeSlide(direction) {
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');

        this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;

        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators[this.currentSlide].classList.remove('active');

        this.currentSlide = index;

        this.slides[this.currentSlide].classList.add('active');
        this.indicators[this.currentSlide].classList.add('active');
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.changeSlide(1);
        }, 5000); // Change slide every 5 seconds
    }

    pauseAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }

    resumeAutoSlide() {
        this.startAutoSlide();
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Hero;
} else {
    window.Hero = Hero;
} 