// src/components/shared/mantine-signup-modal.tsx
import { useState, useEffect } from 'react';
import { 
  Modal,
  TextInput, 
  Radio,
  Stack,
  Text,
  Button,
  Progress,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';
import { signupAnalytics, SignupSource } from '@/lib/analytics/amplitude/signup-analytics';

// Types for form configuration
type FormFieldBase = {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
  triggerToast?: boolean;
};

type EmailField = FormFieldBase & {
  type: 'email';
  placeholder?: string;
};

type TextField = FormFieldBase & {
  type: 'text';
  placeholder?: string;
};

type RadioField = FormFieldBase & {
  type: 'radio';
  options: { value: string; label: string; }[];
};

type CTAField = FormFieldBase & {
  type: 'successCTA';
  buttonText: string;
  message: string;
  shareLink?: string;
};

type FormField = EmailField | TextField | RadioField | CTAField;

type StepConfig = {
  title: string;
  fields: FormField[];
  validation?: Record<string, (value: string | undefined) => string | null>;
};

type SignupData = {
  [key: string]: string | undefined;
  email?: string;
};

interface MantineSignupModalProps {
  /** Pre-filled email if already collected */
  requestEmail?: string | null;
  
  /** Custom steps for the modal flow */
  steps?: StepConfig[];
  
  /** Supabase table to insert data into */
  supabaseTable?: string;
  
  /** Whether to show success animation */
  successAnimation?: boolean;
  
  /** Modal open state */
  opened: boolean;
  
  /** Callback when modal closes */
  onClose: () => void;
  
  /** Callback on successful signup */
  onSuccess?: (data: SignupData) => void;

  /** Track which CTA triggered the modal */
  source: SignupSource;
}

// Map form field names to Supabase column names
const SUPABASE_COLUMN_MAPPING = {
    email: 'email_address',
    disappointment: 'disappointment',
    excitement: 'excitement_to_focus',
} as const;

// Default steps configuration
const defaultSteps: StepConfig[] = [
  {
    title: "Join Us",
    fields: [{
      type: 'email',
      name: 'email',
      label: 'Email',
      placeholder: 'sign@me.up',
      required: true,
      description: 'Get {core benefit} before everyone else'
    }],
    validation: {
        email: (value) => {
          if (!value || !value.trim()) return 'Email is required';
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : 'Please enter a valid email address';
        }
    },
  },
  {
    title: "Quick Question",
    fields: [{
      type: 'radio',
      name: 'disappointment',
      label: 'How disappointed would you be if you could not use this product?',
      options: [
        { value: 'Nah', label: 'Nah' },
        { value: 'Somewhat', label: 'Somewhat' },
        { value: 'Very', label: 'Very' }
      ],
      required: true,
      description: 'to understand your interest level'
    }]
  },
  {
    title: "Last Step",
    fields: [{
      type: 'text',
      name: 'excitement',
      label: 'What excites you most about this product?',
      placeholder: "I'm most excited about...",
      required: true,
      description: 'so we can optimize for your excitment'
    }]
  },
  {
    title: "You're In! 🎉",
    fields: [{
      type: 'successCTA',
      name: 'share',
      label: 'Thank you for signing up',
      buttonText: 'Copy Invite Link',
      message: 'Help your friends discover {benefit of product} too!',
      shareLink: 'https://your-product.com?ref=invite',
      triggerToast: true,
      description: 'Share with your friends'
    }]
  }
];

const triggerConfetti = () => {
  const end = Date.now() + 4 * 1000;
  const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

  const frame = () => {
    if (Date.now() > end) return;

    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.5 },
      colors: colors
    });

    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.5 },
      colors: colors
    });

    requestAnimationFrame(frame);
  };

  frame();
};

