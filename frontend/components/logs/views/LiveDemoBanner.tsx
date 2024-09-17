import { useState } from 'react';
import { Button } from '@frontend/components/common/Button';
import { AuthModal } from '@frontend/components/auth/AuthModal';

export function LiveDemoBanner() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setIsAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 bg-secondary-background p-4 flex flex-row gap-4 items-center justify-center z-50">
      <p className="text-lg md:text-xl">This is a live demo of LLM Logger.</p>
      <Button onClick={handleRegisterClick}>Register for free</Button>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </div>
  );
}
