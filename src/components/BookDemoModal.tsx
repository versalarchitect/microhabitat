import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

interface BookDemoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookDemoModal({ open, onOpenChange }: BookDemoModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
          <DialogTitle>Book a Demo</DialogTitle>
          <DialogDescription>
            Fill out the form below and we'll get back to you within 24 hours.
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
              Thank you!
            </h3>
            <p className="text-sm text-muted-foreground">
              We'll be in touch soon.
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
                  First Name
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
                  Last Name
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
                Work Email
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
                Company
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
                What are you interested in?
              </label>
              <select
                id="interest"
                name="interest"
                required
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select an option</option>
                <option value="outdoor">Outdoor Farm</option>
                <option value="indoor">Indoor Farm</option>
                <option value="educational">Educational Activities</option>
                <option value="all">All Services</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-1.5"
              >
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                placeholder="Tell us about your space or project..."
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Request Demo"}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By submitting, you agree to our{" "}
              <a href="/privacy" className="underline underline-offset-4">
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
