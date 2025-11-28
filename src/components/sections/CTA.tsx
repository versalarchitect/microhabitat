import { ArrowRight } from "lucide-react";

interface CTAProps {
  onBookDemo: () => void;
}

export function CTA({ onBookDemo }: CTAProps) {
  return (
    <>
      <div className="divider" />

      <section className="section">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          {/* Label */}
          <p className="label mb-6">Get Started</p>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6">
            Ready to transform your{" "}
            <span className="text-primary">urban space</span>?
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join the world's largest urban farming network. Book a demo to learn
            how we can bring sustainable agriculture to your property.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button type="button" onClick={onBookDemo} className="btn-primary group">
              Book a Demo
              <ArrowRight className="inline-block ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="mailto:hello@microhabitat.com"
              className="text-foreground font-medium hover:underline decoration-2 underline-offset-8 py-3"
            >
              Contact Sales
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <span>✓ No commitment required</span>
              <span>✓ Customized proposals</span>
              <span>✓ Expert consultation</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
