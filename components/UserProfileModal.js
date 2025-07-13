class UserProfileModal {
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
        this.modal.id = 'userProfileModal';
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content user-profile-modal">
                <div class="user-profile-container">
                    <div class="user-profile-header">
                        <h2><i class="fas fa-user-edit"></i> Editar Perfil</h2>
                        <span class="close" id="userProfileClose">&times;</span>
                    </div>
                    <form id="userProfileForm" class="user-profile-form">
                        <div class="form-group">
                            <label for="editUserName">Nome Completo:</label>
                            <input type="text" id="editUserName" name="userName" required>
                        </div>
                        <div class="form-group">
                            <label for="editUserSex">Sexo:</label>
                            <select id="editUserSex" name="userSex" required>
                                <option value="">Selecione...</option>
                                <option value="M">Masculino</option>
                                <option value="F">Feminino</option>
                                <option value="N">Prefiro não informar</option>
                            </select>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn-save-profile">
                                <i class="fas fa-save"></i>
                                Salvar Alterações
                            </button>
                            <button type="button" class="btn-cancel-profile" id="cancelProfileBtn">
                                <i class="fas fa-times"></i>
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
    }

    setupEventListeners() {
        // Close button
        this.modal.querySelector('#userProfileClose').addEventListener('click', () => {
            this.hide();
        });

        // Cancel button
        this.modal.querySelector('#cancelProfileBtn').addEventListener('click', () => {
            this.hide();
        });

        // Form submission
        this.modal.querySelector('#userProfileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });
    }

    async show() {
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Load current user data
        await this.loadUserData();
    }

    hide() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async loadUserData() {
        try {
            const user = window.auth.currentUser;
            if (!user) {
                alert('Você precisa estar logado para editar o perfil.');
                return;
            }

            // Get user data from Firestore
            const usersRef = window.collection(window.db, 'users');
            const q = window.query(usersRef, window.where('userId', '==', user.uid));
            const querySnapshot = await window.getDocs(q);

            if (!querySnapshot.empty) {
                const userData = querySnapshot.docs[0].data();
                this.modal.querySelector('#editUserName').value = userData.userName || user.displayName || '';
                this.modal.querySelector('#editUserSex').value = userData.userSex || '';
            } else {
                // If no user document exists, use Firebase Auth data
                this.modal.querySelector('#editUserName').value = user.displayName || '';
                this.modal.querySelector('#editUserSex').value = '';
            }

        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
        }
    }

    async handleFormSubmission() {
        try {
            const user = window.auth.currentUser;
            if (!user) {
                alert('Você precisa estar logado para salvar alterações.');
                return;
            }

            const userName = this.modal.querySelector('#editUserName').value.trim();
            const userSex = this.modal.querySelector('#editUserSex').value;

            if (!userName || !userSex) {
                alert('Por favor, preencha todos os campos.');
                return;
            }

            // Save to Firestore
            const userData = {
                userId: user.uid,
                userName: userName,
                userSex: userSex,
                userEmail: user.email,
                updatedAt: window.serverTimestamp()
            };

            const usersRef = window.collection(window.db, 'users');
            const q = window.query(usersRef, window.where('userId', '==', user.uid));
            const querySnapshot = await window.getDocs(q);

            if (!querySnapshot.empty) {
                // Update existing user document
                await window.updateDoc(querySnapshot.docs[0].ref, userData);
            } else {
                // Create new user document
                await window.addDoc(usersRef, userData);
            }

            // Update display name in header
            const userNameElement = document.getElementById('userName');
            if (userNameElement) {
                userNameElement.textContent = userName;
            }

            this.hide();
            alert('Perfil atualizado com sucesso!');

        } catch (error) {
            console.error('Erro ao salvar perfil:', error);
            alert('Erro ao salvar alterações. Tente novamente.');
        }
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UserProfileModal;
} else {
    window.UserProfileModal = UserProfileModal;
} 