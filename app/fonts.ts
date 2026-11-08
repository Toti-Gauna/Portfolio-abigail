import { Bodoni_Moda, DM_Mono, Hanken_Grotesk } from 'next/font/google';

// Self-hosted at build time by next/font: the visitor's browser never asks Google.
export const fontDisplay = Bodoni_Moda({ subsets: ['latin'], style: ['normal', 'italic'], axes: ['opsz'], variable: '--font-display', display: 'swap' });
export const fontSans = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
export const fontMono = DM_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-mono', display: 'swap' });
