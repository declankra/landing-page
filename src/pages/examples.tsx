// src/pages/examples.tsx
import NavigationHeader from '@/components/layout/NavigationHeader';
import Footer from '@/components/layout/Footer';
import styles from '@/styles/components/LandingPage.module.css';
import UserSayCarousel from '@/components/sections/UserSayCarousel';
import MarqueeCardDisplay from '@/components/sections/MarqueeCardDisplay';
import WhyProductWorks from '@/components/sections/WhyItWorks';
import UserSay from '@/components/sections/UserSay';
import LogoClouds from '@/components/sections/LogoClouds';
import StatsSimple from '@/components/sections/StatsSimple';
import HowItWorksVertical from '@/components/sections/HowItWorksVertical';
import SpotlightImage from '@/components/sections/SpotlightImage';
import ComparisonTable from '@/components/sections/ComparisonTable';
import FAQDrawerMT from '@/components/sections/FAQDrawerMT';

// Add navigation links for Examples page
const navigationLinks = [
    { label: "Home", href: "/" },  // Changed from '#' to '/'
  // Add any other navigation links specific to examples page
];

export default function ExamplesPage() {
  return (
    <div className={styles.pageWrapper}>
      {/* Reuse same header with different navigation */}
      <NavigationHeader links={navigationLinks} />

      <main className={styles.mainWrapper}>
        {/* Add your examples content here */}
        <section className={styles.section}>
          <h1>Component Examples</h1>
        </section>


        <section className={styles.sectionFullWidth}>
          {/* Testimonials - Carousel Component */}
          <UserSayCarousel />

          {/* Scrolling Marque Card Wrapper Component - show problem-centric statement, pain point questions, or testomonials */}
          <MarqueeCardDisplay />
        </section>

        <section className={styles.section}>
          {/* How It Works - Stepper vertical scroll component */}
          <HowItWorksVertical />
        </section>


        <section className={styles.section}>
          {/* Value Proposition Component */}
          <WhyProductWorks />

          {/* Testimonials Component */}
          <UserSay />
        </section>


        <section className={styles.sectionAlt}>
          {/* Fun Logo Clouds for ethos */}
          <LogoClouds />

          {/* Stats component - simple grid row */}
          <StatsSimple />
        </section>



        <section className={styles.section}>
          {/* Image spotlight component - reusable configuration */}
          <SpotlightImage
            title="Title to sell customer with the dopest feature, visually"
            imagePath="/backgrounds/HeroBackgroundBox.webp"
            imageAlt="Dopest feature"
          />
        </section>


        <section className={styles.sectionAlt}>
          {/* Comparison Table component - table format to highlight your unique offering compared to competitors */}
          <ComparisonTable
            title="Why we're different: The {highlighted} choice"
            highlightedWord="uniquely better"
            competitors={["Product A", "Product B", "Product C"]}
          />
        </section>


        <section id="faq" className={styles.section}>
          {/* FAQ Component optimized for SEO */}
          <FAQDrawerMT />
        </section>

      </main>

      {/* Reuse same footer */}
      <Footer
        builderName="Declan"
        creatorUrl="https://www.declankramper.me"
        companyName="dkBuilds"
        socials={{
          twitter: "https://x.com/asbestostrades",
          // facebook: "https://facebook.com/example",
          linkedin: "https://www.linkedin.com/in/declan-kramper/",
          instagram: "https://instagram.com/dkramper",
          // youtube: "https://youtube.com/@example",
          producthunt: "https://www.producthunt.com/@declan_kramper",
          // reddit: "https://reddit.com/@example",
          github: "https://github.com/declankra"
        }}
      />    
    </div>
  );
}