import JobDetails from './JobDetails';

// This is required for static export
export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }];
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  return <JobDetails id={params.id} />;
}