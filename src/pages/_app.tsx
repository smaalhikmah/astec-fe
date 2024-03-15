import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import { PagesProgressBar as ProgressBar } from 'next-nprogress-bar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      <Component {...pageProps} />
      <ProgressBar
        height='4px'
        color='#00b032'
        options={{ showSpinner: false }}
        shallowRouting
      />
    </ThemeProvider>
  );
}
