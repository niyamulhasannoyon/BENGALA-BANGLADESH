import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { BANGLADESH_DESTINATIONS } from '@/lib/data/bangladeshDestinations';
import { getDestinationBySlugAction } from '@/app/actions/destinationActions';
import { DestinationPageClient } from '@/components/destination/DestinationPageClient';

interface DestinationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return BANGLADESH_DESTINATIONS.map((dest) => ({
    slug: dest.slug,
  }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = await getDestinationBySlugAction(slug);

  if (!destination) {
    return {
      title: 'Destination Not Found • BENGALA',
    };
  }

  return {
    title: `${destination.title} • Luxury Expedition | BENGALA`,
    description: destination.description,
    openGraph: {
      title: `${destination.title} • Ultra-Luxury Bangladesh Expedition`,
      description: destination.tagLine,
      images: [
        {
          url: destination.heroBgUrl,
          width: 1200,
          height: 630,
          alt: destination.title,
        },
      ],
    },
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = await getDestinationBySlugAction(slug);

  if (!destination) {
    notFound();
  }

  return <DestinationPageClient destination={destination} />;
}
