// src/components/layout/NavigationHeader.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWindowScroll } from '@mantine/hooks';
import { Menu } from 'lucide-react';
import SignupButtonShiny from '../shared/SignupButtonShiny';
import styles from '@/styles/components/NavigationHeader.module.css';
import { cn } from "@/lib/utils";

interface NavigationLink {
  label: string;
  href: string;
}

interface NavigationHeaderProps {
  // {{REPLACE_PROPS}} - Configure based on your product needs
  logoSrc?: string;
  logoAlt?: string;
  productName?: string; // Product name to display next to logo
  links?: NavigationLink[];
  activeOffset?: number; // Offset for determining active section
}

/**
 * NavigationHeader Component
 * 
 * A responsive navigation header with scroll-based visibility,
 * smooth section navigation, and integrated signup button.
 * 
 * Features:
 * - Auto-hide on scroll down, show on scroll up
 * - Smooth scroll to sections
 * - Blur effect background
 * - Responsive design
 * - Project logo with home link
 * - Configurable navigation links
 * 
 * @param logoSrc - Path to logo image
 * @param logoAlt - Alt text for logo
 * @param links - Array of navigation links
 */
export default function NavigationHeader({ 
  // {{REPLACE_CONFIG}} - Replace with your product's details
  logoSrc = "/logos/RocketBulb.svg",
  logoAlt = "Project Logo",
  productName = "IdeaValidate", 
  links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Features", href: "#features" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQ", href: "#faq" }
  ],
  activeOffset = 80 // Pixels from top to consider section active
}: NavigationHeaderProps) {
  // Track active section
  const [activeSection, setActiveSection] = useState<string>('');
  const [{ y: scrollY }] = useWindowScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


   // Handle scroll behavior
   useEffect(() => {
    const handleScroll = () => {
      if (scrollY < lastScrollY || scrollY < 50) {
        setIsVisible(true);
      } 
      else if (scrollY > 50 && scrollY > lastScrollY) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu on scroll
      }
      
      setLastScrollY(scrollY);

      // Active section detection
      const sections = links.map(link => ({
        id: link.href.replace('#', ''),
        element: document.getElementById(link.href.replace('#', ''))
      }));

      const currentSection = sections.find(section => {
        if (!section.element) return false;
        const rect = section.element.getBoundingClientRect();
        return rect.top <= activeOffset && rect.bottom > activeOffset;
      });

      setActiveSection(currentSection ? `#${currentSection.id}` : '');
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY, lastScrollY, links, activeOffset]);

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    
    setIsMobileMenuOpen(false); // Close menu after click
  };

  return (
    <header 
      className={cn(
        styles.header,
        isVisible ? styles.visible : styles.hidden
      )}
    >
      <nav className={styles.nav}>
        {/* Logo and Product Name Section */}
        <div className={styles.logoContainer}>
          <a 
            href="#" 
            className={styles.logoLink}
            onClick={(e) => handleNavClick(e, '#')}
            aria-label="Go to top of page"
          >
            <div className={styles.logoWrapper}>
              <Image
                src={logoSrc}
                alt={logoAlt}
                width={32}
                height={32}
                className={styles.logo}
              />
            </div>
            {/* Product Name now inside the link */}
            <span className={styles.productName} title={productName}>
              {productName}
            </span>
          </a>
        </div>

        {/* Navigation Links */}
        <div className={styles.linkContainer}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                styles.link,
                activeSection === link.href && styles.active
              )}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu size={24} />
        </button>

        {/* Signup Button */}
        <div className={styles.buttonWrapper}>
          <SignupButtonShiny>
            Get Access
          </SignupButtonShiny>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={cn(styles.mobileNav, isMobileMenuOpen && styles.mobileNavOpen)}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              styles.mobileLink,
              activeSection === link.href && styles.active
            )}
            onClick={(e) => {
              handleNavClick(e, link.href);
              setIsMobileMenuOpen(false);
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
}