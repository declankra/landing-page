/* src/pages/LandingPage.tsx */

import HeroSignup from '../components/HeroSignup';
import UserSay from '../components/UserSay';
import UserSayCarousel from '../components/UserSayCarousel';
import HowItWorksVertical from '../components/HowItWorksVertical';
import Features from '../components/Features';
import ShareSection from '../components/ShareSection';
import FAQDrawer from '../components/FAQDrawer';
import FAQDrawerMT from '../components/FAQDrawerMT';
import LogoClouds from '@/components/LogoClouds';
import Footer from '@/components/Footer';
import ContactUs from '@/components/ContactUs';
import StatsSimple from '../components/StatsSimple';
import SpotlightImage from '../components/SpotlightImage';
import SpotlightVideo from '../components/SpotlightVideo';
import { TextRevealScroll } from '@/components/TextRevealScroll';
import styles from '../styles/LandingPage.module.css';


export default function LandingPage() {

  return (
    <div className={styles.container}>
      {/* Hero Component with Email Signup - modal with supabase connection */}
      <HeroSignup />

      {/* Testimonials Component */}
      <UserSay />

      {/* Testimonials - Carousel Component */}
      <UserSayCarousel />

      {/* How It Works - Stepper vertical scroll component */} 
      <HowItWorksVertical />

      {/* Features */} 
      <Features />

      {/* Fun Logo Clouds for ethos */}
      <LogoClouds />

      {/* Sharing site for reach */} 
      <ShareSection />

      {/* Video Spotlight Comoponent site for reach */} 
      <SpotlightVideo
        title="Experience your problem solved with our solution"
        highlightedText="problem solved"
        highlightColor='var(--mantine-primary-light)'
        videoSrc="https://www.youtube.com/embed/QGIUa2sSYFI"
        thumbnailSrc="/SteveJobs16x9.webp"
        ctaText="See it for yourself"
      />

      {/* Stats component - simple grid row */} 
      <StatsSimple />

      {/* Image spotlight component - reusable configuration */}
      <SpotlightImage
        title="Title to sell customer with the dopest feature, visually"
        imagePath="/HeroBackgroundBox.webp"
        imageAlt="Dopest feature"
      />

      <TextRevealScroll/>

      {/* FAQ Component optimized for SEO */} 
      <FAQDrawer />
      <FAQDrawerMT />

      {/* Contact Us Component - contact form with Supabase connection*/} 
      <ContactUs />

      {/* Footer */} 
      <Footer />


    </div>
  );
}