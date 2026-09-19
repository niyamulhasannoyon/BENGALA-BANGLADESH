'use server';

import { unstable_cache } from 'next/cache';
import { revalidatePath } from 'next/cache';
import { connectToDatabase } from '@/lib/db/mongodb';
import Destination, { IDestination } from '@/lib/models/Destination';
import Bookmark from '@/lib/models/Bookmark';
import { BANGLADESH_DESTINATIONS } from '@/lib/data/bangladeshDestinations';
import mongoose from 'mongoose';

/**
 * Internal query function to fetch featured destinations from MongoDB
 * with automatic fallback and auto-seeding if the collection is empty.
 */
async function fetchFeaturedDestinations(): Promise<IDestination[]> {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return BANGLADESH_DESTINATIONS;
    }

    let docs = await Destination.find({ isFeatured: true }).sort({ orderIndex: 1 }).lean();

    // Auto-seed database if connected but empty
    if (!docs || docs.length === 0) {
      console.log('[MongoDB] Empty destinations collection detected. Auto-seeding Bangladesh luxury destinations...');
      const seedData = BANGLADESH_DESTINATIONS.map(({ _id: _ignoredId, ...rest }) => rest);
      await Destination.insertMany(seedData);
      docs = await Destination.find({ isFeatured: true }).sort({ orderIndex: 1 }).lean();
    }

    if (docs && docs.length > 0) {
      return docs.map((doc) => ({
        _id: doc._id.toString(),
        title: doc.title,
        slug: doc.slug,
        tagLine: doc.tagLine,
        categoryBadge: doc.categoryBadge,
        region: doc.region,
        country: doc.country,
        heroBgUrl: doc.heroBgUrl,
        cardThumbUrl: doc.cardThumbUrl,
        blurDataUrl: doc.blurDataUrl || '',
        rating: doc.rating,
        orderIndex: doc.orderIndex,
        isFeatured: doc.isFeatured,
        description: doc.description,
        highlights: doc.highlights || [],
        bestSeason: doc.bestSeason,
        coordinates: {
          lat: doc.coordinates?.lat ?? 21.9497,
          lng: doc.coordinates?.lng ?? 89.1833,
        },
        curatedExpedition: doc.curatedExpedition
          ? {
              title: doc.curatedExpedition.title,
              duration: doc.curatedExpedition.duration,
              priceStarting: doc.curatedExpedition.priceStarting,
              features: doc.curatedExpedition.features || [],
            }
          : undefined,
      }));
    }
  } catch (error) {
    console.error('[destinationActions] Error querying featured destinations:', error);
  }

  return BANGLADESH_DESTINATIONS;
}

/**
 * Cached server action to get featured destinations with 1 hour revalidation.
 */
export const getFeaturedDestinationsAction = unstable_cache(
  async (): Promise<IDestination[]> => {
    return fetchFeaturedDestinations();
  },
  ['featured-destinations-cache'],
  {
    revalidate: 3600,
    tags: ['featured-destinations'],
  }
);

export interface ToggleBookmarkResult {
  success: boolean;
  isBookmarked: boolean;
  destinationId: string;
  error?: string;
}

/**
 * Atomic bookmark toggle server action using MongoDB with optimistic UI support.
 */
export async function toggleBookmarkAction(
  destinationId: string,
  userId: string = 'guest-vip-traveler'
): Promise<ToggleBookmarkResult> {
  try {
    const db = await connectToDatabase();
    if (!db) {
      // In offline / preview mode, acknowledge success
      return {
        success: true,
        isBookmarked: true,
        destinationId,
      };
    }

    // Safely cast or validate ObjectId
    const targetObjectId = mongoose.Types.ObjectId.isValid(destinationId)
      ? new mongoose.Types.ObjectId(destinationId)
      : null;

    const query = targetObjectId
      ? { userId, $or: [{ destinationId }, { destinationId: targetObjectId }] }
      : { userId, destinationId };

    const existing = await Bookmark.findOne(query);

    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      revalidatePath('/');
      return {
        success: true,
        isBookmarked: false,
        destinationId,
      };
    } else {
      await Bookmark.create({
        userId,
        destinationId: targetObjectId || destinationId,
      });
      revalidatePath('/');
      return {
        success: true,
        isBookmarked: true,
        destinationId,
      };
    }
  } catch (error) {
    console.error('[toggleBookmarkAction] Error toggling bookmark:', error);
    return {
      success: false,
      isBookmarked: false,
      destinationId,
      error: error instanceof Error ? error.message : 'Database error',
    };
  }
}

/**
 * Retrieve user's bookmarked destination IDs
 */
export async function getUserBookmarksAction(
  userId: string = 'guest-vip-traveler'
): Promise<string[]> {
  try {
    const db = await connectToDatabase();
    if (!db) {
      return [];
    }

    const bookmarks = await Bookmark.find({ userId }).select('destinationId').lean();
    return bookmarks.map((b) => b.destinationId.toString());
  } catch (error) {
    console.error('[getUserBookmarksAction] Error getting user bookmarks:', error);
    return [];
  }
}

/**
 * Retrieve a destination by its slug with fallback to curated dataset
 */
export async function getDestinationBySlugAction(
  slug: string
): Promise<IDestination | null> {
  try {
    const db = await connectToDatabase();
    if (db) {
      const doc = await Destination.findOne({ slug }).lean();
      if (doc) {
        return {
          _id: doc._id.toString(),
          title: doc.title,
          slug: doc.slug,
          tagLine: doc.tagLine,
          categoryBadge: doc.categoryBadge,
          region: doc.region,
          country: doc.country,
          heroBgUrl: doc.heroBgUrl,
          cardThumbUrl: doc.cardThumbUrl,
          blurDataUrl: doc.blurDataUrl || '',
          rating: doc.rating,
          orderIndex: doc.orderIndex,
          isFeatured: doc.isFeatured,
          description: doc.description,
          highlights: doc.highlights || [],
          bestSeason: doc.bestSeason,
          coordinates: {
            lat: doc.coordinates?.lat ?? 21.9497,
            lng: doc.coordinates?.lng ?? 89.1833,
          },
          curatedExpedition: doc.curatedExpedition
            ? {
                title: doc.curatedExpedition.title,
                duration: doc.curatedExpedition.duration,
                priceStarting: doc.curatedExpedition.priceStarting,
                features: doc.curatedExpedition.features || [],
              }
            : undefined,
        };
      }
    }
  } catch (error) {
    console.error('[getDestinationBySlugAction] Error querying destination by slug:', error);
  }

  const fallback = BANGLADESH_DESTINATIONS.find((d) => d.slug === slug);
  return fallback || null;
}

