import SectionHeader from "../components/SectionHeader";

export default function SectionTwo() {
  return (
    <section id="s2" className="py-20">
      <SectionHeader
        number="02"
        label="Coming soon"
        heading="Section placeholder"
      />

      <div className="border border-dashed border-zinc-200 p-12 text-center">
        <p className="text-sm text-zinc-400">
          More content on the way. This section is under construction.
        </p>
      </div>
    </section>
  );
}
