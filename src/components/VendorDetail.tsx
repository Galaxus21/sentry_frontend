import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ArrowLeft, AlertTriangle, FileText, ShieldAlert, Sparkles } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { motion } from 'framer-motion';
import { colors } from '@/theme';
import type { Vendor } from '@/lib/vendorData';

interface VendorDetailProps {
  vendor: Vendor;
  onBack: () => void;
}

const VendorDetail: React.FC<VendorDetailProps> = ({ vendor, onBack }) => {
  const level = vendor.score > 70 ? 'Critical Risk' : vendor.score > 30 ? 'Medium Risk' : 'Low Risk';
  const scoreTone = vendor.score > 70 ? colors.destructive : vendor.score > 30 ? colors.warning : colors.success;
  const badgeStyles = vendor.score > 70 
    ? { backgroundColor: 'hsla(356, 89%, 54%, 0.1)', color: colors.destructive } 
    : vendor.score > 30 
      ? { backgroundColor: 'hsla(40, 96%, 51%, 0.15)', color: colors.warning } 
      : { backgroundColor: 'hsla(149, 63%, 42%, 0.1)', color: colors.success };
  
  const strokeColor = vendor.score > 70 ? '#ef4444' : vendor.score > 30 ? '#f59e0b' : '#10b981';

  const barColor = (value: number) => (value > 70 ? colors.destructive : value > 40 ? colors.warning : colors.success);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 12 }} 
      animate={{ opacity: 1, y: 0 }} 
      className={css(styles.section)}
    >
      <button onClick={onBack} className={css(styles.backBtn)}>
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      <div className={css(styles.panel)}>
        <div className={css(styles.headerFlex)}>
          <div>
            <p className={css(styles.label)}>Vendor Detail</p>
            <div className={css(styles.titleWrapper)}>
              <h2 className={css(styles.title)}>{vendor.name}</h2>
              <span className={css(styles.riskBadge)} style={badgeStyles}>{level}</span>
            </div>
            <p className={css(styles.metaText)}>{vendor.sector} • Continuous monitoring snapshot • Updated 2 hours ago</p>
          </div>

          <div className={css(styles.scoreCard)}>
            <p className={css(styles.label)}>Overall Score</p>
            <p className={css(styles.scoreValue)} style={{ color: scoreTone }}>{vendor.score}</p>
          </div>
        </div>
      </div>

      <div className={css(styles.gridTwo)}>
        <article className={css(styles.panel)}>
          <h3 className={css(styles.label)}>Risk Breakdown</h3>
          <div className={css(styles.breakdownList)}>
            {vendor.breakdown.map((item) => (
              <div key={item.label}>
                <div className={css(styles.breakdownHeader)}>
                  <span className={css(styles.itemLabel)}>{item.label}</span>
                  <span className={css(styles.itemVal)}>{item.val}%</span>
                </div>
                <div className={css(styles.progressTrack)}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.val}%` }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className={css(styles.progressBar)}
                    style={{ backgroundColor: barColor(item.val) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className={css(styles.panel)}>
          <h3 className={css(styles.label)}>30-Day Risk Trend</h3>
          <div className={css(styles.chartContainer)}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={vendor.trend.map((score, index) => ({ day: index + 1, score }))}>
                <defs>
                  <linearGradient id="vendorTrendFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={strokeColor} stopOpacity={0.28} />
                    <stop offset="95%" stopColor={strokeColor} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="hsla(214, 72%, 39%, 0.12)" vertical={false} />
                <XAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dataKey="day" />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid hsla(214, 72%, 39%, 0.2)',
                    borderRadius: '14px',
                    color: '#1e3a8a',
                    boxShadow: '0 18px 40px -24px hsla(214, 72%, 39%, 0.28)',
                  }}
                />
                <Area type="monotone" dataKey="score" stroke={strokeColor} strokeWidth={3} fill="url(#vendorTrendFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
      </div>

      <div className={css(styles.gridTwoMixed)}>
        <article className={css(styles.panel)}>
          <div className={css(styles.findingHeader)}>
            <div className={css(styles.iconBox)}>
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className={css(styles.label)}>AI Key Findings</h3>
              <p className={css(styles.findingSub)}>Generated from recent signals and vendor posture</p>
            </div>
          </div>
          <ul className={css(styles.findingList)}>
            {vendor.findings.map((finding) => (
              <li key={finding} className={css(styles.findingItem)}>
                <span className={css(styles.findingDot)} />
                <span>{finding}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className={css(styles.panel)}>
          <h3 className={css(styles.label)}>Recommended Actions</h3>
          <div className={css(styles.actionGrid)}>
            {[
              { title: 'Initiate Audit', icon: FileText, desc: 'Launch a focused financial and governance review.', tone: { backgroundColor: 'hsla(214, 72%, 39%, 0.08)', color: colors.primary } },
              { title: 'Escalate SLA', icon: AlertTriangle, desc: 'Notify the vendor manager and raise monitoring cadence.', tone: { backgroundColor: 'hsla(40, 96%, 51%, 0.15)', color: colors.warning } },
              { title: 'Freeze Payments', icon: ShieldAlert, desc: 'Pause non-critical disbursements pending remediation.', tone: { backgroundColor: 'hsla(356, 89%, 54%, 0.1)', color: colors.destructive } },
            ].map((action) => (
              <div key={action.title} className={css(styles.actionCard)}>
                <div className={css(styles.actionIcon)} style={action.tone}>
                  <action.icon size={20} />
                </div>
                <h4 className={css(styles.actionTitle)}>{action.title}</h4>
                <p className={css(styles.actionDesc)}>{action.desc}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </motion.section>
  );
};

const styles = StyleSheet.create({
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  backBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.card,
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 600,
    color: colors.foreground,
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    gap: '8px',
    width: 'fit-content',
    ':hover': {
      backgroundColor: colors.secondary,
    },
  },
  panel: {
    background: colors.panelGradient,
    boxShadow: colors.shadowCard,
    borderRadius: '20px',
    padding: '24px',
    '@media (min-width: 640px)': {
      padding: '32px',
    },
  },
  headerFlex: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    '@media (min-width: 1024px)': {
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.24em',
    color: colors.mutedForeground,
    margin: 0,
  },
  titleWrapper: {
    marginTop: '12px',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '12px',
  },
  title: {
    fontSize: '36px',
    fontWeight: 800,
    letterSpacing: '-0.025em',
    color: colors.primary,
    margin: 0,
    '@media (min-width: 640px)': {
      fontSize: '48px',
    },
    '@media (min-width: 1024px)': {
      fontSize: '60px',
    },
  },
  riskBadge: {
    borderRadius: '100px',
    padding: '6px 16px',
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
  },
  metaText: {
    marginTop: '12px',
    fontSize: '16px',
    color: colors.mutedForeground,
    margin: 0,
  },
  scoreCard: {
    borderRadius: '24px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.secondary,
    padding: '20px 24px',
    textAlign: 'right',
  },
  scoreValue: {
    marginTop: '8px',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '48px',
    fontWeight: 700,
    margin: 0,
  },
  gridTwo: {
    display: 'grid',
    gap: '24px',
    '@media (min-width: 1280px)': {
      gridTemplateColumns: '1.05fr 1.4fr',
    },
  },
  gridTwoMixed: {
    display: 'grid',
    gap: '24px',
    '@media (min-width: 1280px)': {
      gridTemplateColumns: '1fr 1.45fr',
    },
  },
  breakdownList: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  breakdownHeader: {
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    fontSize: '14px',
  },
  itemLabel: {
    fontWeight: 500,
    color: colors.foreground,
  },
  itemVal: {
    fontFamily: '"JetBrains Mono", monospace',
    fontWeight: 700,
    color: colors.primary,
  },
  progressTrack: {
    height: '12px',
    borderRadius: '100px',
    backgroundColor: colors.secondary,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: '100px',
  },
  chartContainer: {
    marginTop: '24px',
    height: '280px',
    width: '100%',
  },
  findingHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  iconBox: {
    display: 'flex',
    height: '40px',
    width: '40px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    backgroundColor: colors.secondary,
    color: colors.primary,
  },
  findingSub: {
    marginTop: '4px',
    fontSize: '14px',
    color: colors.mutedForeground,
    margin: 0,
  },
  findingList: {
    marginTop: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    padding: 0,
    listStyle: 'none',
  },
  findingItem: {
    display: 'flex',
    gap: '12px',
    borderRadius: '16px',
    backgroundColor: 'hsla(213, 57%, 96%, 0.7)',
    padding: '16px',
    fontSize: '14px',
    lineHeight: 1.6,
    color: colors.foreground,
  },
  findingDot: {
    marginTop: '4px',
    height: '10px',
    width: '10px',
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: colors.destructive,
  },
  actionGrid: {
    marginTop: '24px',
    display: 'grid',
    gap: '16px',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  actionCard: {
    borderRadius: '24px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.card,
    padding: '20px',
    boxShadow: colors.shadowSoft,
    transition: 'transform 0.2s',
    ':hover': {
      transform: 'translateY(-4px)',
    },
  },
  actionIcon: {
    display: 'inline-flex',
    height: '44px',
    width: '44px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
  },
  actionTitle: {
    marginTop: '16px',
    fontSize: '18px',
    fontWeight: 700,
    margin: 0,
  },
  actionDesc: {
    marginTop: '8px',
    fontSize: '14px',
    lineHeight: 1.6,
    color: colors.mutedForeground,
    margin: 0,
  }
});

export default VendorDetail;
