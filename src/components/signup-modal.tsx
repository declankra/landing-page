// src/components/signup-modal.tsx
import { useState, useEffect } from 'react';
import { useForm } from '@mantine/form';
import { isEmail } from '@mantine/form';
import { supabase } from '@/lib/supabaseClient';
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

// Shadcn Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

// Types
type StepConfig = {
  title: string;
  description?: string;
  fields: FormValues[];
  validation?: Record<string, (value: string | undefined) => string | null>;
};

type FormValues = {
  type: 'email' | 'text' | 'radio';
  name: string;
  label: string;
  placeholder?: string;
  options?: { value: string; label: string; }[]; // For radio fields
  required?: boolean;
};

type SignupData = {
  [key: string]: string | undefined;  // Replace 'any' with specific types
  email?: string;
};

export interface SignupModalProps {
  /**
   * Whether to request email in the first step
   * @default true
   */
  requestEmail?: boolean;

  /**
   * Custom steps for the modal flow
   * @default Default email and survey steps
   */
  steps?: StepConfig[];

  /**
   * Supabase table to insert data into
   * @default 'signups'
   */
  supabaseTable?: string;

  /**
   * Whether to show success animation
   * @default true
   */
  successAnimation?: boolean;

  /**
   * Modal open state
   */
  open: boolean;

  /**
   * Callback when modal state changes
   */
  onOpenChange: (open: boolean) => void;

  /**
   * Callback on successful signup
   */
  onSuccess?: (data: SignupData) => void;

  /**
   * Callback on modal open
   */
  onOpen?: () => void;

  /**
   * Callback on modal close
   */
  onClose?: () => void;

  /**
   * Children to trigger the modal
   */
  children?: React.ReactNode;
}

// Default steps configuration
const defaultSteps: StepConfig[] = [
  {
    title: "Join Us",
    description: "Enter your email to get started",
    fields: [
      {
        type: 'email',
        name: 'email',
        label: 'Email',
        placeholder: 'your@email.com',
        required: true
      }
    ],
    validation: {
      email: (value) => (!value ? 'Email is required' : !isEmail(value) ? 'Invalid email' : null)
    }
  },
  {
    title: "Quick Question",
    description: "Help us understand your needs better",
    fields: [
      {
        type: 'radio',
        name: 'disappointment',
        label: 'How disappointed would you be if you could not use this product?',
        options: [
          { value: 'very', label: 'Very disappointed' },
          { value: 'somewhat', label: 'Somewhat disappointed' },
          { value: 'not', label: 'Not disappointed' }
        ],
        required: true
      }
    ]
  },
  {
    title: "Last Step",
    description: "Tell us what excites you most",
    fields: [
      {
        type: 'text',
        name: 'excitement',
        label: 'What are you most excited about?',
        placeholder: "I'm most excited about...",
        required: true
      }
    ]
  }
];

/**
 * Triggers confetti animation on successful signup
 */
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

/**
 * A reusable signup modal component that supports:
 * - Customizable multi-step flows
 * - Email collection
 * - Survey questions
 * - Supabase integration
 * - Success animations
 * - Accessibility features
 */
export function SignupModal({
  steps = defaultSteps,
  supabaseTable = 'signups',
  successAnimation = true,
  open,
  onOpenChange,
  onSuccess,
  onOpen,
  onClose,
}: SignupModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [signupData, setSignupData] = useState<SignupData>({});
  const { toast } = useToast();

  // Initialize form with validation
  const form = useForm({
    initialValues: {},
    validate: steps[currentStep]?.validation || {}
  });

  // Calculate progress percentage
  const progress = ((currentStep + 1) / steps.length) * 100;

  // Reset state when modal closes
  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
      form.reset();
      setSignupData({});
    } else {
      onOpen?.();
    }
  }, [open, form, onOpen]);

  /**
   * Handles successful signup
   */
  const handleSuccess = async (finalData: SignupData) => {
    if (successAnimation) {
      triggerConfetti();
    }

    toast({
      title: "Welcome aboard! 🎉",
      description: "Speed wins - you'll receive an email shortly with next steps.",
    });

    onSuccess?.(finalData);
    onOpenChange(false);
  };

  /**
   * Handles form submission for each step
   */
  const handleSubmit = async (values: Record<string, string>) => {
    try {
      setLoading(true);

      // Merge new values with existing signup data
      const updatedData = { ...signupData, ...values };
      setSignupData(updatedData);

      // If this is the final step, save to Supabase
      if (currentStep === steps.length - 1) {
        const { error: supabaseError } = await supabase
          .from(supabaseTable)
          .insert([updatedData]);

        if (supabaseError) throw supabaseError;

        await handleSuccess(updatedData);
      } else {
        // Move to next step
        setCurrentStep(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error in signup process:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renders form fields based on current step configuration
   */
  const renderFields = () => {
    const currentFields = steps[currentStep].fields;

    return currentFields.map((field, index) => {
      switch (field.type) {
        case 'email':
        case 'text':
          return (
            <div key={index} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                disabled={loading}
                {...form.getInputProps(field.name)}
                aria-required={field.required}
              />
              {form.errors[field.name] && (
                <p className="text-sm text-destructive">{form.errors[field.name]}</p>
              )}
            </div>
          );

        case 'radio':
          return (
            <div key={index} className="space-y-2">
              <Label>{field.label}</Label>
              <RadioGroup
                disabled={loading}
                onValueChange={(value) => form.setFieldValue(field.name, value)}
                aria-required={field.required}
              >
                {field.options?.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value}>{option.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          );

        default:
          return null;
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      onOpenChange(newOpen);
      if (!newOpen) onClose?.();
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          {steps[currentStep].description && (
            <DialogDescription>
              {steps[currentStep].description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* Progress bar */}
        <Progress value={progress} className="h-1" />

        {/* Form */}
        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-4">
          {renderFields()}

          <Button 
            type="submit" 
            disabled={loading}
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {currentStep === steps.length - 1 ? 'Submit' : 'Continue'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}


/*

DIRECT MODAL USAGE in any component or page
// (1) import component and useState
import { useState } from 'react';
import { SignupModal } from '@/components/signup-modal';

// (2) Single state to control modal visibility
const [isModalOpen, setIsModalOpen] = useState(false);

// (3) Then in your JSX use modal on an action (inside the return())
<Button onClick={() => setIsModalOpen(true)}>
  Sign Up
</Button>

// (4) and set SignupModal properties
<SignupModal
  open={isModalOpen}
  onOpenChange={setIsModalOpen}
/>


*/