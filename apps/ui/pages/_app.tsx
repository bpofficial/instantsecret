import { AppProps } from 'next/app';
import { chakra } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { Banner, TopBar } from '../components';

function InstantSecret({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
    >
      <ChakraProvider>
        <chakra.main w="100%" h="100%">
          <Banner />
          <TopBar />
          <Component {...pageProps} />
        </chakra.main>
      </ChakraProvider>
    </Auth0Provider>
  );
}

export default InstantSecret;
