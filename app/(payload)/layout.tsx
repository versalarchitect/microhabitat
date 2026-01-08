/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from 'next';

import '@payloadcms/next/css';
import config from '@payload-config';
import { RootLayout } from '@payloadcms/next/layouts';
import React from 'react';
import { importMap } from './admin/importMap';
import { serverFunction } from './actions';

import './custom.scss';

type Args = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: 'Microhabitat CMS',
  description: 'Content management system for Microhabitat website',
};

const Layout = ({ children }: Args) => (
  <RootLayout
    config={config}
    importMap={importMap}
    serverFunction={serverFunction}
  >
    {children}
  </RootLayout>
);

export default Layout;
