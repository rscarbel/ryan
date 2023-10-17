import Hero from "./hero";
import About from "./about";
import Skills from "./skills";
import Projects from "./projects";
import Testimonials from "./testimonials";
import "./original.css";

export default async function OriginalTheme() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Testimonials />
    </>
  );
}
