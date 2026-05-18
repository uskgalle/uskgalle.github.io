import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

import { Inter } from 'next/font/google';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import BackToTop from '../components/BackToTop/BackToTop';
import AnnouncementBar from '../components/AnnouncementBar/AnnouncementBar';

// Georgia is a system font — no need to load via next/font
// Inter replaces Lato as the body font
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata = {
  title: 'Urban Sketchers Galle',
  description:
    'A community of sketchers dedicated to on-location drawing across Galle and the southern coast of Sri Lanka.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <div>
          {/* <AnnouncementBar /> */}
          <main>{children}</main>
        </div>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}