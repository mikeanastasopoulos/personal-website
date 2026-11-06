import localFont from 'next/font/local';

// Both languages share the same families so their visual weights match.
export const serifGreek = localFont({
  src: [
    { path: './fonts/eb-garamond-regular.woff2', weight: '400 500', style: 'normal' },
    { path: './fonts/eb-garamond-italic.woff2', weight: '400 500', style: 'italic' },
  ],
  variable: '--font-serif-greek',
  display: 'swap',
  adjustFontFallback: 'Times New Roman',
});

export const sansGreek = localFont({
  src: './fonts/commissioner.woff2',
  weight: '400 600',
  style: 'normal',
  variable: '--font-sans-greek',
  display: 'swap',
});
