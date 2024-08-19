import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';

export const metadata = {
  title: 'Devs.heaven Blog',
  description: 'Le blog pour les développeurs',
  icons: {
    icon: 'images/logo.svg',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="container mx-auto py-12 flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
