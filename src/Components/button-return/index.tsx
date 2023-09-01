import Image from 'next/image';
import { useRouter } from 'next/navigation';

import './style-return-button.css';

export default function ReturnToLastPage() {
  const route = useRouter();

  const handleClick = () => {
    route.back();
  };

  return (
    <button className="return-button" onClick={handleClick}>
      <Image
        src="/icons/arrow-left.svg"
        alt="return"
        layout="intrinsic"
        width="15"
        height="15"
      />
      <span>Voltar</span>
    </button>
  );
}
