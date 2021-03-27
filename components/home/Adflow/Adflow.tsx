import Window from '@components/commons/Window';

import { isMobile } from '@lib/is-mobile';

import { WindowProps } from '@components/commons/Window/Window';

const Carpas: React.FC<{ bringToFront: WindowProps['bringToFront'] }> = ({
  bringToFront,
}) => {
  // Determine initial x and y position, and frame size
  const x = isMobile() ? 0 : 75,
    y = isMobile() ? 700 : 500,
    windowWidth = isMobile() ? window.innerWidth - 24 : 525,
    windowHeight = isMobile() ? 304 : 254;

  return (
    <Window
      backgroundClass="bg-orchid-100"
      borderColor="#8f94ff"
      height={windowHeight}
      width={windowWidth}
      defaultPosition={{ x, y }}
      bringToFront={bringToFront}
    >
      <span className="flex w-full h-full p-1">
        {/* Adflow logo */}
        <div className="flex-shrink-0 p-2 mr-4">
          <svg
            className="w-10 h-10"
            width="23"
            height="25"
            viewBox="0 0 23 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22.584 17.112L20.616 20.664L13.416 16.44V24.792H9.48001V16.44L2.28001 20.664L0.312012 17.112L7.51201 12.84L0.312012 8.568L2.28001 5.16L9.48001 9.288V0.888H13.416V9.288L20.616 5.16L22.584 8.568L15.384 12.84L22.584 17.112Z"
              fill="#7C86F7"
            />
          </svg>
        </div>

        {/* Call-to-action */}
        <div className="flex flex-col flex-1 pl-1 space-y-3">
          <div className="flex items-center justify-center flex-shrink-0 sm:py-2 sm:h-14">
            <h3 className="text-base tracking-tight font-chicago text-orchid-darkest">
              Are you looking for ways to attract customers that actually work?
            </h3>
          </div>
          <p className="flex-1 text-gray-700">
            Adflow is the{' '}
            <b>
              <u>fastest</u> way
            </b>{' '}
            to create{' '}
            <b>
              <u>high-conversion</u> copy
            </b>{' '}
            and creatives for your ads through Artificial Intelligence.
          </p>
          <span className="flex items-center space-x-3">
            <p>Works with</p>
            <img
              src="/images/google-pixelated.svg"
              className="h-7 pointer-events-none mt-1.5"
              alt="Google"
            />
            <p>&</p>
            <img
              src="/images/facebook-pixelated.svg"
              className="pointer-events-none h-7"
              alt="Facebook"
            />
          </span>
          <span className="flex-shrink-0">
            <a
              className="float-right text-orchid-darkest font-chicago text-sm rounded-sm mt-4 hover:bg-opacity-100 bg-white border border-orchid-dark px-2.5 py-2 bg-opacity-50 "
              target="_blank"
              href="https://www.adflow.ai"
              data-splitbee-event="click-discover-adflow"
            >
              Discover Adflow →
            </a>
          </span>
        </div>
      </span>
    </Window>
  );
};

export default Carpas;
