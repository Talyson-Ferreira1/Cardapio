'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import './style-page.css';

/**
 * Salvar os dados no SessionStorage para evitar fetch denecessário.
 * Criar um card reutilizável
 */

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/produto');
  });
  return <main className="main"></main>;
}
