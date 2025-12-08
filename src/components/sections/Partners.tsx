import type { Partner } from "../../lib/strapi";

interface PartnersProps {
  partners: Partner[];
}

export function Partners({ partners }: PartnersProps) {
  // Duplicate for seamless marquee
  const allPartners = [...partners, ...partners];

  return (
    <>
      <div className="divider" />

      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          {/* Section header */}
          <div className="text-center mb-12">
            <p className="label mb-4">Trusted By</p>
            <h2 className="text-2xl md:text-3xl font-medium text-foreground">
              Leading organizations across North America
            </h2>
          </div>

          {/* Partners marquee */}
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
              {allPartners.map((partner, index) => (
                <div
                  key={`${partner.name}-${index}`}
                  className="mx-8 flex-shrink-0"
                >
                  {partner.logo ? (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-12 md:h-16 object-contain grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                    />
                  ) : (
                    <div className="h-12 md:h-16 px-6 flex items-center justify-center border border-border rounded bg-card">
                      <span className="text-sm font-medium text-muted-foreground">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Static grid for smaller screens */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:hidden">
            {partners.slice(0, 6).map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center p-4 border border-border rounded bg-card"
              >
                <span className="text-xs font-medium text-muted-foreground text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
