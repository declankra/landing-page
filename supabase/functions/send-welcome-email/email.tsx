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
                        src={`${projectURL}/logos/CheckTarget.svg`}
                        width="40"
                        height="40"
                        alt="Logo"
                    />
                    <Heading style={h1}>Welcome to ValidateIdea!</Heading>
                    <Text style={text}>
                        Hey there,<br /><br />
                        My name is <a href="https://dub.sh/declankramper" target="_blank">Declan</a> - I'm the creator of ValidateIdea. Thank you for expressing interest in my project!<br /><br />
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
                            Hit "reply" and let me know. I read and reply to every email :)
                        </Text>
                    </Section>


                    {/* Footer Section */}
                    <Section style={footer}>
                        <Row>
                            <Column>
                                <Img
                                    src={`${projectURL}/logos/CheckTarget.svg`}
                                    width="32"
                                    height="32"
                                    alt="Logo"
                                />
                                <Link href={projectURL} style={link}>
                                    ValidateIdea.now<br /><br />
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
    backgroundColor: '#FFFFFF', // --color-base-100 light value
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, system-ui, sans-serif', // --font-sans
}

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '580px',
}

const section = {
    padding: '0rem', // --section-space-sm: clamp(2rem, 4vw, 3rem)
}

const h1 = {
    color: '#171717', // --color-base-content
    fontSize: '1.75rem', // --heading-1-fluid: clamp(2.5rem, 5vw + 1rem, 3.75rem)
    fontWeight: '900', // --heading-1-weight
    lineHeight: '1.3', // --heading-1-line-height
    letterSpacing: '-0.02em', // --heading-1-tracking
    margin: '16px 0',
}

const h2 = {
    color: '#171717',
    fontSize: '1.5rem', // --heading-2-fluid: clamp(2rem, 4vw + 1rem, 3rem)
    fontWeight: '700', // --heading-2-weight
    lineHeight: '1.35', // --heading-2-line-height
    letterSpacing: '-0.01em', // --heading-2-tracking
    margin: '16px 0',
}

const text = {
    color: '#525252', // --color-base-content-secondary
    fontSize: '1rem', // --text-base
    lineHeight: '1.5', // --leading-normal
    margin: '16px 0',
}

const button = {
    backgroundColor: '#0EA5E9', // --color-primary (Neon Sky Blue)
    borderRadius: '0.375rem', // --radius-md
    color: '#FFFFFF', // --color-primary-content
    display: 'inline-block',
    fontSize: '1rem',
    fontWeight: '600',
    padding: '0.75rem 1.5rem',
    textDecoration: 'none',
    textAlign: 'center' as const,
}

const link = {
    color: '#0EA5E9', // --color-primary
    textDecoration: 'none',
}

const footer = {
    borderTop: '1px solid #E5E5E5', // --color-base-300
    marginTop: '4rem', // --space-xl
    paddingTop: '2rem', // --space-lg
}

const footerText = {
    fontSize: '0.75rem', // --text-xs
    lineHeight: '1.5',
    color: '#737373', // A bit lighter than base-content-secondary for footer
}

// Update social links styles too
export const socialLink = {
    color: '#8898aa',
    fontSize: '0.75rem', // Consistent with footerText
    textDecoration: 'none',
    marginRight: '12px',
}

export const socialLinksContainer = {
    marginTop: '12px',
    marginBottom: '12px',
}