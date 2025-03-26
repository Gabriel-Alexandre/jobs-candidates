export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  postedAt: string;
  technologies: string[];
  status: string;
  category: string;
  requirements: string[];
  benefits: string[];
  additionalInfo?: string;
}