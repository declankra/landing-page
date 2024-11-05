// src/components/LogoClouds.tsx
import Image from 'next/image'

export default function LogoClouds() {
  // Simple array of logo data
  const logos = [
    { name: "Capital One", src: "/CapitalOneLogo.svg" },
    { name: "Nvidia", src: "https://cdn.worldvectorlogo.com/logos/nvidia-image-logo.svg" },
    { name: "Indeed", src: "https://cdn.worldvectorlogo.com/logos/indeed-1.svg" },
    { name: "Google", src: "https://cdn.worldvectorlogo.com/logos/google-1-1.svg" },
    { name: "Publicis Sapient", src: "/PS_Logo.svg" },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg font-semibold text-gray-900">
          Trusted by the world&apos;s most innovative teams
        </h2>

        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {logos.map((logo) => (
            <div key={logo.name} className="col-span-2 lg:col-span-1">
              <Image
                src={logo.src}
                alt={logo.name}
                width={158}
                height={48}
                className="w-full object-contain"
                style={{ 
                  maxHeight: '48px',  // Consistent height
                  width: 'auto',      // Maintain aspect ratio
                  height: 'auto'      // Maintain aspect ratio
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}