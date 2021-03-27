import { useEffect, useState } from 'react';

// Components
import Window from '@components/commons/Window';
import Completion from '../Completion';

// Tools
import cn from 'classnames';
import axios from 'axios';
import { localstorageTools } from '@lib/localstorage-tools';
import { isMobile } from '@lib/is-mobile';
import { WindowProps } from '@components/commons/Window/Window';

const MIN_DESC_LENGTH = 50,
  MAX_DESC_LENGTH = 150;

const Form: React.FC<{
  bringToFront: WindowProps['bringToFront'];
}> = ({ bringToFront }) => {
  // Gets local storage to check if the user has already generated completions
  const retrievedStorage = localstorageTools.getItem<{
    hasRun: boolean;
    completions: string[];
    formData: {
      name: string;
      description: string;
    };
  }>('adflow-storage');

  const [completions, setCompletions] = useState<string[]>(
    retrievedStorage?.completions || []
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasRun, setHasRun] = useState(retrievedStorage?.hasRun || false);
  const [formData, setFormData] = useState(
    retrievedStorage?.formData || {
      name: '',
      description: '',
    }
  );

  // Counts total characters for the description and listens for a change
  const [totalCharacters, setTotalCharacters] = useState<number>(0);
  useEffect(() => setTotalCharacters(formData.description.length), [
    formData.description,
  ]);

  // Determine initial x and y position, and width of the frame
  const x = isMobile() ? 0 : 700,
    y = isMobile() ? 244 : 50,
    windowWidth = isMobile() ? window.innerWidth - 24 : 375;

  /**
   * Generate GPT-3 completions on form submitted
   */
  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRunning(true);
    try {
      const {
        data: { completions },
      } = await axios({
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_FISHY_ADS_BASE_PATH}/api/v1/generate-slogans`,
        data: formData,
      });

      // Saves the state in localstorage and updates the local state
      const stateToSave = {
        hasRun: true,
        completions: completions,
        formData: { ...formData },
      };

      localstorageTools.setItem({
        name: 'adflow-storage',
        content: stateToSave,
      });

      setCompletions(stateToSave.completions);
      setHasRun(stateToSave.hasRun);
    } catch (err) {
      console.log(err);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <>
      <Window
        withHandle
        windowTitle="Generate fishy product ideas"
        height={434}
        width={windowWidth}
        defaultPosition={{ x, y }}
        bringToFront={bringToFront}
      >
        <form className="w-full" onSubmit={handleSumbit}>
          {/* Name */}
          <div className="w-full">
            <label htmlFor="name" className="block font-semibold text-gray-700">
              Product/Brand name
            </label>
            <div className={cn('relative flex-1 mt-1')}>
              <input
                placeholder="Brand or Product name"
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prevFromData) => ({
                    ...prevFromData,
                    name: e.target.value,
                  }))
                }
                autoComplete="off"
                className={cn(
                  'block text-sm rounded-sm w-full bg-white bg-opacity-50 border border-lightBlue-dark focus:ring-lightBlue-darkest focus:border-lightBlue-darkest'
                )}
                maxLength={100}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="w-full mt-4">
            <label
              htmlFor="description"
              className="block font-semibold text-gray-700"
            >
              Description
            </label>
            <div className={cn('relative flex-1 mt-1')}>
              <span className="absolute right-0 -top-5 -mt-0.5">
                {totalCharacters}/{MAX_DESC_LENGTH}
              </span>
              <textarea
                onChange={(e) =>
                  setFormData((prevFromData) => ({
                    ...prevFromData,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your brand, product or service with a few sentences"
                name="description"
                id="description"
                rows={5}
                className={cn(
                  'block w-full rounded-sm resize-none text-sm bg-white bg-opacity-50 border border-lightBlue-dark focus:ring-lightBlue-darkest focus:border-lightBlue-darkest'
                )}
                minLength={MIN_DESC_LENGTH}
                maxLength={MAX_DESC_LENGTH}
                value={formData.description}
                required
              />
            </div>
          </div>
          <button
            className="float-right text-gray-700 font-chicago text-sm rounded-sm mt-4 hover:bg-opacity-100 bg-white border border-lightBlue-dark px-2.5 py-2 bg-opacity-50 disabled:text-lightBlue-dark disabled:bg-transparent"
            type="submit"
            disabled={isRunning || hasRun}
            data-splitbee-event="generate-products"
          >
            {isRunning ? 'Loading...' : 'Generate'}
          </button>
        </form>
        {hasRun && (
          <div className="absolute bottom-4">
            <p>
              We hope you enjoyed our April Fools' stunt. Please consider{' '}
              <a
                className="font-semibold underline"
                href="https://adflow.ai"
                data-splitbee-event="click-consider-trying-adflow"
              >
                trying Adflow
              </a>{' '}
              to save time on your Facebook and Google ad campaigns.
            </p>
          </div>
        )}
      </Window>

      {/* Competions */}
      {completions?.map((completion, index) => (
        <Completion
          key={`completion-${index}`}
          bringToFront={bringToFront}
          index={index}
          completion={completion}
        />
      ))}
    </>
  );
};

export default Form;
