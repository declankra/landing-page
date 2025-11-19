import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // These would be replaced with actual values from your config or CMS
  const siteConfig = {
    title: 'ValidateIdea', // {{REPLACE_WITH_PRODUCT_NAME}}
    description: 'Quickly launch and validate your ideas now', // {{REPLACE_WITH_PRODUCT_DESCRIPTION}}
    siteUrl: 'https://landing-page-nu-plum-69.vercel.app', // {{REPLACE_WITH_SITE_URL}} e.g., https://yourproduct.com
    themeColor: '#ffffff',
    siteImage: '/public/logos/ProjectLogo.webp'
  };

  // Simple base64 transparent favicon as fallback
  const fallbackFavicon = 'data:image/x-icon;base64,AAABAAEAAQEAAAEAGAAsAAAAFgAAACgAAAABAAAAAgAAAAEAGAAAAAAACAAAABMLAAATCwAAAAAAAAAAAAD/AA==';

  return (
    <Html lang="en">
      <Head>
        {/* Essential meta tags */}
        <meta charSet="utf-8" />

        {/* Best Font Option: Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />

        {/* Favicon with fallback */}
        <link 
          rel="icon" 
          href="/icons/CheckTargetFavicon.ico"
          // If favicon.ico fails to load, use the fallback
          onError={(e) => {
            const target = e.target as HTMLLinkElement;
            target.href = fallbackFavicon;
          }}
        />

        {/* Essential Meta Tags */}
        <meta name="title" content={siteConfig.title} />
        <meta name="description" content={siteConfig.description} />
        <meta name="theme-color" content={siteConfig.themeColor} />
        
        {/* Basic OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteConfig.siteUrl} />
        <meta property="og:title" content={siteConfig.title} />
        <meta property="og:description" content={siteConfig.description} />
        <meta property="og:image" content={siteConfig.siteImage} />

        
        {/* Basic Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={siteConfig.title} />
        <meta name="twitter:description" content={siteConfig.description} />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Optional: Fallback for no-JS environments */}
        <noscript>
          <div 
            style={{
              padding: '20px',
              textAlign: 'center',
              background: '#f44336',
              color: 'white',
            }}
          >
            Please enable JavaScript to use all features of this application.
          </div>
        </noscript>
      </body>
    </Html>
  );
}