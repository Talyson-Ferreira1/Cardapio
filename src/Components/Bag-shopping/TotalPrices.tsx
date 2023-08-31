'use client';
import { useState, useEffect } from 'react';
import { FormatCoin } from '../../functions/formatCoin';

interface PropsOfComponent {
  totalPrice: number;
  fineshedRequest: () => void;
}

export default function TotalPrices({
  totalPrice,
  fineshedRequest,
}: PropsOfComponent) {
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    setPrice(totalPrice);
  }, [totalPrice]);

  return (
    <section className="section-total-prices">
      <h3 className="text-total-prices">Valor total:</h3>
      <h3 className="value-total-price">{FormatCoin(price)}</h3>
      <button className="button-total-price" onClick={fineshedRequest}>
        Finalizar Pedido
      </button>
    </section>
  );
}
