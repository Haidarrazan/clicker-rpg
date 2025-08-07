class Combat {
    constructor() {
        this.currentEnemy = null;
        this.inCombat = false;
    }

    findEnemy() {
        if (this.inCombat) return;

        // Tentukan tier berdasarkan level player
        let tier = 'kroco';
        if (player.level >= 20) tier = 'boss';
        else if (player.level >= 10) tier = 'hard';
        else if (player.level >= 5) tier = 'medium';

        this.currentEnemy = new Enemy(tier, player.getTotalStats());
        this.inCombat = true;
        
        document.getElementById('find-enemy').style.display = 'none';
        document.getElementById('attack-btn').style.display = 'inline-block';
        
        player.addLog(`Menemukan ${this.currentEnemy.name}!`);
    }

    attack() {
        if (!this.inCombat || !this.currentEnemy) return;

        // Hitungan damage player
        const playerDamage = Math.max(1, player.getTotalStats().str + 
            (player.equipment.weapon ? player.equipment.weapon.bonus : 0) + 
            Math.floor(Math.random() * 10));

        // Serangan player
        const enemyDead = this.currentEnemy.takeDamage(playerDamage);
        player.addLog(`Kamu menyerang ${this.currentEnemy.name} dengan ${playerDamage} damage!`);

        if (enemyDead) {
            this.victory();
            return;
        }

        // Serangan balik musuh
        const enemyDamage = Math.max(1, this.currentEnemy.stats.str + 
            Math.floor(Math.random() * 10) - 
            (player.equipment.armor ? player.equipment.armor.bonus : 0) / 2);

        const playerDead = player.takeDamage(enemyDamage);
        player.addLog(`${this.currentEnemy.name} menyerangmu dengan ${enemyDamage} damage!`);

        if (playerDead) {
            this.defeat();
        }
    }

    victory() {
        const coins = this.currentEnemy.coinDrop;
        player.addCoins(coins);
        player.addLog(`Kamu mengalahkan ${this.currentEnemy.name} dan mendapatkan ${coins} koin!`);
        this.endCombat();
    }

    defeat() {
        player.addLog(`Kamu dikalahkan oleh ${this.currentEnemy.name}...`);
        player.heal(Math.floor(player.maxHp * 0.5)); // Pulihkan 50% HP
        this.endCombat();
    }

    endCombat() {
        this.inCombat = false;
        this.currentEnemy = null;
        document.getElementById('find-enemy').style.display = 'inline-block';
        document.getElementById('attack-btn').style.display = 'none';
        document.getElementById('enemy-info').style.display = 'none';
    }
}

const combat = new Combat();
