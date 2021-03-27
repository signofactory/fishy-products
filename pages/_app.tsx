import '@assets/globals.css';

// Utils
import splitbee from '@splitbee/web';

import { AppProps } from 'next/app';
import { ManagedUIContext } from '@components/ui/context';

splitbee.init({
  // Enable cookie-less mode. Defaults to `false`
  disableCookie: true,

  // Set custom urls when using proxying
  scriptUrl: 'https://cdn.splitbee.io/sb.js',
  apiUrl: 'https://hive.splitbee.io',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ManagedUIContext>
      <Component {...pageProps} />
    </ManagedUIContext>
  );
}
