import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'GoatLabs - Premium Web Development';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0a0c0f 0%, #1a1d24 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #f5a524 0%, #e08800 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            GoatLabs
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#e5e7eb',
              fontWeight: 400,
            }}
          >
            Premium Web Development
          </div>
          <div
            style={{
              fontSize: 24,
              color: '#9ca3af',
              fontWeight: 300,
              marginTop: '16px',
            }}
          >
            Fast • Reliable • Professional
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
