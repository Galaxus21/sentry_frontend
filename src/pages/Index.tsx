import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StyleSheet, css } from 'aphrodite';
import { DashboardHeader, SummaryCards } from '@/components/DashboardHeader';
import VendorTable from '@/components/VendorTable';
import VendorDetail from '@/components/VendorDetail';
import { VENDORS, type Vendor } from '@/lib/vendorData';
import { colors } from '@/theme';



const Index = () => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVendors = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return VENDORS;

    return VENDORS.filter((vendor) =>
      [vendor.name, vendor.sector].some((value) => value.toLowerCase().includes(query)),
    );
  }, [searchQuery]);

  const summary = useMemo(
    () => ({
      critical: VENDORS.filter((vendor) => vendor.score > 70).length,
      medium: VENDORS.filter((vendor) => vendor.score > 30 && vendor.score <= 70).length,
      low: VENDORS.filter((vendor) => vendor.score <= 30).length,
    }),
    [],
  );

  return (
    <div className={css(styles.appShell)}>
      <DashboardHeader alertCount={3} searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className={css(styles.main)}>
        <section className={css(styles.heroSection)}>
          <div className={css(styles.heroGrid)}>
            <div>
              <p className={css(styles.heroSub)}>Continuous vendor monitoring</p>
              <h1 className={css(styles.heroTitle)}>
                Vendor risk intelligence with the calm clarity of the IDEA 2.0 visual language.
              </h1>
              <p className={css(styles.heroDesc)}>
                Monitor financial, sanctions, SLA, and news signals in one clean command surface built for fast triage.
              </p>

              <div className={css(styles.btnGroup)}>
                <button type="button" className={css(styles.pillButton)}>Review flagged vendors</button>
                <button type="button" className={css(styles.softButton)}>Open risk register</button>
              </div>

              <div className={css(styles.statsGrid)}>
                {[
                  { value: '24hrs', label: 'Review cycle' },
                  { value: '350+', label: 'Signals processed' },
                  { value: 'Apr 2026', label: 'Monitoring cadence' },
                ].map((item) => (
                  <div key={item.label} className={css(styles.statCard)}>
                    <p className={css(styles.statValue)}>{item.value}</p>
                    <p className={css(styles.statLabel)}>{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={css(styles.alertWindow)}>
              <div className={css(styles.alertInner)}>
                <p className={css(styles.alertLabel)}>Alert window</p>
                <div className={css(styles.timerGrid)}>
                  {[
                    { value: '05', label: 'Days' },
                    { value: '00', label: 'Hrs' },
                    { value: '29', label: 'Min' },
                    { value: '55', label: 'Sec' },
                  ].map((item) => (
                    <div key={item.label} className={css(styles.timerCard)}>
                      <p className={css(styles.timerValue)}>{item.value}</p>
                      <p className={css(styles.timerLabel)}>{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <SummaryCards critical={summary.critical} medium={summary.medium} low={summary.low} />

        <AnimatePresence mode="wait">
          {selectedVendor ? (
            <motion.div key="detail" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <VendorDetail vendor={selectedVendor} onBack={() => setSelectedVendor(null)} />
            </motion.div>
          ) : (
            <motion.div key="table" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
              <VendorTable vendors={filteredVendors} onSelect={setSelectedVendor} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const styles = StyleSheet.create({
  appShell: {
    background: colors.heroGradient,
    minHeight: '100vh',
  },
  main: {
    margin: '0 auto',
    display: 'flex',
    maxWidth: '1280px',
    flexDirection: 'column',
    gap: '32px',
    padding: '32px 16px',
    '@media (min-width: 640px)': {
      padding: '40px 24px',
    },
  },
  heroSection: {
    background: colors.panelGradient,
    boxShadow: colors.shadowCard,
    borderRadius: '20px',
    overflow: 'hidden',
    padding: '32px 24px',
    '@media (min-width: 640px)': {
      padding: '40px 32px',
    },
  },
  heroGrid: {
    display: 'grid',
    alignItems: 'center',
    gap: '32px',
    '@media (min-width: 1024px)': {
      gridTemplateColumns: '1.25fr 0.95fr',
    },
  },
  heroSub: {
    fontSize: '14px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.28em',
    color: colors.primary,
    margin: 0,
  },
  heroTitle: {
    marginTop: '16px',
    maxWidth: '768px',
    fontSize: '36px',
    fontWeight: 800,
    letterSpacing: '-0.025em',
    color: colors.primary,
    lineHeight: 1.2,
    margin: 0,
    '@media (min-width: 640px)': {
      fontSize: '48px',
    },
    '@media (min-width: 1024px)': {
      fontSize: '60px',
    },
  },
  heroDesc: {
    marginTop: '20px',
    maxWidth: '640px',
    fontSize: '16px',
    lineHeight: 1.6,
    color: colors.mutedForeground,
    margin: 0,
    '@media (min-width: 640px)': {
      fontSize: '18px',
    },
  },
  btnGroup: {
    marginTop: '32px',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '16px',
  },
  pillButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    backgroundColor: colors.primary,
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    color: colors.primaryForeground,
    boxShadow: colors.shadowSoft,
    transition: 'transform 0.2s',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    ':hover': {
      transform: 'translateY(-2px)',
    },
  },
  softButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.card,
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    color: colors.foreground,
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    outline: 'none',
    ':hover': {
      backgroundColor: colors.secondary,
    },
  },
  statsGrid: {
    marginTop: '40px',
    display: 'grid',
    gap: '16px',
    '@media (min-width: 640px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  statCard: {
    borderRadius: '20px',
    backgroundColor: colors.secondary,
    padding: '16px 20px',
  },
  statValue: {
    fontSize: '30px',
    fontWeight: 800,
    color: colors.primary,
    margin: 0,
  },
  statLabel: {
    marginTop: '4px',
    fontSize: '14px',
    color: colors.mutedForeground,
    margin: 0,
  },
  alertWindow: {
    borderRadius: '24px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.card,
    padding: '20px',
    boxShadow: colors.shadowSoft,
  },
  alertInner: {
    borderRadius: '20px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.secondary,
    padding: '24px 20px',
  },
  alertLabel: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.26em',
    color: colors.primary,
    margin: 0,
  },
  timerGrid: {
    marginTop: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
    textAlign: 'center',
  },
  timerCard: {
    borderRadius: '16px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.card,
    padding: '16px 12px',
  },
  timerValue: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '30px',
    fontWeight: 700,
    color: colors.primary,
    margin: 0,
  },
  timerLabel: {
    marginTop: '8px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.22em',
    color: colors.mutedForeground,
    margin: 0,
  }
});


export default Index;
