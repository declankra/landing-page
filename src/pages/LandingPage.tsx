import HeroSignup from '../components/HeroSignup';
import UserSay from '../components/UserSay';
import UserSayCarousel from '../components/UserSayCarousel';
import {
  Button,
  Title,
  Text
} from '@mantine/core';
import styles from '../styles/LandingPage.module.css';

export default function Home() {

  return (
    <div className={styles.container}>
      {/* Hero Section with Email Signup */}
      <HeroSignup />

      {/* Testimonials Section */}
      <UserSay />

      {/* Testimonials - Carousel Section */}
      <UserSayCarousel />

      {/* How It Works */}
      <div className={styles.howItWorks}>
        <Title className={styles.howItWorksTitle}>
          How It Works
        </Title>
        <Text>
          Three step flow. Highlights core customer features with simplicity.
        </Text>
      </div>

      {/* Invite Section */}
      <div className={styles.inviteSection}>
        <Title className={styles.howItWorksTitle}>
          Tell your friend about it!
        </Title>
        <Button
          className={styles.button}
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
          }}
        >
          Copy Invitation Link
        </Button>
      </div>

      {/* Contact Section */}
      <div className={styles.contactSection}>
        <Title className={styles.howItWorksTitle}>
          Contact Us
        </Title>
        <Text>Have questions or need more info?</Text>
        <Text>
          Email us at:{' '}
          <a href="mailto:support@product.com" className={styles.contactLink}>
            support@product.com
          </a>
        </Text>
      </div>
    </div>
  );
}