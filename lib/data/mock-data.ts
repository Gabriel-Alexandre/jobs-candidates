import { Job } from '@/types/job';

// Mock data for jobs
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'Remote',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    description: 'Looking for an experienced frontend developer with expertise in React and TypeScript...',
    postedAt: new Date().toISOString(),
    technologies: ['React', 'TypeScript', 'Next.js'],
    status: 'Active',
    category: 'Frontend',
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with Next.js',
      'Excellent communication skills'
    ],
    benefits: [
      'Competitive salary',
      'Remote work',
      'Health insurance',
      'Stock options'
    ]
  }
];

// Mock data for dashboard statistics
export const mockStats = {
  totalApplications: 156,
  activeJobs: 45,
  totalInterviews: 28,
  offerRate: 15,
  applicationTrends: [
    { date: '2024-01', applications: 45, interviews: 12, offers: 3 },
    { date: '2024-02', applications: 52, interviews: 15, offers: 4 },
    { date: '2024-03', applications: 59, interviews: 18, offers: 5 },
    { date: '2024-04', applications: 65, interviews: 22, offers: 6 }
  ],
  applicationsByStatus: [
    { status: 'Applied', count: 45, percentage: '35%' },
    { status: 'Screening', count: 30, percentage: '25%' },
    { status: 'Interview', count: 25, percentage: '20%' },
    { status: 'Offer', count: 15, percentage: '12%' },
    { status: 'Rejected', count: 10, percentage: '8%' }
  ],
  salaryRanges: [
    { range: '$50k-75k', count: 15, percentage: '20%' },
    { range: '$75k-100k', count: 25, percentage: '30%' },
    { range: '$100k-125k', count: 20, percentage: '25%' },
    { range: '$125k-150k', count: 12, percentage: '15%' },
    { range: '$150k+', count: 8, percentage: '10%' }
  ],
  skillsInDemand: [
    { skill: 'React', count: 45, trend: 'up' },
    { skill: 'TypeScript', count: 40, trend: 'up' },
    { skill: 'Node.js', count: 35, trend: 'up' },
    { skill: 'Python', count: 30, trend: 'stable' },
    { skill: 'AWS', count: 25, trend: 'up' }
  ],
  locationStats: [
    { location: 'Remote', jobs: 50, avgSalary: 120000 },
    { location: 'San Francisco', jobs: 35, avgSalary: 140000 },
    { location: 'New York', jobs: 30, avgSalary: 130000 },
    { location: 'London', jobs: 25, avgSalary: 95000 },
    { location: 'Berlin', jobs: 20, avgSalary: 85000 }
  ]
};

// Mock data for notifications
export const mockNotifications = [
  {
    id: '1',
    title: 'New Interview Scheduled',
    description: 'Interview scheduled with TechCorp for Senior Frontend Developer position',
    type: 'interview',
    priority: 'high',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    role: 'candidate'
  },
  {
    id: '2',
    title: 'Application Status Update',
    description: 'Your application for Full Stack Engineer at InnovateSoft has moved to the next round',
    type: 'application',
    priority: 'medium',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    role: 'candidate'
  },
  {
    id: '3',
    title: 'New Candidate Application',
    description: 'John Smith has applied for the Senior Frontend Developer position',
    type: 'application',
    priority: 'high',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
    role: 'recruiter'
  },
  {
    id: '4',
    title: 'Interview Feedback Required',
    description: 'Please provide feedback for the interview with Sarah Williams',
    type: 'interview',
    priority: 'high',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    role: 'recruiter'
  },
  {
    id: '5',
    title: 'Candidate Shortlisted',
    description: 'Mike Johnson has been shortlisted for the DevOps Engineer position',
    type: 'application',
    priority: 'medium',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    role: 'recruiter'
  },
  {
    id: '6',
    title: 'Offer Letter Sent',
    description: 'Offer letter has been sent to Emily Brown for the UI/UX Designer position',
    type: 'offer',
    priority: 'high',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    role: 'recruiter'
  }
];