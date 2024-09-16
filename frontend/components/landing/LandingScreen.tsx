import { secondaryAccent } from '@frontend/utils/colors';
import { User } from '@type/user';
import { useRef, useState } from 'react';
import { FaArrowRight, FaChartBar, FaDatabase, FaExclamationTriangle, FaEye } from 'react-icons/fa';
import { AuthModal } from '../auth/AuthModal';
import { Button } from '../common/Button';
import { Footer } from './views/Footer';

interface Props {
  user: User | null;
}

export function LandingScreen({ user }: Props) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const pricingSectionRef = useRef<HTMLDivElement>(null);

  const handleTryForFreeClick = () => {
    if (user) {
      window.location.href = '/logs';
    } else {
      setIsAuthModalOpen(true);
    }
  };

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const handleGoToApp = () => {
    window.location.href = '/logs';
  };

  const scrollToPricing = () => {
    pricingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 text-center relative bg-gradient-to-r from-secondary-background via-primary-background to-secondary-background">
      <nav className="w-full max-w-[1000px] flex justify-end items-center mb-10 gap-8">
        <div className="flex gap-1 mr-auto items-center">
          <img src={'/logo.png'} className="w-16 h-16" />
          <h2 className="text-4xl">LLM Logger</h2>
        </div>
        <a
          href="https://github.com/gnardini"
          target="_blank"
          className="text-lg text-text-primary hover:underline"
        >
          GitHub
        </a>
        <button onClick={scrollToPricing} className="text-lg hover:underline">
          Pricing
        </button>
        {user && (
          <Button className="px-3 py-2" onClick={handleGoToApp}>
            <div className="flex items-center">
              Go to app <FaArrowRight className="ml-2" />
            </div>
          </Button>
        )}
      </nav>
      <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
      <h1 className="text-6xl font-bold mt-20 bg-clip-text text-transparent bg-gradient-to-r from-secondary-accent to-purple-500">
        Keep track of your <span className="underline">AI API calls</span>
        <div className="w-[324px] ml-auto h-1 bg-primary-accent" />
      </h1>
      <div className="w-[800px] flex flex-col">
        <p className="text-2xl text-left mt-10 leading-9">
          Building an AI product is hard. AIs are unreliable, don't always follow output format, and
          can behave in surprising and unexpected ways, especially with free-form user input.
        </p>
        <p className="text-2xl text-left mt-10 leading-9">
          We help you keep track of how your product is working in the wild and help you improve it.
        </p>
        <ul className="flex flex-col items-start text-xl mt-10 mb-8 space-y-2">
          <li className="flex flex-row items-center">
            <FaDatabase size={24} color={secondaryAccent} className="mr-3" /> Log your{' '}
            <span className="underline-secondary mx-1">AI API calls</span> to any provider such as
            OpenAI, Anthropic, Gemini, and others.
          </li>
          <li className="flex flex-row items-center">
            <FaEye size={24} color={secondaryAccent} className="mr-3" /> View the{' '}
            <span className="underline-secondary mx-1">input</span> and{' '}
            <span className="underline-secondary mx-1">output</span> of each call.
          </li>
          <li className="flex flex-row items-center">
            <FaChartBar size={24} color={secondaryAccent} className="mr-3" />{' '}
            <span className="underline-secondary mx-1">Analyze</span> how your users are using your
            product.
          </li>
          <li className="flex flex-row items-center">
            <FaExclamationTriangle size={24} color={secondaryAccent} className="mr-3" />
            Identify prompting issues to increase your AI integration's{' '}
            <span className="underline-secondary mx-1">quality</span>.
          </li>
        </ul>
        <Button
          className="mt-6 text-4xl w-fit px-10 py-3 mx-auto transition ease-in-out duration-300 transform hover:scale-105"
          onClick={handleTryForFreeClick}
        >
          {'Try for free'}
        </Button>
        {!user && <p className="mt-1 text-text-secondary mx-auto">No credit card required</p>}
      </div>

      {/* Pricing Section */}
      <div ref={pricingSectionRef} className="w-full max-w-[1000px] mt-32 mb-10">
        <h2 className="text-4xl font-bold mb-8">Pricing</h2>

        <Button
          className="mt-10 text-2xl w-fit px-8 py-3 mx-auto transition ease-in-out duration-300 transform hover:scale-105"
          onClick={handleTryForFreeClick}
        >
          Start your free trial
        </Button>
      </div>
      <Footer />
    </div>
  );
}
