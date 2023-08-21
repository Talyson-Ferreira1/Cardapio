/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'firebasestorage.googleapis.com', // Adicione o domínio da imagem aqui
    ],
  },
};
//firebasestorage.googleapis.com/v0/b/cardapio-digital-40a58.appspot.com/o/Meals%2F6181147152761892015%2Fimagem.jpg?alt=media&token=92991515-cabf-4f02-8009-7b79dbe97604)

module.exports = nextConfig;
