'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const mockCandidate = {
  id: '1',
  name: 'John Doe',
  title: 'Senior Frontend Developer',
  location: 'San Francisco, CA',
  experience: '8 years',
  email: 'john@example.com',
  phone: '+1 (555) 123-4567',
  skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL'],
  status: 'Available',
  bio: 'Passionate software engineer with over 8 years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies.',
  experience_history: [
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp',
      period: '2020 - Present',
      description: 'Leading frontend development team, implementing new features and improving performance.',
    },
    {
      title: 'Software Engineer',
      company: 'InnovateSoft',
      period: '2018 - 2020',
      description: 'Developed and maintained multiple client applications using React and Node.js.',
    },
  ],
  education: [
    {
      degree: 'M.S. Computer Science',
      school: 'Stanford University',
      year: '2018',
    },
    {
      degree: 'B.S. Computer Science',
      school: 'UC Berkeley',
      year: '2016',
    },
  ],
  languages: ['English (Native)', 'Spanish (Intermediate)'],
  certifications: [
    'AWS Certified Developer',
    'Google Cloud Professional Developer',
    'React Certification',
  ],
};

export default function CandidateDetails({ id }: { id: string }) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold">{mockCandidate.name}</h1>
        <Badge>{mockCandidate.status}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium">{mockCandidate.title}</h3>
                <p className="text-sm text-muted-foreground">{mockCandidate.location}</p>
              </div>
              <div>
                <p className="text-sm">
                  <strong>Email:</strong> {mockCandidate.email}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {mockCandidate.phone}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {mockCandidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{mockCandidate.bio}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Languages & Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Languages</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {mockCandidate.languages.map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Certifications</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {mockCandidate.certifications.map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {mockCandidate.experience_history.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-semibold">{exp.title}</h3>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Education</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockCandidate.education.map((edu, index) => (
                <div key={index} className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{edu.year}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}