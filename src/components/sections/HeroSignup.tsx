// src/components/sections/HeroSignup.tsx
import { useState, useEffect } from 'react';
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
import { supabase } from '../../lib/supabaseClient';
import { RainbowButton } from '@/components/ui/rainbow-button';
import confetti from 'canvas-confetti';
import { useClipboard } from '@mantine/hooks';
import Image from 'next/image';
import styles from '@/styles/components/HeroSignup.module.css';

// Constants
const TRACKING_URL = "https://dub.sh/inviteFriend2ILP";
const SUCCESS_MODAL_DURATION = 9000; // 9 seconds

// Type definitions for signup data
interface SignupData {
  email: string;
  disappointment?: string;
  excitement_to_focus?: string;
}

/**
 * Triggers confetti side cannons animation
 * Creates a celebratory effect with confetti shooting from both sides
 */
const triggerConfettiCannons = () => {
  const end = Date.now() + 4 * 1000; // 4 seconds duration
  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

  const frame = () => {
    if (Date.now() > end) return;

    // Left cannon
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      startVelocity: 60,
      origin: { x: 0, y: 0.5 },
      colors: colors,
    });

    // Right cannon
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      startVelocity: 60,
      origin: { x: 1, y: 0.5 },
      colors: colors,
    });

    requestAnimationFrame(frame);
  };

  frame();
};

/**
 * HeroSignup Component
 * 
 * A hero section with email capture and follow-up survey modal.
 * Validates email, captures initial signup, and gathers additional user feedback through a two-step survey process.
 * Delightful additions: Rainbow action button and confetti upon completion of pop-up survey.
 */
export default function HeroSignup() {

  // Initialize clipboard hook
  const clipboard = useClipboard();

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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [signupData, setSignupData] = useState<SignupData>({ email: '' });
  const [error, setError] = useState('');
  const [inviteButtonText, setInviteButtonText] = useState('Invite a friend');

  // Auto-close success modal after duration
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showSuccessModal) {
      timeout = setTimeout(() => {
        setShowSuccessModal(false);
        setInviteButtonText('Invite a friend'); // Reset button text
      }, SUCCESS_MODAL_DURATION);
    }
    return () => clearTimeout(timeout);
  }, [showSuccessModal]);

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
   * Handles invitation link copying
   */
    const handleInvite = () => {
      clipboard.copy(TRACKING_URL);
      setInviteButtonText('Link copied!');
    };

  /**
   * Handles the final survey step and saves all data to Supabase
   * Triggers confetti celebration on successful submission
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
        }]);

      if (supabaseError) throw supabaseError;

        // Trigger success actions
        triggerConfettiCannons();
        setShowSurvey(false);
        setShowSuccessModal(true);

        // Reset forms and state
        form.reset();
        setCurrentStep(1);
        setSignupData({ email: '' });
      
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
          fill
          sizes="100vw"
          priority
          className={styles.heroImage}
          style={{ objectFit: 'cover' }}
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
            <div className={styles.buttonWrapper}>
              <RainbowButton
                onClick={handleEmailSubmit}
                disabled={loading}
                className="relative w-full text-lg font-semibold"
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

       {/* Success Modal - Styled to match survey modal */}
       <Modal
        opened={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Welcome aboard! 🎉"
        size="md"
        centered
      >
        <Stack>
          {/* Full progress bar to show completion */}
          <Progress 
            value={100} 
            className={styles.progressBar}
          />
          
          <Text className={styles.surveyTitle}>
            Thank you for signing up!
          </Text>
          
          <Text size="md" mb="md">
            You will receive an email shortly with next steps.
            In the meantime, why not share this with a friend?
          </Text>

          <Button
            onClick={handleInvite}
            fullWidth
            size="lg"
            className={styles.inviteButton}
          >
            {inviteButtonText}
          </Button>
        </Stack>
      </Modal>

    </div>
  );
}