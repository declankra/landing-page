// src/pages/index.tsx

// import CustomBackgroundImage from './CustomBackgroundImage' // Optional: Hero custom background component
import HeroCenteredBackgroundImage from '../components/sections/HeroCenteredBackgroundImage'
// import HeroSignup from '../components/HeroSignup'; // Hero component variant with Email Signup - internal modal with supabase connection
import Features from '../components/sections/Features';
import ShareSection from '../components/sections/ShareSection';
import ContactUs from '@/components/sections/ContactUs';
import SpotlightVideo from '../components/sections/SpotlightVideo';
import ScrollVelocityWrapper from '@/components/sections/scroll-velocity-wrapper';
import FinalSell from '../components/sections/FinalSell';
import { TextRevealScroll } from '@/components/sections/TextRevealScroll';
import ThreeCardHorizontal from '@/components/sections/ThreeCardHorizontal';
import Testimonials from '@/components/sections/Testimonials';
import styles from '@/styles/components/LandingPage.module.css';
import ImageMarqueeVertical from '@/components/sections/ImageMarqueeVertical';

export async function getStaticProps() {
  const navigationLinks = [
    { label: "Testimonials", href: "#testimonials", type: "section" },
    { label: "How It Works", href: "#how-it-works", type: "section" },
    { label: "Demo", href: "#demo", type: "section" },
    { label: "Features", href: "#features", type: "section" },
    { label: "Contact", href: "#contact", type: "section" },
    { label: "Examples", href: "/examples", type: "page" }
  ];

  return {
    props: {
      navigationLinks
    }
  };
}

export default function Home() {

  return (
    <>
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
              title: "Clone the codebase",
              description: "Signup with your email to get free, instant access to the guide and codebase.",
              imagePath: "/images/howItWorks/step1.webp",
              imageAlt: "Step 1 visualization"
            },
            {
              number: 2,
              title: "Launch your landing page",
              description: "Use the guide and codebase to go live with a product-led approach to understanding your users.",
              imagePath: "/images/howItWorks/step2.webp",
              imageAlt: "Step 2 visualization"
            },
            {
              number: 3,
              title: "Validate your idea",
              description: "Given the data you've collected on user interest, decide if it's worth building further.",
              imagePath: "/images/howItWorks/step3.webp",
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
          hideButton={true}
        />
      </section>


      <section id="features" className={styles.sectionAlt}>
        {/* Features Component - Card Grid*/}
        <Features 
          title="Everything you need to build something people love"
          subtitle="Features"
        />
      </section>


      <section className={styles.section}>
        {/* Image Marquee Component - vertical scrolling images */}
      <ImageMarqueeVertical
        title="Custom components to sell your idea"
        subtitle='Free, forever'
        actionText="See Examples"
        actionUrl="/examples"
        images={[
            { src: "/images/examples/usersay.webp", alt: "User Say component" },
            { src: "/images/examples/table.webp", alt: "Table component" },
            { src: "/images/examples/ValueProp.webp", alt: "Value Prop component" },
            { src: "/images/examples/howitworks.webp", alt: "How It Works component" },
          ]}
        />
      </section>


      <section className={styles.sectionFullWidth}>
        {/* Fancy animated text that reveals itself in center of screen while user scrolls */}
        <TextRevealScroll
          text="Scrolling won't solve your problem."
        />
      </section>


      <section className={styles.section}>
        {/* Sharing site for reach */}
        <ShareSection 
          title = "Invite a Friend! Share the power of taking action"
          subtext = "Help your friends start building things people love too"
          trackingUrl = "https://www.validateidea.now"
          productName = "ValidateIdea"
          coreBenefit = "quickly launch and validate your ideas now"
        />
      </section>


      <section id="contact" className={styles.sectionAlt}>
        {/* Contact Us Component - contact form with Supabase connection*/}
        <ContactUs />
      </section>


      <section className={styles.section}>
        {/* Finall Sell Component - large call to action */}
        <FinalSell
          title="Ready to unlock your winning idea?"
          subtitle="Spend less time guessing. Build with confidence."
          ctaText="Start Validating now"
          onCtaClick={() => {
            // Your conversion tracking/signup logic, defaults to signup modal
          }}
        />
      </section>
    </>
  );

}

