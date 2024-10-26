import HeroSignup from '../components/HeroSignup';
import UserSay from '../components/UserSay';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  Button,
  TextInput,
  Title,
  Text,
  Container,
  SimpleGrid,
  Card,
  Stack,
} from '@mantine/core';
import styles from '../styles/LandingPage.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleEmailSubmit = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('signups').insert([{ email_address: email }]);
    if (error) {
      console.error('Error inserting email:', error);
      alert('An error occurred. Please try again.');
    } else {
      alert('Thank you for signing up!');
      setEmail('');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      {/* Hero Section with Email Signup */}
      <HeroSignup />

      {/* Email Input Section */}
      <div className={styles.emailSection}>
        <TextInput
          className={styles.input}
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.currentTarget.value)}
          size="md"
        />
        <Button 
          className={styles.button}
          onClick={handleEmailSubmit} 
          loading={loading} 
          size="md"
        >
          Get Early Access
        </Button>
      </div>

        {/* Testimonials Section */}
        <UserSay />

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