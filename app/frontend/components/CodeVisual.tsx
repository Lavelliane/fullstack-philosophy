type CodeVisualProps = {
  children: React.ReactNode;
  className?: string;
};

export default function CodeVisual({ children, className = "" }: CodeVisualProps) {
  return (
    <div className={` ${className}`}>
      {children}
    </div>
  );
}