export function MantineSignupModal({
  requestEmail = null,
  steps = defaultSteps,
  supabaseTable = 'signups',
  successAnimation = true,
  opened,
  onClose,
  onSuccess,
  source,
}: MantineSignupModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState<SignupData>({
    ...(requestEmail ? { email: requestEmail } : {})
  });
  const { toast } = useToast();

  // Initialize form with validation
  const form = useForm({
    initialValues: requestEmail ? { email: requestEmail } : {},
    validate: steps[currentStep]?.validation || {}
  });

  // Calculate progress percentage
  const progress = steps.length > 1 
    ? 50 + ((currentStep) / (steps.length - 1)) * 50 
    : 0;

  // Track modal open/close
  useEffect(() => {
    if (opened) {
      signupAnalytics.trackSignupStart(source);
    } else if (!opened && currentStep > 0 && currentStep < steps.length - 1) {
      // Only track abandonment if they started but didn't finish
      signupAnalytics.trackSignupAbandoned('modal_closed');
    }
  }, [opened, currentStep, source]);

  // Reset state when modal closes
  useEffect(() => {
    if (!opened) {
      setCurrentStep(0);
      form.reset();
      setSignupData(requestEmail ? { email: requestEmail } : {});
    }
  }, [opened, requestEmail, form]);

  const handleSuccess = async (finalData: SignupData) => {
    if (successAnimation) {
      triggerConfetti();
    }

    // Check if we should show toast or CTA
    const currentField = steps[currentStep].fields[0];
    if (currentField.type === 'successCTA' && currentField.triggerToast) {
      toast({
        title: "Welcome aboard! 🎉",
        description: "Speed wins - you'll receive an email shortly with next steps.",
      });
      onClose();
    }

    signupAnalytics.trackSignupComplete();
    onSuccess?.(finalData);
  };

  const handleShareLink = (link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "Share it with your friends",
      duration: 1800,
    });
  };

  const handleSubmit = async (values: SignupData) => {
    const currentField = steps[currentStep].fields[0];
    if (!values[currentField.name] && currentField.required) {
      form.setFieldError(currentField.name, `Please ${currentField.type === 'radio' ? 'select an option' : 'fill out this field'}`);
      return;
    }

    try {
      setLoading(true);

      // Track step completion
      signupAnalytics.trackSignupStep(currentStep + 1, 
        steps[currentStep].title,
        true
      );

      // Merge new values with existing signup data
      const updatedData = { ...signupData, ...values };
      setSignupData(updatedData);

      // Map form field names to Supabase column names
      const supabaseData = Object.entries(updatedData).reduce((acc, [key, value]) => {
        const columnName = SUPABASE_COLUMN_MAPPING[key as keyof typeof SUPABASE_COLUMN_MAPPING] || key;
        acc[columnName] = value;
        return acc;
      }, {} as Record<string, string | undefined>);

      // If this is the final non-CTA step, save to Supabase
      const nextStep = steps[currentStep + 1];
      if (!nextStep || nextStep.fields[0].type === 'successCTA') {
        const { error: supabaseError } = await supabase
          .from(supabaseTable)
          .insert([supabaseData]);

        if (supabaseError) throw supabaseError;

        await handleSuccess(updatedData);
      }
      
      // Move to next step and track view
      if (currentStep < steps.length - 1) {
        setCurrentStep(prev => {
          const nextStepIndex = prev + 1;
          // Track next step view
          signupAnalytics.trackSignupStep(
            nextStepIndex + 1,
            steps[nextStepIndex].title,
            false
          );
          return nextStepIndex;
        });
      }
    } catch (error) {
      console.error('Error in signup process:', error);
      signupAnalytics.trackSignupAbandoned('error');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    const currentFields = steps[currentStep].fields;

    return currentFields.map((field, index) => {
      switch (field.type) {
        case 'email':
        case 'text':
          return (
            <div key={index}>
              <TextInput
                label={field.label}
                placeholder={field.placeholder}
                disabled={loading || (field.type === 'email' && !!requestEmail)}
                {...form.getInputProps(field.name)}
                error={form.errors[field.name]}
                styles={{
                  label: {
                    fontWeight: 700,
                    marginBottom: 8,
                  }
                }}
                mb={'xs'}
              />
            </div>
          );

        case 'radio':
          return (
            <div key={index}>
              <Radio.Group
                label={field.label}
                onChange={(value) => form.setFieldValue(field.name, value)}
                error={form.errors[field.name]}
                styles={{
                  label: {
                    fontWeight: 700,
                    marginBottom: 8,
                  }
                }}
                mb={'md'}
              >
                <Stack mt="xs">
                  {field.options.map((option) => (
                    <Radio
                      key={option.value}
                      value={option.value}
                      label={option.label}
                      disabled={loading}
                    />
                  ))}
                </Stack>
              </Radio.Group>
            </div>
          );

        case 'successCTA':
          return (
            <div key={index} className="text-center">
              <Text size="lg" fw={500} mb="md">
                {field.message}
              </Text>
              {field.shareLink && (
                <Button
                  onClick={() => handleShareLink(field.shareLink!)}
                  fullWidth
                  leftSection={<Link2 size={16} />}
                >
                  {field.buttonText}
                </Button>
              )}
            </div>
          );

        default:
          return null;
      }
    });
  };

  // Skip email step if email is provided
  useEffect(() => {
    if (requestEmail && currentStep === 0 && steps[0].fields[0].type === 'email') {
      setCurrentStep(1);
    }
  }, [requestEmail, currentStep, steps]);

  return (
    <Modal
      opened={opened}
      onClose={() => !loading && onClose()}
      title={
        <Stack gap="xs">
          <Text fw={500} mb={-10}>{steps[currentStep].title}</Text>
          {steps[currentStep].fields[0].description && (
            <Text size="xs" c="dimmed">
              {steps[currentStep].fields[0].description}
            </Text>
          )}
        </Stack>
      }
      size="md"
      centered
      overlayProps={{
        backgroundOpacity: steps[currentStep].fields[0].type === 'successCTA' ? 0 : 0.55,
        blur: steps[currentStep].fields[0].type === 'successCTA' ? 0 : 3,
      }}
      withCloseButton={false}
    >
      {/* Progress bar */}
      {steps.length > 1 && !(currentStep === 0 && steps[0].fields[0].type === 'email') && (
        <Progress 
          value={progress} 
          size="md" 
          mb="lg"
        />
      )}

      {/* Form */}
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {renderFields()}

          {/* Don't show button on success CTA step */}
          {steps[currentStep].fields[0].type !== 'successCTA' && (
            <Button 
              type="submit"
              loading={loading}
              fullWidth
            >
              {currentStep === steps.length - 1 ? 'Submit' : 'Continue'}
            </Button>
          )}
        </Stack>
      </form>
    </Modal>
  );
}

