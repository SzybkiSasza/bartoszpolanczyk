import { Metadata } from 'next';
import React from 'react';

import './base.css';
import StyledComponentsRegistry from '../lib/registry';

export const metadata: Metadata = {
  creator: 'Bartosz Polanczyk',
  description: 'Bartosz Polanczyk - home page',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png'
  },
  keywords: ['react', 'next.js', 'TypeScript', 'JavaScript', 'home', 'homepage', 'web', 'cv', 'portfolio'],
  manifest: '/manifest.json',
  title: 'Bartosz Polanczyk',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>{ children }</StyledComponentsRegistry>
      </body>
    </html>
  )
}
