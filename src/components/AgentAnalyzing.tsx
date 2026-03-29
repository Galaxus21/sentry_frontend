import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StyleSheet, css } from 'aphrodite';
import { ShieldAlert, Cpu, Database, Server, Fingerprint } from 'lucide-react';
import { colors } from '@/theme';
import type { Vendor } from '@/lib/vendorData';

interface AgentAnalyzingProps {
  vendor: Vendor;
}

const STEPS = [
  { icon: Database, text: 'Initiating TorBot — scanning dark web marketplaces...' },
  { icon: Database, text: 'Crawling onion directories for leaked credentials...' },
  { icon: Server, text: 'Pulling financial filings from NSE/BSE via yfinance...' },
  { icon: Server, text: 'Extracting quarterly revenue and debt ratios...' },
  { icon: Fingerprint, text: 'Screening against OFAC sanctions database...' },
  { icon: Fingerprint, text: 'Cross-referencing UN consolidated sanctions list...' },
  { icon: Database, text: 'Scraping SEBI regulatory filings via Firecrawl...' },
  { icon: Database, text: 'Checking GST compliance and filing history...' },
  { icon: Server, text: 'Normalizing SLA performance across all regions...' },
  { icon: Cpu, text: 'LLM reasoning pass — interpreting all signals in context...' },
  { icon: Cpu, text: 'Applying weighted scoring: Financial 35%, Regulatory 25%...' },
  { icon: ShieldAlert, text: 'Finalizing vendor risk posture and generating report...' }
];

const AgentAnalyzing: React.FC<AgentAnalyzingProps> = ({ vendor }) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, STEPS.length - 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const CurrentIcon = STEPS[stepIndex].icon;

  return (
    <div className={css(styles.container)}>
      <motion.div
        className={css(styles.loaderBox)}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
      >
        <div className={css(styles.iconWrapper)}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            className={css(styles.spinnerRing)}
          />
          <div className={css(styles.iconInner)}>
            <CurrentIcon size={28} className={css(styles.icon)} />
          </div>
        </div>
        
        <h3 className={css(styles.title)}>Evaluating {vendor.name}</h3>
        
        <div className={css(styles.stepContainer)}>
          <AnimatePresence mode="wait">
            <motion.p
              key={stepIndex}
              initial={{ y: 5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={css(styles.stepText)}
            >
              {STEPS[stepIndex].text}
            </motion.p>
          </AnimatePresence>
        </div>
        
        <div className={css(styles.progressContainer)}>
          <motion.div
            className={css(styles.progressBar)}
            initial={{ width: '0%' }}
            animate={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '64px 24px',
    minHeight: '400px',
  },
  loaderBox: {
    background: colors.card,
    borderRadius: '24px',
    border: `1px solid ${colors.border}`,
    boxShadow: colors.shadowCard,
    padding: '48px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '480px',
    width: '100%',
    textAlign: 'center',
  },
  iconWrapper: {
    position: 'relative',
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '24px',
  },
  spinnerRing: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: '50%',
    border: `2px dashed ${colors.primary}`,
    opacity: 0.5,
  },
  iconInner: {
    position: 'relative',
    zIndex: 2,
    background: colors.secondary,
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: colors.primary,
  },
  title: {
    fontSize: '24px',
    fontWeight: 700,
    color: colors.foreground,
    margin: '0 0 16px 0',
  },
  stepContainer: {
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '32px',
  },
  stepText: {
    fontSize: '14px',
    color: colors.mutedForeground,
    fontWeight: 500,
    margin: 0,
  },
  progressContainer: {
    width: '100%',
    height: '6px',
    backgroundColor: colors.secondary,
    borderRadius: '100px',
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: '100px',
  }
});

export default AgentAnalyzing;
