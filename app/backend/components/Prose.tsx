type ProseProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Prose({ children, className = "" }: ProseProps) {
  return (
    <p
      className={`text-sm text-zinc-500 leading-[1.85] max-w-2xl mb-6 ${className}`}
    >
      {children}
    </p>
  );
}

export function ProseBlock({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6 mb-8">{children}</div>;
}
