import { useRouter } from 'next/navigation';

import './footer-style.css';

export default function Footer() {
  const route = useRouter();

  const handleClick = () => {
    route.push('/login');
  };
  return (
    <footer>
      <button className="login-button-footer" onClick={handleClick}>
        Login
      </button>
    </footer>
  );
}
