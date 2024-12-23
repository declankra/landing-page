// src/pages/examples.tsx
import Head from 'next/head';

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
import { Title } from '@/components/shared/title';

// {{REPLACE_CONFIG}} - Update these values for your product
const pageConfig = {
  title: 'Examples | ValidateIdea',
  description: 'See real-world examples of how ValidateIdea helps launch and test new products.'
};

export async function getStaticProps() {
  const navigationLinks = [
    { label: "Home", href: "/", type: "page" }
  ];

  return {
    props: {
      navigationLinks
    }
  };
}

export default function ExamplesPage() {
  return (
    <>
      <Head>
        {/* Only page-specific meta tags */}
        <title>{pageConfig.title}</title>
        <meta name="description" content={pageConfig.description} />
        {/* These override the defaults from _document.tsx */}
      </Head>

      <section className={styles.section}>
        <Title
          title="Easily Configurable Components"
          subtitle="EXAMPLES"
          action={{
            text: "✨ View a page built with this codebase",
            type: "shiny-text",
            href: "https://www.wakeupwardly.com",
            position: "bottom"
          }}
        />
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

    </>

  );
}
