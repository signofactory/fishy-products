import { useUI } from '@components/ui';

const Header = () => {
  const { toggleModal, setModalView } = useUI();

  const openCreditsModal = () => {
    setModalView('CREDITS_VIEW');
    toggleModal();
  };

  return (
    <header className="flex-shrink-0 flex items-center justify-between w-screen h-6 px-1.5 border-b bg-lightBlue-light border-lightBlue-dark">
      <button
        onClick={openCreditsModal}
        className="h-full text-xs text-gray-900 px-1.5 hover:bg-lightBlue-dark hover:bg-opacity-30 font-chicago"
      >
        Fishy product ideas
      </button>
      <div className="h-full">
        <a
          className="text-xs  px-1.5 border-r border-gray-400"
          href="mailto:hello@adflow.ai"
          target="_blank"
          data-splitbee-event="click-get-in-touch"
        >
          Get in touch!
        </a>
        <a
          className="text-xs px-1.5"
          href="https://www.adflow.ai/"
          target="_blank"
          data-splitbee-event="click-by-adflow"
        >
          by Adflow
        </a>
      </div>
    </header>
  );
};

export default Header;
