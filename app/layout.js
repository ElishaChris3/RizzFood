import './globals.css';

export const metadata = {
  title: 'Rizz Juices — Play & Win',
  description: 'Catch the freshest fruits and win discounts at Rizz Juices!',
  icons: {
    icon: '/assets/rizzLogo.png',
    apple: '/assets/rizzLogo.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#0D0D0D] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
