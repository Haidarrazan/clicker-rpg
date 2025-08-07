class Shop {
    constructor() {
        this.items = {
            weapon: [
                { name: 'Pedang Kayu', bonus: 5, price: 50 },
                { name: 'Pedang Besi', bonus: 10, price: 150 },
                { name: 'Pedang Api', bonus: 20, price: 300 },
                { name: 'Pedang Legendaris', bonus: 50, price: 1000 }
            ],
            armor: [
                { name: 'Baju Kulit', bonus: 5, price: 40 },
                { name: 'Baju Baja', bonus: 15, price: 200 },
                { name: 'Armor Mithril', bonus: 30, price: 500 },
                { name: 'Armor Dewa', bonus: 60, price: 1500 }
            ],
            potion: [
                { name: 'Obat Kecil', heal: 30, price: 20 },
                { name: 'Obat Sedang', heal: 75, price: 50 },
                { name: 'Obat Besar', heal: 150, price: 100 },
                { name: 'Obat Dewa', heal: 500, price: 300 }
            ]
        };
    }

    buyItem(type, name, value, price) {
        if (player.coins < price) {
            player.addLog("Koin tidak cukup!");
            return;
        }

        if (type === 'potion') {
            player.heal(value);
            player.addCoins(-price);
            player.addLog(`Membeli ${name}, HP dipulihkan ${value} poin`);
        } else {
            player.equipment[type] = { name, bonus: value };
            player.addCoins(-price);
            player.addLog(`Membeli ${name}!`);
            player.updateUI();
        }
    }
}

const shop = new Shop();