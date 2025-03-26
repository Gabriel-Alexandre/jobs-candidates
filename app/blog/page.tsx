import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/marketing/Header';
import { Footer } from '@/components/marketing/Footer';

const posts = [
  {
    id: 1,
    title: 'Top 5 Skills in High Demand for Remote Jobs',
    description: 'Discover the most sought-after skills that employers are looking for in remote workers. Learn how to position yourself for success in the remote job market.',
    date: 'Apr 12, 2024',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
    author: 'John Doe'
  },
  {
    id: 2,
    title: 'How to Stand Out in a Competitive Job Market',
    description: 'Learn effective strategies to make your job application stand out from the crowd. Tips from hiring managers and career experts on crafting the perfect application.',
    date: 'Apr 11, 2024',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978',
    author: 'Jane Smith'
  },
  {
    id: 3,
    title: 'The Future of Work: Trends Shaping Job Markets',
    description: 'Explore emerging trends in the job market and how they will affect your career. From AI to remote work, understand what the future holds.',
    date: 'Apr 10, 2024',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    author: 'Mike Johnson'
  }
];

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-[1000px] mx-auto py-12 px-4">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold">Career Insights</h1>
            <p className="mt-4 text-xl text-muted-foreground">
              Expert advice and trends in the job market
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/#`} className="hover:underline">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>{post.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.description}
                  </p>
                  <p className="mt-4 text-sm">By {post.author}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}