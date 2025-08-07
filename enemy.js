class Enemy {
    constructor(tier, playerStats) {
        this.tier = tier;
        this.name = this.generateName(tier);
        
        // Sesuaikan stat musuh berdasarkan level player
        const baseMultiplier = this.getTierMultiplier(tier);
        const playerTotalStats = Object.values(playerStats).reduce((a, b) => a + b, 0);
        
        this.stats = {
            str: Math.floor((playerStats.str || 10) * baseMultiplier * (0.8 + Math.random() * 0.4)),
            dex: Math.floor((playerStats.dex || 10) * baseMultiplier * (0.8 + Math.random() * 0.4)),
            int: Math.floor((playerStats.int || 10) * baseMultiplier * (0.8 + Math.random() * 0.4)),
            vit: Math.floor((playerStats.vit || 10) * baseMultiplier * (0.8 + Math.random() * 0.4))
        };
        
        this.maxHp = 50 + (this.stats.vit * 15);
        this.hp = this.maxHp;
        
        // Coin drop berdasarkan tier
        this.coinDrop = this.calculateCoinDrop(tier);
    }

    generateName(tier) {
        const names = {
            kroco: ['Goblin Lemah', 'Slime Hijau', 'Serigala Liar', 'Kecoa Raksasa'],
            medium: ['Orc Pemarah', 'Golem Tanah', 'Naga Muda', 'Vampire'],
            hard: ['Golem Besi', 'Naga Dewasa', 'Demon Lord', 'Lich'],
            boss: ['Dragon Lord', 'Demon King', 'Ancient God', 'World Ender']
        };
        
        const tierNames = names[tier] || names.kroco;
        return tierNames[Math.floor(Math.random() * tierNames.length)];
    }

    getTierMultiplier(tier) {
        const multipliers = {
            kroco: 0.5,
            medium: 0.8,
            hard: 1.2,
            boss: 1.8
        };
        return multipliers[tier] || 0.5;
    }

    calculateCoinDrop(tier) {
        const ranges = {
            kroco: [5, 15],
            medium: [15, 30],
            hard: [30, 60],
            boss: [100, 200]
        };
        
        const range = ranges[tier] || ranges.kroco;
        return Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    }

    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
        this.updateUI();
        return this.hp <= 0;
    }

    updateUI() {
        document.getElementById('enemy-name').textContent = this.name;
        document.getElementById('enemy-hp').textContent = this.hp;
        document.getElementById('enemy-max-hp').textContent = this.maxHp;
        document.getElementById('enemy-str').textContent = this.stats.str;
        
        const healthPercent = (this.hp / this.maxHp) * 100;
        document.getElementById('enemy-health-fill').style.width = `${healthPercent}%`;
        
        document.getElementById('enemy-info').style.display = 'block';
    }
}