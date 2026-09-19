import { getFeaturedDestinationsAction, getUserBookmarksAction } from '@/app/actions/destinationActions';
import { HeroShowcase } from '@/components/hero/HeroShowcase';

// Next.js ISR revalidation
export const revalidate = 3600;

export default async function HomePage() {
  // Fetch initial cached featured destinations from MongoDB (with fallback to curated dataset)
  const destinations = await getFeaturedDestinationsAction();

  // Fetch initial bookmarks for current guest/user session
  const userBookmarks = await getUserBookmarksAction();

  return (
    <HeroShowcase
      initialDestinations={destinations}
      initialBookmarks={userBookmarks}
    />
  );
}
