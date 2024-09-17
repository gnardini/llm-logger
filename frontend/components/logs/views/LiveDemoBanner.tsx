import { Button } from '@frontend/components/common/Button';

interface LiveDemoBannerProps {
  onRegisterClick: () => void;
}

export function LiveDemoBanner({ onRegisterClick }: LiveDemoBannerProps) {
  return (
    <div className="bg-secondary-background p-4 rounded-lg mb-6">
      <p className="text-lg mb-2">This is a live demo of LLM Logger.</p>
      <Button onClick={onRegisterClick}>Register for free</Button>
    </div>
  );
}