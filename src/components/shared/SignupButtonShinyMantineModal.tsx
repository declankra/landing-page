// src/components/shared/SignupButtonShinyMantineModal.tsx
import { useState } from 'react';
import ShinyButton from '@/components/ui/shiny-button';
import { MantineSignupModal } from '@/components/shared/mantine-signup-modal';
import { cn } from "@/lib/utils";

interface SignupButtonShinyMantineModalProps {
  /**
   * Optional className for additional styling customization.
   * Examples:
   * - "mt-8" for margin top
   * - "w-full" for full width
   * - "text-lg" for larger text
   * - "hidden md:block" for responsive display
   */
  className?: string;
  
  /**
   * Button content/text.
   * @default "Sign Up Now"
   */
  children?: React.ReactNode;

  /**
   * Optional callback when modal opens
   */
  onModalOpen?: () => void;

  /**
   * Optional callback when modal closes
   */
  onModalClose?: () => void;

  /**
   * Optional callback when signup completes successfully
   */
  onSignupSuccess?: (data: any) => void;
}

/**
 * SignupButtonShinyMantineModal Component
 * 
 * A reusable button component that combines the shiny animation effect with
 * the Mantine signup modal. Used as the primary CTA for email collection.
 * 
 * Features:
 * - Shiny button animation from ShinyButton component
 * - Integrated Mantine multi-step signup modal
 * - Customizable button text
 * - Event callbacks for modal state changes
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SignupButtonShinyMantineModal>
 *   Get Early Access
 * </SignupButtonShinyMantineModal>
 * 
 * // With custom styling and callbacks
 * <SignupButtonShinyMantineModal
 *   className="w-full md:w-auto mt-8"
 *   onSignupSuccess={(data) => console.log('Signup success:', data)}
 * >
 *   Join Waitlist
 * </SignupButtonShinyMantineModal>
 * ```
 */
export default function SignupButtonShinyMantineModal({ 
  className,
  children = 'Sign Up Now', // {{REPLACE_COPY}} - Default button text
  onModalOpen,
  onModalClose,
  onSignupSuccess
}: SignupButtonShinyMantineModalProps) {
  // Modal visibility state
  const [modalOpened, setModalOpened] = useState(false);

  // Handle modal open
  const handleOpen = () => {
    setModalOpened(true);
    onModalOpen?.();
  };

  // Handle modal close
  const handleClose = () => {
    setModalOpened(false);
    onModalClose?.();
  };

  // Handle successful signup
  const handleSuccess = (data: any) => {
    onSignupSuccess?.(data);
  };

  return (
    <>
      {/* Shiny Button Trigger */}
      <ShinyButton
        onClick={handleOpen}
        className={cn(
          "relative rounded-lg",
          className
        )}
      >
        {children}
      </ShinyButton>

      {/* Mantine Signup Modal */}
      <MantineSignupModal
        opened={modalOpened}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </>
  );
}