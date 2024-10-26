// src/components/HeroSignup.tsx
import { useState } from 'react';
import { 
  Button, 
  TextInput, 
  Title, 
  Text, 
  Radio,
  Progress,
  Modal,
  Stack
} from '@mantine/core';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';
import styles from '../styles/HeroSignup.module.css';

interface SignupData {
  email: string;
  disappointment?: string;
  excitement_to_focus?: string;
}

export default function HeroSignup() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<SignupData>({ email: '' });
  const [error, setError] = useState('');

  const handleEmailSubmit = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    setError('');
    setLoading(true);
    setSignupData({ ...signupData, email });
    setShowSurvey(true);
    setLoading(false);
  };

  const handleDisappointmentSubmit = (value: string) => {
    if (!value) {
      setError('Please select an option');
      return;
    }

    setSignupData({ ...signupData, disappointment: value });
    setCurrentStep(2);
    setError('');
  };

  const handleExcitementSubmit = async (excitement: string) => {
    if (!excitement) {
      setError('Please share your thoughts');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: supabaseError } = await supabase
        .from('signups')
        .insert([{
          email_address: signupData.email,
          disappointment: signupData.disappointment,
          excitement_to_focus: excitement
        }]);

      if (supabaseError) throw supabaseError;

      // Reset all states after successful submission
      setEmail('');
      setShowSurvey(false);
      setCurrentStep(1);
      setSignupData({ email: '' });
      alert('Thank you for your feedback!');
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Error saving signup data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        <Image
          src="/hero_image.webp"
          alt="Hero background"
          layout="fill"
          objectFit="cover"
          className={styles.heroImage}
          priority
        />

        <div className={styles.overlay}>
          {/* Hero Content */}
          <div className={styles.heroContent}>
            <Title className={styles.title}>
              {"Title: Six words or less"}
            </Title>
            <Text className={styles.subtitle}>
              {"Subtitle: The shorter the better"}
            </Text>
          </div>

          {/* Email Signup Form */}
          <div className={styles.signupForm}>
            <TextInput
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              error={error}
              disabled={loading}
              size="lg"
              className={styles.input}
            />
            <Button
              fullWidth
              onClick={handleEmailSubmit}
              loading={loading}
              size="lg"
            >
              Get Early Access
            </Button>
          </div>
        </div>
      </div>

      {/* Survey Modal */}
      <Modal
        opened={showSurvey}
        onClose={() => !loading && setShowSurvey(false)}
        title={`Question ${currentStep} of 2`}
        size="md"
        centered
      >
        <Stack>
          <Progress 
            value={currentStep * 50} 
            className={styles.progressBar}
          />
          
          {currentStep === 1 ? (
            <>
              <Text className={styles.surveyTitle}>
                How disappointed would you be if you don't get access?
              </Text>
              <Radio.Group
                onChange={(value) => handleDisappointmentSubmit(value)}
                error={error}
                className={styles.radioGroup}
              >
                <Stack mt="xs">
                  <Radio value="Nah" label="Nah" />
                  <Radio value="Somewhat" label="Somewhat" />
                  <Radio value="Very" label="Very" />
                </Stack>
              </Radio.Group>
            </>
          ) : (
            <>
              <Text className={styles.surveyTitle}>
                What about this product are you most excited about?
              </Text>
              <TextInput
                placeholder="I'm most excited about…"
                onChange={(e) => setSignupData({
                  ...signupData,
                  excitement_to_focus: e.currentTarget.value
                })}
                error={error}
                disabled={loading}
                className={styles.input}
              />
              <Button
                onClick={() => handleExcitementSubmit(signupData.excitement_to_focus || '')}
                loading={loading}
                fullWidth
              >
                Submit
              </Button>
            </>
          )}
        </Stack>
      </Modal>
    </div>
  );
}