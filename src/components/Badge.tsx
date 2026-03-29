import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { colors } from '../theme';

type BadgeVariant = 'critical' | 'high' | 'medium' | 'low' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, variant = 'neutral', className }) => {
  return (
    <span className={css(styles.badge, styles[variant as keyof typeof styles]) + (className ? ` ${className}` : '')}>
      {children}
    </span>
  );
};

const styles = StyleSheet.create({
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  critical: {
    backgroundColor: `${colors.critical}20`,
    color: colors.critical,
    border: `1px solid ${colors.critical}40`,
  },
  high: {
    backgroundColor: `${colors.high}20`,
    color: colors.high,
    border: `1px solid ${colors.high}40`,
  },
  medium: {
    backgroundColor: `${colors.medium}20`,
    color: colors.medium,
    border: `1px solid ${colors.medium}40`,
  },
  low: {
    backgroundColor: `${colors.low}20`,
    color: colors.low,
    border: `1px solid ${colors.low}40`,
  },
  neutral: {
    backgroundColor: `${colors.secondary}20`,
    color: colors.secondary,
    border: `1px solid ${colors.secondary}40`,
  }
});




export default Badge;
