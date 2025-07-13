class Header {
    constructor() {
        console.log('Header constructor called');
        this.init();
    }

    init() {
        console.log('Header init called');
        this.createHeader();
        this.setupEventListeners();
        this.checkAuthState();
    }

    createHeader() {
        console.log('Creating header...');
        // Remover header antigo se existir
        const oldHeader = document.querySelector('#app > header');
        if (oldHeader) oldHeader.remove();
        const header = document.createElement('header');
        header.className = 'header';
        header.innerHTML = `
            <nav class="nav">
                <div class="nav-brand">
                    <a href="#home"><img src="imgs/leme.png" alt="Logo Leme Convenience Store" style="height:48px; display:block;"></a>
                </div>
                <ul class="nav-menu">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#localizacao">Localização</a></li>
                    <li><a href="#contato">Contato</a></li>
                </ul>
                <div class="nav-auth">
                    <button id="loginBtn" class="btn-login">
                        <i class="fas fa-user"></i>
                        <span>Entrar</span>
                    </button>
                    <div id="userProfile" class="user-profile" style="display: none;">
                        <img id="userAvatar" src="" alt="Avatar" class="user-avatar">
                        <span id="userName" class="user-name"></span>
                        <button id="editProfileBtn" class="btn-edit-profile" title="Editar Perfil">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button id="checkinBtn" class="btn-checkin" title="Fazer Check-in">
                            <i class="fas fa-map-marker-alt"></i>
                        </button>
                        <button id="myCheckinsBtn" class="btn-my-checkins" title="Meus Check-ins">
                            <i class="fas fa-list"></i>
                        </button>
                        <button id="logoutBtn" class="btn-logout">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>
                <div class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </nav>
        `;
        // Inserir no #app
        const app = document.getElementById('app');
        if (app) {
            app.appendChild(header);
        } else {
            document.body.insertBefore(header, document.body.firstChild);
        }
        console.log('Header created successfully');
    }

    setupEventListeners() {
        console.log('Setting up header event listeners...');
        
        // Login button
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                console.log('Login button clicked');
                this.showLoginModal();
            });
        }

        // User profile buttons
        const editProfileBtn = document.getElementById('editProfileBtn');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', () => {
                this.showUserProfileModal();
            });
        }

        const checkinBtn = document.getElementById('checkinBtn');
        if (checkinBtn) {
            checkinBtn.addEventListener('click', () => {
                // Apenas abrir o modal de check-in
                if (window.CheckinModal) {
                    const checkinModal = new window.CheckinModal();
                    checkinModal.show();
                } else {
                    console.log('CheckinModal not available');
                }
            });
        }

        const myCheckinsBtn = document.getElementById('myCheckinsBtn');
        if (myCheckinsBtn) {
            myCheckinsBtn.addEventListener('click', () => {
                this.showMyCheckinsModal();
            });
        }

        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.logout();
            });
        }

        // Mobile menu toggle
        const navToggle = document.querySelector('.nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        console.log('Header event listeners set up');
    }

    checkAuthState() {
        console.log('Checking auth state...');
        if (window.onAuthStateChanged && window.auth) {
            window.onAuthStateChanged(window.auth, (user) => {
                if (user) {
                    this.showUserProfile(user);
                } else {
                    this.showLoginButton();
                }
            });
        } else {
            console.log('Firebase auth not ready, showing login button');
            this.showLoginButton();
        }
    }

    showUserProfile(user) {
        console.log('Showing user profile for:', user.displayName);
        const loginBtn = document.getElementById('loginBtn');
        const userProfile = document.getElementById('userProfile');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');

        if (loginBtn) loginBtn.style.display = 'none';
        if (userProfile) userProfile.style.display = 'flex';
        if (userAvatar) userAvatar.src = user.photoURL || 'imgs/default-avatar.png';
        if (userName) userName.textContent = user.displayName || 'Usuário';
    }

    showLoginButton() {
        console.log('Showing login button');
        const loginBtn = document.getElementById('loginBtn');
        const userProfile = document.getElementById('userProfile');

        if (loginBtn) loginBtn.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'none';
    }

    showLoginModal() {
        console.log('Showing login modal');
        if (window.LoginModal) {
            const loginModal = new window.LoginModal();
            loginModal.show();
        } else {
            console.log('LoginModal not available');
        }
    }

    showUserProfileModal() {
        console.log('Showing user profile modal');
        if (window.UserProfileModal) {
            const userProfileModal = new window.UserProfileModal();
            userProfileModal.show();
        } else {
            console.log('UserProfileModal not available');
        }
    }

    showMyCheckinsModal() {
        console.log('Showing my checkins modal');
        if (window.MyCheckinsModal) {
            const myCheckinsModal = new window.MyCheckinsModal();
            myCheckinsModal.show();
        } else {
            console.log('MyCheckinsModal not available');
        }
    }

    async performCheckin() {
        console.log('Performing checkin');
        if (window.CheckinModal) {
            const checkinModal = new window.CheckinModal();
            await checkinModal.performCheckin();
        } else {
            console.log('CheckinModal not available');
        }
    }

    async logout() {
        console.log('Logging out');
        try {
            if (window.signOut && window.auth) {
                await window.signOut(window.auth);
            }
            this.showLoginButton();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    }

    toggleMobileMenu() {
        console.log('Toggling mobile menu');
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.toggle('active');
        }
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Header;
} else {
    window.Header = Header;
    console.log('Header class registered globally');
} 