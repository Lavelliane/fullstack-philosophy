type ChallengeSectionProps = {
  children: React.ReactNode;
  wide?: boolean;
};

export default function ChallengeSection({ children, wide }: ChallengeSectionProps) {
  return (
    <div
      className="bg-zinc-50 border-t border-zinc-100 flex items-center justify-center px-8 py-16 min-h-[calc(100vh-var(--nav-height,61px))]"
      style={{ scrollSnapAlign: "start" }}
    >
      <div className={`w-full max-w-7xl`}>
        {children}
      </div>
    </div>
  );
}
