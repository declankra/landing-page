// src/components/sections/FAQDrawer.tsx
import { Container, Title, Text, Accordion } from '@mantine/core';
import styles from '@/styles/components/FAQDrawer.module.css';

// {REPLACE_EMAIL} - Replace with your actual email
const CONTACT_EMAIL = 'support@example.com';

// {{REPLACE_FAQS}} - Replace these with your product's actual FAQs
const faqs = [
  {
    question: "What problem does this solve?",
    answer: "We solve [specific pain point] by [unique solution approach]. Our solution helps you [achieve specific benefit] without [common drawbacks of alternatives]."
  },
  {
    question: "How does it work?",
    answer: "Our process is simple: 1) Sign up with your email, 2) [Key step in user journey], 3) [Value delivery step]. You'll start seeing results [timeframe or condition]."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! We offer early access users [specific offer details]. This helps you evaluate if our solution truly [delivers promised value proposition]."
  },
  {
    question: "How is this different from alternatives?",
    answer: "Unlike other solutions that [limitation of alternatives], we [key differentiator]. This means you get [unique benefit] without [common trade-off]."
  },
  {
    question: "What kind of support do you provide?",
    answer: "We provide [support channels] support during [time period]. Our team typically responds within [timeframe], ensuring you never get stuck."
  },
  {
    question: "I have other questions!",
    answer: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> 
  }
];

interface FAQDrawerProps {
  title?: string;
  subtitle?: string;
}

export default function FAQDrawer({ 
  title = "Frequently Asked Questions",
  subtitle = "Everything you need to know about the product and billing."
}: FAQDrawerProps) {
  return (
    // Using article for better SEO
    <article className={styles.container}>
      <Container size="md">
        <header className={styles.header}>
          {/* h2 for proper heading hierarchy */}
          <Title order={2} className={styles.title}>
            {title}
          </Title>
          <Text className={styles.subtitle}>
            {subtitle}
          </Text>
        </header>

        {/* Semantic FAQ list for SEO */}
        <div itemScope itemType="https://schema.org/FAQPage">
          <Accordion 
            className={styles.accordion}
            variant="separated"
            radius="md"
          >
            {faqs.map((faq, index) => (
              // Each FAQ item is wrapped in schema.org markup
              <Accordion.Item 
                key={index} 
                value={`item-${index}`}
                className={styles.item}
                itemScope 
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <Accordion.Control>
                  <span itemProp="name">{faq.question}</span>
                </Accordion.Control>
                <Accordion.Panel>
                  <div 
                    itemScope 
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <div itemProp="text">
                      {faq.answer}
                    </div>
                  </div>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </div>
      </Container>
    </article>
  );
}