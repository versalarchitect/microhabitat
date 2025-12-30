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

interface BookDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  locale?: Locale;
}

export function BookDemoModal({ open, onOpenChange, locale = 'en' }: BookDemoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const translations = getTranslations(locale);
  const t = (key: string) => translations[key] || key;
  const localePath = (path: string) => getLocalePath(path, locale);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setSubmitted(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('modal.bookDemo')}</DialogTitle>
          <DialogDescription>
            {t('modal.fillForm')}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              {t('form.thankYou')}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('form.weWillBeInTouch')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-foreground mb-1.5"
                >
                  {t('form.firstName')}
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
                  {t('form.lastName')}
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
                {t('form.workEmail')}
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
                {t('form.company')}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label
                htmlFor="interest"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                {t('form.interest')}
              </label>
              <select
                id="interest"
                name="interest"
                required
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">{t('form.selectOption')}</option>
                <option value="outdoor">{t('form.outdoorFarm')}</option>
                <option value="indoor">{t('form.indoorFarm')}</option>
                <option value="educational">{t('form.educational')}</option>
                <option value="all">{t('form.allServices')}</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                {t('form.messageOptional')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder={t('form.tellUsAboutProject')}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t('form.submitting') : t('form.requestDemo')}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              {t('form.privacyAgreement')}{" "}
              <Link href={localePath("/privacy-policy")} className="underline underline-offset-4">
                {t('footer.privacyPolicy')}
              </Link>
              .
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
