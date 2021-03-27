import React, {
  useLayoutEffect,
  MutableRefObject,
  useCallback,
  useRef,
} from 'react';

import Draggable, { DraggableProps } from 'react-draggable';
import cn from 'classnames';
import { isMobile } from '@lib/is-mobile';

export interface WindowProps extends Partial<DraggableProps> {
  width?: number;
  height?: number;
  backgroundClass?: string;
  borderColor?: string;
  withHandle?: boolean;
  windowTitle?: string;
  titleColor?: string;
  Wrapper?: React.FC;
  bringToFront: (targetRef: MutableRefObject<HTMLDivElement>) => void;
}

const Window: React.FC<WindowProps> = ({
  width = 280,
  height = 400,
  backgroundClass = 'bg-lightBlue-light',
  borderColor = '#82B1BF',
  withHandle,
  windowTitle,
  titleColor = '#2C4D57',
  Wrapper,
  bringToFront,
  children,
  ...windowConfig
}) => {
  const nodeRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement>;

  const ConditionalWrapper: React.FC = useCallback(
    ({ children }) => <>{Wrapper ? <Wrapper>{children}</Wrapper> : children}</>,
    []
  );

  const onStart = () => {
    if (nodeRef && typeof nodeRef.current !== null) bringToFront(nodeRef);
  };

  useLayoutEffect(() => {
    nodeRef && bringToFront(nodeRef);
  }, []);

  return (
    <Draggable
      onStart={onStart}
      bounds={isMobile() ? undefined : 'parent'}
      handle={withHandle ? '.handle' : undefined}
      nodeRef={nodeRef}
      {...windowConfig}
    >
      <div ref={nodeRef} className="absolute" style={{ width, height }}>
        <ConditionalWrapper>
          {/* Shadow */}
          <span
            className="absolute w-full h-full top-1 left-1"
            style={{ backgroundColor: `#${borderColor.slice(1)}CC` }}
          />

          <div
            className={`relative w-full h-full border ${backgroundClass}`}
            style={{ width, height, borderColor }}
          >
            {/* Handle */}
            {withHandle && (
              <header
                className="flex-shrink-0 w-full px-2 border-b cursor-move handle"
                style={{ borderColor }}
              >
                <div
                  className={`flex items-center justify-center w-full h-7`}
                  style={{
                    color: titleColor,
                    backgroundRepeat: 'repeat-x',
                    backgroundPosition: 'center',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='13' stroke='%23${titleColor.slice(
                      1
                    )}' viewBox='0 0 1 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline y1='0.5' x2='1' y2='0.5'/%3E%3Cline y1='2.5' x2='1' y2='2.5'/%3E%3Cline y1='4.5' x2='1' y2='4.5'/%3E%3Cline y1='6.5' x2='1' y2='6.5'/%3E%3Cline y1='8.5' x2='1' y2='8.5'/%3E%3Cline y1='10.5' x2='1' y2='10.5'/%3E%3Cline y1='12.5' x2='1' y2='12.5'/%3E%3C/svg%3E")`,
                  }}
                >
                  <h2
                    className={`font-chicago text-sm px-2 ${backgroundClass}`}
                  >
                    {windowTitle}
                  </h2>
                </div>
              </header>
            )}

            {/* Body */}
            <div
              className={cn('text-sm w-full h-full flex-1 p-3', {
                'cursor-move': !withHandle,
              })}
            >
              {children}
            </div>
          </div>
        </ConditionalWrapper>
      </div>
    </Draggable>
  );
};

export default Window;
