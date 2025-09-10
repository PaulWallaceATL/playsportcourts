"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { trackQuote } from "@/lib/analytics";

export function QuoteButton({ productName }: { productName: string }) {
  return (
    <Button variant="outline" size="lg" onClick={() => trackQuote({ product: productName })}>
      Get a Quote
    </Button>
  );
}


