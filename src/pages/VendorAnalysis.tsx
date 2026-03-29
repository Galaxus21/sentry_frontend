import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { StyleSheet, css } from 'aphrodite';
import AgentAnalyzing from '@/components/AgentAnalyzing';
import VendorDetail from '@/components/VendorDetail';
import { DashboardHeader } from '@/components/DashboardHeader';
import { VENDORS, type Vendor } from '@/lib/vendorData';
import { colors } from '@/theme';

const VendorAnalysis = () => {
  const { vendorId } = useParams<{ vendorId: string }>();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'analyzing' | 'detail'>('analyzing');
  const [searchQuery, setSearchQuery] = useState('');

  const vendor = VENDORS.find((v) => String(v.id) === vendorId) ?? null;

  useEffect(() => {
    if (!vendor) return;
    setPhase('analyzing');
    const timer = setTimeout(() => setPhase('detail'), 32000);
    return () => clearTimeout(timer);
  }, [vendor]);

  const handleVendorSelect = (v: Vendor) => {
    navigate(`/vendor/${v.id}`);
  };

  if (!vendor) {
    return (
      <div className={css(styles.shell)}>
        <DashboardHeader
          alertCount={3}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          vendors={VENDORS}
          onVendorSelect={handleVendorSelect}
        />
        <main className={css(styles.main)}>
          <p>Vendor not found.</p>
        </main>
      </div>
    );
  }

  return (
    <div className={css(styles.shell)}>
      <DashboardHeader
        alertCount={3}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        vendors={VENDORS}
        onVendorSelect={handleVendorSelect}
      />
      <main className={css(styles.main)}>
        <AnimatePresence mode="wait">
          {phase === 'analyzing' ? (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <AgentAnalyzing vendor={vendor} />
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <VendorDetail vendor={vendor} onBack={() => navigate('/')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

const styles = StyleSheet.create({
  shell: {
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
});

export default VendorAnalysis;
