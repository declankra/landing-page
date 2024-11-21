// src/components/sections/LogoClouds.tsx
import Image from 'next/image';

// {{REPLACE_LOGOS}} - Replace these with your product's actual customer/partner logos
const LOGO_LIST = [
  { name: "Google", src: "https://cdn.worldvectorlogo.com/logos/google-1-1.svg" },
  { name: "Nvidia", src: "https://cdn.worldvectorlogo.com/logos/nvidia-image-logo.svg" },
  { name: "Indeed", src: "https://cdn.worldvectorlogo.com/logos/indeed-1.svg" },
  { name: "Publicis Sapient", src: "/PS_Logo.svg" },
  { name: "Deloitte", src: "/DeloitteLogo.svg" },
];

/**
 * LogoClouds Component
 * 
 * A simple grid of company logos with consistent sizing and proper aspect ratio handling.
 * All logos maintain their aspect ratios within a fixed container size.
 */
export default function LogoClouds() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* {{REPLACE_TITLE}} - Replace with your social proof title */}
        <h2 className="text-center text-xl font-semibold leading-8 text-foreground">
          Trusted by innovative teams worldwide
        </h2>

        {/* Logo Grid */}
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {LOGO_LIST.map((logo) => (
            <div
              key={logo.name}
              className="col-span-2 flex justify-center lg:col-span-1"
            >
              {/* Fixed aspect ratio container */}
              <div className="relative h-12 w-full">
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 25vw, 20vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}