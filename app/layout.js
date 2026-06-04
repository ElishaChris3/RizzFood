import './globals.css';

export const metadata = {
  title: 'Rizz Juices — Play & Win',
  description: 'Catch the freshest fruits and win discounts at Rizz Juices!',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
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
