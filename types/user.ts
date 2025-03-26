export type UserRole = 'recruiter' | 'candidate';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  company?: string;
  title?: string;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education?: {
    degree: string;
    school: string;
    year: string;
  }[];
  socialLinks?: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
  };
}