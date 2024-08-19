"use client"
import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white px-3 py-1 z-50 flex justify-between items-center text-xs">
      <div className="flex-1">
        <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant à utiliser notre site, vous acceptez notre utilisation des cookies.</p>
      </div>
      <button
        onClick={handleAccept}
        className="bg-teal-500 text-white font-semibold py-1 px-2 rounded ml-3 hover:bg-teal-600 text-xs"
      >
        Accepter
      </button>
    </div>
  );
}
