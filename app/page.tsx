import { LanguageProvider } from "./i18n/LanguageProvider";
import SiteNav from "./components/SiteNav";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <LanguageProvider>
      <main>
        <SiteNav />
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SiteFooter />
      </main>
    </LanguageProvider>
  );
}
