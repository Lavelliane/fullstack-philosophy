type CodeVisualProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CodeVisual({ children, className = "" }: CodeVisualProps) {
  return (
    <div className={`min-w-0 w-full border border-zinc-200 rounded-lg p-4 flex flex-col items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
