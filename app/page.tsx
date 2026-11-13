import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import { getAllOutputs } from "@/lib/outputs";

export default function Home() {
  const outputs = getAllOutputs(); // reads public/images/<folder> at build / request time
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Services />
      <Skills />
      <Experience />
      <Projects outputs={outputs} />
      <Education />
      <Certifications />
      <Resume />
      <Contact />
    </>
  );
}
