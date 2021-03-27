const CreditsView = () => {
  return (
    <div className="text-sm">
      Fishy product ideas is an experiment by the folks at{' '}
      <a
        className="font-semibold underline text-orchid-darkest"
        href="https://www.adflow.ai"
        target="_blank"
        data-splitbee-event="click-modal-adflow"
      >
        Adflow
      </a>{' '}
      created to celebrate April's fool 2021. The source code of the project
      will be made available on Github.
      <br />
      <br />
      Credits:
      <ul className="mt-2 ml-6 space-y-2 list-disc">
        <li>
          Behind the scenes, our recommendations implement{' '}
          <a href="https://openai.com/" target="_blank" className="underline">
            OpenAI
          </a>
          's GPT-3's natural language processing models.
        </li>
        <li>
          Fishy product's interface recreates the timeless work by the team who
          created the Macintosh OS System 1 interface, and its web adaptions by
          talented designers all over the web (e.g.{' '}
          <a
            className="underline"
            href="https://www.poolside.fm"
            target="_blank"
            data-splitbee-event="click-modal-poolside"
          >
            poolside.fm
          </a>
          , just to mention one)
        </li>
        <li>
          Accordingly, the typeface used for many elements is{' '}
          <a
            href="https://en.wikipedia.org/wiki/Chicago_(typeface)"
            target="_blank"
            className="underline"
            data-splitbee-event="click-modal-chicago"
          >
            Chicago
          </a>
          .
        </li>
      </ul>
    </div>
  );
};

export default CreditsView;
