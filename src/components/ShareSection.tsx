// src/components/ShareSection.tsx
import { Link2, Facebook, Linkedin} from 'lucide-react';
import { TwitterLogoIcon, DiscordLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons"
import { IconBrandReddit } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast"
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
  trackingUrl = "https://dub.sh/IdeaLandingPage",
  productName = "ProductName",
  coreBenefit = "game-changing solution",
}: ShareConfig) {
  const { toast } = useToast(); // Use shadcn's toast

  // Social media share text
  const shareText = `Check out ${productName} - a ${coreBenefit}! 🚀`;
  
  // Social media share URLs
  const socialShareUrls = {
    Twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(trackingUrl)}`,
    Facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(trackingUrl)}&quote=${encodeURIComponent(shareText)}`,
    Linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(trackingUrl)}&summary=${encodeURIComponent(shareText)}`,
    Discord: `https://discord.com/share?url=${encodeURIComponent(trackingUrl)}&title=${encodeURIComponent(shareText)}`,
    Instagram: `https://www.instagram.com/share?url=${encodeURIComponent(trackingUrl)}&caption=${encodeURIComponent(shareText)}`,
    Reddit: `https://www.reddit.com/submit?url=${encodeURIComponent(trackingUrl)}&title=${encodeURIComponent(shareText)}`
  };

  // Handle copy to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(trackingUrl);
      toast({
        description: "Link copied to clipboard!",
        duration: 1800,
      });
    } catch (error: unknown) {
      console.error('Failed to copy:', error);
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
                  onClick={() => window.open(socialShareUrls.Twitter, '_blank')}
                  aria-label="Share on Twitter"
                >
                  <TwitterLogoIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(socialShareUrls.Facebook, '_blank')}
                  aria-label="Share on Facebook"
                >
                  <Facebook strokeWidth = {1.5} className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(socialShareUrls.Linkedin, '_blank')}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin strokeWidth = {1.5} className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(socialShareUrls.Discord, '_blank')}
                  aria-label="Share on Discord"
                >
                  <DiscordLogoIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(socialShareUrls.Instagram, '_blank')}
                  aria-label="Share on Instagram"
                >
                  <InstagramLogoIcon className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => window.open(socialShareUrls.Reddit, '_blank')}
                  aria-label="Share on Reddit"
                >
                  <IconBrandReddit stroke-width = {1.6} className="h-5 w-5" />
                </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )

}