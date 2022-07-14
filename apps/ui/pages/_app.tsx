import { AppProps } from 'next/app';
import Head from 'next/head';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';

import './styles.css';

function InstantSecret({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
    >
      <ChakraProvider>
        <Head>
          <title>Welcome to ui!</title>
        </Head>
        <main className="app">
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
    </Auth0Provider>
  );
}

export default InstantSecret;
