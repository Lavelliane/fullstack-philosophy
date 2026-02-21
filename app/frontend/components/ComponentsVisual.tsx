"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RotateCcw, MousePointerClick } from "lucide-react";

const STUDENTS = [
  { name: "Ana Reyes", year: 3, gpa: 3.9 },
  { name: "Ben Cruz", year: 2, gpa: 3.5 },
];

const CARD_HEIGHT = "220px";
const CARD_WIDTH = "312px";

const container = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: i * 0.15,
    },
  }),
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

function CardSkeleton() {
  return (
    <motion.div
      className="border-2 border-zinc-300 rounded-lg p-2 bg-white shrink-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-zinc-200 shrink-0" />
        <div className="flex-1 space-y-1">
          <div className="h-2.5 w-16 bg-zinc-200 rounded" />
          <div className="h-2 w-12 bg-zinc-100 rounded" />
        </div>
      </div>
    </motion.div>
  );
}

function StudentCardMini({
  name,
  year,
  gpa,
  i,
}: {
  name: string;
  year: number;
  gpa: number;
  i: number;
}) {
  return (
    <motion.div
      className="border-2 border-zinc-400 rounded-lg p-2 bg-white shrink-0 shadow-sm"
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 + i * 0.15, duration: 0.35, ease: "easeOut" }}
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-zinc-200 shrink-0 flex items-center justify-center">
          <span className="text-[10px] font-mono font-semibold text-zinc-500">{name[0]}</span>
        </div>
        <div>
          <div className="text-xs font-semibold text-zinc-800">{name}</div>
          <div className="text-[10px] text-zinc-500">Year {year} · GPA {gpa}</div>
        </div>
      </div>
    </motion.div>
  );
}

type Revealed = Record<"component" | "props" | "children" | "compose", boolean>;

