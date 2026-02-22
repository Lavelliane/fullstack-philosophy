import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

export type TopicId = "backend" | "frontend";

type ScoreStore = {
  results: Record<string, { correct: boolean }>;
  recordAnswer: (id: string, correct: boolean) => void;
};

export const useScoreStore = create<ScoreStore>((set) => ({
  results: {},
  recordAnswer: (id, correct) =>
    set((state) => {
      if (state.results[id]) return state;
      return {
        results: { ...state.results, [id]: { correct } },
      };
    }),
}));

export function useTopicScore(topic: TopicId) {
  return useScoreStore(
    useShallow((state) => {
      const entries = Object.entries(state.results).filter(([key]) =>
        key.startsWith(`${topic}:`)
      );
      const total = entries.length;
      const correct = entries.filter(([, v]) => v.correct).length;
      const percentage = total > 0 ? Math.round((correct / total) * 100) : null;
      return { total, correct, percentage };
    })
  );
}
