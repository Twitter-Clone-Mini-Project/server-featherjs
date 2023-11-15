const { app } = require('../src/app');

(async () => {
  try {
    await app.setup();

    // Menambahkan dua pengguna secara bersamaan
    await Promise.all([
      app.service('users').create({
        username: 'tengkurizki',
        password: '12345',
      }),
      app.service('users').create({
        username: 'jamjam',
        password: '12345',
      }),
    ]);

    // Menambahkan dua pengguna secara bersamaan
    await Promise.all([
      app.service('tweets').create({
        content: 'Hanya karena seseorang terlihat baik, belum tentu mereka memang yang terbaik untukmu. Susu yang tumpah pun warnanya tetap putih dan bila Anda jelek, jangan takut mencintai. Karena yang seharusnya takut adalah yang Anda cintai.',
        user_id: 1,
      }),
      app.service('tweets').create({
        content: 'Motivator dan pembicara tak dapat membuatku rajin bekerja. Hanya cicilan dan tagihan yang mampu dan tidak ada kesuksesan instan dalam hidup ini. Bahkan untuk membuat mi instan sekalipun kita harus merebus air terlebih dahulu.',
        user_id: 2,
      }),
    ]);

     // Menambahkan dua pengguna secara bersamaan
     await Promise.all([
      app.service('comments').create({
        content: 'waaahhh, tweet anda keren sekali!!',
        tweet_id: 1,
        user_id: 2,
      }),
    ]);

    console.log("data is created");
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    // Lakukan operasi lain atau akhiri program
    process.exit(0);
  }
})();