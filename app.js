// App State Management
let isWalletConnected = false;
let isLiveStreaming = false;
const mockWalletAddress = "0x7a81b3c92e104b2dfae681b3d";

// Dom Elements
const walletBtn = document.getElementById('wallet-btn');
const walletText = document.getElementById('wallet-text');
const walletIcon = document.getElementById('wallet-icon');
const modalOverlay = document.getElementById('modal-overlay');
const modalConnecting = document.getElementById('modal-connecting');
const modalAlert = document.getElementById('modal-alert');
const alertMessage = document.getElementById('alert-message');

const feedContainer = document.getElementById('feed-container');
const liveContainer = document.getElementById('live-container');
const tabBtnFeed = document.getElementById('tab-btn-feed');
const tabBtnLive = document.getElementById('tab-btn-live');
const navFeed = document.getElementById('nav-feed');
const navLive = document.getElementById('nav-live');
const liveIconTab = document.getElementById('live-icon-tab');

// Tab Switching Mechanism
function switchTab(tab) {
    if (tab === 'feed') {
        feedContainer.classList.remove('hidden');
        liveContainer.classList.add('hidden');
        
        tabBtnFeed.className = "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-slate-800 text-white cursor-pointer shadow";
        tabBtnLive.className = "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200 cursor-pointer";
        
        navFeed.className = "text-pink-500 transition-colors cursor-pointer";
        navLive.className = "hover:text-slate-200 transition-colors cursor-pointer";
        liveIconTab.className = "w-2 h-2 rounded-full bg-slate-500";
    } else if (tab === 'live') {
        liveContainer.classList.remove('hidden');
        feedContainer.classList.add('hidden');
        
        tabBtnLive.className = "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 bg-slate-800 text-white cursor-pointer shadow";
        tabBtnFeed.className = "flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-slate-400 hover:text-slate-200 cursor-pointer";
        
        navLive.className = "text-pink-500 transition-colors cursor-pointer";
        navFeed.className = "hover:text-slate-200 transition-colors cursor-pointer";
        liveIconTab.className = "w-2 h-2 rounded-full bg-rose-500 animate-pulse";
    }
}

// Interactive Petra Wallet Trigger
function connectWallet() {
    if (isWalletConnected) {
        isWalletConnected = false;
        walletText.innerText = "Connect Petra Wallet";
        walletBtn.className = "flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 shadow-md shadow-slate-950/50 cursor-pointer";
        walletIcon.className = "w-4 h-4 text-slate-400";
        walletIcon.setAttribute('data-lucide', 'wallet');
        lucide.createIcons();
        return;
    }

    modalOverlay.classList.remove('hidden');
    modalOverlay.classList.add('opacity-100');
    modalConnecting.classList.remove('hidden');

    setTimeout(() => {
        modalConnecting.classList.add('hidden');
        modalOverlay.classList.remove('opacity-100');
        modalOverlay.classList.add('hidden');
        
        isWalletConnected = true;
        walletText.innerText = "0x7a81...4b2d";
        walletBtn.className = "flex items-center space-x-2 bg-slate-900/40 border border-emerald-500/30 px-4 py-2 rounded-xl text-sm font-mono font-bold text-emerald-400 transition-all duration-300 shadow-lg shadow-emerald-950/20 cursor-pointer";
        walletIcon.className = "w-4 h-4 text-emerald-400";
        walletIcon.setAttribute('data-lucide', 'check-circle-2');
        lucide.createIcons();
    }, 1800);
}

// Protected Action Guard & Live Stream Controller
function protectedAction(actionName) {
    if (!isWalletConnected) {
        alertMessage.innerText = `Please authenticate your Petra Wallet prior to activating the "${actionName}" dashboard.`;
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('opacity-100');
        modalAlert.classList.remove('hidden');
        return;
    }

    if (actionName === 'Go Live Now') {
        handleLiveStreamToggle();
    } else {
        alert(`🎉 Success! Workspace authorized for: "${actionName}".`);
    }
}

