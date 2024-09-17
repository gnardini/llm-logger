import { User } from '@type/user';
import { FaArrowRight } from 'react-icons/fa';
import { Button } from '../../common/Button';

interface Props {
  user: User | null;
  onScrollToPricing: () => void;
  onGoToApp: () => void;
}

export function Header({ user, onScrollToPricing, onGoToApp }: Props) {
  return (
    <nav className="w-full max-w-[1000px] flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
      <div className="flex gap-1 items-center">
        <img src={'/logo.png'} className="w-16 h-16" />
        <h2 className="ml-1 text-2xl md:ml-2 md:text-4xl">LLM Logger</h2>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
        <a
          href="/logs?org_id=01910013-7d31-7f3b-bfd9-41403c900d71"
          className="md:text-lg text-text-primary hover:underline"
        >
          Live Demo
        </a>
        <a
          href="https://github.com/gnardini"
          target="_blank"
          className="md:text-lg text-text-primary hover:underline"
        >
          GitHub
        </a>
        <button onClick={onScrollToPricing} className="md:text-lg hover:underline">
          Pricing
        </button>
        {user && (
          <Button className="px-3 py-2" onClick={onGoToApp}>
            <div className="flex items-center">
              Go to app <FaArrowRight className="ml-2" />
            </div>
          </Button>
        )}
      </div>
    </nav>
  );
}