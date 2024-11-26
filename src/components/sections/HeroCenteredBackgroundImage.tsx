// src/components/sections/HeroCenteredBackgroundImage.tsx

'use client'

import React, { useState } from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import RetroGrid from '@/components/ui/retro-grid';
import { MantineSignupModal } from '../shared/mantine-signup-modal';
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { SignupSource } from '@/lib/analytics/amplitude/signup-analytics';

type ChecklistItem = {
  text: string
}

type SubtitleProps =
  | {
      type: 'checklist'
      checklistTitle: string
      checklistItems: ChecklistItem[]
      highlightedWord?: string    // Added optional property
      tooltipText?: string        // Added optional property
    }
  | {
      type: 'paragraph'
      content: React.ReactNode
    }

type HeroCenteredBackgroundImageProps = {
  title?: string
  subtitle?: SubtitleProps
  backgroundImage?: React.ComponentType<{ className?: string }>
  primaryButtonText: string
  primaryButtonHref?: string
  secondaryButtonText: string
  secondaryButtonHref: string
}


export default function HeroCenteredBackgroundImage({
  // {{REPLACE_COPY}} - Update these defaults with your product's copy
  title: title = 'The headline copy that makes you stay',
  subtitle: subtitle={
    type: 'checklist',
    checklistTitle: 'Your problem is solved:',
    checklistItems: [
      { text: 'More easy' },
      { text: 'More time' },
      { text: 'More winning' },
    ],
    highlightedWord: 'problem',
    tooltipText: 'we understand your problem',
  },
  backgroundImage: BackgroundImage = RetroGrid,
  primaryButtonText,
  // primaryButtonHref: primaryButtonHref='/signup',
  secondaryButtonText,
  secondaryButtonHref,
}: HeroCenteredBackgroundImageProps) {
    // Modal state management
    const [modalOpened, setModalOpened] = useState(false);
    const renderHighlightedTitle = (title: string, highlightedWord?: string, tooltipText?: string) => {
      if (!highlightedWord || !tooltipText) return title;
  
      const parts = title.split(new RegExp(`(${highlightedWord})`, 'gi'));
      return (
        <TooltipProvider delayDuration={100}>
          {parts.map((part, index) => 
            part.toLowerCase() === highlightedWord.toLowerCase() ? (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <span className="italic underline decoration-wavy decoration-primary cursor-pointer">
                    {part}
                  </span>
                </TooltipTrigger>
                <TooltipContent sideOffset={5}>
                  <p>{tooltipText}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              part
            )
          )}
        </TooltipProvider>
      );
    };
  
    return (
        <div className="relative isolate px-6 lg:px-8">
          {/* Background component with isolation */}
          <BackgroundImage className="absolute inset-0 -z-10" />
    
          <div className="mx-auto max-w-2xl py-10">
            <div className="text-center">
              {/* Main headline */}
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                {title}
              </h1>

              {/* Subtitle section */}
              <div className="mt-6 text-lg leading-8 text-gray-600">
                {subtitle.type === 'checklist' ? (
                  <div className = "items-center">
                    {/* Checklist title */}
                <h2 className="text-xl font-semibold mb-4">
                  {renderHighlightedTitle(subtitle.checklistTitle, subtitle.highlightedWord, subtitle.tooltipText)}
                </h2>
                    {/* Checklist items with vertical alignment */}
                    <ul className="flex flex-col items-start space-y-4 text-left">
                      {subtitle.checklistItems.map((item, index) => (
                       <li 
                       key={index} 
                       className={cn(
                         "flex items-center space-x-3",
                         "w-full max-w-xs mx-auto", // Control width and center alignment
                       )}
                     >
                          <CheckIcon className="h-5 w-5 text-primary" />
                          <span className="text-md text-muted-foreground-800">
                            {item.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-pretty">{subtitle.content}</p>
                )}
              </div>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {/* Primary CTA Button - Opens Modal */}
                <Button 
                  variant="keyCTA" 
                  onClick={() => setModalOpened(true)}
                  size="lg"
                >
                  {primaryButtonText}
                </Button>
    
                {/* Secondary Link Button - Uses minimal variant */}
                <Link href={secondaryButtonHref}>
                  <Button variant="link">
                    {secondaryButtonText} <span aria-hidden="true">→</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
    
          {/* Signup Modal */}
          <MantineSignupModal
            opened={modalOpened}
            onClose={() => setModalOpened(false)}
              // Optional: Pass requestEmail if you have it
              // requestEmail={userEmail}
              // Optional: Pass custom steps
              // steps={customSteps}
              // Optional: Custom table name
              // supabaseTable="early_access_signups"
              source={SignupSource.HERO}  // Track CTA source
          />
        </div>
      )
    }

/*




        <Button onClick={() => setOpened(true)} >
        Sign Up
      </Button>

      <MantineSignupModal
        opened={opened}
        onClose={() => setOpened(false)}
      />



*/

/*

To use this component, you would import it and pass the necessary props. 

//// WITH CHECKLIST

import HeroCenteredBackgroundImage from './HeroCenteredBackgroundImage'
import CustomBackgroundImage from './CustomBackgroundImage' // Optional: Your custom background component

export default function HomePage() {
  return (
    <HeroCenteredBackgroundImage
      title="Welcome to Our Amazing Product"
      subtitle={{
        type: 'checklist',
        checklistTitle: 'Why Choose Us?',
        checklistItems: [
          { text: 'Innovative Features' },
          { text: 'User-Friendly Interface' },
          { text: '24/7 Customer Support' },
        ],
        highlightedWord: '', // optional
        tooltipText: '' // optional
      }}
      // Optional: Use a custom background image
      // backgroundImage={CustomBackgroundImage}
      primaryButtonText="Get Started"
      primaryButtonHref="/signup"
      secondaryButtonText="Learn More"
      secondaryButtonHref="/about"
    />
  )
}

//// For the PARAGRAPH subtitle option with custom text styling, you could use it like this:

<HeroCenteredBackgroundImage
  title="Discover the Future of Technology"
  subtitle={{
    type: 'paragraph',
    content: (
      <>
        Experience the <strong>power of innovation</strong> with our cutting-edge solutions. 
        Our products are designed to <span className="text-primary">transform</span> the way you work and live.
      </>
    ),
  }}
  primaryButtonText="Explore Now"
  primaryButtonHref="/products"
  secondaryButtonText="Watch Demo"
  secondaryButtonHref="/demo"
/>

*/
