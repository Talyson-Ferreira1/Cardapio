import Image from 'next/image';

interface funcProps {
  funcReturn: () => void;
}
export default function ReturnPage({ funcReturn }: funcProps) {
  return (
    <button className="return-button" onClick={funcReturn}>
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
