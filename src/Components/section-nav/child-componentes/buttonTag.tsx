'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface componentProps {
  ilustration: string;
  name: string;
  pathName: string;
}

export default function ButtonTag({
  ilustration,
  name,
  pathName,
}: componentProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const route = useRouter();
  const handleClick = () => {
    setIsLoading(true);
    route.push(pathName);
  };

  return (
    <button onClick={handleClick} className="tag-button">
      {!isLoading ? (
        <>
          <Image
            src={ilustration}
            alt="ilustration"
            width="20"
            height="20"
            priority
          />
          {name}
        </>
      ) : (
        <div className="loader">
          <Image
            src="/ilustracoes/loader.png"
            alt="ilustration"
            width="20"
            height="20"
            priority
          />
        </div>
      )}
    </button>
  );
}
