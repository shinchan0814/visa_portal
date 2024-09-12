import { useRouter } from 'next/router';
import CountryDetailPage from '../countryDetailPage';

export default function CountryPage() {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return <div>Loading...</div>;
  }

  return <CountryDetailPage slug={slug} />;
}