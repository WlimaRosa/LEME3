// Configuração dos componentes do Leme
// Este arquivo centraliza as configurações e facilita o gerenciamento

const LEME_CONFIG = {
    // Configurações do Firebase
    firebase: {
        apiKey: "AIzaSyCPQIhUe3_pXwKrPGBj7Ub_1jeDFDt818o",
        authDomain: "lemedb420.firebaseapp.com",
        projectId: "lemedb420",
        storageBucket: "lemedb420.firebasestorage.app",
        messagingSenderId: "301708672004",
        appId: "1:301708672004:web:706f45d2a94e94d6e88951"
    },

    // Configurações do site
    site: {
        name: "Leme",
        tagline: "O lugar da galera",
        address: "rua jose bonifacio 1119 - centro",
        city: "São Leopoldo, RS",
        email: "contato@leme.com",
        phone: "(11) 99999-9999",
        instagram: "@lemeconveniencia",
        instagramUrl: "https://www.instagram.com/lemeconveniencia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
        whatsappUrl: "https://wa.me/5511999999999"
    },

    // Horários de funcionamento
    hours: {
        tuesday: "19h - 02h",
        wednesday: "19h - 02h",
        thursday: "19h - 02h",
        friday: "19h - 02h",
        saturday: "19h - 02h",
        sunday: "19h - 02h",
        monday: "Fechado"
    },

    // Configurações do carrossel
    carousel: {
        autoSlideInterval: 5000, // 5 segundos
        images: [
            'imgs/img2.png',
            'imgs/img3.png',
            'imgs/img4.png',
            'imgs/img5.png'
        ]
    },

    // Configurações dos modais
    modals: {
        autoHideSuccess: 3000, // 3 segundos
        animationDuration: 300 // 300ms
    },

    // Configurações de scroll
    scroll: {
        smoothScrollOffset: 0, // Offset para scroll suave
        backToTopThreshold: 300 // Mostrar botão após 300px
    },

    // Lista de componentes (ordem de inicialização)
    components: [
        'Header',
        'Hero', 
        'Localizacao',
        'Contato',
        'Footer',
        'ScrollToTop',
        'SmoothScroll',
        'LoginModal',
        'SuccessModal',
        'CheckinModal',
        'MyCheckinsModal',
        'UserProfileModal'
    ],

    // Configurações de debug
    debug: {
        enabled: false,
        logComponentInit: true,
        logFirebaseEvents: false
    }
};

// Função para obter configuração
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], LEME_CONFIG);
}

// Função para definir configuração
function setConfig(path, value) {
    const keys = path.split('.');
    const lastKey = keys.pop();
    const target = keys.reduce((obj, key) => obj[key] = obj[key] || {}, LEME_CONFIG);
    target[lastKey] = value;
}

// Função para debug
function debug(message, data = null) {
    if (LEME_CONFIG.debug.enabled) {
        console.log(`[LEME DEBUG] ${message}`, data);
    }
}

// Export para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LEME_CONFIG, getConfig, setConfig, debug };
} else {
    window.LEME_CONFIG = LEME_CONFIG;
    window.getConfig = getConfig;
    window.setConfig = setConfig;
    window.debug = debug;
} 