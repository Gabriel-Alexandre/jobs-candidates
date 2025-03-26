import { generateStaticParams } from './generateStaticParams';
import CandidateDetails from './CandidateDetails';

export { generateStaticParams };

export default function CandidateDetailsPage({ params }: { params: { id: string } }) {
  return <CandidateDetails id={params.id} />;
}