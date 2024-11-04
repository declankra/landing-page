// src/components/FAQDrawerMT.tsx
import { Container, Title, Accordion, Text } from '@mantine/core';
import styles from '../styles/FAQDrawerMT.module.css';

// FAQ configuration type
interface FAQItem {
  question: string;
  answer: string | JSX.Element;  // Changed from just string
}

interface FAQDrawerProps {
  title?: string;
  faqs?: FAQItem[];
}

// {REPLACE_EMAIL} - Replace with your actual email
const CONTACT_EMAIL = 'support@example.com';

// {{REPLACE_FAQS}} - Replace these with your product's actual FAQs
const defaultFAQs: FAQItem[] = [
  {
    question: "What makes this solution different?",
    answer: "Our solution stands out by {key differentiator}. Unlike traditional approaches, we {unique value proposition}."
  },
  {
    question: "How quickly can I get started?",
    answer: "You can get started immediately after signup. Our streamlined onboarding process takes less than {X} minutes."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! We offer a {trial period} free trial with full access to all features. No credit card required."
  },
  {
    question: "What kind of support do you offer?",
    answer: "We provide {support channels} support with a typical response time of {X} hours. Our team is here to help you succeed."
  },
  {
    question: "How secure is my data?",
    answer: "Security is our top priority. We use industry-standard encryption and {security measures} to protect your data."
  },
  {
    question: "I have other questions!",
    answer: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> 
  }
];

export default function FAQDrawerMT({ 
  title = "Frequently Asked Questions",
  faqs = defaultFAQs 
}: FAQDrawerProps) {
  return (
    // Article tag for better SEO
    <article className={styles.container}>
      <Container size="lg">
        <Title order={2} className={styles.title}>
          {title}
        </Title>
        
        {/* Accordion for FAQ items */}
        <Accordion 
          variant="default"
          radius="md"
          className={styles.accordion}
          classNames={{
            item: styles.accordionItem,
            control: styles.accordionControl,
            panel: styles.accordionPanel,
            chevron: styles.accordionChevron,
          }}
        >
          {faqs.map((faq, index) => (
            // Each FAQ item wrapped in section for SEO
            <section key={index}>
              <Accordion.Item value={`item-${index}`}>
                {/* Question text wrapped in h3 for SEO */}
                <Accordion.Control>
                  <h3 className={styles.question}>{faq.question}</h3>
                </Accordion.Control>
                <Accordion.Panel>
                  <Text className={styles.answer}>{faq.answer}</Text>
                </Accordion.Panel>
              </Accordion.Item>
            </section>
          ))}
        </Accordion>
      </Container>
    </article>
  );
}