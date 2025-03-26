import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const navigation = {
  about: [
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ],
  product: [
    { name: 'Find Jobs', href: '/auth/signup' },
    { name: 'Post a Job', href: '/auth/signup' },
  ],
  legal: [
    { name: 'Terms of Service', href: '/auth/signup' },
    { name: 'Privacy Policy', href: '/auth/signup' },
    { name: 'Cookie Policy', href: '/auth/signup' },
  ],
};

export function Footer() {
  return (
    <footer className="flex flex-1 justify-center border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 place-items-center text-center">
          <div className="flex flex-col items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold">JobConnect</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your trusted platform for connecting talented professionals with exciting career opportunities.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold">About</h3>
            <ul role="list" className="mt-4 space-y-4">
              {navigation.about.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold">Product</h3>
            <ul role="list" className="mt-4 space-y-4">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul role="list" className="mt-4 space-y-4">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © Copyright 2025 JobConnect. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}