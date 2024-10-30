import HeroSignup from '../components/HeroSignup';
import UserSay from '../components/UserSay';
import UserSayCarousel from '../components/UserSayCarousel';
import HowItWorksVertical from '../components/HowItWorksVertical';
import Features from '../components/Features';
import ShareSection from '../components/ShareSection';
import styles from '../styles/LandingPage.module.css';

export default function Home() {

  return (
    <div className={styles.container}>
      {/* Hero Component with Email Signup */}
      <HeroSignup />

      {/* Testimonials Component */}
      <UserSay />

      {/* Testimonials - Carousel Component */}
      <UserSayCarousel />

      {/* How It Works - Stepper vertical scroll component */} 
      <HowItWorksVertical />

      {/* Features */} 
      <Features />

      {/* Sharing site for growth */} 
      <ShareSection />

    </div>
  );
}