/*

SIMPLE USAGE GUIDE:

(1) WITH EMAIL INPUT FIELD:
// Import component and useState
import { useState } from 'react';
import { MantineSignupModal } from '@/components/mantine-signup-modal';

// Add state for email and modal
const [email, setEmail] = useState('');
const [modalOpened, setModalOpened] = useState(false);

// Add to your JSX
<div>
  <input 
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  <button onClick={() => setModalOpened(true)}>
    Sign Up
  </button>

  <MantineSignupModal
    opened={modalOpened}
    onClose={() => setModalOpened(false)}
    source={SignupSource.SOURCE_NAME}  // Track CTA source
    requestEmail={email}  // Pass collected email here
  />
</div>


(2) WITHOUT EMAIL INPUT (DIRECT MODAL):
// Import component and useState
import { useState } from 'react';
import { MantineSignupModal } from '@/components/mantine-signup-modal';

// Just need modal state
const [modalOpened, setModalOpened] = useState(false);

// Add to your JSX
<div>
  <button onClick={() => setModalOpened(true)}>
    Join Waitlist
  </button>

  <MantineSignupModal
    opened={modalOpened}
    onClose={() => setModalOpened(false)}
    source={SignupSource.SOURCE_NAME}  // Track CTA source
  />
</div>


*/