// Live Stream and Post-Stream Auto-Upload Simulation
function handleLiveStreamToggle() {
    const liveBtnText = document.querySelector("button[onclick*='Go Live Now'] span");

    if (!isLiveStreaming) {
        // Start Streaming
        isLiveStreaming = true;
        switchTab('live');
        liveBtnText.innerText = "Stop & Archive Stream";
        liveBtnText.parentElement.className = "w-full sm:w-auto flex items-center justify-center space-x-2 bg-rose-600 hover:bg-rose-700 px-6 py-3 rounded-xl font-semibold shadow-lg shadow-rose-600/35 transition-all duration-300 scale-100 hover:scale-102 cursor-pointer animate-pulse mx-auto";
    } else {
        // Stop Streaming and Start Automatic Uploading to Shelby Hot Storage
        isLiveStreaming = false;
        liveBtnText.innerText = "Go Live Now";
        liveBtnText.parentElement.className = "w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-6 py-3 rounded-xl font-semibold transition-all duration-300 scale-100 hover:scale-102 cursor-pointer mx-auto";
        
        // Show Dynamic Uploading Loader Screen
        modalOverlay.classList.remove('hidden');
        modalOverlay.classList.add('opacity-100');
        modalAlert.classList.remove('hidden');
        
        modalAlert.innerHTML = `
            <div class="relative w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <div class="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                <div class="absolute inset-0 border-4 border-t-pink-500 rounded-full animate-spin"></div>
                <i data-lucide="cloud-lightning" class="w-6 h-6 text-pink-500 absolute"></i>
            </div>
            <h3 class="text-lg font-bold text-slate-200 mb-2">Compiling Stream Blobs...</h3>
            <p class="text-sm text-slate-400">Uploading finalized live broadcast VOD to Shelby Network with AI-Scraping Cryptographic Proof protections.</p>
        `;
        lucide.createIcons();

        // Simulate 3 seconds upload latency to Shelby hot storage
        setTimeout(() => {
            modalAlert.innerHTML = `
                <div class="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <i data-lucide="check-circle" class="w-6 h-6"></i>
                </div>
                <h3 class="text-lg font-bold text-slate-200 mb-1">Stream Permanently Archived</h3>
                <p class="text-sm text-slate-400 mb-6">Your broadcast has been safely converted into an on-chain VOD on Shelby Network. Cryptographic proof generated successfully.</p>
                <button onclick="closeModalAndRefresh()" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer">View Workspace</button>
            `;
            lucide.createIcons();
        }, 3000);
    }
}

// Special Modal Close to render new dynamic video card
function closeModalAndRefresh() {
    closeModal();
    switchTab('feed');
    
    // Dynamically insert the newly archived live stream card into the Creative Feed gallery
    const feedGrid = document.getElementById('feed-container');
    const newArchivedCard = document.createElement('div');
    newArchivedCard.className = "bg-slate-900/40 border border-emerald-500/30 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 group shadow-lg shadow-emerald-950/5 animate-fade-in";
    newArchivedCard.innerHTML = `
        <div class="h-48 bg-slate-950 relative flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-teal-500/5 group-hover:scale-105 transition-transform duration-500"></div>
            <i data-lucide="clapperboard" class="w-10 h-10 text-emerald-800 group-hover:text-emerald-700 transition-colors"></i>
            <span class="absolute top-4 left-4 bg-slate-900/90 backdrop-blur border border-emerald-800 text-emerald-400 font-medium text-xs px-2.5 py-1 rounded-md flex items-center space-x-1.5 shadow">
                <i data-lucide="history" class="w-3.5 h-3.5"></i>
                <span>📜 Archived Broadcast VOD</span>
            </span>
        </div>
        <div class="p-5 border-t border-slate-900/60 bg-slate-900/20">
            <p class="text-[10px] font-mono text-emerald-500 font-bold tracking-wider">AI-PROTECTION ACTIVE</p>
            <h3 class="text-base font-bold text-slate-200 mt-1 mb-3">My Recent Live Stream (Saved from Shelby Hot Storage)</h3>
            <div class="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Owner: 0x7a81...4b2d</span>
            </div>
        </div>
    `;
    feedGrid.insertBefore(newArchivedCard, feedGrid.firstChild);
    lucide.createIcons();
}

// Close Active Modal Overlay
function closeModal() {
    modalAlert.classList.add('hidden');
    modalConnecting.classList.add('hidden');
    modalOverlay.classList.add('hidden');
    modalOverlay.classList.remove('opacity-100');
    
    // Reset alert modal structure back to default requirements
    setTimeout(() => {
        modalAlert.innerHTML = `
            <div class="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto mb-4">
                <i data-lucide="lock" class="w-6 h-6"></i>
            </div>
            <h3 class="text-lg font-bold text-slate-200 mb-1">Access Restrained</h3>
            <p id="alert-message" class="text-sm text-slate-400 mb-6">Please connect your Petra Wallet to access creator studio tools.</p>
            <button onclick="closeModal()" class="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer">Acknowledge</button>
        `;
        lucide.createIcons();
    }, 400);
}