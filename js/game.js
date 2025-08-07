// Event listeners
document.getElementById('click-area').addEventListener('click', function() {
    player.click();
});

document.getElementById('find-enemy').addEventListener('click', function() {
    combat.findEnemy();
});

document.getElementById('attack-btn').addEventListener('click', function() {
    combat.attack();
});

// Auto-save ke localStorage setiap 10 detik
setInterval(() => {
    const saveData = {
        level: player.level,
        stats: player.stats,
        coins: player.coins,
        equipment: player.equipment
    };
    localStorage.setItem('clickerRpgSave', JSON.stringify(saveData));
}, 10000);

// Load save saat game dimulai
function loadGame() {
    const saved = localStorage.getItem('clickerRpgSave');
    if (saved) {
        const data = JSON.parse(saved);
        player.level = data.level || 1;
        player.stats = data.stats || { str: 10, dex: 10, int: 10, vit: 10 };
        player.coins = data.coins || 0;
        player.equipment = data.equipment || { weapon: null, armor: null };
        
        // Update HP berdasarkan VIT
        player.maxHp = 100 + (player.stats.vit * 10);
        player.hp = player.maxHp;
        
        player.updateUI();
        player.addLog("Game dimuat dari save!");
    }
}

// Inisialisasi
loadGame();
