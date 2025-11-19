// src/components/sections/ShareSection.tsx
import { Link2, Facebook, Linkedin} from 'lucide-react';
import { TwitterLogoIcon, DiscordLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons"
import { IconBrandReddit } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
import { useOpenPanel } from '@/lib/analytics/openpanel/OpenPanelProvider';
import { ANALYTICS_EVENTS } from '@/lib/analytics/openpanel/events';

// import styles from '../styles/ShareSection.module.css'; // not used because overriding with shadcn defaults

// Configuration object for easy customization per product
interface ShareConfig {
  title?: string;
  subtext?: string;
  trackingUrl?: string;
  productName?: string;
  coreBenefit?: string;
}

export default function ShareSection({
  // {{REPLACE_CONFIG}} - Replace these defaults with your product's details
  title = "Invite a Friend! Share the power of {core feature}",
  subtext = "Help your friends discover the {core benefit}",
  trackingUrl = "https://landing-page-nu-plum-69.vercel.app",
  productName = "ProductName",
  coreBenefit = "game-changing solution",
}: ShareConfig) {
  const { toast } = useToast(); // Use shadcn's toast

  // Social media share text
  const shareText = `Check out ${productName} - ${coreBenefit}! 🎯`;
  
  // Handle social sharing with analytics
  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'discord' | 'instagram' | 'reddit')  => {
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(trackingUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(trackingUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(trackingUrl)}`,
      discord: `https://discord.com/share?url=${encodeURIComponent(trackingUrl)}`,
      instagram: `https://www.instagram.com/share?url=${encodeURIComponent(trackingUrl)}`,
      reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(trackingUrl)}`
    };

    // Track share attempt
    op.track(ANALYTICS_EVENTS.SHARE_CLICKED, {
      platform,
      location: 'share_section',
      url: trackingUrl,
      share_text: shareText
    });

    // Open share dialog
    window.open(shareUrls[platform], '_blank');
  };

  const op = useOpenPanel();

  // Handle copy to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(trackingUrl);
      // Track successful copy
      op.track(ANALYTICS_EVENTS.SHARE_CLICKED, {
        platform: 'copy',
        location: 'share_section',
        success: true
      });
      toast({
        description: "Link copied to clipboard!",
        duration: 1800,
      });
    } catch (error: unknown) {
      console.error('Failed to copy:', error);
      // Track failed copy attempt
      op.track(ANALYTICS_EVENTS.SHARE_CLICKED, {
        platform: 'copy',
        location: 'share_section',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      toast({
        variant: "destructive",
        description: "Failed to copy link",
      });
    }
  };


  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
            </h2>
            <p className="text-muted-foreground md:text-xl">
            {subtext}
            </p>
          </div>
          <div className="flex flex-col gap-4">
              <Button 
                size="lg" 
                className="w-full md:w-auto" 
                onClick={handleCopyLink}
                variant={"nonKeyCTA"}
              >
                <Link2 className="mr-2 h-5 w-5" />
                Copy Invite Link
              </Button>
              <div className="flex gap-4 justify-center md:justify-start">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('twitter')}
                  aria-label="Share on Twitter"
                >
                  <TwitterLogoIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('facebook')}
                  aria-label="Share on Facebook"
                >
                  <Facebook strokeWidth = {1.5} className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('linkedin')}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin strokeWidth = {1.5} className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('discord')}
                  aria-label="Share on Discord"
                >
                  <DiscordLogoIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('instagram')}
                  aria-label="Share on Instagram"
                >
                  <InstagramLogoIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleShare('reddit')}
                  aria-label="Share on Reddit"
                >
                  <IconBrandReddit strokeWidth = {1.6} className="h-5 w-5" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}