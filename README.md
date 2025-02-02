
## 🌍 Demo Website
Proyek demo ini dapat diakses melalui https://herca-test.wahyunt.me/
## 🚀 Instalasi & Menjalankan Proyek
1️⃣ Clone Repository
```bash
git clone https://github.com/WahyuNT/herca-test-wahyu-nusantara.git

```
2️⃣ Instalasi Dependensi
```bash
npm install
```
3️⃣ Menjalankan Server 
```bash
npm run dev
```


## 🔑Environment Variables

Proyek ini menggunakan file .env yang berisi konfigurasi berikut :

.env secara default sudah ada dalam proyek.

`MONGODB_URI : mongodb+srv://herca:herca@cluster0.lhlezvs.mongodb.net/`

## 🔌API Reference 
Collection Postman sudah tersedia di root proyek.

Berikut adalah rinciannya.
#### Get all Marketing

```bash
  GET /api/marketing
```

#### Get item

```bash
  GET /api/penjualan
```

#### Get Komisi
```bash
  GET /api/komisi
```
#### POST Pembayaran Tunai
```bash
  POST /api/pembayaran
```
| Parameter | Type     |
| :-------- | :------- |
| `transaction_number`| `string` |
| `marketing_id`| `int` |
| `date`| `date` |
| `cargo_fee`| `int` |
| `total_balance`| `int` |
| `grand_total`| `int` |

#### POST Pembayaran Kredit
```bash
  POST /api/pembayaran
```
| Parameter | Type     |
| :-------- | :------- |
| `transaction_number`| `string` |
| `marketing_id`| `int` |
| `date`| `date` |
| `cargo_fee`| `int` |
| `grand_total`| `int` |
| `installment_count`| `int` |
| `monthly_installment`| `int` |