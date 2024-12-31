'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Jobs', path: '/jobs' },
    { label: 'Career Insights', path: '/insights' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const UserMenu = () => (
    <div className="relative group">
      <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100">
        <Image
          src={session?.user?.image || "/default-avatar.png"}
          alt="Profile"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="text-sm font-medium">{session?.user?.name}</span>
      </button>
      <div className="absolute right-0 w-48 mt-2 py-2 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Profile
        </Link>
        <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
          Settings
        </Link>
        <button
          onClick={() => signOut()}
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
        >
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg' 
          : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image
                src="/logo.jpg"
                alt="CareerCraft"
                width={45}
                height={45}
                className="rounded-xl"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  CareerCraft
                </span>
                <span className="text-xs text-gray-500">Shape Your Future</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
                  pathname === item.path
                    ? 'text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {item.label}
                {pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 rounded-full transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <div className="ml-4 flex items-center space-x-3">
              {session ? (
                <UserMenu />
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signin"
                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity transform hover:scale-105 duration-200 shadow-md hover:shadow-lg"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-screen opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  pathname === item.path
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              {session ? (
                <div className="space-y-2">
                  <Link href="/profile" className="block w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50">
                    Profile
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="w-full px-3 py-2 text-base font-medium text-red-600 hover:bg-red-50 transition-colors rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <>
                  <Link href="/auth/signin" className="block w-full px-3 py-2 text-base font-medium text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-50">
                    Sign In
                  </Link>
                  <Link href="/auth/signin" className="block w-full px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 transition-opacity">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
