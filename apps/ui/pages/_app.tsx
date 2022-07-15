import { AppProps } from 'next/app';
import { chakra, extendTheme } from '@chakra-ui/react';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { Banner, TopBar } from '../components';
import { Helmet } from 'react-helmet';

function InstantSecret({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URI}
    >
      <ChakraProvider
        theme={extendTheme({
          colors: {
            custom: {
              100: '#F1FAEE',
              200: '#A8DADC',
              300: '#457B9D',
              400: '#1D3557',
            },
          },
        })}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Home | InstantSecret</title>
          <link rel="canonical" href="http://instantsecret.com/" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Helmet>
        <chakra.main w="100%" h="100%" overflowY="scroll">
          <Banner />
          <TopBar />
          <Component {...pageProps} />
        </chakra.main>
      </ChakraProvider>
    </Auth0Provider>
  );
}

export default InstantSecret;
