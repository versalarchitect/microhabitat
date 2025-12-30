import { ImageResponse } from 'next/og';
import type { NextRequest } from 'next/server';

export const runtime = 'edge';

// OG Image dimensions
const size = {
  width: 1200,
  height: 630,
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  // Get parameters from URL
  const title = searchParams.get('title') || 'Microhabitat';
  const description = searchParams.get('description') || "The world's largest urban farming network";
  const type = searchParams.get('type') || 'default'; // default, city, service, article

  // Color scheme
  const primaryColor = '#4a7c59'; // Sage green
  const bgColor = '#faf9f6'; // Warm off-white
  const textColor = '#2d2a26'; // Warm dark

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: bgColor,
          padding: '60px',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Top section with logo and type badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                backgroundColor: primaryColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span
              style={{
                fontSize: '28px',
                fontWeight: 600,
                color: textColor,
                letterSpacing: '-0.02em',
              }}
            >
              Microhabitat
            </span>
          </div>

          {/* Type badge */}
          {type !== 'default' && (
            <div
              style={{
                display: 'flex',
                padding: '8px 20px',
                backgroundColor: `${primaryColor}15`,
                borderRadius: '100px',
                fontSize: '14px',
                fontWeight: 500,
                color: primaryColor,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {type === 'city' ? 'City' : type === 'service' ? 'Service' : type === 'article' ? 'Article' : type}
            </div>
          )}
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '900px',
          }}
        >
          <h1
            style={{
              fontSize: title.length > 40 ? '48px' : '64px',
              fontWeight: 600,
              color: textColor,
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              style={{
                fontSize: '24px',
                color: '#6b6560',
                lineHeight: 1.4,
                margin: 0,
                maxWidth: '800px',
              }}
            >
              {description.length > 120 ? `${description.slice(0, 117)}...` : description}
            </p>
          )}
        </div>

        {/* Bottom decoration */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            {['Montreal', 'Toronto', 'New York', 'Paris'].map((city, i) => (
              <span
                key={i}
                style={{
                  fontSize: '14px',
                  color: '#9b958f',
                  padding: '6px 12px',
                  backgroundColor: '#f0efec',
                  borderRadius: '6px',
                }}
              >
                {city}
              </span>
            ))}
            <span
              style={{
                fontSize: '14px',
                color: '#9b958f',
                padding: '6px 12px',
                backgroundColor: '#f0efec',
                borderRadius: '6px',
              }}
            >
              +16 more
            </span>
          </div>

          {/* Decorative element */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: i === 2 ? primaryColor : `${primaryColor}${40 + i * 20}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
