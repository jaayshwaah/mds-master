// src/app/layout.tsx

import './globals.css';
import { Inter } from 'next/font/google';
import ProvidersWrapper from '@/components/RootClient';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MDS Master',
  description: 'AI assistant for MDS Coordinators',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProvidersWrapper>
          {children}
        </ProvidersWrapper>
      </body>
    </html>
  );
}
