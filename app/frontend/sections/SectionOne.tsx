import SectionHeader from "../components/SectionHeader";

export default function SectionOne() {
  return (
    <section id="s1" className="py-20">
      <SectionHeader
        number="01"
        label="The Browser as Runtime"
        heading="Your code runs in someone else's machine."
        time="5 min"
      />

      <p className="text-sm text-zinc-500 leading-[1.85] max-w-7xl mb-6">
        Every frontend you build executes inside the user&apos;s browser. Not your
        server. Not your cloud. Their device, their network, their constraints.
        The browser is a runtime with its own rules: HTML structures, CSS
        styles, JavaScript logic. Understanding that boundary is the first step
        to thinking like a frontend engineer.
      </p>
      <p className="text-sm text-zinc-500 leading-[1.85] max-w-7xl">
        The backend sends data. The frontend turns it into an experience. That
        translation is where most of the human interaction happens.
      </p>
    </section>
  );
}
