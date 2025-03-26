'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutGrid,
  List,
  Plus,
  Search,
  Building2,
  MapPin,
  DollarSign,
  Filter,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreateJobDialog } from '@/components/CreateJobDialog';
import { Job } from '@/types/job';
import { mockJobs } from '@/lib/data/mock-data';
import toast from 'react-hot-toast';
import { useAuth } from '@/lib/auth';

const categories = [
  'All',
  'Frontend',
  'Backend',
  'Full Stack',
  'DevOps',
  'Mobile',
];

const contractTypes = ['Full-time', 'Part-time', 'Contract', 'Freelance'];

const statuses = ['Active', 'Draft', 'Closed', 'Archived'];

const initialFilters = {
  search: '',
  category: 'All',
  contractType: '',
  status: '',
};

export default function JobsPage() {
  const router = useRouter();
  const { role } = useAuth();
  const [isGridView, setIsGridView] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);
  const [filters, setFilters] = useState(initialFilters);

  const hasActiveFilters = () => {
    return (
      filters.search !== initialFilters.search ||
      filters.category !== initialFilters.category ||
      filters.contractType !== initialFilters.contractType ||
      filters.status !== initialFilters.status
    );
  };

  const resetFilters = () => {
    setFilters(initialFilters);
    toast.success('Filters reset successfully!', {
      duration: 2000,
      style: {
        background: 'var(--background)',
        color: 'var(--foreground)',
        border: '1px solid var(--border)',
      },
    });
  };

  const applyFilters = (jobsList: Job[]) => {
    return jobsList.filter((job) => {
      const matchesSearch = 
        job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.search.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.search.toLowerCase());

      const matchesCategory = filters.category === 'All' || job.category === filters.category;
      const matchesType = !filters.contractType || job.type === filters.contractType;
      const matchesStatus = !filters.status || job.status === filters.status;

      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  };

  useEffect(() => {
    const filtered = applyFilters(jobs);
    setFilteredJobs(filtered);
  }, [jobs, filters]);

  const handleCreateJob = (newJob: Omit<Job, 'id' | 'postedAt'>) => {
    const job: Job = {
      ...newJob,
      id: Math.random().toString(36).substr(2, 9),
      postedAt: new Date().toISOString(),
    };
    
    setJobs(prevJobs => {
      const updatedJobs = [job, ...prevJobs];
      return updatedJobs;
    });

    setIsDialogOpen(false);
    toast.success('Job posting created successfully!', {
      duration: 3000,
      style: {
        background: 'var(--background)',
        color: 'var(--foreground)',
        border: '1px solid var(--border)',
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Jobs</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsGridView(!isGridView)}
          >
            {isGridView ? (
              <LayoutGrid className="h-4 w-4" />
            ) : (
              <List className="h-4 w-4" />
            )}
          </Button>
          {role === 'recruiter' && (
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Job
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                className="pl-8"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>
            <Select
              value={filters.category}
              onValueChange={(value) => setFilters({ ...filters, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={filters.contractType}
              onValueChange={(value) => setFilters({ ...filters, contractType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Contract Type" />
              </SelectTrigger>
              <SelectContent>
                {contractTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
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
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {hasActiveFilters() && (
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

      <div
        className={
          isGridView
            ? 'grid gap-4 md:grid-cols-2 lg:grid-cols-3'
            : 'space-y-4'
        }
      >
        {filteredJobs.map((job) => (
          <Card
            key={job.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => router.push(`/jobs/${job.id}`)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="line-clamp-1">{job.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center">
                        <Building2 className="h-4 w-4 mr-1" />
                        {job.company}
                      </span>
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </span>
                    </div>
                  </CardDescription>
                </div>
                <Badge variant={job.status === 'Active' ? 'default' : 'secondary'}>
                  {job.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-muted-foreground">
                  <DollarSign className="h-4 w-4 mr-1" />
                  {job.salary}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {job.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {job.technologies?.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateJobDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleCreateJob}
      />
    </div>
  );
}