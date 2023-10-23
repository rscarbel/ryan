import Hero from "./hero";
import About from "./about";
import Skills from "./skills";
import Testimonials from "./testimonials";
import "./original.css";
import "primereact/resources/themes/saga-blue/theme.css";

export default async function OriginalTheme() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Testimonials />
    </>
  );
}
