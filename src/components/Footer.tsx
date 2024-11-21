// src/components/Footer.tsx
import { 
    IconBrandTwitter, 
    //IconBrandFacebook, 
    IconBrandLinkedin, 
    IconBrandInstagram, 
    //IconBrandYoutube, 
    IconBrandProducthunt, 
    IconBrandReddit,
    IconBrandGithub
  } from '@tabler/icons-react';
  import Link from 'next/link';
  import styles from '../styles/Footer.module.css';
  
  interface FooterProps {
    // {{REPLACE_CONFIG}} - Replace these with your product's details
    creatorName?: string;
    creatorUrl?: string;
    companyName?: string;
    socials?: {
      twitter?: string;
      //facebook?: string;
      linkedin?: string;
      instagram?: string;
      //youtube?: string;
      producthunt?: string;
      reddit?: string;
      github?: string;
    };
  }
  
  export default function Footer({ 
    creatorName = "Creator",
    creatorUrl = "https://www.yourpotfolio.com",
    companyName = "Company",
    socials = {
      twitter: "https://twitter.com/example",
     // facebook: "https://facebook.com/example",
      linkedin: "https://linkedin.com/company/example",
      instagram: "https://instagram.com/example",
      //youtube: "https://youtube.com/@example",
      producthunt: "https://www.producthunt.com/@example",
      reddit: "https://reddit.com/@example",
      github: "https://github.com/example"
    }
  }: FooterProps) {
    // Get current year for copyright
    const currentYear = new Date().getFullYear();
  
    // Function to render social media icons with links
    const renderSocialLinks = () => {
      const socialIcons = {
        github: <IconBrandGithub size={20} stroke={1.5} />,
        twitter: <IconBrandTwitter size={20} stroke={1.5} />,
       // facebook: <IconBrandFacebook size={20} stroke={1.5} />,
        linkedin: <IconBrandLinkedin size={20} stroke={1.5} />,
        instagram: <IconBrandInstagram size={20} stroke={1.5} />,
        //youtube: <IconBrandYoutube size={20} stroke={1.5} />,
        producthunt: <IconBrandProducthunt size={20} stroke={1.5} />,
        reddit: <IconBrandReddit size={20} stroke={1.5} />
      };
  
      return (
        <div className={styles.socialLinks}>
          {Object.entries(socials).map(([platform, url]) => {
            if (!url) return null;
            
            // Only render icons that we have defined
            const Icon = socialIcons[platform as keyof typeof socialIcons];
            if (!Icon) return null;
  
            return (
              <Link
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={`Visit our ${platform} page`}
              >
                {Icon}
              </Link>
            );
          })}
        </div>
      );
    };
  
    return (
      <footer className={styles.footer}>
        <div className={styles.container}>
          {/* Left section - Creator attribution */}
          <div className={styles.section}>
            <p className={styles.attribution}>
              Brought to you by{' '}
              <Link
                href={creatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.creatorLink}
              >
                {creatorName}
              </Link>
            </p>
          </div>
  
          {/* Middle section - Copyright */}
          <div className={`${styles.section} ${styles.copyright}`}>
            <p>
              © {currentYear} {companyName}. All rights reserved.
            </p>
          </div>
  
          {/* Right section - Social links */}
          <div className={`${styles.section} ${styles.social}`}>
            {renderSocialLinks()}
          </div>
        </div>
      </footer>
    );
  }