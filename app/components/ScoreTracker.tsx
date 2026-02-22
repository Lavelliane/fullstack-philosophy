"use client";

import {
  BookOpen,
  Zap,
  TrendingUp,
  Target,
  Star,
  Award,
  Trophy,
  CheckCircle2,
} from "lucide-react";
import { useTopicScore, type TopicId } from "../store/scoreStore";

const TIERS = [
  { min: 0, max: 29, icon: Zap, message: "Just getting started — keep going" },
  {
    min: 30,
    max: 49,
    icon: TrendingUp,
    message: "Building momentum — review what you missed",
  },
  {
    min: 50,
    max: 69,
    icon: Target,
    message: "Solid progress — sharpen the edges",
  },
  {
    min: 70,
    max: 79,
    icon: Star,
    message: "Strong work — you understand the core",
  },
  {
    min: 80,
    max: 89,
    icon: Award,
    message: "Excellent — almost no gaps left",
  },
  {
    min: 90,
    max: 99,
    icon: Trophy,
    message: "Outstanding — deeply internalized",
  },
  {
    min: 100,
    max: 100,
    icon: CheckCircle2,
    message: "Perfect score — every answer correct",
  },
] as const;

type ScoreTrackerProps = {
  topic: TopicId;
};

export default function ScoreTracker({ topic }: ScoreTrackerProps) {
  const { total, correct, percentage } = useTopicScore(topic);

  const tier =
    total === 0
      ? { icon: BookOpen, message: "Complete challenges to see your score" }
      : TIERS.find((t) => percentage !== null && percentage >= t.min && percentage <= t.max);

  const Icon = tier?.icon ?? BookOpen;
  const message = tier?.message ?? "Complete challenges to see your score";

  return (
    <div className="border border-zinc-200 bg-zinc-50/60 p-8 rounded-lg">
      <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-4">
        Your score
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="flex items-baseline gap-3">
          <span
            className="font-light tabular-nums text-zinc-900"
            style={{ fontSize: "clamp(28px, 4vw, 48px)" }}
          >
            {correct} / {total}
          </span>
          {percentage !== null && (
            <span className="text-sm text-zinc-500 font-mono">
              ({percentage}%)
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-white">
            <Icon className="w-4 h-4 text-zinc-600 shrink-0" />
            <span className="text-sm text-zinc-700">{message}</span>
          </div>
        </div>
      </div>

      {total > 0 && (
        <div className="mt-4 h-2 bg-zinc-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-zinc-400 to-emerald-500 transition-all duration-500"
            style={{
              width: `${percentage ?? 0}%`,
            }}
          />
        </div>
      )}
    </div>
  );
}
