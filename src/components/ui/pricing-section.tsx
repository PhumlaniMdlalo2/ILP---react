import * as React from "react";
import { motion } from "framer-motion";
import { Diamond, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PricingCardProps {
  title: string;
  price?: string;
  priceDescription?: string;
  description: string;
  features?: string[];
  buttonText: string;
  buttonHref?: string;
  buttonElement?: React.ReactNode;
  className?: string;
  useSparkles?: boolean;
}

const cardVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.03,
    y: -5,
    boxShadow: "0px 15px 30px -5px hsl(var(--foreground) / 0.1)",
    transition: { type: "spring", stiffness: 300, damping: 20 },
  },
};

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      className,
      title,
      price,
      priceDescription,
      description,
      features,
      buttonText,
      buttonHref = "#",
      buttonElement,
      useSparkles = false,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        className={cn(
          "relative flex flex-col justify-between rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-shadow duration-300",
          className
        )}
        {...(props as any)}
      >
        <div className="flex flex-col space-y-4">
          <div>
            <h3 className="text-xl font-semibold">{title}</h3>
            {price && (
              <div className="mt-2">
                <span className="text-4xl font-bold">{price}</span>
                {priceDescription && (
                  <p className="text-sm text-muted-foreground">{priceDescription}</p>
                )}
              </div>
            )}
          </div>

          <p className="text-muted-foreground">{description}</p>

          {features && (
            <ul className="space-y-2 pt-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  {useSparkles ? (
                    <Sparkles className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <Diamond className="h-4 w-4 text-primary shrink-0" />
                  )}
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-6">
          {buttonElement ?? (
            <Button className="w-full" asChild>
              <a href={buttonHref}>{buttonText}</a>
            </Button>
          )}
        </div>
      </motion.div>
    );
  }
);
PricingCard.displayName = "PricingCard";
