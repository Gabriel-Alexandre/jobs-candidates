'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';

const faqs = [
  {
    question: 'How do I create a job posting?',
    answer: 'To create a job posting, sign up for an employer account and click on the "Post a Job" button in your dashboard. Fill out the job details including title, description, requirements, and benefits. Your job will be live after review.',
  },
  {
    question: 'What happens after I apply for a job?',
    answer: 'After submitting your application, the employer will be notified and can review your profile. You\'ll receive notifications about the status of your application, and employers can contact you directly through our platform.',
  },
  {
    question: 'How can I make my profile stand out to employers?',
    answer: 'Complete all sections of your profile, including work experience, skills, and education. Keep your information up-to-date, add a professional photo, and highlight relevant achievements. Regular activity on the platform also increases visibility.',
  },
  {
    question: 'Are the job postings verified?',
    answer: 'Yes, we verify all employers and job postings before they go live on our platform. This helps ensure the quality and legitimacy of opportunities available to our job seekers.',
  },
  {
    question: 'Can I save jobs for later?',
    answer: 'Yes, you can save jobs by clicking the bookmark icon on any job posting. Access your saved jobs anytime from your dashboard to apply when you\'re ready.',
  },
  {
    question: 'How do I get notified about new jobs?',
    answer: 'Set up job alerts in your preferences by specifying your desired role, location, and other criteria. You\'ll receive notifications when matching jobs are posted.',
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-[800px] mx-auto py-12 px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold">FAQ</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Common questions about using JobConnect
            </p>
          </div>
          <div className="space-y-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search questions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            {filteredFaqs.length === 0 && (
              <p className="text-center text-muted-foreground">
                No questions found matching your search.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}