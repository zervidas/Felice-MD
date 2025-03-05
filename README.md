# WhatsApp Bot Base - Recode Version

Ini adalah repositori yang berisi kode dari **[Felice-MD](https://github.com/NCTea/Felice-MD)**, yang telah saya **recode** dengan beberapa perubahan, penambahan, dan penghapusan fitur. Jika ada pertanyaan, silakan hubungi saya di [WhatsApp](https://wa.me/6285930450495).

---

## Perubahan yang Saya Lakukan

### ✅ **Penambahan:**
- File *handler.js* dan folder *plugins* untuk plugin.
- Import Handler dan penggunaan handler di default case (*case.js*).
- *await* untuk eval jenis async (*case.js*).
- Modul **esbuild** untuk mendukung TypeScript.
- Fungsi `m.react()`, `m.quoted.react()`, dan `m.quoted.reply()`.
- Variabel `m.sentFrom` & `m.quoted.sentFrom`.

### ✏️ **Perubahan:**
- Mengganti nama file *command.js* menjadi *case.js*.
- Mengganti `require('./command.js')` menjadi `require('./case.js')` di *main.js*.
- Mengganti `.format` menjadi `.inspect` di code eval (*case.js*).
- Mengganti `budy` menjadi `body` dan angka `slice` di fitur eval (*case.js*).
- Mengganti regex `/ +/` menjadi `/\s+/` di pembuatan args (*case.js*).
- Memperbaiki masalah hilangnya `\n` karena `join(' ')` di text (*case.js*).
- `isBaileys` akan `true` jika ID pesan terdeteksi dari 'web' atau 'unknown'.
- Mengubah `.caption` jadi optional chain `?.option` (*library.js*).

### ❌ **Penghapusan:**
- Detektor Baileys di event `'message.upsert'` (*main.js*) karena sudah usang.

---

## Catatan
- Saya hanya melakukan sedikit perubahan dari kode aslinya.
- Kredit tetap diberikan kepada pembuat asli dari base bot ini.

Jika ada pertanyaan atau ingin berkontribusi, silakan buat **issue** atau **pull request**.  
Terima kasih!

---

# FELICE-MD

Base Bot WhatsApp (Case)

---

## Run Locally

Clone the project:

```bash
git clone https://github.com/NCTea/Felice-MD
```

Atau:

```bash
git clone https://github.com/zervidas/Felice-MD
```

Masuk ke direktori proyek:

```bash
cd Felice-MD
```

Install dependencies:

```bash
npm install
```

Install dependencies **recommended**:

```bash
npm install --force
```

Jalankan server:

```bash
npm start
```

---

## Fitur

- Menu

---

## Terima Kasih Kepada

Proyek ini digunakan oleh:

- Tuhan Yang Maha Esa
- Orang Tua Saya
- Tim XYZ
- Saya Sendiri

---

## Penulis

- [@NCTea](https://github.com/NCTea)