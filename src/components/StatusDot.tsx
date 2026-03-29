import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { colors } from '../theme';

interface StatusDotProps {
  status?: 'critical' | 'high' | 'medium' | 'low';
}

const StatusDot: React.FC<StatusDotProps> = ({ status = 'low' }) => {
  return (
    <div title={status.toUpperCase()} className={css(styles.dot, styles[status])} />
  );
};

const styles = StyleSheet.create({
  dot: {
    display: 'inline-block',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    boxShadow: '0 0 8px rgba(0,0,0,0.5)',
  },
  critical: {
    backgroundColor: colors.critical,
    boxShadow: `0 0 10px ${colors.critical}80`,
  },
  high: {
    backgroundColor: colors.high,
    boxShadow: `0 0 10px ${colors.high}80`,
  },
  medium: {
    backgroundColor: colors.medium,
    boxShadow: `0 0 10px ${colors.medium}80`,
  },
  low: {
    backgroundColor: colors.low,
    boxShadow: `0 0 10px ${colors.low}80`,
  }
});


export default StatusDot;
