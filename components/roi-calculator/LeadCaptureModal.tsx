"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { type Locale, getLocalePath, getTranslations } from "@/lib/i18n";
import { type LeadCaptureData } from "@/lib/calculator/types";

interface LeadCaptureModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: LeadCaptureData) => void;
  locale: Locale;
}

export function LeadCaptureModal({
  open,
  onOpenChange,
  onSubmit,
  locale,
}: LeadCaptureModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const translations = getTranslations(locale);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data: LeadCaptureData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      phone: (formData.get("phone") as string) || undefined,
    };

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("roiCalculator.leadCapture.title")}</DialogTitle>
          <DialogDescription>
            {t("roiCalculator.leadCapture.description")}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                {t("roiCalculator.leadCapture.firstName")}
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="John"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                {t("roiCalculator.leadCapture.lastName")}
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              {t("roiCalculator.leadCapture.email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="john@company.com"
            />
          </div>

          <div>
            <label
              htmlFor="company"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              {t("roiCalculator.leadCapture.company")}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              required
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Acme Real Estate Inc."
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-foreground mb-1.5"
            >
              {t("roiCalculator.leadCapture.phone")}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting
              ? t("roiCalculator.leadCapture.submitting")
              : t("roiCalculator.leadCapture.submit")}
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            {t("roiCalculator.leadCapture.privacy")}{" "}
            <Link
              href={localePath("/privacy-policy")}
              className="underline underline-offset-4"
            >
              {t("footer.privacyPolicy")}
            </Link>
            .
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
