type ChallengeSectionProps = {
  children: React.ReactNode;
  wide?: boolean;
};

export default function ChallengeSection({ children, wide }: ChallengeSectionProps) {
  return (
    <div
      className="bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-center px-8 py-16 min-h-[calc(100vh-var(--nav-height,61px))]"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className={`w-full ${wide ? "max-w-5xl" : "max-w-3xl"}`}>
        {children}
      </div>
    </div>
  );
}
