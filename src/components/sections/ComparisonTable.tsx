// src/components/sections/ComparisonTable.tsx
import React from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
  } from "@/components/ui/table";
import { Check, X } from "lucide-react";
import { Mark } from '@mantine/core';
import { cn } from "@/lib/utils";

interface FeatureComparison {
  name: string;
  ourProduct: boolean | string;
  competitors: (boolean | string)[];
}

interface ComparisonTableProps {
  // Title configuration
  title?: string;
  highlightedWord?: string;
  highlightColor?: string;
  // Table configuration
  competitors?: string[]; // Competitor names for column headers
  className?: string;     // Optional additional styling
}

/**
 * ComparisonTable Component
 * 
 * A responsive comparison table that highlights product features against competitors.
 * Features include:
 * - Configurable competitor columns
 * - Highlighted "Our Product" column
 * - Row highlighting for unique features
 * - Mobile-responsive with horizontal scroll
 * - Check/X icons for feature availability
 * 
 * @example
 * ```tsx
 * <ComparisonTable
 *   title="Why we're different: {highlighted} approach"
 *   highlightedWord="innovative"
 *   competitors={["Product A", "Product B"]}
 * />
 * '''
 */
export default function ComparisonTable({
    // {{REPLACE_CONFIG}} - Replace with your product's details
    title="Why we're different: The {highlighted} choice",
    highlightedWord="uniquely better",
    highlightColor = "var(--mantine-primary)",
    competitors = ["Product A", "Product B", "Product C"],
    className,
  }: ComparisonTableProps) {
    // {{REPLACE_FEATURES}} - Replace with your product's feature comparison
    const features: FeatureComparison[] = [
        {
          name: "User Authentication",
          ourProduct: true,
          competitors: [true, false, true]
        },
        {
          name: "Real-time Analytics",
          ourProduct: true,
          competitors: [false, false, false]
        },
        {
          name: "Multi-language Support",
          ourProduct: true,
          competitors: [false, true, true]
        },
        {
          name: "Customizable Themes",
          ourProduct: true,
          competitors: [false, false, false]
        },
        {
          name: "API Access",
          ourProduct: true,
          competitors: [true, true, true]
        },
        {
          name: "Mobile Optimization",
          ourProduct: true,
          competitors: [true, true, false]
        },
        {
          name: "Third-Party Integrations",
          ourProduct: true,
          competitors: [false, true, true]
        },
        {
          name: "Offline Mode",
          ourProduct: true,
          competitors: [false, false, true]
        },
        {
          name: "Data Export Options",
          ourProduct: true,
          competitors: [true, true, false]
        },
        {
          name: "24/7 Customer Support",
          ourProduct: true,
          competitors: [true, false, true]
        }
      ];
  
      // Function to determine if a feature is unique to our product
  const isUniqueFeature = (feature: FeatureComparison): boolean => {
    return feature.ourProduct === true && feature.competitors.every(comp => 
      comp === false || typeof comp === 'string'
    );
  };

  // Add helper function to render feature status
  const renderFeatureStatus = (status: boolean | string) => {
    if (typeof status === 'boolean') {
      return status ? (
        <div className="flex justify-center">
          <Check className="h-5 w-5 text-green-500" />
        </div>
      ) : (
        <div className="flex justify-center">
          <X className="h-5 w-5 text-red-500" />
        </div>
      );
    }
    // Return text for string values
    return <span className="text-sm text-muted-foreground">{status}</span>;
  };

  return (
    <div className={cn("w-full max-w-7xl mx-auto px-4 py-8", className)}>
      {/* Title Section */}
      <h2 className="text-2xl md:text-heading-2 font-bold text-center mb-8">
        {title.split("{highlighted}").map((part, index) => 
          index === 0 ? part : (
            <React.Fragment key={index}>
              <Mark 
                color={highlightColor}
                style={{ padding: '0 0.5rem', borderRadius: 'var(--mantine-radius-sm)' }}
              >
                {highlightedWord}
              </Mark>
              {part}
            </React.Fragment>
          )
        )}
      </h2>

      {/* Table with horizontal scroll for mobile */}
      <div className="w-full overflow-x-auto">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="font-semibold">Feature</TableHead>
              <TableHead className="font-bold border-x-8 border-primary/40 bg-primary/5 text-center">
                Your Product
              </TableHead>
              {competitors.map((competitor, index) => (
                <TableHead key={index} className="font-semibold text-center">
                  {competitor}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {features.map((feature, index) => (
              <TableRow 
                key={index}
                className={cn(
                  "transition-colors hover:bg-muted/50",
                  isUniqueFeature(feature) && "bg-green-100/50 dark:bg-green-900/20"
                )}
              >
                <TableCell className="font-medium">
                  {feature.name}
                </TableCell>

                <TableCell className="border-x-8 border-primary/40 bg-primary/5 text-center">
                  {renderFeatureStatus(feature.ourProduct)}
                </TableCell>

                {feature.competitors.map((hasFeature, idx) => (
                  <TableCell key={idx} className="text-center">
                    {renderFeatureStatus(hasFeature)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}