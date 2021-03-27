import { useRef, useState } from 'react';
import Window from '@components/commons/Window';

import { Transition } from '@headlessui/react';

import { isMobile } from '@lib/is-mobile';

import { WindowProps } from '@components/commons/Window/Window';

const Carpas: React.FC<{ bringToFront: WindowProps['bringToFront'] }> = ({
  bringToFront,
}) => {
  const counter = useRef<number>(0);
  const [showJoker, setShowJoker] = useState<boolean>(false);

  const increaseCounter = () => {
    counter.current = counter.current + 1;
    if (counter.current > 7) setShowJoker(true);
  };

  // Determine initial x and y position of the frame
  const x = isMobile() ? Math.max(12, window.innerWidth - 220 - 24) : 200,
    y = isMobile() ? 0 : 100;

  return (
    <Window
      backgroundClass="bg-rose-light"
      borderColor="#C9B6B1"
      height={220}
      width={220}
      defaultPosition={{ x, y }}
      bringToFront={bringToFront}
    >
      {/* Joker */}
      <div className="absolute w-full h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Transition
          show={showJoker}
          enter="transition-all transform delay-200 duration-200"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          as="span"
          className="flex items-center justify-center w-full h-full duration-300"
        >
          <img
            height={120}
            width={120}
            className="object-contain pointer-events-none"
            alt="Joker"
            src="/images/joker.png"
          />
        </Transition>
      </div>

      {/* Carpas */}
      <div className="absolute w-full h-full transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <Transition
          show={!showJoker}
          leave="transition-all transform duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-50"
          as="span"
          onClick={increaseCounter}
          className="flex items-center justify-center w-full h-full duration-300 transform scale-1 active:scale-95"
        >
          <img
            height={160}
            width={160}
            className="object-contain pointer-events-none"
            alt="Carpas"
            src="/images/carpas.png"
          />
        </Transition>
      </div>
    </Window>
  );
};

export default Carpas;
