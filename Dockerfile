# Gunakan image Node.js versi terbaru sebagai dasar
FROM node:14

# Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json untuk menginstal dependensi
COPY package*.json ./

# Install dependensi proyek
RUN npm install

# Salin semua file dari direktori proyek Anda ke direktori kerja di dalam container
COPY . .

# Migrasi database dengan Knex
RUN npx knex migrate:rollback

# Migrasi database dengan Knex
RUN npx knex migrate:latest

# Port yang akan digunakan oleh aplikasi
EXPOSE 3030

# Perintah untuk menjalankan aplikasi Feather.js
CMD ["npm", "start"]