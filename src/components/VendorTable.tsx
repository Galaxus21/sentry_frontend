import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ChevronRight } from 'lucide-react';
import { colors } from '@/theme';
import type { Vendor } from '@/lib/vendorData';



const StatusBadge = ({ status }: { status: string }) => {
  const toneClass = status === 'red' ? statusStyles.red : status === 'yellow' ? statusStyles.yellow : statusStyles.green;
  return <span className={css(statusStyles.dot, toneClass)} />;
};

interface VendorTableProps {
  vendors: Vendor[];
  onSelect: (vendor: Vendor) => void;
}



const VendorTable: React.FC<VendorTableProps> = ({ vendors, onSelect }) => (
  <section className={css(styles.panel)}>
    <div className={css(styles.header)}>
      <div>
        <p className={css(styles.label)}>Vendor register</p>
        <h2 className={css(styles.title)}>Risk Overview</h2>
      </div>
      <div className={css(styles.hint)}>
        Click any row for detail view
      </div>
    </div>

    <div className={css(styles.tableWrapper)}>
      <table className={css(styles.table)}>
        <thead className={css(styles.thead)}>
          <tr>
            <th className={css(styles.th)}>Vendor Name</th>
            <th className={css(styles.th)}>Sector</th>
            <th className={css(styles.th)}>Overall Risk Score</th>
            <th className={css(styles.th, styles.centerTh)}>Financial</th>
            <th className={css(styles.th, styles.centerTh)}>Sanctions</th>
            <th className={css(styles.th, styles.centerTh)}>SLA</th>
            <th className={css(styles.th, styles.centerTh)}>News</th>
            <th className={css(styles.th)} />
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => {
            const scoreClass = vendor.score > 70 
              ? styles.criticalScore 
              : vendor.score > 30 
                ? styles.mediumScore 
                : styles.lowScore;

            return (
              <tr
                key={vendor.id}
                onClick={() => onSelect(vendor)}
                className={css(styles.tr)}
              >
                <td className={css(styles.td, styles.tdName)}>{vendor.name}</td>
                <td className={css(styles.td, styles.tdSector)}>{vendor.sector}</td>
                <td className={css(styles.td)}>
                  <span className={css(styles.scoreBadge, scoreClass)}>
                    {vendor.score}
                  </span>
                </td>
                <td className={css(styles.td)}><div className={css(styles.center)}><StatusBadge status={vendor.financial} /></div></td>
                <td className={css(styles.td)}><div className={css(styles.center)}><StatusBadge status={vendor.sanctions} /></div></td>
                <td className={css(styles.td)}><div className={css(styles.center)}><StatusBadge status={vendor.sla} /></div></td>
                <td className={css(styles.td)}><div className={css(styles.center)}><StatusBadge status={vendor.news} /></div></td>
                <td className={css(styles.td, styles.rightIcon)}>
                  <ChevronRight size={16} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </section>
);

const statusStyles = StyleSheet.create({
  dot: {
    display: 'inline-flex',
    height: '12px',
    width: '12px',
    borderRadius: '50%',
    boxShadow: `0 0 0 4px ${colors.background}`,
  },
  red: { backgroundColor: colors.destructive },
  yellow: { backgroundColor: colors.warning },
  green: { backgroundColor: colors.success },
});

const styles = StyleSheet.create({
  panel: {
    background: colors.panelGradient,
    boxShadow: colors.shadowCard,
    borderRadius: '20px',
    overflow: 'hidden',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '16px',
    borderBottom: `1px solid hsla(213, 44%, 85%, 0.7)`,
    padding: '20px 24px',
  },
  label: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.24em',
    color: colors.mutedForeground,
    margin: 0,
  },
  title: {
    marginTop: '4px',
    fontSize: '24px',
    fontWeight: 700,
    margin: 0,
  },
  hint: {
    display: 'none',
    borderRadius: '100px',
    backgroundColor: colors.secondary,
    padding: '8px 16px',
    fontSize: '12px',
    fontWeight: 600,
    color: colors.primary,
    '@media (min-width: 768px)': {
      display: 'block',
    },
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    minWidth: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  thead: {
    backgroundColor: 'hsla(213, 57%, 96%, 0.6)',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: colors.mutedForeground,
  },
  th: {
    padding: '16px 24px',
    fontWeight: 600,
  },
  tr: {
    cursor: 'pointer',
    backgroundColor: colors.card,
    transition: 'background-color 0.2s',
    borderBottom: `1px solid hsla(213, 44%, 85%, 0.7)`,
    ':hover': {
      backgroundColor: 'hsla(213, 57%, 96%, 0.5)',
    },
  },
  td: {
    padding: '20px 24px',
  },
  tdName: {
    fontWeight: 600,
  },
  tdSector: {
    fontSize: '14px',
    color: colors.mutedForeground,
  },
  scoreBadge: {
    display: 'inline-flex',
    borderRadius: '100px',
    padding: '4px 12px',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '14px',
    fontWeight: 700,
  },
  criticalScore: { backgroundColor: 'hsla(356, 89%, 54%, 0.1)', color: colors.destructive },
  mediumScore: { backgroundColor: 'hsla(40, 96%, 51%, 0.15)', color: colors.warning },
  lowScore: { backgroundColor: 'hsla(149, 63%, 42%, 0.1)', color: colors.success },
  center: {
    display: 'flex',
    justifyContent: 'center',
  },
  centerTh: {
    textAlign: 'center',
  },
  rightIcon: {
    color: colors.primary,
    textAlign: 'right',
  }
});

export default VendorTable;
