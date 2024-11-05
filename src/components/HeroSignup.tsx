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
import { useForm, isEmail } from '@mantine/form';
import { supabase } from '../lib/supabaseClient';
import { RainbowButton } from '@/components/ui/rainbow-button';
import Image from 'next/image';
import styles from '../styles/HeroSignup.module.css';

// Type definitions for signup data
interface SignupData {
  email: string;
  disappointment?: string;
  excitement_to_focus?: string;
}
/**
 * HeroSignup Component
 * 
 * A hero section with email capture and follow-up survey modal.
 * Validates email, captures initial signup, and gathers additional
 * user feedback through a two-step survey process.
 */
export default function HeroSignup() {
  // Form validation using Mantine's useForm
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: isEmail('Please enter a valid email address'),
    },
  });

  // State management
  const [loading, setLoading] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<SignupData>({ email: '' });
  const [error, setError] = useState('');

  /**
   * Validates email and handles initial signup
   * Uses Mantine's form validation
   */
  const handleEmailSubmit = async () => {
    // Validate form
    const validation = form.validate();
    if (validation.hasErrors) {
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      // Store email in signup data and show survey
      setSignupData({ ...signupData, email: form.values.email });
      setShowSurvey(true);
      
    } catch (err) {
      console.error('Error in email submission:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles the first survey step - disappointment rating
   */
  const handleDisappointmentSubmit = (value: string) => {
    if (!value) {
      setError('Please select an option');
      return;
    }

    setSignupData({ ...signupData, disappointment: value });
    setCurrentStep(2);
    setError('');
  };

  /**
   * Handles the final survey step and saves all data to Supabase
   */
  const handleExcitementSubmit = async (excitement: string) => {
    if (!excitement) {
      setError('Please share your thoughts');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Save complete signup data to Supabase
      const { error: supabaseError } = await supabase
        .from('signups')
        .insert([{
          email_address: signupData.email,
          disappointment: signupData.disappointment,
          excitement_to_focus: excitement,
          created_at: new Date().toISOString()
        }]);

      if (supabaseError) throw supabaseError;

      // Reset all state after successful submission
      form.reset();
      setShowSurvey(false);
      setCurrentStep(1);
      setSignupData({ email: '' });
      alert('Thank you for your feedback!');
      
    } catch (err) {
      console.error('Error saving signup data:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroContainer}>
        {/* Hero Background Image */}
        <Image
          src="/hero_image.webp" // {{REPLACE_IMAGE}} - Replace with your hero image
          alt="Hero background"
          style={{ objectFit: 'cover' }}
          fill
          className={styles.heroImage}
          priority
        />

        <div className={styles.overlay}>
          {/* Hero Content */}
          <div className={styles.heroContent}>
            <Title className={styles.title}>
              {/* {{REPLACE_TITLE}} - Replace with your product title */}
              {"Title: Six words or less"}
            </Title>
            <Text className={styles.subtitle}>
              {/* {{REPLACE_SUBTITLE}} - Replace with your product subtitle */}
              {"Subtitle: The shorter the better"}
            </Text>
          </div>

          {/* Email Signup Form */}
          <div className={styles.signupForm}>
            <TextInput
              placeholder="sign@me.up"
              {...form.getInputProps('email')}
              disabled={loading}
              size="md"
              className={styles.input}
            />
            <div className="relative z-0 w-full">
              <RainbowButton
                onClick={handleEmailSubmit}
                disabled={loading}
                className="w-full text-lg font-semibold bg-transparent hover:bg-transparent"
              >
                {loading ? 'Sending...' : 'Get Early Access'}
              </RainbowButton>
            </div>

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
                How disappointed would you be if you don&apos;t get access?
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
                placeholder="I&apos;m most excited about…"
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