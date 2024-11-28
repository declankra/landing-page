/* src/pages/LandingPage.tsx */

// import CustomBackgroundImage from './CustomBackgroundImage' // Optional: Hero custom background component
import HeroCenteredBackgroundImage from '../components/sections/HeroCenteredBackgroundImage'
// import HeroSignup from '../components/HeroSignup'; // Hero component variant with Email Signup - internal modal with supabase connection
import UserSay from '../components/sections/UserSay';
import UserSayCarousel from '../components/sections/UserSayCarousel';
import HowItWorksVertical from '../components/sections/HowItWorksVertical';
import Features from '../components/sections/Features';
import ShareSection from '../components/sections/ShareSection';
import FAQDrawerMT from '../components/sections/FAQDrawerMT';
import LogoClouds from '../components/sections/LogoClouds';
import Footer from '../components/layout/Footer';
import ContactUs from '@/components/sections/ContactUs';
import StatsSimple from '../components/sections/StatsSimple';
import SpotlightImage from '../components/sections/SpotlightImage';
import SpotlightVideo from '../components/sections/SpotlightVideo';
import ScrollVelocityWrapper from '@/components/sections/scroll-velocity-wrapper';
import FinalSell from '../components/sections/FinalSell';
import MarqueeCardDisplay from '@/components/sections/MarqueeCardDisplay';
import ComparisonTable from '@/components/sections/ComparisonTable';
import { TextRevealScroll } from '@/components/sections/TextRevealScroll';
import NavigationHeader from '../components/layout/NavigationHeader';
import ThreeCardHorizontal from '@/components/sections/ThreeCardHorizontal';
import WhyProductWorks from '@/components/sections/WhyItWorks';
import Testimonials from '@/components/sections/Testimonials';
import styles from '@/styles/components/LandingPage.module.css';

export default function LandingPage() {

  const navigationLinks = [
    { label: "Testimonials", href: "#testimonials" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Demo", href: "#demo" },
    { label: "Features", href: "#features" },
    { label: "Contact", href: "#contact" },
    { label: "FAQ", href: "#faq" },
    // Only include sections you want in navigation
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Pass navigation links to header */}
      <NavigationHeader links={navigationLinks} />

      <main className={styles.mainWrapper}>
        <section className={styles.sectionFullWidth}>
          {/* Hero Component Variant - Background Image with centered text and no initial email input */}
          <HeroCenteredBackgroundImage
            title="Ideas need action, not excuses"
            subtitle={{
              type: 'checklist',
              checklistTitle: 'Now you can:',
              checklistItems: [
                { text: 'Validate ideas faster' },
                { text: 'Focus on users, not tech' },
                { text: 'Easily scale your winning product' },
              ],
              highlightedWord: 'you',
              tooltipText: 'Yeah, you. The overthinker with ideas too great to waste.'
            }}
            // backgroundImage={CustomBackgroundImage} // Optional: Use a custom background image
            primaryButtonText="Get Early Access"
            // primaryButtonHref="/signup" // if not using signup modal component
            secondaryButtonText="Learn More"
            secondaryButtonHref="https://declankramper.notion.site/validateidea-now-guide"
          />
        </section>


        <section id="testimonials" className={styles.section}>
        <Testimonials 
          title="Your Idea Just Got Real"
          subtitle="TESTIMONIALS"
        />
        </section>


        <section className={styles.sectionFullWidth}>
          {/* Main emotional/outcome sell - text based, animated component */}
          <ScrollVelocityWrapper
            text="Stop thinking. Start Building."
            velocity={4}
            className="bg-background text-color-3 animate-pulse shadow-[0_0_15px_rgba(var(--color-3),0.5)]"
          />
        </section>


        <section id="how-it-works" className={styles.sectionAlt}>
          {/* Three Card Horizontal - static component */}
          <ThreeCardHorizontal 
            title="Discover your idea's potential in three steps"
            steps={[
              {
                number: 1,
                title: "View the guide",
                description: "Signup with your email to get access to the guide for free.",
                imagePath: "/images/step1-placeholder.webp",
                imageAlt: "Step 1 visualization"
              },
              {
                number: 2,
                title: "Launch your landing page",
                description: "Use the guide to launch your landing page and start validating your idea with the product-led approach to understanding your users.",
                imagePath: "/images/step2-placeholder.webp",
                imageAlt: "Step 2 visualization"
              },
              {
                number: 3,
                title: "Validate your idea",
                description: "Given the data you've collected on user interest, decide if it's worth building further.",
                imagePath: "/images/step3-placeholder.webp",
                imageAlt: "Step 3 visualization"
              }
            ]}
          />
        </section>


        <section id="demo" className={styles.section}>
          {/* Video Spotlight Comoponent site for reach */}
          <SpotlightVideo
            title="Experience your problem solved with our solution"
            highlightedText="problem solved"
            highlightColor='var(--mantine-primary)'
            videoSrc="https://www.youtube.com/embed/QGIUa2sSYFI"
            thumbnailSrc="/images/SteveJobs16x9.webp"
            ctaText="Do it for yourself"
          />
        </section>


        <section id="features" className={styles.section}>
          {/* Features Component - Card Grid*/}
          <Features />
        </section>
        

        <section className={styles.section}>
          {/* Sharing site for reach */}
          <ShareSection />
        </section>


        <section id="contact" className={styles.sectionAlt}>
          {/* Contact Us Component - contact form with Supabase connection*/}
          <ContactUs />
        </section>


        <section className={styles.sectionFullWidth}>
          {/* Fancy animated text that reveals itself in center of screen while user scrolls */}
          <TextRevealScroll 
            text="Custom components built to sell your idea."
          />
        </section>


        <section className={styles.sectionFullWidth}>
          {/* Testimonials - Carousel Component */}
          <UserSayCarousel />

          {/* Scrolling Marque Card Wrapper Component - show problem-centric statement, pain point questions, or testomonials */}
          <MarqueeCardDisplay />
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
          {/* How It Works - Stepper vertical scroll component */}
          <HowItWorksVertical />
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


        <section className={styles.section}>
          {/* Finall Sell Component - large call to action */}
          <FinalSell
            title="Your compelling final pitch"
            subtitle="The clear value-add of using product"
            ctaText="Start {JTBD} now"
            onCtaClick={() => {
              // Your conversion tracking/signup logic, defaults to signup modal
            }}
          />
        </section>
      </main>

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