"use client";

import { useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import {
  Cloud,
  fetchSimpleIcons,
  ICloud,
  renderSimpleIcon,
  SimpleIcon,
} from "react-icon-cloud";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export const cloudProps: Omit<ICloud, "children"> = {
  containerProps: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "400px",
      position: "relative",
      padding: "40px 0",
    },
  },
  options: {
    reverse: true,
    depth: 1,
    wheelZoom: false,
    imageScale: 2,
    activeCursor: "pointer",
    tooltip: null,
    initial: [0.1, -0.1],
    clickToFront: 500,
    maxSpeed: 0.04,
    minSpeed: 0.02,
  },
};

interface IconWithHoverCardProps {
  icon: SimpleIcon;
  theme: string;
  onClick?: (icon: SimpleIcon) => void;
}

const IconWithHoverCard = ({ icon, theme, onClick }: IconWithHoverCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const bgHex = theme === "light" ? "#f3f2ef" : "#080510";
  const fallbackHex = theme === "light" ? "#6e6e73" : "#ffffff";

  const renderedIcon = renderSimpleIcon({
    icon,
    bgHex,
    fallbackHex,
    size: 42,
    aProps: {
      onClick: (e) => {
        e.preventDefault();
        setIsOpen(!isOpen);
        onClick?.(icon);
      },
    },
  });

  return (
    <HoverCard open={isOpen} onOpenChange={setIsOpen}>
      <HoverCardTrigger asChild>
        <div style={{ position: "relative", display: "inline-block" }}>
          {renderedIcon}
        </div>
      </HoverCardTrigger>
      <HoverCardContent side="top" className="w-64">
        <h4 className="text-sm font-semibold">{icon.title}</h4>
        <p className="text-sm text-gray-500">{`Learn more about ${icon.title}`}</p>
      </HoverCardContent>
    </HoverCard>
  );
};

interface IconCloudProps {
  iconSlugs: string[];
  onIconClick?: (icon: SimpleIcon) => void;
}

export function IconCloud({ iconSlugs, onIconClick }: IconCloudProps) {
  const [data, setData] = useState<Awaited<ReturnType<typeof fetchSimpleIcons>> | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    fetchSimpleIcons({ slugs: iconSlugs }).then(setData);
  }, [iconSlugs]);

  const renderedIcons = useMemo(() => {
    if (!data) return null;
    return Object.values(data.simpleIcons).map((icon) => (
      <IconWithHoverCard
        key={icon.slug}
        icon={icon}
        theme={theme || "light"}
        onClick={onIconClick}
      />
    ));
  }, [data, theme, onIconClick]);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      {/* @ts-ignore */}
      <Cloud {...cloudProps}>{renderedIcons}</Cloud>
    </div>
  );
}