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
    <div className="bg-secondary-background p-4 rounded-lg mb-6 flex flex-row gap-4 items-center justify-center">
      <p className="text-lg md:text-xl mb-2">This is a live demo of LLM Logger.</p>
      <Button onClick={handleRegisterClick}>Register for free</Button>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
    </div>
  );
}
