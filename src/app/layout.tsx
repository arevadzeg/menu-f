import { Theme } from '@radix-ui/themes';
import './globals.css';
import Provider from './utils/Providers';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Theme>
            {children}
          </Theme>
        </Provider>
      </body>
    </html>
  );
}
