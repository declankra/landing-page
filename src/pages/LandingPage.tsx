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
import styles from '../styles/LandingPage.module.css';


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

  return (
    <div className={styles.container}>
      {/* Pass navigation links to header */}
      <NavigationHeader links={navigationLinks} />

      {/* Hero Component with Email Signup - modal with supabase connection */}
      <HeroSignup />

      {/* Testimonials Component */}
      <UserSay />

      {/* Main emotional/outcome sell - text based, animated component */}
      <ScrollVelocityWrapper 
        text="This, not that."
        velocity={4}
        className="bg-background text-color-3 animate-pulse shadow-[0_0_15px_rgba(var(--color-3),0.5)]"
      />
      <section id="testimonials">
      {/* Testimonials - Carousel Component */}
      <UserSayCarousel />
      </section>

      <section id="how-it-works">
      {/* How It Works - Stepper vertical scroll component */} 
      <HowItWorksVertical />
      </section>


      <section id="features">
      {/* Features Component - Card Grid*/} 
      <Features />
      </section>

      {/* Scrolling Marque Card Wrapper Component - show problem-centric statement, pain point questions, or testomonials */} 
      <MarqueeCardDisplay />

      {/* Fun Logo Clouds for ethos */}
      <LogoClouds />

      {/* Sharing site for reach */} 
      <ShareSection />

      <section id="demo">
      {/* Video Spotlight Comoponent site for reach */} 
      <SpotlightVideo
        title="Experience your problem solved with our solution"
        highlightedText="problem solved"
        highlightColor='var(--mantine-primary-light)'
        videoSrc="https://www.youtube.com/embed/QGIUa2sSYFI"
        thumbnailSrc="/SteveJobs16x9.webp"
        ctaText="See it for yourself"
      />
      </section>


      {/* Stats component - simple grid row */} 
      <StatsSimple />


      {/* Image spotlight component - reusable configuration */}
      <SpotlightImage
        title="Title to sell customer with the dopest feature, visually"
        imagePath="/HeroBackgroundBox.webp"
        imageAlt="Dopest feature"
      />


      {/* Fancy animated text that reveals itself in center of screen while user scrolls */}
      <TextRevealScroll/>


      {/* Comparison Table component - table format to highlight your unique offering compared to competitors */}
      <ComparisonTable
        title="Why we're different: The {highlighted} choice"
        highlightedWord="uniquely better"
        competitors={["Product A", "Product B", "Product C"]}
      />

      <section id="faq">
      {/* FAQ Component optimized for SEO */} 
      <FAQDrawerMT />
      </section>

      <section id="contact">
      {/* Contact Us Component - contact form with Supabase connection*/} 
      <ContactUs />
      </section>

      {/* Finall Sell Component - large call to action */} 
      <FinalSell 
      title="Your compelling final pitch"
      subtitle="The clear value-add of joining"
      ctaText="Start {it} Now"
      onCtaClick={() => {
      // Your conversion tracking/signup logic
        }}
      />

      {/* Footer */} 
      <Footer />


    </div>
  );
}