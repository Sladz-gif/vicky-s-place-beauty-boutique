import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  width = "default",
}: {
  children: ReactNode;
  className?: string;
  width?: "default" | "wide" | "narrow";
}) {
  return (
    <section className={cn("px-5 py-16 sm:px-8 md:py-24", className)}>
      <div
        className={cn(
          "mx-auto w-full",
          width === "default" && "max-w-6xl",
          width === "wide" && "max-w-[88rem]",
          width === "narrow" && "max-w-3xl",
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
  action,
}: {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-4 md:mb-14",
        align === "center" && "items-center text-center",
        action && "md:flex-row md:items-end md:justify-between",
      )}
    >
      <div className={cn("max-w-xl", align === "center" && "max-w-2xl")}>
        {label ? <p className="label-caps mb-3 text-gold">{label}</p> : null}
        <h2 className="text-3xl leading-tight md:text-[2.6rem]">{title}</h2>
        {description ? (
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
