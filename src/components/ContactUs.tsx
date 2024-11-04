// src/components/ContactUs.tsx
import { useState } from 'react';
import { TextInput, Textarea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { hasLength, isEmail, matches } from '@mantine/form';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import WordRotate from '@/components/ui/word-rotate';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '../lib/supabaseClient';
import styles from '../styles/ContactUs.module.css';

// Rotating words for the left side animation
const rotatingWords = [
  'Reach out',
  'Ask questions',
  'Learn more',
  'Talk business'
];

interface ContactFormValues {
  name: string;
  email: string;
  tldr: string;
  message: string;
}

export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Initialize Mantine form with validation
  const form = useForm<ContactFormValues>({
    initialValues: {
      name: '',
      email: '',
      tldr: '',
      message: ''
    },
    validate: {
      name: hasLength({ min: 2 }, 'Name must be at least 2 characters'),
      email: isEmail('Please enter a valid email'),
      tldr: hasLength({ min: 2, max: 100 }, 'TLDR must be between 2-100 characters'),
      message: hasLength({ min: 2 }, 'Message must be at least 2 characters'),
    }
  });

  // Handle form submission
  const handleSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      // Insert into Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: values.name,
          email: values.email,
          tldr: values.tldr,
          message: values.message,
          created_at: new Date().toISOString()
        }]);

      if (error) throw error;

      // Show success toast
      toast({
        title: `Thank you ${values.name}!`,
        description: "Speed wins, expect a response shortly",
        duration: 5000,
      });

      // Reset form
      form.reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again. If urgent, call us: ######",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Contact Us</h2>
      
      <div className={styles.content}>
        {/* Left side - Rotating words */}
        <div className={styles.wordRotateWrapper}>
          <WordRotate
            words={rotatingWords}
            className={styles.rotatingWord}
            duration={3000}
            framerProps={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
              transition: { duration: 0.5, ease: "easeInOut" }
            }}
          />
        </div>

        {/* Right side - Contact form */}
        <form 
          className={styles.form}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            label="Name"
            placeholder="Your name"
            {...form.getInputProps('name')}
            className={styles.input}
          />
          
          <TextInput
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
            className={styles.input}
          />
          
          <TextInput
            label="TLDR"
            placeholder="Key point of your message"
            {...form.getInputProps('tldr')}
            className={styles.input}
          />
          
          <Textarea
            label="Message"
            placeholder="Details, details, devil, details"
            minRows={4}
            {...form.getInputProps('message')}
            className={styles.input}
          />
          
          <Button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            <Send className="mr-2" />
            Send message
          </Button>
        </form>
      </div>
    </section>
  );
}