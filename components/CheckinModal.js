class CheckinModal {
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
        this.modal.id = 'checkinModal';
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content checkin-modal">
                <div class="checkin-container">
                    <button id="checkinCloseBtn" class="btn-checkin-close" style="position: absolute; top: 18px; right: 24px; background: none; color: #4CAF50; font-size: 2rem; border: none; cursor: pointer; z-index: 10;">
                        <i class="fas fa-times"></i>
                    </button>
                    <div class="checkin-icon" style="margin-top: 1.5rem;">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <h2 style="margin-bottom: 1.5rem;">Fazer Check-in</h2>
                    <form id="checkinForm" enctype="multipart/form-data" style="display: flex; flex-direction: column; gap: 1rem; align-items: center; width: 100%;">
                        <label style="width: 100%; text-align: left;">
                            Foto do rolê:<br>
                            <input type="file" id="checkinPhoto" accept="image/*" style="margin-top: 0.5rem;">
                        </label>
                        <img id="checkinPhotoPreview" src="" alt="Preview" style="display:none; max-width: 200px; border-radius: 10px; margin-bottom: 1rem;"/>
                        <label style="width: 100%; text-align: left;">
                            Descrição do rolê:<br>
                            <textarea id="checkinDesc" rows="3" maxlength="200" placeholder="Conte como está o rolê..." style="width: 100%; border-radius: 8px; padding: 0.5rem;"></textarea>
                        </label>
                        <button type="submit" id="doCheckinBtn" class="btn-checkin" style="margin-top: 2rem; font-size: 1.25rem; padding: 1rem 3rem; min-width: 220px; border-radius: 2rem; background: #4CAF50; color: #fff; font-weight: bold; display: flex; align-items: center; justify-content: center; gap: 0.7rem; box-shadow: 0 4px 16px rgba(76,175,80,0.15); white-space: nowrap;">
                            <i class="fas fa-map-marker-alt"></i> Fazer check-in
                        </button>
                    </form>
                    <div class="checkin-details" style="margin-top: 1rem; display:none;" id="checkinSuccessDetails">
                        <div class="checkin-info">
                            <span class="checkin-date" id="checkinDate"></span>
                            <span class="checkin-time" id="checkinTime"></span>
                        </div>
                        <div class="checkin-count">
                            <span>Total de check-ins: </span>
                            <span id="totalCheckins" class="checkin-number">0</span>
                        </div>
                        <img id="checkinPhotoDone" src="" alt="Foto do check-in" style="display:none; max-width: 200px; border-radius: 10px; margin-top: 1rem;"/>
                        <div id="checkinDescDone" style="margin-top: 0.5rem; color: #fff;"></div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
    }

    setupEventListeners() {
        // Close button
        this.modal.querySelector('#checkinCloseBtn').addEventListener('click', () => {
            this.hide();
        });

        // Close on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });

        // Preview da imagem
        const photoInput = this.modal.querySelector('#checkinPhoto');
        const photoPreview = this.modal.querySelector('#checkinPhotoPreview');
        photoInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    photoPreview.src = e.target.result;
                    photoPreview.style.display = 'block';
                };
                reader.readAsDataURL(this.files[0]);
            } else {
                photoPreview.src = '';
                photoPreview.style.display = 'none';
            }
        });

        // Form submit
        const form = this.modal.querySelector('#checkinForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.performCheckin();
        });
    }

    async performCheckin() {
        try {
            const user = window.auth.currentUser;
            if (!user) {
                alert('Você precisa estar logado para fazer check-in.');
                return;
            }
            const now = new Date();
            const desc = this.modal.querySelector('#checkinDesc').value.trim();
            const photoInput = this.modal.querySelector('#checkinPhoto');
            let photoURL = '';

            // Upload da imagem para Firebase Storage
            if (photoInput.files && photoInput.files[0]) {
                const file = photoInput.files[0];
                const storageRef = window.firebaseStorageRef || null;
                if (!window.firebaseStorage) {
                    // Carregar Firebase Storage dinamicamente se não estiver disponível
                    const { getStorage, ref, uploadBytes, getDownloadURL } = await import('https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js');
                    window.firebaseStorage = getStorage();
                    window.firebaseStorageRef = ref;
                    window.firebaseUploadBytes = uploadBytes;
                    window.firebaseGetDownloadURL = getDownloadURL;
                }
                const storage = window.firebaseStorage;
                const ref = window.firebaseStorageRef(storage, `checkins/${user.uid}_${Date.now()}_${file.name}`);
                await window.firebaseUploadBytes(ref, file);
                photoURL = await window.firebaseGetDownloadURL(ref);
            }

            const checkinData = {
                userId: user.uid,
                userName: user.displayName || 'Usuário',
                userEmail: user.email,
                timestamp: window.serverTimestamp(),
                date: now.toLocaleDateString('pt-BR'),
                time: now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
                desc: desc,
                photoURL: photoURL
            };

            // Add to Firestore
            await window.addDoc(window.collection(window.db, 'checkins'), checkinData);

            // Update user's checkin count
            await this.updateUserCheckinCount(user.uid);

            // Show modal with updated info
            this.updateModalInfo(checkinData);
            this.showSuccess(checkinData);
        } catch (error) {
            console.error('Erro ao fazer check-in:', error);
            alert('Erro ao fazer check-in. Tente novamente.');
        }
    }

    async updateUserCheckinCount(userId) {
        try {
            const userRef = window.collection(window.db, 'users');
            const q = window.query(userRef, window.where('userId', '==', userId));
            const querySnapshot = await window.getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const currentCount = userDoc.data().checkinCount || 0;
                await window.updateDoc(userDoc.ref, {
                    checkinCount: currentCount + 1,
                    lastCheckin: window.serverTimestamp()
                });
            }
        } catch (error) {
            console.error('Erro ao atualizar contador de check-ins:', error);
        }
    }

    updateModalInfo(checkinData) {
        this.modal.querySelector('#checkinDate').textContent = checkinData.date;
        this.modal.querySelector('#checkinTime').textContent = checkinData.time;
        
        // Get total checkins count
        this.getTotalCheckins().then(count => {
            this.modal.querySelector('#totalCheckins').textContent = count;
        });
    }

    async getTotalCheckins() {
        try {
            const user = window.auth.currentUser;
            if (!user) return 0;

            const checkinsRef = window.collection(window.db, 'checkins');
            const q = window.query(checkinsRef, window.where('userId', '==', user.uid));
            const querySnapshot = await window.getDocs(q);
            
            return querySnapshot.size;
        } catch (error) {
            console.error('Erro ao obter total de check-ins:', error);
            return 0;
        }
    }

    show() {
        // Resetar o formulário e preview
        const form = this.modal.querySelector('#checkinForm');
        if (form) {
            form.reset();
            form.style.display = 'flex';
        }
        const photoPreview = this.modal.querySelector('#checkinPhotoPreview');
        if (photoPreview) {
            photoPreview.src = '';
            photoPreview.style.display = 'none';
        }
        const details = this.modal.querySelector('#checkinSuccessDetails');
        if (details) details.style.display = 'none';
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    showSuccess(checkinData) {
        // Esconder form, mostrar detalhes
        this.modal.querySelector('#checkinForm').style.display = 'none';
        const details = this.modal.querySelector('#checkinSuccessDetails');
        details.style.display = 'block';
        this.modal.querySelector('#checkinDate').textContent = checkinData.date;
        this.modal.querySelector('#checkinTime').textContent = checkinData.time;
        if (checkinData.photoURL) {
            const photoDone = this.modal.querySelector('#checkinPhotoDone');
            photoDone.src = checkinData.photoURL;
            photoDone.style.display = 'block';
        }
        if (checkinData.desc) {
            this.modal.querySelector('#checkinDescDone').textContent = checkinData.desc;
        }
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CheckinModal;
} else {
    window.CheckinModal = CheckinModal;
} 