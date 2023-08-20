'use client';
import React from 'react';

const App = () => {
  const message = 'Olá! Estou interessado em seus produtos.';

  const openWhatsApp = () => {
    const phoneNumber = '5588993707881'; // Substitua pelo número de telefone desejado, incluindo o código do país
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    //wa.me/5588992829644
    window.open(url, '_blank');
  };

  return (
    <div>
      <button onClick={openWhatsApp}>Abrir WhatsApp</button>
    </div>
  );
};

export default App;
