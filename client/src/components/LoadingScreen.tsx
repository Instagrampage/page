
import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <img src="/images/instagram.png" alt="Instagram" className="h-16 w-auto" />
    </div>
  );
}
