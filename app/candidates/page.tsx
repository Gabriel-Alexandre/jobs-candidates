'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  status: string;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Doe',
    title: 'Senior Frontend Developer',
    location: 'San Francisco, CA',
    experience: '8 years',
    skills: ['React', 'TypeScript', 'Node.js'],
    status: 'Available',
  },
  {
    id: '2',
    name: 'Jane Smith',
    title: 'Full Stack Engineer',
    location: 'New York, NY',
    experience: '5 years',
    skills: ['Python', 'Django', 'React'],
    status: 'Interviewing',
  },
  {
    id: '3',
    name: 'Mike Johnson',
    title: 'DevOps Engineer',
    location: 'Remote',
    experience: '6 years',
    skills: ['AWS', 'Docker', 'Kubernetes'],
    status: 'Available',
  },
  {
    id: '4',
    name: 'Sarah Williams',
    title: 'Mobile Developer',
    location: 'London, UK',
    experience: '4 years',
    skills: ['React Native', 'iOS', 'Android'],
    status: 'Hired',
  },
];

export default function CandidatesPage() {
  const router = useRouter();
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [filters, setFilters] = useState({
    search: '',
    experience: '',
    location: '',
    status: '',
  });

  const hasActiveFilters = Object.values(filters).some(Boolean);

  const resetFilters = () => {
    setFilters({
      search: '',
      experience: '',
      location: '',
      status: '',
    });
  };

  useEffect(() => {
    const filtered = mockCandidates.filter((candidate) => {
      const matchesSearch = 
        candidate.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        candidate.skills.some(skill => 
          skill.toLowerCase().includes(filters.search.toLowerCase())
        );

      const matchesExperience = !filters.experience || candidate.experience.includes(filters.experience);
      const matchesLocation = !filters.location || candidate.location.includes(filters.location);
      const matchesStatus = !filters.status || candidate.status === filters.status;

      return matchesSearch && matchesExperience && matchesLocation && matchesStatus;
    });

    setCandidates(filtered);
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Candidates</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                className="pl-8"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <Select
              value={filters.experience}
              onValueChange={(value) => setFilters({ ...filters, experience: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3 years">3+ years</SelectItem>
                <SelectItem value="5 years">5+ years</SelectItem>
                <SelectItem value="8 years">8+ years</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.location}
              onValueChange={(value) => setFilters({ ...filters, location: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="San Francisco">San Francisco</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="London">London</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filters.status}
              onValueChange={(value) => setFilters({ ...filters, status: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Interviewing">Interviewing</SelectItem>
                <SelectItem value="Hired">Hired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {hasActiveFilters && (
            <div className="mt-4 flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={resetFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Reset Filters
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/candidates/${candidate.id}`)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="line-clamp-1">{candidate.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{candidate.title}</p>
                </div>
                <Badge>{candidate.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {candidate.location} • {candidate.experience}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {candidate.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}