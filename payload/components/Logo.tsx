import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="16" cy="16" r="14" fill="#4a7c59" />
        <path
          d="M16 8C12 8 10 12 10 16C10 20 12 24 16 24C20 24 22 20 22 16C22 12 20 8 16 8Z"
          fill="white"
          opacity="0.9"
        />
        <path
          d="M16 10C16 10 14 14 14 16C14 18 15 20 16 20C17 20 18 18 18 16C18 14 16 10 16 10Z"
          fill="#4a7c59"
        />
      </svg>
      <span style={{ fontSize: '18px', fontWeight: 600, color: '#333' }}>
        Microhabitat
      </span>
    </div>
  );
};
