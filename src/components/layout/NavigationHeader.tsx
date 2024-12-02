// src/components/layout/NavigationHeader.tsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useWindowScroll } from '@mantine/hooks';
import { Menu } from 'lucide-react';
import SignupButtonShinyMantineModal from '../shared/SignupButtonShinyMantineModal';
import styles from '@/styles/components/NavigationHeader.module.css';
import { cn } from "@/lib/utils";
import Link from 'next/link';


interface NavigationLink {
  label: string;
  href: string;
  type: 'section' | 'page';
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
  logoSrc = "/logos/CheckTarget.svg",
  logoAlt = "Project Logo",
  productName = "ValidateIdea",
  links = [
    { label: "How It Works", href: "#how-it-works", type: "section" },
    { label: "Testimonials", href: "#testimonials", type: "section" },
    { label: "Features", href: "#features", type: "section" },
    { label: "FAQ", href: "#faq", type: "section" }
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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, type: string) => {
    if (type === 'page') {
      // For page navigation, we should just let the default behavior happen
      // Remove the special case for home page as it's causing issues
      return;
    }

    // For section navigation
    e.preventDefault();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const offset = 30;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsMobileMenuOpen(false);
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
          <Link
            href="/"
            className={styles.logoLink}
            onClick={(e) => handleNavClick(e, '/', 'page')}
            aria-label="Go to homepage"
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
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={styles.linkContainer}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                styles.link,
                activeSection === link.href && styles.active
              )}
              onClick={(e) => handleNavClick(e, link.href, link.type || 'section')}
            >
              {link.label}
            </Link>

          ))}

          <Link href="/examples">Examples</Link>
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
          <SignupButtonShinyMantineModal>
            Get Access
          </SignupButtonShinyMantineModal>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div className={cn(styles.mobileNav, isMobileMenuOpen && styles.mobileNavOpen)}>
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              styles.mobileLink,
              activeSection === link.href && styles.active
            )}
            onClick={(e) => {
              handleNavClick(e, link.href, link.type || 'section');
              setIsMobileMenuOpen(false);
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}