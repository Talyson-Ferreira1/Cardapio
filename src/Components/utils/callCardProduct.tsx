import { useRouter } from 'next/navigation';

export function Callproduct() {
  const router = useRouter();
  router.push('/resultado');
}
