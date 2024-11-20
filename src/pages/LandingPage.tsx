/* src/pages/LandingPage.tsx */
import HeroSignup from '../components/HeroSignup';
import UserSay from '../components/UserSay';
import UserSayCarousel from '../components/UserSayCarousel';
import HowItWorksVertical from '../components/HowItWorksVertical';
import Features from '../components/Features';
import ShareSection from '../components/ShareSection';
import FAQDrawerMT from '../components/FAQDrawerMT';
import LogoClouds from '@/components/LogoClouds';
import Footer from '@/components/Footer';
import ContactUs from '@/components/ContactUs';
import StatsSimple from '../components/StatsSimple';
import SpotlightImage from '../components/SpotlightImage';
import SpotlightVideo from '../components/SpotlightVideo';
import ScrollVelocityWrapper from '@/components/scroll-velocity-wrapper';
import FinalSell from '../components/FinalSell';
import MarqueeCardDisplay from '@/components/MarqueeCardDisplay';
import ComparisonTable from '@/components/ComparisonTable';
import { TextRevealScroll } from '@/components/TextRevealScroll';
import NavigationHeader from '../components/NavigationHeader';
import ThreeCardHorizontal from '@/components/ThreeCardHorizontal';
import styles from '../styles/LandingPage.module.css';
import { useState } from 'react';
import { Button } from '@mantine/core';
import { MantineSignupModal } from '@/components/mantine-signup-modal';



export default function LandingPage() {

  const navigationLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Demo", href: "#demo" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" }
    // Only include sections you want in navigation
  ];

  const [opened, setOpened] = useState(false);


  return (
    <div className={styles.pageWrapper}>

      {/* Pass navigation links to header */}
      <NavigationHeader links={navigationLinks} />


      <main className={styles.mainWrapper}>
      <section className={styles.sectionFullWidth}>
        {/* Hero Component with Email Signup - modal with supabase connection */}
        <HeroSignup />

        <Button onClick={() => setOpened(true)} >
        Sign Up
      </Button>

      <MantineSignupModal
        opened={opened}
        onClose={() => setOpened(false)}
      />

      </section>

      
      
      <section className={styles.sectionAlt}>
        {/* Testimonials Component */}
        <UserSay />
      </section>


      <section className={styles.sectionFullWidth}>
        {/* Main emotional/outcome sell - text based, animated component */}
        <ScrollVelocityWrapper 
          text="This, not that."
          velocity={4}
          className="bg-background text-color-3 animate-pulse shadow-[0_0_15px_rgba(var(--color-3),0.5)]"
        />
      </section>

    
      
      <section id="testimonials" className={styles.sectionFullWidth}>
        {/* Testimonials - Carousel Component */}
        <UserSayCarousel />

        {/* Scrolling Marque Card Wrapper Component - show problem-centric statement, pain point questions, or testomonials */} 
        <MarqueeCardDisplay />
      </section>

      


      
      <section id="how-it-works" className={styles.sectionAlt}>
        {/* How It Works - Stepper vertical scroll component */} 
        <HowItWorksVertical />
        
        {/* Three Card Horizontal - static component */} 
        <ThreeCardHorizontal />
      </section>


      
      <section id="features" className={styles.section}>
        {/* Features Component - Card Grid*/} 
        <Features />
      </section>

      <section className={styles.sectionAlt}>
      {/* Fun Logo Clouds for ethos */}
      <LogoClouds />

      {/* Sharing site for reach */} 
      <ShareSection />
      </section>

      <section id="demo" className={styles.section}>
      {/* Video Spotlight Comoponent site for reach */} 
      <SpotlightVideo
        title="Experience your problem solved with our solution"
        highlightedText="problem solved"
        highlightColor='var(--mantine-primary)'
        videoSrc="https://www.youtube.com/embed/QGIUa2sSYFI"
        thumbnailSrc="/SteveJobs16x9.webp"
        ctaText="See it for yourself"
      />
      </section>


      
      <section className={styles.sectionAlt}>
        {/* Stats component - simple grid row */} 
        <StatsSimple />
      </section>

      
      <section className={styles.section}>
        {/* Image spotlight component - reusable configuration */}
        <SpotlightImage
          title="Title to sell customer with the dopest feature, visually"
          imagePath="/HeroBackgroundBox.webp"
          imageAlt="Dopest feature"
        />
      </section>

      
      <section className={styles.sectionFullWidth}>
        {/* Fancy animated text that reveals itself in center of screen while user scrolls */}
        <TextRevealScroll/>
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

      <section id="contact" className={styles.sectionAlt}>
        {/* Contact Us Component - contact form with Supabase connection*/} 
        <ContactUs />
      </section>

       
      <section className={styles.section}>
        {/* Finall Sell Component - large call to action */}
        <FinalSell 
        title="Your compelling final pitch"
        subtitle="The clear value-add of joining"
        ctaText="Start {it} Now"
        onCtaClick={() => {
        // Your conversion tracking/signup logic
          }}
        />
      </section>
      </main>

      <Footer />
    </div>
  );
}