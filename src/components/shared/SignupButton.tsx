// src/components/shared/SignupButton.tsx
import { useState } from 'react';
import { 
  Modal, 
  TextInput, 
  Progress,
  Stack,
  Title,
  Text,
  Radio,
} from '@mantine/core';
import { useForm, isEmail } from '@mantine/form';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '../../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { cn } from "@/lib/utils";
import styles from '@/styles/components/SignupButton.module.css';

// Type definitions
interface SignupData {
  email: string;
  disappointment?: string;
  excitement_to_focus?: string;
}

interface SignupButtonProps {
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children?: React.ReactNode;
}

/**
 * Triggers confetti side cannons animation for successful signup
 */
const triggerConfettiCannons = () => {
  const end = Date.now() + 4 * 1000;
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
 * SignupButton Component
 * 
 * A reusable button component that triggers a full-screen modal signup flow.
 * Includes email validation, multi-step survey, and success animations.
 */
export default function SignupButton({ 
  className,
  variant = 'default',
  size = 'default',
  children = 'Sign Up'
}: SignupButtonProps) {
  // State management
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupData, setSignupData] = useState<SignupData>({ email: '' });
  const { toast } = useToast();

  // Form validation using Mantine's useForm
      const form = useForm({
    initialValues: { email: '' },
    validate: {
      email: (value) => (!value ? 'Email is required' : 
                        !isEmail(value) ? 'Please enter a valid email address' : null),
    },
  });

  // Handle email submission
  const handleEmailSubmit = async () => {
    const validation = form.validate();
    
    if (validation.hasErrors) {
      // Error will be shown by Mantine's form validation
      const input = document.querySelector('input[type="email"]') as HTMLInputElement;
      input?.focus();
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSignupData({ ...signupData, email: form.values.email });
      setCurrentStep(1);
    } catch (err) {
      console.error('Error in email submission:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle disappointment rating submission
  const handleDisappointmentSubmit = (value: string) => {
    if (!value) {
      setError('Please select an option');
      return;
    }

    setSignupData({ ...signupData, disappointment: value });
    setCurrentStep(2);
    setError('');
  };

  // Handle final survey step and save to Supabase
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
          excitement_to_focus: excitement,
        }]);

      if (supabaseError) throw supabaseError;

      // Success actions
      triggerConfettiCannons();
      toast({
        title: "Welcome aboard! 🎉",
        description: "You'll receive an email shortly with next steps.",
        duration: 5000,
      });

      // Reset form and close modal
      form.reset();
      setCurrentStep(0);
      setSignupData({ email: '' });
      setShowModal(false);

    } catch (err) {
      console.error('Error saving signup data:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={() => setShowModal(true)}
      >
        {children}
      </Button>

      <Modal
        opened={showModal}
        onClose={() => !loading && setShowModal(false)}
        title={currentStep === 0 ? "Join Us" : `Question ${currentStep} of 2`}
        size="md"
        centered
        className={styles.modal}
        classNames={{
          title: styles.modalTitle,
          header: styles.modalHeader,
        }}
      >
        <Stack>
          <Progress 
            value={currentStep * 33.33} 
            className={styles.progressBar}
          />

          {currentStep === 0 ? (
            <>
              <Title order={3} className={styles.stepTitle}>
                Enter your email to get started
              </Title>
                            <TextInput
                type="email"
                placeholder="your@email.com"
                {...form.getInputProps('email')}
                disabled={loading}
                required
              />
              <Button
                onClick={handleEmailSubmit}
                disabled={loading}
                className={styles.submitButton}
              >
                Continue
              </Button>
            </>
          ) : currentStep === 1 ? (
            <>
              <Text className={styles.stepTitle}>
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
              <Text className={styles.stepTitle}>
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
                className={cn(styles.input, loading && styles.loading)}
              />
              <Button
                onClick={() => handleExcitementSubmit(signupData.excitement_to_focus || '')}
                disabled={loading}
                className={styles.submitButton}
              >
                Submit
              </Button>
            </>
          )}
        </Stack>
      </Modal>
    </>
  );
}