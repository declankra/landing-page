// src/components/TextRevealScroll.tsx
import TextRevealByWord from "@/components/ui/text-reveal";
 
interface TextRevealScrollProps {
  text?: string;
}

export const TextRevealScroll: React.FC<TextRevealScrollProps> = ({ text }) => {
  return (
    <div 
      className="
        /* Base flexbox and styling */
        z-10 flex items-center justify-center rounded-lg border
        bg-white dark:bg-black

        /* Container sizing for vertical squeeze effect */
        min-h-[700px] md:min-h-[800px]  /* Taller to allow text to stack */
        
        /* Narrow width to force text wrapping */
        w-[90%] md:w-[80%] lg:w-[70%]
        max-w-[300px] md:max-w-[400px]  /* Narrow max-width to force text stacking */
        
        /* Center the container itself */
        mx-auto

        /* Add some padding to prevent text touching edges */
        p-8 md:p-10 lg:p-12
      "
    >
      <TextRevealByWord 
        text={text || "This text will reveal itself as you scroll."} 
        className="
          /* Larger text size that scales with screen size */
          text-3xl sm:text-4xl md:text-5xl lg:text-heading-2

          /* Force text centering */
          text-center

          /* Tighter line height to create vertical squishing */
          leading-[1.1] md:leading-[1.2]

          /* Tighter letter spacing */
          tracking-tight

          /* Ensure words break appropriately */
          break-words

          /* Optional: Add a bit of letter spacing between words */
          [word-spacing:0.1em]

          /* Optional: Add some font weight for better visibility */
          font-bold
        "
      />
    </div>
  );
};