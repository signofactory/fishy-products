import { FC, useRef, useEffect, useCallback } from 'react';
import Portal from '@reach/portal';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock';
interface Props {
  className?: string;
  children?: any;
  open?: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({ children, open, onClose }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  // Close the modal on esc
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        return onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (ref.current) {
      if (open) {
        disableBodyScroll(ref.current);
        window.addEventListener('keydown', handleKey);
      } else {
        enableBodyScroll(ref.current);
      }
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearAllBodyScrollLocks();
    };
  }, [open, handleKey]);

  return (
    <Portal>
      {open ? (
        <div
          className="fixed inset-0 flex items-center justify-center p-3 top-6 backdrop-blur bg-opacity-80 bg-lightBlue-light"
          style={{ zIndex: 999 }}
        >
          <div className="relative w-full sm:w-96" role="dialog" ref={ref}>
            {/* Shadow */}
            <span className="absolute w-full h-full top-1 left-1 bg-lightBlue-dark bg-opacity-80" />
            <div className="relative border bg-lightBlue-light border-lightBlue-dark">
              <header className="relative flex-shrink-0 w-full px-2 border-b border-lightBlue-dark bg-lightBlue-light">
                <div className="absolute flex items-center justify-center w-5 h-5 p-1 transform -translate-y-1/2 bg-lightBlue-light top-1/2 left-4">
                  <button
                    onClick={onClose}
                    aria-label="Close panel"
                    className="w-full h-full border rounded-none bg-lightBlue-light border-lightBlue-darkest"
                  />
                </div>
                <div
                  className={`flex items-center justify-center w-full h-7 text-lightBlue-darkest `}
                  style={{
                    backgroundRepeat: 'repeat-x',
                    backgroundPosition: 'center',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='1' height='13' stroke='%232C4D57' viewBox='0 0 1 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline y1='0.5' x2='1' y2='0.5'/%3E%3Cline y1='2.5' x2='1' y2='2.5'/%3E%3Cline y1='4.5' x2='1' y2='4.5'/%3E%3Cline y1='6.5' x2='1' y2='6.5'/%3E%3Cline y1='8.5' x2='1' y2='8.5'/%3E%3Cline y1='10.5' x2='1' y2='10.5'/%3E%3Cline y1='12.5' x2='1' y2='12.5'/%3E%3C/svg%3E")`,
                  }}
                >
                  <h2
                    className={`font-chicago text-sm px-2 bg-lightBlue-light`}
                  >
                    About
                  </h2>
                </div>
              </header>
              <div className="p-4">{children}</div>
            </div>
          </div>
        </div>
      ) : null}
    </Portal>
  );
};

export default Modal;
