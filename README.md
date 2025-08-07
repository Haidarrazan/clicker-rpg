# Clicker RPG Battle

Game turn-based clicker RPG yang bisa dimainkan langsung di browser!

## Cara Bermain

1. **Klik Tombol Utama**: Klik tombol "KLIK DISINI!" untuk mengisi bar progres. Setiap kali bar terisi penuh, stat acak akan bertambah 1.

2. **Meningkatkan Stats**: Ada 4 stat utama:
   - STR (Strength): Meningkatkan damage serangan
   - DEX (Dexterity): Akan digunakan untuk fitur evasi di masa depan
   - INT (Intelligence): Akan digunakan untuk skill magic di masa depan
   - VIT (Vitality): Meningkatkan HP maksimal (10 HP per 1 VIT)

3. **Bertarung**: Klik "Cari Musuh" untuk menemukan musuh. Serang musuh untuk mendapatkan koin.

4. **Toko**: Gunakan koin untuk membeli:
   - Senjata: Meningkatkan STR
   - Armor: Meningkatkan VIT
   - Obat: Memulihkan HP

5. **Tier Musuh**:
   - Kroco: Level 1-4
   - Medium: Level 5-9
   - Hard: Level 10-19
   - Boss: Level 20+

## Cara Menjalankan

### Di GitHub Pages:
1. Fork repository ini
2. Buka Settings > Pages
3. Pilih source branch (main)
4. Game akan tersedia di `https://username.github.io/clicker-rpg/`

### Lokal:
1. Clone repository
2. Buka `index.html` di browser
3. Atau gunakan live server (VS Code extension)

## Save System
Game otomatis menyimpan progress setiap 10 detik ke localStorage browser.

## Teknologi
- HTML5
- CSS3
- Vanilla JavaScript
- No external dependencies

## Fitur yang Akan Datang
- Sistem skill
- Boss battle special
- Achievement system
- Pet system
- Dungeon exploration
