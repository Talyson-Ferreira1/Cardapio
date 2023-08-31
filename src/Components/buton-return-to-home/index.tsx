import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

import './style-button.css';
export default function ReturnToHome() {
  const route = useRouter();

  const handleClick = () => {
    route.push('/');
  };
  return (
    <Link href={'/'} scroll={true}>
      <button
        title="Ir para página principal"
        onClick={handleClick}
        className="button-style"
      >
        <Image
          src="/icons/home.svg"
          alt="Home Page"
          width="15"
          height="15"
          layout="intrinsic"
        />
      </button>
    </Link>
  );
}
