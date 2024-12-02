// components/layout/Layout.tsx

// {{{ OPTIONAL LAYOUT FOR SINGLUE USE LAYOUT COMPONENT INSTEAD OF REUSING LAYOUT IN PAGES }}}
import NavigationHeader from './NavigationHeader';
import Footer from './Footer';
import styles from '@/styles/components/LandingPage.module.css';

interface LayoutProps {
  children: React.ReactNode;
  navigationLinks?: Array<{
    label: string;
    href: string;
    type?: 'section' | 'page';
  }>;
}

export default function Layout({ children, navigationLinks = [] }: LayoutProps) {
  return (
    <div className={styles.pageWrapper}>
      <NavigationHeader links={navigationLinks} />
      <main className={styles.mainWrapper}>
        {children}
      </main>
      <Footer 
        builderName="Declan"
        creatorUrl="https://www.declankramper.me"
        companyName="dkBuilds"
        socials={{
          twitter: "https://x.com/asbestostrades",
          linkedin: "https://www.linkedin.com/in/declan-kramper/",
          instagram: "https://instagram.com/dkramper",
          producthunt: "https://www.producthunt.com/@declan_kramper",
          github: "https://github.com/declankra"
        }}
      />
    </div>
  );
}