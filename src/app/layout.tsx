import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BioPermaculture Calendar',
  description: 'Personalized gardening calendar with biodynamic and permaculture principles',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
