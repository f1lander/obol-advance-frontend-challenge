import '@repo/ui/styles.css';
import './globals.css';

import type { Metadata } from 'next';
import Typography from '@repo/ui/typography';
// eslint-disable-next-line camelcase -- comes from library
import { DM_Sans } from 'next/font/google';
import { headers } from 'next/headers';
import Link from 'next/link';
import { cookieToInitialState } from 'wagmi';
import { config } from '../config';
import Web3ModalProvider from '../context';
import { ObolBrandLogo } from '../presentation/logo/obol-logo';
import StoreProvider from './store-provider';

const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Poke Dapp',
  description: "Gotta catch 'em all!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const initialState = cookieToInitialState(config, headers().get('cookie'));

  return (
    <html lang='en'>
      <body className={`${dmSans.className} bg-[#081011]`}>
        <StoreProvider>
          <nav className='sticky top-0 z-50 bg-gray-800 text-white shadow'>
            <div className='flex flex-row items-center justify-between px-8 py-4'>
              <Link href='/'>
                <ObolBrandLogo />
              </Link>
              <div className='flex flex-row items-center gap-4'>
                <Link href='/rsc'>
                  <Typography className='cursor-pointer' variant='h5'>
                    RSC
                  </Typography>
                </Link>
                <Link href='/'>
                  <Typography className='cursor-pointer' variant='h5'>
                    Home
                  </Typography>
                </Link>
                <w3m-button />
              </div>
            </div>
          </nav>
          <Web3ModalProvider initialState={initialState}>
            {children}
          </Web3ModalProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
