export default function ChallengeLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-xs text-zinc-400 uppercase tracking-[0.18em] mb-3">
      {children}
    </p>
  );
}
