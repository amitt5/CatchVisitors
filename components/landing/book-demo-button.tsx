"use client";

import { Button } from "@/components/ui/button";
import { openBookDemo } from "@/lib/landing/book-demo-store";
import type { ComponentProps } from "react";

type BookDemoButtonProps = ComponentProps<typeof Button>;

export function BookDemoButton({ children, ...props }: BookDemoButtonProps) {
  return (
    <Button onClick={openBookDemo} {...props}>
      {children}
    </Button>
  );
}
