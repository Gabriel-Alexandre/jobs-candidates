import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';
import { ArrowRight, Briefcase, Building2, Globe } from 'lucide-react';

export default function MarketingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24">
          <div className="container max-w-[800px] mx-auto px-4">
            <div className="text-center">
              <Link
                href="/blog"
                className="mb-8 inline-flex items-center rounded-full bg-muted px-4 py-1.5 text-sm font-medium"
              >
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                Find your dream job today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl">
                Your Gateway to Career Success
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                Connect with top employers, discover exciting opportunities, and take the next step in your career journey.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button size="lg" asChild>
                  <Link href="/auth/signup">Find Jobs</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/auth/signup">Post a Job</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/50">
          <div className="container max-w-[1200px] mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-background p-8 rounded-lg shadow-sm">
                <div className="mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">For Job Seekers</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Access thousands of jobs
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Easy application process
                  </li>
                </ul>
              </div>
              <div className="bg-background p-8 rounded-lg shadow-sm">
                <div className="mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">For Employers</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Post unlimited jobs
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Advanced candidate filtering
                  </li>
                </ul>
              </div>
              <div className="bg-background p-8 rounded-lg shadow-sm">
                <div className="mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Remote Work</h3>
                <ul className="space-y-4 text-muted-foreground">
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Global opportunities
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="h-5 w-5 text-primary mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Flexible work options
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}