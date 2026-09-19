import { create } from 'zustand';
import { IDestination } from '@/lib/models/Destination';

interface HeroState {
  destinations: IDestination[];
  activeIndex: number;
  isTransitioning: boolean;
  isPaused: boolean;
  slideDurationMs: number;
  progress: number;
  bookmarkedIds: string[];
  activeModalDestination: IDestination | null;
  isBookmarksDrawerOpen: boolean;
  isSoundscapePlaying: boolean;

  // Actions
  setDestinations: (destinations: IDestination[]) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  setIsPaused: (paused: boolean) => void;
  setProgress: (progress: number) => void;
  setIsTransitioning: (transitioning: boolean) => void;
  setBookmarkedIds: (ids: string[]) => void;
  toggleBookmarkOptimistic: (destinationId: string) => boolean;
  openExpeditionModal: (destination: IDestination) => void;
  closeExpeditionModal: () => void;
  toggleBookmarksDrawer: () => void;
  toggleSoundscape: () => void;
}

export const useHeroStore = create<HeroState>((set, get) => ({
  destinations: [],
  activeIndex: 0,
  isTransitioning: false,
  isPaused: false,
  slideDurationMs: 6000,
  progress: 0,
  bookmarkedIds: [],
  activeModalDestination: null,
  isBookmarksDrawerOpen: false,
  isSoundscapePlaying: false,

  setDestinations: (destinations) => set({ destinations }),

  nextSlide: () => {
    const { activeIndex, destinations, isTransitioning } = get();
    if (isTransitioning || destinations.length === 0) return;

    set({ isTransitioning: true, progress: 0 });
    const nextIdx = (activeIndex + 1) % destinations.length;
    set({ activeIndex: nextIdx });

    setTimeout(() => {
      set({ isTransitioning: false });
    }, 600);
  },

  prevSlide: () => {
    const { activeIndex, destinations, isTransitioning } = get();
    if (isTransitioning || destinations.length === 0) return;

    set({ isTransitioning: true, progress: 0 });
    const prevIdx = (activeIndex - 1 + destinations.length) % destinations.length;
    set({ activeIndex: prevIdx });

    setTimeout(() => {
      set({ isTransitioning: false });
    }, 600);
  },

  goToSlide: (index: number) => {
    const { activeIndex, destinations, isTransitioning } = get();
    if (isTransitioning || index === activeIndex || index < 0 || index >= destinations.length) return;

    set({ isTransitioning: true, progress: 0, activeIndex: index });

    setTimeout(() => {
      set({ isTransitioning: false });
    }, 600);
  },

  setIsPaused: (paused: boolean) => set({ isPaused: paused }),

  setProgress: (progress: number) => set({ progress }),

  setIsTransitioning: (transitioning: boolean) => set({ isTransitioning: transitioning }),

  setBookmarkedIds: (ids: string[]) => set({ bookmarkedIds: ids }),

  toggleBookmarkOptimistic: (destinationId: string) => {
    const { bookmarkedIds } = get();
    const exists = bookmarkedIds.includes(destinationId);
    const newIds = exists
      ? bookmarkedIds.filter((id) => id !== destinationId)
      : [...bookmarkedIds, destinationId];

    set({ bookmarkedIds: newIds });
    return !exists;
  },

  openExpeditionModal: (destination: IDestination) => {
    set({ activeModalDestination: destination, isPaused: true });
  },

  closeExpeditionModal: () => {
    set({ activeModalDestination: null, isPaused: false });
  },

  toggleBookmarksDrawer: () => {
    set((state) => ({ isBookmarksDrawerOpen: !state.isBookmarksDrawerOpen }));
  },

  toggleSoundscape: () => {
    set((state) => ({ isSoundscapePlaying: !state.isSoundscapePlaying }));
  },
}));
