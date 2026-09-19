import { create } from 'zustand';

interface ShowcaseState {
  activeIndex: number;
  totalSlides: number;
  isPaused: boolean;
  bookmarkedIds: Set<string>;
  setActiveIndex: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  setIsPaused: (isPaused: boolean) => void;
  setTotalSlides: (total: number) => void;
  toggleBookmarkLocal: (id: string) => void;
  initBookmarks: (ids: string[]) => void;
}

export const useShowcaseStore = create<ShowcaseState>((set) => ({
  activeIndex: 0,
  totalSlides: 0,
  isPaused: false,
  bookmarkedIds: new Set<string>(),

  setActiveIndex: (index) => set({ activeIndex: index }),
  nextSlide: () =>
    set((state) => ({
      activeIndex: state.totalSlides === 0 ? 0 : (state.activeIndex + 1) % state.totalSlides,
    })),
  prevSlide: () =>
    set((state) => ({
      activeIndex:
        state.totalSlides === 0
          ? 0
          : (state.activeIndex - 1 + state.totalSlides) % state.totalSlides,
    })),
  setIsPaused: (isPaused) => set({ isPaused }),
  setTotalSlides: (total) => set({ totalSlides: total }),
  toggleBookmarkLocal: (id) =>
    set((state) => {
      const next = new Set(state.bookmarkedIds);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return { bookmarkedIds: next };
    }),
  initBookmarks: (ids) => set({ bookmarkedIds: new Set(ids) }),
}));
