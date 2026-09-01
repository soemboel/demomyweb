import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="scanlines relative min-h-screen overflow-x-clip bg-ink-950 text-mist">
      {/* ambient background layers */}
      <div className="bg-grid pointer-events-none fixed inset-0 z-0" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(700px 420px at 12% -4%, rgba(92,232,164,0.075), transparent 65%), radial-gradient(640px 420px at 92% 12%, rgba(111,214,255,0.055), transparent 65%), radial-gradient(560px 420px at 60% 110%, rgba(255,180,84,0.045), transparent 65%)",
        }}
      />
      <div className="noise-layer pointer-events-none fixed inset-0 z-[60]" aria-hidden="true" />

      <Nav />

      <main className="relative z-10">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Projects />
        <Timeline />
        <Certifications />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
