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
  import { SocialLinks } from '../components/social-links'
  import React from 'https://esm.sh/react@18.2.0'

  interface WelcomeEmailProps {
    email: string
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
    portfolioUrl,
    guideUrl,
    socialLinks
  }: WelcomeEmailProps) => {
    const previewText = `Welcome to ValidateIdea.now - Let\'s Build Something Great!`
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Body style={main}>
          {/* Header Section */}
          <Container style={container}>
            <Img
              src={`${portfolioUrl}/logo.png`}
              width="40"
              height="40"
              alt="Logo"
            />
            <Heading style={h1}>Welcome to Idea(L)anding Page!</Heading>
            <Text style={text}>
              Hi there,<br /><br />
              Thank you for expressing interest in our project! I'm thrilled to have you join us on this journey of turning ideas into reality.
            </Text>
  
            {/* Main Content Section */}
            <Section style={section}>
              <Heading as="h2" style={h2}>
                Your Next Steps
              </Heading>
              <Text style={text}>
                This isn't just another landing page template - it's your complete toolkit for validating ideas quickly and effectively. I've documented everything you need to know in our comprehensive guide.
              </Text>
              <Button 
                href={guideUrl}
                style={button}
              >
                Read the Guide
              </Button>
            </Section>
  
            {/* Portfolio Link Section */}
            <Section style={section}>
              <Text style={text}>
                Want to learn more about the builder or see other projects? Check out my portfolio:
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
                    src={`${portfolioUrl}/logo.png`}
                    width="32"
                    height="32"
                    alt="Logo"
                  />
                  <Text style={footerText}>
                    ValidateIdea.now
                  </Text>
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
  const main = {
    backgroundColor: '#ffffff',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  }
  
  const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '580px',
  }
  
  const section = {
    padding: '24px 0',
  }
  
  const h1 = {
    color: '#1a1a1a',
    fontSize: '24px',
    fontWeight: '600',
    lineHeight: '1.3',
    margin: '16px 0',
  }
  
  const h2 = {
    color: '#1a1a1a',
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '1.3',
    margin: '16px 0',
  }
  
  const text = {
    color: '#4a4a4a',
    fontSize: '16px',
    lineHeight: '1.5',
    margin: '16px 0',
  }
  
  const button = {
    backgroundColor: '#0070f3',
    borderRadius: '4px',
    color: '#fff',
    display: 'inline-block',
    fontSize: '16px',
    fontWeight: '600',
    padding: '12px 24px',
    textDecoration: 'none',
    textAlign: 'center' as const,
  }
  
  const link = {
    color: '#0070f3',
    textDecoration: 'none',
  }
  
  const footer = {
    borderTop: '1px solid #e6ebf1',
    marginTop: '32px',
    paddingTop: '32px',
  }
  
  const footerText = {
    fontSize: '12px',
    lineHeight: '1.5',
    color: '#8898aa',
  }
  