function CardTrigger({
  label,
  color,
  revealed,
  onReveal,
  children,
}: {
  label: string;
  color: string;
  revealed: boolean;
  onReveal: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`shrink-0 flex flex-col border-2 rounded-lg p-2 relative z-10 transition-all duration-200 ${color} ${!revealed ? "cursor-pointer hover:shadow-md hover:shadow-zinc-500/20" : "cursor-default"}`}
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
      onClick={!revealed ? onReveal : undefined}
    >
      <span className={`inline-block font-mono text-xs px-2 py-0.5 tracking-widest mb-1.5 uppercase ${revealed ? (label === "Component" ? "bg-zinc-900 text-white" : label === "Props" ? "bg-zinc-500 text-white" : label === "Children" ? "bg-zinc-400 text-white" : "bg-zinc-200 text-zinc-800") : "bg-zinc-300 text-zinc-600"}`}>
        {label}
      </span>
      <AnimatePresence mode="wait">
        {revealed ? (
          <motion.div
            key="content"
            className="flex-1 flex flex-col min-h-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="trigger"
            className="flex-1 flex flex-col items-center justify-center min-h-0 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MousePointerClick className="w-5 h-5 text-zinc-400" />
            <span className="text-[10px] text-zinc-500">Click to show</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ComponentsVisual() {
  const [key, setKey] = useState(0);
  const [revealed, setRevealed] = useState<Revealed>({
    component: false,
    props: false,
    children: false,
    compose: false,
  });

  function reveal(id: keyof Revealed) {
    setRevealed((p) => ({ ...p, [id]: true }));
  }

  function reset() {
    setRevealed({ component: false, props: false, children: false, compose: false });
    setKey((k) => k + 1);
  }

  return (
    <div className="relative">
      <motion.button
        onClick={reset}
        className="absolute top-0 right-0 flex items-center gap-1.5 text-[10px] text-zinc-400 hover:text-zinc-600 transition-colors z-20"
        aria-label="Reset and replay"
      >
        <RotateCcw className="w-3 h-3" />
        Reset
      </motion.button>
      <motion.div
        key={key}
        className="flex flex-row flex-nowrap gap-4 items-stretch justify-start overflow-x-auto p-4 max-w-full"
        initial="hidden"
        animate="visible"
        variants={container}
      >
      {/* Component */}
      <motion.div variants={item} className="flex">
      <CardTrigger
        label="Component"
        color="border-zinc-900 bg-zinc-900/5"
        revealed={revealed.component}
        onReveal={() => reveal("component")}
      >
        <div className="flex flex-row gap-1.5 flex-nowrap justify-center">
          <CardSkeleton />
        </div>
        <p className="text-[10px] text-zinc-500 mt-1.5">StudentCard (1 definition)</p>
      </CardTrigger>
      </motion.div>

      {/* Flow arrow */}
      <motion.div
        className="hidden md:flex shrink-0 items-center text-zinc-400 text-lg font-bold"
        variants={item}
      >
        <span>→</span>
      </motion.div>

      {/* Props */}
      <motion.div variants={item} className="flex">
      <CardTrigger
        label="Props"
        color="border-zinc-500 bg-zinc-500/5"
        revealed={revealed.props}
        onReveal={() => reveal("props")}
      >
        <div className="flex flex-row gap-1.5 flex-nowrap justify-center">
          {STUDENTS.map((s, i) => (
            <StudentCardMini key={s.name} name={s.name} year={s.year} gpa={s.gpa} i={i} />
          ))}
        </div>
        <p className="text-[10px] text-zinc-500 mt-1.5">+ 2 data → 2 cards</p>
      </CardTrigger>
      </motion.div>

      {/* Flow arrow */}
      <motion.div
        className="hidden md:flex shrink-0 items-center text-zinc-400 text-lg font-bold"
        variants={item}
      >
        <span>→</span>
      </motion.div>

      {/* Children */}
      <motion.div variants={item} className="flex">
      <CardTrigger
        label="Children"
        color="border-zinc-400 bg-zinc-400/10"
        revealed={revealed.children}
        onReveal={() => reveal("children")}
      >
        <div className="border-2 border-zinc-400 rounded-lg p-2 bg-white flex justify-center">
          <motion.div
            className="rounded-full bg-amber-100 px-3 py-1.5 inline-block border border-amber-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <span className="text-[10px] font-medium text-amber-800">Dean&apos;s List</span>
          </motion.div>
        </div>
        <p className="text-[10px] text-zinc-500 mt-1.5">content between tags</p>
      </CardTrigger>
      </motion.div>

      {/* Flow arrow */}
      <motion.div
        className="hidden md:flex shrink-0 items-center text-zinc-400 text-lg font-bold"
        variants={item}
      >
        <span>→</span>
      </motion.div>

      {/* Compose */}
      <motion.div variants={item} className="flex">
      <CardTrigger
        label="Compose"
        color="border-zinc-300 bg-zinc-200/50"
        revealed={revealed.compose}
        onReveal={() => reveal("compose")}
      >
        <motion.div
          className="border-2 border-zinc-400 rounded-lg overflow-hidden bg-white shadow-sm"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <motion.div
            className="h-7 bg-zinc-800 flex items-center justify-between px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.25 }}
          >
            <span className="text-[9px] font-mono font-medium text-zinc-300">NavBar</span>
            <span className="w-4 h-4 rounded-full bg-zinc-500 border border-zinc-400" />
          </motion.div>
          <div className="p-1.5 flex flex-col gap-1 items-center">
            <motion.div
              className="flex gap-1 flex-nowrap justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {STUDENTS.map((s, i) => (
                <StudentCardMini key={s.name} name={s.name} year={s.year} gpa={s.gpa} i={i} />
              ))}
            </motion.div>
            <motion.span
              className="rounded-full bg-amber-100 px-2 py-0.5 inline-flex w-fit text-[9px] font-medium text-amber-800 border border-amber-200"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
            >
              Dean&apos;s List
            </motion.span>
          </div>
          <motion.div
            className="h-6 bg-zinc-100 flex items-center justify-start px-2 border-t border-zinc-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-[9px] font-mono font-medium text-zinc-600">Footer</span>
          </motion.div>
        </motion.div>
        <p className="text-[10px] text-zinc-500 mt-1.5">Layout + NavBar + StudentCard×2 + Badge + Footer</p>
      </CardTrigger>
      </motion.div>
    </motion.div>
    </div>
  );
}
