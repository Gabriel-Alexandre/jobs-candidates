'use client';

import { Building2, MapPin, Clock, DollarSign } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Job } from '@/types/job';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{job.title}</h3>
            <div className="flex items-center text-muted-foreground mt-1">
              <Building2 className="h-4 w-4 mr-1" />
              <span className="text-sm">{job.company}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{job.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2" />
            <span className="text-sm">{job.salary}</span>
          </div>
          <p className="text-sm line-clamp-2 mt-2">{job.description}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-muted-foreground">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">
            Posted {formatDistanceToNow(new Date(job.postedAt))} ago
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}