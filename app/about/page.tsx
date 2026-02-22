import type { Metadata } from "next";
import { Github, Linkedin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About | The Human Behind the Endpoint",
  description:
    "About Jhury Kevin Lastre and Vince Abella. Software Engineers & Cybersecurity Researchers. Creators of The Human Behind the Endpoint workshop.",
};

function PersonCard({
  name,
  title,
  bio,
  links,
  children,
}: {
  name: string;
  title: string;
  bio: string;
  links: { href: string; label: string; icon: React.ReactNode }[];
  children?: React.ReactNode;
}) {
  return (
    <div className="border border-zinc-200 p-8">
      <div className="mb-2">
        <span className="text-xs text-zinc-400 uppercase tracking-[0.18em]">
          {title}
        </span>
      </div>
      <h2 className="text-2xl font-light tracking-tight text-zinc-900 mb-3">
        {name}
      </h2>
      <p className="text-sm text-zinc-500 leading-[1.85] max-w-2xl mb-6">
        {bio}
      </p>
      <div className="flex flex-wrap gap-4 mb-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors duration-200"
          >
            {link.icon}
            {link.label}
            {link.href.startsWith("http") && (
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            )}
          </a>
        ))}
      </div>
      {children}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <nav className="flex items-center justify-between px-8 py-5 border-b border-zinc-100">
        <a
          href="/"
          className="text-sm font-medium tracking-tight text-zinc-900 hover:text-zinc-500 transition-colors"
        >
          The Human Behind the Endpoint
        </a>
        <div className="flex items-center gap-8 text-sm text-zinc-500">
          <a href="/intro" className="hover:text-zinc-900 transition-colors duration-200">Intro</a>
          <a href="/bridge" className="hover:text-zinc-900 transition-colors duration-200">The Bridge</a>
          <a href="/backend" className="hover:text-zinc-900 transition-colors duration-200">Backend</a>
          <a href="/frontend" className="hover:text-zinc-900 transition-colors duration-200">Frontend</a>
          <span className="text-zinc-900 font-medium">About</span>
        </div>
      </nav>

      <div className="max-w-screen-lg mx-auto px-8 py-20">
        <p className="text-sm text-zinc-500 leading-[1.85] max-w-2xl mb-16">
          This workshop was created to share a philosophical approach to web
          development: understanding the <em>why</em> behind patterns, layers, and
          contracts. No syntax drills, just the thinking that makes better builders.
        </p>

        <div className="flex flex-col gap-16">
          {/* Jhury Kevin Lastre */}
          <PersonCard
            name="Jhury Kevin Lastre"
            title="Creator"
            bio="Software Engineer & Cybersecurity Researcher based in Seoul, South Korea. Building secure systems and researching 5G/6G security protocols at MobiSec Lab, Kookmin University. Leading OWASP Cebu and bridging academic research with practical security solutions."
            links={[
              {
                href: "https://github.com/Lavelliane",
                label: "GitHub",
                icon: <Github className="w-4 h-4" />,
              },
              {
                href: "https://jhury-lastre.bio",
                label: "Website",
                icon: <ExternalLink className="w-3.5 h-3.5" />,
              },
              {
                href: "https://www.linkedin.com/in/jhury-kevin-lastre-3bb6541aa/",
                label: "LinkedIn",
                icon: <Linkedin className="w-4 h-4" />,
              },
            ]}
          >
            <div className="space-y-10">
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
                  Work experience
                </p>
                <ul className="space-y-3 text-sm text-zinc-600">
                  <li>
                    <strong className="text-zinc-900">Cybersecurity Researcher</strong> @ MobiSec Lab, Kookmin University
                    <span className="text-zinc-400"> · Seoul, South Korea (Sep 2024 – Present)</span>
                  </li>
                  <li>
                    <strong className="text-zinc-900">Lead Software Engineer</strong> @ Tax Maverick Software
                    <span className="text-zinc-400"> · Texas, United States (Aug 2024 – Present)</span>
                  </li>
                  <li>
                    <strong className="text-zinc-900">Software Development Engineer</strong> @ Lanex Corporation
                    <span className="text-zinc-400"> · Metro Cebu, Philippines (Sep 2023 – Jun 2024)</span>
                  </li>
                  <li>
                    <strong className="text-zinc-900">Full Stack Developer</strong> @ Purple Cow, WebriQ Technologies
                    <span className="text-zinc-400"> · Metro Cebu, Philippines</span>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
                  Publications
                </p>
                <ul className="space-y-2 text-sm text-zinc-600">
                  <li>
                    <strong className="text-zinc-900">Revisiting M2M RSP Protocol</strong> — First integrated security and performance analysis using formal verification. <em>Alexandria Engineering Journal (Elsevier), 2026</em>
                  </li>
                  <li>
                    <strong className="text-zinc-900">Towards 6G Roaming Security</strong> — Experimental analysis of SUCI-based DoS attacks. <em>Applied Sciences (MDPI), 2026</em>
                  </li>
                  <li>
                    <strong className="text-zinc-900">5G Intrusion Detection System</strong> — Deep learning framework for cloud-native 5G core. <em>Computer Modeling in Engineering & Sciences, 2025</em>
                  </li>
                  <li>
                    <strong className="text-zinc-900">TLS 1.3 Optimization for 5G</strong> — Zero Round Trip Time Forward Secrecy for cross-border roaming. <em>Sensors (MDPI), 2025</em>
                  </li>
                  <li>
                    <strong className="text-zinc-900">Formal Verification of RSP</strong> — BAN Logic verification of Common Mutual Authentication. <em>IEEE ICCT Pacific, 2025</em>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
                  Workshops & speaking
                </p>
                <p className="text-sm text-zinc-500 leading-[1.85]">
                  Practical API Hacking, Full Stack Generative AI Apps, Building Flexible
                  Websites, React.js, Firebase, Git to the Cloud, and more. Google DevFest
                  Cebu, OWASP Cebu, GDSC, Microsoft Learn Student Ambassador.
                </p>
              </div>
            </div>
          </PersonCard>

          {/* Vince Abella  - Frontend*/}
          <PersonCard
            name="Vince Abella"
            title="Creator"
            bio="Software Engineer, Web Developer & Cybersecurity Specialist. OWASP Cebu Co-Lead with a Master's in Cybersecurity. Research focus: fake base station detection, Markov chains, federated learning, and specification-based IDS. Also working on Machine Learning for Dynamic Shortest Path Finding. Full-stack developer with Python, PHP, React, and Tailwind."
            links={[
              {
                href: "https://github.com/roastedbeans",
                label: "GitHub",
                icon: <Github className="w-4 h-4" />,
              },
              {
                href: "https://www.linkedin.com/in/vinch05/",
                label: "LinkedIn",
                icon: <Linkedin className="w-4 h-4" />,
              },
            ]}
          >
            <div className="space-y-10">
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
                  Work experience
                </p>
                <ul className="space-y-3 text-sm text-zinc-600">
                  <li>
                    <strong className="text-zinc-900">Cybersecurity Researcher</strong> @ MobiSec Lab, Kookmin University
                    <span className="text-zinc-400"> · Seoul, South Korea (Sep 2024 – Present)</span>
                  </li>
                  <li>
                    <strong className="text-zinc-900">Software Developer</strong> @ Techflow.ai GmbH
                    <span className="text-zinc-400"> · Germany (Aug 2024 – Present, Part-time, Remote)</span>
                    <p className="text-zinc-500 mt-1 text-xs">
                      UI/UX design for internal software backend. Development with no-code web platform.
                    </p>
                  </li>
                  <li>
                    <strong className="text-zinc-900">Software Developer</strong> @ Mod Technologies
                    <span className="text-zinc-400"> · Denver, United States (May 2024 – Present, Part-time, Remote)</span>
                    <p className="text-zinc-500 mt-1 text-xs">
                      E-commerce store with GraphQL and Next.js. POS system with React.js and Node.js.
                    </p>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-[0.15em] mb-3">
                  Publications
                </p>
                <ul className="space-y-2 text-sm text-zinc-600">
                  <li>
                    <strong className="text-zinc-900">Machine Learning-Assisted Dynamic Proximity-Driven Sorting Algorithm for Supermarket Navigation Optimization</strong> — A simulation-based validation. <em>Future Internet, 2024</em>
                  </li>
                </ul>
              </div>
            </div>
          </PersonCard>
        </div>

        <div className="mt-16">
          <a
            href="/"
            className="text-sm text-zinc-400 hover:text-zinc-900 transition-colors duration-200"
          >
            ← Back to workshop
          </a>
        </div>
      </div>
    </div>
  );
}
