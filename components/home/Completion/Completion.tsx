import Window from '@components/commons/Window';

import cn from 'classnames';
import { isMobile } from '@lib/is-mobile';
import { Transition } from '@headlessui/react';

import { WindowProps } from '@components/commons/Window/Window';

interface CompletionProps {
  index: number;
  completion: string;
  bringToFront: WindowProps['bringToFront'];
}

const WIDTH = 360,
  HEIGHT = 160;
const Completion: React.FC<CompletionProps> = ({
  index,
  completion,
  bringToFront,
}) => {
  const x = isMobile()
      ? index * 50
      : window.innerWidth / 2 - WIDTH / 2 + index * 50,
    y = isMobile()
      ? index * 50
      : window.innerHeight / 2 - HEIGHT / 2 + index * 50,
    windowWidth = isMobile() ? window.innerWidth - 24 : WIDTH,
    windowHeight = isMobile() ? 180 : HEIGHT;

  // Custom animation wrapper
  const CustomWrapper: React.FC = ({ children }) => (
    <Transition
      show={true}
      appear={true}
      enter={cn('transition-all transform duration-300', {
        'delay-300': index === 1,
        'delay-600': index === 2,
      })}
      enterFrom="scale-95 opacity-0"
      enterTo="opacity-100"
    >
      {children}
    </Transition>
  );

  return (
    <Window
      bringToFront={bringToFront}
      withHandle
      windowTitle={`Product idea ${index + 1} 💡`}
      width={windowWidth}
      height={windowHeight}
      defaultPosition={{
        x,
        y,
      }}
      Wrapper={CustomWrapper}
    >
      <p>{completion}</p>
      <span className="absolute text-xs bottom-1.5 right-1.5 opacity-40">
        Generated using AI
      </span>
    </Window>
  );
};

export default Completion;
