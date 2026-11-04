import './globals.css';

export const metadata = {
  metadataBase: new URL('https://ritkaadi-wedding.vercel.app'),
  title: 'Wedding Invitation | Aditya weds Ritika (#RitKaAdi)',
  description: 'Wedding Invitation of Aditya & Ritika (#RitKaAdi) on Saturday, 21st November 2026. Join us in celebrating this joyous occasion!',
  openGraph: {
    title: 'Aditya weds Ritika | Wedding Invitation (#RitKaAdi)',
    description: 'Cordially inviting you to the wedding ceremony of Aditya & Ritika on 21st November 2026. Tap to open your digital royal invitation.',
    images: ['/assets/ghibli_couple.jpg'],
    type: 'website'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#680e1b',
  viewportFit: 'cover'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@500;700;800&family=Great+Vibes&family=Marcellus&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
