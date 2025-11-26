import { useEffect, useState } from 'react';

function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); // Prevent default mini-banner
      setDeferredPrompt(e); // Save the event
      setShowButton(true);  // Show your custom button
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show install prompt
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null);
        setShowButton(false);
      });
    }
  };

  return (
    showButton && (
      <button onClick={handleInstallClick}>
        📲 Install Restaurant Expense Tracker
      </button>
    )
  );
}

export default InstallPrompt;