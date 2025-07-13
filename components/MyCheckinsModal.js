class MyCheckinsModal {
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
        this.modal.id = 'myCheckinsModal';
        this.modal.className = 'modal';
        this.modal.innerHTML = `
            <div class="modal-content my-checkins-modal">
                <div class="my-checkins-container">
                    <div class="my-checkins-header">
                        <h2><i class="fas fa-list"></i> Meus Check-ins</h2>
                        <span class="close" id="myCheckinsClose">&times;</span>
                    </div>
                    <div class="checkins-summary">
                        <div class="summary-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div>
                                <span class="summary-number" id="totalCheckinsCount">0</span>
                                <span class="summary-label">Total de Check-ins</span>
                            </div>
                        </div>
                        <div class="summary-item">
                            <i class="fas fa-calendar"></i>
                            <div>
                                <span class="summary-number" id="thisMonthCheckins">0</span>
                                <span class="summary-label">Este Mês</span>
                            </div>
                        </div>
                        <div class="summary-item">
                            <i class="fas fa-trophy"></i>
                            <div>
                                <span class="summary-number" id="consecutiveCheckins">0</span>
                                <span class="summary-label">Sequência Atual</span>
                            </div>
                        </div>
                    </div>
                    <div class="checkins-list">
                        <h3>Histórico de Check-ins</h3>
                        <div id="checkinsList" class="checkins-items">
                            <!-- Check-ins will be loaded here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.modal);
    }

    setupEventListeners() {
        // Close button
        this.modal.querySelector('#myCheckinsClose').addEventListener('click', () => {
            this.hide();
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
        
        // Load check-ins data
        await this.loadCheckinsData();
    }

    hide() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async loadCheckinsData() {
        try {
            const user = window.auth.currentUser;
            if (!user) {
                alert('Você precisa estar logado para ver seus check-ins.');
                return;
            }

            // Get all check-ins for the user
            const checkinsRef = window.collection(window.db, 'checkins');
            const q = window.query(
                checkinsRef, 
                window.where('userId', '==', user.uid),
                window.orderBy('timestamp', 'desc')
            );
            const querySnapshot = await window.getDocs(q);

            const checkins = [];
            querySnapshot.forEach(doc => {
                const data = doc.data();
                checkins.push({
                    id: doc.id,
                    ...data,
                    timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
                });
            });

            this.updateSummary(checkins);
            this.updateCheckinsList(checkins);

        } catch (error) {
            console.error('Erro ao carregar check-ins:', error);
            alert('Erro ao carregar check-ins. Tente novamente.');
        }
    }

    updateSummary(checkins) {
        const totalCheckins = checkins.length;
        const thisMonthCheckins = this.getThisMonthCheckins(checkins);
        const consecutiveCheckins = this.getConsecutiveCheckins(checkins);

        this.modal.querySelector('#totalCheckinsCount').textContent = totalCheckins;
        this.modal.querySelector('#thisMonthCheckins').textContent = thisMonthCheckins;
        this.modal.querySelector('#consecutiveCheckins').textContent = consecutiveCheckins;
    }

    getThisMonthCheckins(checkins) {
        const now = new Date();
        const thisMonth = now.getMonth();
        const thisYear = now.getFullYear();

        return checkins.filter(checkin => {
            const checkinDate = new Date(checkin.timestamp);
            return checkinDate.getMonth() === thisMonth && checkinDate.getFullYear() === thisYear;
        }).length;
    }

    getConsecutiveCheckins(checkins) {
        if (checkins.length === 0) return 0;

        let consecutive = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < checkins.length; i++) {
            const checkinDate = new Date(checkins[i].timestamp);
            checkinDate.setHours(0, 0, 0, 0);

            const expectedDate = new Date(today);
            expectedDate.setDate(today.getDate() - consecutive);

            if (checkinDate.getTime() === expectedDate.getTime()) {
                consecutive++;
            } else {
                break;
            }
        }

        return consecutive;
    }

    updateCheckinsList(checkins) {
        const checkinsList = this.modal.querySelector('#checkinsList');
        
        if (checkins.length === 0) {
            checkinsList.innerHTML = `
                <div class="no-checkins">
                    <i class="fas fa-map-marker-alt"></i>
                    <p>Nenhum check-in encontrado</p>
                    <small>Faça seu primeiro check-in no Leme!</small>
                </div>
            `;
            return;
        }

        const checkinsHTML = checkins.map(checkin => {
            const date = new Date(checkin.timestamp);
            const formattedDate = date.toLocaleDateString('pt-BR');
            const formattedTime = date.toLocaleTimeString('pt-BR', { 
                hour: '2-digit', 
                minute: '2-digit' 
            });

            return `
                <div class="checkin-item">
                    <div class="checkin-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="checkin-info">
                        <div class="checkin-date">${formattedDate}</div>
                        <div class="checkin-time">${formattedTime}</div>
                    </div>
                </div>
            `;
        }).join('');

        checkinsList.innerHTML = checkinsHTML;
    }
}

// Export for use in other components
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MyCheckinsModal;
} else {
    window.MyCheckinsModal = MyCheckinsModal;
} 