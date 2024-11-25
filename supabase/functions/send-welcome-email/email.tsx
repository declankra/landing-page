// /supabase/functions/send-welcome-email/email.tsx
import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
    Button,
    Column,
    Row,
} from 'https://esm.sh/@react-email/components'
import { SocialLinks } from './social-links.tsx'
import React from 'https://esm.sh/react@18.2.0'

interface WelcomeEmailProps {
    email: string
    projectURL: string
    portfolioUrl: string
    guideUrl: string
    socialLinks: {
        linkedin?: string
        github?: string
        producthunt?: string
        twitter?: string
    }
}

export const WelcomeEmail = ({
    email,
    projectURL,
    portfolioUrl,
    guideUrl,
    socialLinks
}: WelcomeEmailProps) => {
    const previewText = `Welcome to ValidateIdea - Let\'s Build Something Great!`

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={main}>
                {/* Header Section */}
                <Container style={container}>
                    <Img
                        src={`${projectURL}/logo.png`}
                        width="40"
                        height="40"
                        alt="Logo"
                    />
                    <Heading style={h1}>Welcome to ValidateIdea!</Heading>
                    <Text style={text}>
                        Hey there,<br /><br />
                        My name is Declan - I'm the creator of ValidateIdea. Thank you for expressing interest in my project!<br /><br />
                        I built ValidateIdea because I was struggling to <strong> overcome decision paralysis</strong> on seemingly endless <strong>ideas that never became <em>real</em></strong>. <br /> <br />
                        Now there's a simple way to <strong>answer the question "what should I build?"</strong> (hint: it works)
                    </Text>

                    {/* Main Content Section */}
                    <Section style={section}>
                        <Heading as="h2" style={h2}>
                            Your Next Steps
                        </Heading>
                        <Text style={text}>
                            This isn't just another landing page template - it's your complete toolkit for validating ideas quickly and effectively. I've documented everything you need to know in a comprehensive guide.
                        </Text>
                        <Button
                            href={guideUrl}
                            style={button}
                        >
                            Read the Guide
                        </Button>
                    </Section>

                    {/* PS - Reply Section */}
                    <Section style={section}>
                        <Text style={text}>
                            <strong>PS: Why did you signup? What brought you here?</strong><br />
                            Hit "Reply" and let me know. I read and reply to every email :)
                        </Text>
                    </Section>


                    {/* Portfolio Link Section */}
                    <Section style={section}>
                        <Text style={text}>
                            Want to learn more about my other projects? Check out my portfolio:
                        </Text>
                        <Link href={portfolioUrl} style={link}>
                            declankramper.me
                        </Link>
                    </Section>

                    {/* Footer Section */}
                    <Section style={footer}>
                        <Row>
                            <Column>
                                <Img
                                    src={`${projectURL}/logo.png`}
                                    width="32"
                                    height="32"
                                    alt="Logo"
                                />
                                <Link href={projectURL} style={link}>
                                    ValidateIdea.now<br></br>
                                </Link>
                                <SocialLinks links={socialLinks} />
                                <Text style={footerText}>
                                    © {new Date().getFullYear()} dkBuilds. All rights reserved.
                                </Text>
                            </Column>
                        </Row>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
}

// Styles
// Replace the existing style objects with these updated ones that match your design system

const main = {
    backgroundColor: 'hsl(var(--color-base-100))', // Use your light background
    fontFamily: 'var(--font-sans)', // Use your Inter font
}

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '580px',
}

const section = {
    padding: 'var(--section-space-sm)', // Using your spacing system
}

const h1 = {
    color: 'hsl(var(--color-base-content))', // Primary text color
    fontSize: 'var(--heading-1-fluid)', // Using your fluid typography
    fontWeight: 'var(--heading-1-weight)',
    lineHeight: 'var(--heading-1-line-height)',
    margin: '16px 0',
}

const h2 = {
    color: 'hsl(var(--color-base-content))',
    fontSize: 'var(--heading-2-fluid)',
    fontWeight: 'var(--heading-2-weight)',
    lineHeight: 'var(--heading-2-line-height)',
    margin: '16px 0',
}

const text = {
    color: 'hsl(var(--color-base-content-secondary))', // Secondary text color
    fontSize: 'var(--text-base)', // Base text size
    lineHeight: 'var(--leading-normal)',
    margin: '16px 0',
}

const button = {
    backgroundColor: 'hsl(var(--color-primary))', // Primary brand color
    borderRadius: 'var(--radius-md)', // Using your radius system
    color: 'hsl(var(--color-primary-content))', // Text color on primary
    display: 'inline-block',
    fontSize: 'var(--text-base)',
    fontWeight: 'var(--font-semibold)',
    padding: 'var(--space-sm) var(--space-md)', // Using your spacing system
    textDecoration: 'none',
    textAlign: 'center' as const,
}

const link = {
    color: 'hsl(var(--color-primary))', // Primary brand color
    textDecoration: 'none',
}

const footer = {
    borderTop: `1px solid hsl(var(--color-base-300))`, // Border color
    marginTop: 'var(--space-xl)',
    paddingTop: 'var(--space-lg)',
}

const footerText = {
    fontSize: 'var(--text-xs)',
    lineHeight: 'var(--leading-normal)',
    color: 'hsl(var(--color-base-content-secondary))', // Muted text color
}