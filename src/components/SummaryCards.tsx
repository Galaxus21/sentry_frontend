import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ShieldAlert, Shield, CheckCircle } from 'lucide-react';
import { colors } from '../theme';
import { summaryStats } from '../lib/vendorData';

const SummaryCards: React.FC = () => {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.card)}>
        <div className={css(styles.iconBox, styles.iconCritical)}>
          <ShieldAlert size={32} />
        </div>
        <div className={css(styles.content)}>
          <span className={css(styles.label)}>Critical Risk</span>
          <span className={css(styles.value)}>{summaryStats.critical}</span>
        </div>
      </div>
      
      <div className={css(styles.card)}>
        <div className={css(styles.iconBox, styles.iconMedium)}>
          <Shield size={32} />
        </div>
        <div className={css(styles.content)}>
          <span className={css(styles.label)}>Medium Risk</span>
          <span className={css(styles.value)}>{summaryStats.medium}</span>
        </div>
      </div>
      
      <div className={css(styles.card)}>
        <div className={css(styles.iconBox, styles.iconLow)}>
          <CheckCircle size={32} />
        </div>
        <div className={css(styles.content)}>
          <span className={css(styles.label)}>Low Risk</span>
          <span className={css(styles.value)}>{summaryStats.low}</span>
        </div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: '24px',
    marginBottom: '32px',
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
  },
  iconBox: {
    padding: '16px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCritical: {
    backgroundColor: `${colors.critical}20`,
    color: colors.critical,
  },
  iconMedium: {
    backgroundColor: `${colors.medium}20`,
    color: colors.medium,
  },
  iconLow: {
    backgroundColor: `${colors.low}20`,
    color: colors.low,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    color: colors.textMuted,
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '4px',
  },
  value: {
    color: colors.textHeading,
    fontSize: '2rem',
    fontWeight: 700,
    lineHeight: 1,
  }
});


export default SummaryCards;
