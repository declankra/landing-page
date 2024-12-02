// src/components/shared/mantine-signup-modal.tsx
import { useState, useCallback, useEffect } from 'react';
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

// Supabase column mapping
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
  const [currentStep, setCurrentStep] = useState(requestEmail ? 1 : 0);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Initialize form with all possible field values
  const form = useForm({
    initialValues: {
      email: requestEmail ?? '',
      disappointment: '',
      excitement: '',
    },
    validate: steps[currentStep]?.validation || {}
  });

  // Progress calculation
  const progress = steps.length > 1 
    ? 50 + ((currentStep) / (steps.length - 1)) * 50 
    : 0;

  // Modal state handlers
  const handleModalOpen = useCallback(() => {
    signupAnalytics.trackSignupStart(source);
  }, [source]);

  const handleModalClose = useCallback(() => {
    if (currentStep > 0 && currentStep < steps.length - 1) {
      signupAnalytics.trackSignupAbandoned('modal_closed');
    }
    setCurrentStep(requestEmail ? 1 : 0);
    form.reset();
    onClose();
  }, [currentStep, form, onClose, requestEmail]);

  // Use handleModalOpen in a useEffect
  useEffect(() => {
    if (opened) {
      handleModalOpen();
    }
  }, [opened, handleModalOpen]);


  // Share link handler
  const handleShareLink = useCallback((link: string) => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link copied!",
      description: "Share it with your friends",
      duration: 1800,
    });
  }, [toast]);

  // Success handler
  const handleSuccess = useCallback(async (finalData: SignupData) => {
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
      handleModalClose();
    }

    signupAnalytics.trackSignupComplete();
    onSuccess?.(finalData);
  }, [currentStep, handleModalClose, onSuccess, steps, successAnimation, toast]);

  // Form submission handler
  const handleSubmit = useCallback(async (values: SignupData) => {
    const currentField = steps[currentStep].fields[0];
    if (!values[currentField.name] && currentField.required) {
      form.setFieldError(currentField.name, `Please ${currentField.type === 'radio' ? 'select an option' : 'fill out this field'}`);
      return;
    }

    try {
      setLoading(true);
      // Track step completion
      signupAnalytics.trackSignupStep(currentStep + 1, steps[currentStep].title, true);

      // Map form field names to Supabase column names
      const supabaseData = Object.entries(values).reduce((acc, [key, value]) => {
        const columnName = SUPABASE_COLUMN_MAPPING[key as keyof typeof SUPABASE_COLUMN_MAPPING] || key;
        acc[columnName] = value;
        return acc;
      }, {} as Record<string, string | undefined>);

      // Handle final step
      const nextStep = steps[currentStep + 1];
      if (!nextStep || nextStep.fields[0].type === 'successCTA') {
        const { error: supabaseError } = await supabase
          .from(supabaseTable)
          .insert([supabaseData]);

        if (supabaseError) throw supabaseError;

        await handleSuccess(values);
      }
      
      // Move to next step if not complete
      if (currentStep < steps.length - 1) {
        const nextStepIndex = currentStep + 1;
        signupAnalytics.trackSignupStep(
          nextStepIndex + 1,
          steps[nextStepIndex].title,
          false
        );
        setCurrentStep(nextStepIndex);
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
  }, [currentStep, form, handleSuccess, steps, supabaseTable, toast]);

  // Field renderer
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

  return (
    <Modal
      opened={opened}
      onClose={() => !loading && handleModalClose()}
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
      {steps.length > 1 && !(currentStep === 0 && steps[0].fields[0].type === 'email') && (
        <Progress value={progress} size="md" mb="lg" />
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {renderFields()}

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