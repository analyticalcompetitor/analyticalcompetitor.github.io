import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import SiteFooter from "./components/SiteFooter";
import SiteNav from "./components/SiteNav";

export default function Home() {
  return (
    <main>
      <SiteNav />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <SiteFooter />
    </main>
  );
}
