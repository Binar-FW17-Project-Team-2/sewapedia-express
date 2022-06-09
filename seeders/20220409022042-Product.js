'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'products',
      [
        {
          id: 1000,
          name: 'Boneka Gurita Octopus Doll Bisa Bolak Balik Cumi Ekspresi Rainbow Pelangi1',
          category: 'boneka',
          details: `Boneka gurita octopus boneka ubur-ubur bisa bolak balik expresi
        Banyak pilihan warna
        Estimasi ukuran:
        Size S = Diameter kurang lebih 20cmx Tinggi10cm
        Size M = Diameter kurang lebih 30cmx Tinggi 15cm
        Size L = Diameter kurang lebih 40cmx Tinggi 19cm
        (diameter lingkaran kaki)
        Bahan velboa lembut
        isi dakron sangat empuk dan padat agar tidak mudah kempes dan tahan lama
        bila ingin ukur boneka menggunakan meteran baju bukan penggaris yah ka`,
          img_url: [
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652200440479%2B1.1.jpg?alt=media&token=e5ec9d19-fb8c-4908-b818-8f002e684d76',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652200445267%2B1.2.jpg?alt=media&token=0824d2b7-577a-4fbb-99f2-981af8a0bcd9',
          ],
          price: 2000,
          stock: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1001,
          name: 'Robot Burung Hantu Ditekan Bisa Jalan Tanpa Baterai 80',
          category: 'boneka',
          details: `Boneka gurita octopus boneka ubur-ubur bisa bolak balik expresi
        Banyak pilihan warna
        Estimasi ukuran:
        Size S = Diameter kurang lebih 20cmx Tinggi10cm
        Size M = Diameter kurang lebih 30cmx Tinggi 15cm
        Size L = Diameter kurang lebih 40cmx Tinggi 19cm
        (diameter lingkaran kaki)
        Bahan velboa lembut
        isi dakron sangat empuk dan padat agar tidak mudah kempes dan tahan lama
        bila ingin ukur boneka menggunakan meteran baju bukan penggaris yah ka`,
          img_url: [
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652200698499%2B2.1.jpg?alt=media&token=dc59fe05-0f64-4771-aed7-a97ac2b5b1e9',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652200707539%2B2.3.jpg?alt=media&token=d3494769-6cb1-46f6-a3c9-36ff13786c3e',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652200711419%2B2.2.jpg?alt=media&token=fa2d6efa-0f84-466a-a666-e20de4fa6b33',
          ],
          price: 1500,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1002,
          name: 'Mainan Mandi Anak Bayi Bentuk DOLPHIN Berenang Di Kolam Renang / Bak Mandi Mainan Air',
          category: 'boneka',
          details: `Boneka gurita octopus boneka ubur-ubur bisa bolak balik expresi
        Banyak pilihan warna
        Estimasi ukuran:
        Size S = Diameter kurang lebih 20cmx Tinggi10cm
        Size M = Diameter kurang lebih 30cmx Tinggi 15cm
        Size L = Diameter kurang lebih 40cmx Tinggi 19cm
        (diameter lingkaran kaki)
        Bahan velboa lembut
        isi dakron sangat empuk dan padat agar tidak mudah kempes dan tahan lama
        bila ingin ukur boneka menggunakan meteran baju bukan penggaris yah ka`,
          img_url: [
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652200965958%2B3.1.jpg?alt=media&token=b45997d2-b064-49dd-86ec-7acd0bb5b629',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652200969863%2B3.2.jpg?alt=media&token=b243d8e0-c1e2-480e-8f6c-48c9ba5ac4c8',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652200974039%2B3.3.jpg?alt=media&token=0f1682fd-ae01-4c18-bc86-93681c5b6d56',
          ],
          price: 1000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1003,
          name: 'MAINAN MOBIL MOTOR BEBEK MAINAN BAYI MOBIL DORONG',
          category: 'kendaraan',
          details: `Boneka gurita octopus boneka ubur-ubur bisa bolak balik expresi
        Banyak pilihan warna
        Estimasi ukuran:
        Size S = Diameter kurang lebih 20cmx Tinggi10cm
        Size M = Diameter kurang lebih 30cmx Tinggi 15cm
        Size L = Diameter kurang lebih 40cmx Tinggi 19cm
        (diameter lingkaran kaki)
        Bahan velboa lembut
        isi dakron sangat empuk dan padat agar tidak mudah kempes dan tahan lama
        bila ingin ukur boneka menggunakan meteran baju bukan penggaris yah ka`,
          img_url: [
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652201125516%2B4.1.jpg?alt=media&token=29874e69-c835-46c0-813f-ec3fcd3f4c34',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652201129687%2B4.2.jpg?alt=media&token=e0dc443d-c93d-40df-9460-530e8de61e7b',
          ],
          price: 4000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1004,
          name: 'Mainan bayi kartun tumbler hewan anak',
          category: 'boneka',
          details: `Boneka gurita octopus boneka ubur-ubur bisa bolak balik expresi
        Banyak pilihan warna
        Estimasi ukuran:
        Size S = Diameter kurang lebih 20cmx Tinggi10cm
        Size M = Diameter kurang lebih 30cmx Tinggi 15cm
        Size L = Diameter kurang lebih 40cmx Tinggi 19cm
        (diameter lingkaran kaki)
        Bahan velboa lembut
        isi dakron sangat empuk dan padat agar tidak mudah kempes dan tahan lama
        bila ingin ukur boneka menggunakan meteran baju bukan penggaris yah ka`,
          img_url: [
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652201316538%2B5.1.jpg?alt=media&token=a22ad903-3642-458f-be35-502b31b712d3',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652201320411%2B5.2.jpg?alt=media&token=24567c3e-ed01-4229-a74a-6c95070f75f3',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652201324474%2B5.3.jpg?alt=media&token=ecdce6cd-3e67-40c9-a802-05b23b5a8f1e',
          ],
          price: 2000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1005,
          name: 'Mainan Tangan Bayi Bunyi Baby Hand Rattle Toy Stick',
          category: 'boneka',
          details: `Boneka gurita octopus boneka ubur-ubur bisa bolak balik expresi
        Banyak pilihan warna
        Estimasi ukuran:
        Size S = Diameter kurang lebih 20cmx Tinggi10cm
        Size M = Diameter kurang lebih 30cmx Tinggi 15cm
        Size L = Diameter kurang lebih 40cmx Tinggi 19cm
        (diameter lingkaran kaki)
        Bahan velboa lembut
        isi dakron sangat empuk dan padat agar tidak mudah kempes dan tahan lama
        bila ingin ukur boneka menggunakan meteran baju bukan penggaris yah ka`,
          img_url: [
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652201509911%2B6.1.jpg?alt=media&token=7c0ff817-1ac0-4d4e-96c9-3482d08887cf',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652201518177%2B6.2.jpg?alt=media&token=dedcdf59-d603-4688-81b8-04509fde59d5',
          ],
          price: 2000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1006,
          name: 'MAINAN MINI JUMPING PIRATE / MAINAN TONG BAJAK LAUT RUNNING MAN MAINAN PRANK MENYENANGKAN',
          category: 'brick',
          details: `Boneka gurita octopus boneka ubur-ubur bisa bolak balik expresi
        Banyak pilihan warna
        Estimasi ukuran:
        Size S = Diameter kurang lebih 20cmx Tinggi10cm
        Size M = Diameter kurang lebih 30cmx Tinggi 15cm
        Size L = Diameter kurang lebih 40cmx Tinggi 19cm
        (diameter lingkaran kaki)
        Bahan velboa lembut
        isi dakron sangat empuk dan padat agar tidak mudah kempes dan tahan lama
        bila ingin ukur boneka menggunakan meteran baju bukan penggaris yah ka`,
          img_url: [
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652201889899%2B7.1.jpg?alt=media&token=ca453079-c5ae-4eec-a227-6234c1c0ecb9',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652201893829%2B7.2.jpg?alt=media&token=b5bc62f4-e414-4eca-aeb7-1bee029f4af4',
          ],
          price: 5000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1007,
          name: 'HAPPY KIDS MAINAN ICE BREAKING GAMES MAINAN ANAK ICE BREAKING LZ6 PINGUIN TRAP',
          category: 'brick',
          details: `Boneka gurita octopus boneka ubur-ubur bisa bolak balik expresi
        Banyak pilihan warna
        Estimasi ukuran:
        Size S = Diameter kurang lebih 20cmx Tinggi10cm
        Size M = Diameter kurang lebih 30cmx Tinggi 15cm
        Size L = Diameter kurang lebih 40cmx Tinggi 19cm
        (diameter lingkaran kaki)
        Bahan velboa lembut
        isi dakron sangat empuk dan padat agar tidak mudah kempes dan tahan lama
        bila ingin ukur boneka menggunakan meteran baju bukan penggaris yah ka`,
          img_url: [
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652202078165%2B8.1.jpg?alt=media&token=b31aaa17-06a2-48d2-9c1f-c72f20948699',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652202082003%2B8.2.jpg?alt=media&token=c5ab7f45-8d16-48d9-8538-d07c94ee50fc',
          ],
          price: 5000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 1008,
          name: 'Uno Stacko | Mainan Balok Susun | Mainan Jenga | Mainan Keluarga | Mainan Uno',
          category: 'brick',
          details: `Boneka gurita octopus boneka ubur-ubur bisa bolak balik expresi
        Banyak pilihan warna
        Estimasi ukuran:
        Size S = Diameter kurang lebih 20cmx Tinggi10cm
        Size M = Diameter kurang lebih 30cmx Tinggi 15cm
        Size L = Diameter kurang lebih 40cmx Tinggi 19cm
        (diameter lingkaran kaki)
        Bahan velboa lembut
        isi dakron sangat empuk dan padat agar tidak mudah kempes dan tahan lama
        bila ingin ukur boneka menggunakan meteran baju bukan penggaris yah ka`,
          img_url: [
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652202215518%2B9.1.jpg?alt=media&token=8276aa6f-da5b-43a0-864b-a773f9e3f719',
            'https://firebasestorage.googleapis.com/v0/b/pipin-latihan-firebase.appspot.com/o/images%2F1652202218895%2B9.2.jpg?alt=media&token=23a7d1cb-0131-4dec-992c-b69b2e29cceb',
          ],
          price: 5000,
          stock: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {})
  },
}
