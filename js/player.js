class Player {
    constructor() {
        this.level = 1;
        this.stats = {
            str: 10,
            dex: 10,
            int: 10,
            vit: 10
        };
        this.hp = 100;
        this.maxHp = 100;
        this.coins = 0;
        this.equipment = {
            weapon: null,
            armor: null
        };
        this.clickProgress = 0;
        this.maxClickProgress = 100;
    }

    getTotalStats() {
        const baseStats = { ...this.stats };
        
        // Tambahkan bonus dari equipment
        if (this.equipment.weapon) {
            baseStats.str += this.equipment.weapon.bonus;
        }
        if (this.equipment.armor) {
            baseStats.vit += this.equipment.armor.bonus;
        }
        
        return baseStats;
    }

    click() {
        this.clickProgress += 5;
        
        if (this.clickProgress >= this.maxClickProgress) {
            this.clickProgress = 0;
            this.levelUp();
        }
        
        this.updateUI();
    }

    levelUp() {
        const stats = ['str', 'dex', 'int', 'vit'];
        const randomStat = stats[Math.floor(Math.random() * stats.length)];
        this.stats[randomStat]++;
        
        // Update HP maksimal berdasarkan VIT
        this.maxHp = 100 + (this.stats.vit * 10);
        this.hp = this.maxHp;
        
        this.addLog(`Level up! ${randomStat.toUpperCase()} +1`);
    }

    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
        this.updateUI();
        return this.hp <= 0;
    }

    heal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
        this.updateUI();
    }

    addCoins(amount) {
        this.coins += amount;
        this.updateUI();
    }

    addLog(message) {
        const log = document.getElementById('battle-log');
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        log.insertBefore(entry, log.firstChild);
        
        // Batasi jumlah log
        if (log.children.length > 50) {
            log.removeChild(log.lastChild);
        }
    }

    updateUI() {
        document.getElementById('player-level').textContent = this.level;
        document.getElementById('player-str').textContent = this.getTotalStats().str;
        document.getElementById('player-dex').textContent = this.getTotalStats().dex;
        document.getElementById('player-int').textContent = this.getTotalStats().int;
        document.getElementById('player-vit').textContent = this.getTotalStats().vit;
        document.getElementById('player-hp').textContent = this.hp;
        document.getElementById('player-max-hp').textContent = this.maxHp;
        document.getElementById('player-coins').textContent = this.coins;
        document.getElementById('current-weapon').textContent = this.equipment.weapon ? this.equipment.weapon.name : 'Tidak Ada';
        document.getElementById('current-armor').textContent = this.equipment.armor ? this.equipment.armor.name : 'Tidak Ada';
        document.getElementById('click-progress').style.width = `${(this.clickProgress / this.maxClickProgress) * 100}%`;
    }
}

// Inisialisasi player
const player = new Player();
player.updateUI();
