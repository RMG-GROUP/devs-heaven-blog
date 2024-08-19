import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <Image src="/images/logo.png" alt="Devs.heaven Logo" width={40} height={40} />
          </Link>
          <Link href="/" passHref>
            <span className="text-2xl font-bold">devs.heaven</span>
          </Link>
        </div>
        <nav className="space-x-8">
          <Link href="/" passHref>
            <span className="text-lg font-medium cursor-pointer">Accueil</span>
          </Link>
          {/* <Link href="/about" passHref>
            <span className="text-lg font-medium cursor-pointer">À propos</span>
          </Link>
          <Link href="/contact" passHref>
            <span className="text-lg font-medium cursor-pointer">Contact</span>
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
