import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" passHref>
            <Image
              src="/images/logo.svg"
              alt="Devs.heaven Logo"
              width={40}
              height={40}
              className="hover:scale-110 transition-transform duration-300 cursor-pointer"
            />
          </Link>
          <Link href="/" passHref>
            <span className="text-2xl font-bold text-gray-900 hover:text-teal-600 transition-colors duration-300 cursor-pointer">
              devs.heaven
            </span>
          </Link>
        </div>
        <nav className="space-x-8 text-gray-700">
          <Link href="/" passHref>
            <span className="text-lg font-medium hover:text-teal-600 transition-colors duration-300 cursor-pointer">
              Accueil
            </span>
          </Link>
          {/* <Link href="/about" passHref>
            <span className="text-lg font-medium hover:text-teal-600 transition-colors duration-300 cursor-pointer">
              À propos
            </span>
          </Link>
          <Link href="/contact" passHref>
            <span className="text-lg font-medium hover:text-teal-600 transition-colors duration-300 cursor-pointer">
              Contact
            </span>
          </Link> */}
        </nav>
      </div>
    </header>
  );
}
