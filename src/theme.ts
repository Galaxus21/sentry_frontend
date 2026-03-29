import { StyleSheet } from 'aphrodite';

// Extracted from ideahackathon.com and refined for a Security Ops Dashboard feel
export const colors = {
  // Base & Background (from pulsevendor_src)
  background: 'hsl(210, 33%, 99%)',
  foreground: 'hsl(219, 52%, 24%)',
  card: 'hsl(0, 0%, 100%)',
  cardForeground: 'hsl(219, 52%, 24%)',
  popover: 'hsl(0, 0%, 100%)',
  popoverForeground: 'hsl(219, 52%, 24%)',

  // Brand / Semantic
  primary: 'hsl(214, 72%, 39%)',
  primaryForeground: 'hsl(0, 0%, 100%)',
  secondary: 'hsl(213, 57%, 96%)',
  secondaryForeground: 'hsl(216, 34%, 32%)',
  muted: 'hsl(210, 40%, 96%)',
  mutedForeground: 'hsl(216, 16%, 55%)',
  accent: 'hsl(44, 100%, 52%)',
  accentForeground: 'hsl(219, 52%, 24%)',

  // Risk / Destructive
  destructive: 'hsl(356, 89%, 54%)',
  destructiveForeground: 'hsl(0, 0%, 100%)',
  warning: 'hsl(40, 96%, 51%)',
  warningForeground: 'hsl(219, 52%, 24%)',
  success: 'hsl(149, 63%, 42%)',
  successForeground: 'hsl(0, 0%, 100%)',

  border: 'hsl(213, 44%, 85%)',
  input: 'hsl(213, 44%, 90%)',
  ring: 'hsl(214, 72%, 39%)',

  // UI Surface & Interaction
  surface: 'hsl(0, 0%, 100%)',
  surfaceHover: 'hsl(210, 40%, 98%)',

  // Semantic Logic (Risk Levels)
  critical: 'hsl(356, 89%, 54%)',
  high: 'hsl(14, 100%, 53%)',
  medium: 'hsl(40, 96%, 51%)',
  low: 'hsl(149, 63%, 42%)',

  // Typography
  textHeading: 'hsl(219, 52%, 24%)',
  textBody: 'hsl(219, 52%, 30%)',
  textMuted: 'hsl(216, 16%, 55%)',

  // Gradients & Shadows
  heroGradient: 'linear-gradient(180deg, hsl(0, 0%, 100%), hsl(210, 33%, 98%))',
  panelGradient: 'linear-gradient(180deg, hsl(0, 0%, 100%), hsl(213, 57%, 98%))',
  shadowSoft: '0 18px 48px -24px hsla(214, 72%, 39%, 0.18)',
  shadowCard: '0 0 0 1px hsla(213, 44%, 85%, 0.8), 0 18px 40px -28px hsla(214, 72%, 39%, 0.2)',
};

// Global styles for typography and base reset that Aphrodite can inject
export const globalStyles = StyleSheet.create({
  body: {
    margin: 0,
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    backgroundColor: colors.background,
    color: colors.foreground,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
    minHeight: '100vh',
  },
  heading: {
    color: colors.foreground,
    margin: 0,
    fontWeight: 600,
  }
});
