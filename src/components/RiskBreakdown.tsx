import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { colors } from '../theme';
import type { VendorDimensions } from '../lib/vendorData';



interface ProgressBarProps {
  label: string;
  score: number;
  status: 'critical' | 'high' | 'medium' | 'low';
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, score, status }) => {
  const getFillStyle = () => {
    switch (status) {
      case 'critical': return styles.fillCritical;
      case 'medium': return styles.fillMedium;
      default: return styles.fillLow;
    }
  };

  return (
    <div className={css(styles.itemRow)}>
      <div className={css(styles.headerRow)}>
        <span className={css(styles.label)}>{label}</span>
        <span className={css(styles.score)}>{score}/100</span>
      </div>
      <div className={css(styles.barBackground)}>
        <div
          className={css(styles.barFill, getFillStyle())}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
};

interface RiskBreakdownProps {
  dimensions: VendorDimensions;
}

const RiskBreakdown: React.FC<RiskBreakdownProps> = ({ dimensions }) => {
  return (
    <div className={css(styles.container)}>
      <h3 className={css(styles.title)}>Risk Breakdown</h3>
      <ProgressBar label="Financial Stability" score={dimensions.financial.score} status={dimensions.financial.status} />
      <ProgressBar label="Regulatory / Sanctions" score={dimensions.sanctions.score} status={dimensions.sanctions.status} />
      <ProgressBar label="SLA Performance" score={dimensions.sla.score} status={dimensions.sla.status} />
      <ProgressBar label="Negative News" score={dimensions.news.score} status={dimensions.news.status} />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '24px',
    height: '100%',
  },
  title: {
    margin: '0 0 24px 0',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: colors.textHeading,
  },
  itemRow: {
    marginBottom: '20px',
    ':last-child': {
      marginBottom: 0,
    }
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  label: {
    fontWeight: 500,
    color: colors.textBody,
  },
  score: {
    fontWeight: 600,
    color: colors.textHeading,
  },
  barBackground: {
    width: '100%',
    height: '8px',
    backgroundColor: colors.border,
    borderRadius: '4px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.5s ease-out',
  },
  fillCritical: { backgroundColor: colors.critical },
  fillMedium: { backgroundColor: colors.medium },
  fillLow: { backgroundColor: colors.low },
});


export default RiskBreakdown;
