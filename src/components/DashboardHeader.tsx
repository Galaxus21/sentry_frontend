import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Bell, Search, ShieldAlert } from 'lucide-react';
import { colors } from '@/theme';

interface DashboardHeaderProps {
  alertCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}



const DashboardHeader: React.FC<DashboardHeaderProps> = ({ alertCount, searchQuery, onSearchChange }) => (
  <>
    <header className={css(styles.header)}>
      <div className={css(styles.container)}>
        <div className={css(styles.logoBox)}>
          <div className={css(styles.logoIcon)}>
            <ShieldAlert size={24} />
          </div>
          <div className={css(styles.logoContent)}>
            <p className={css(styles.logoLabel)}>Command Center</p>
            <h1 className={css(styles.logoTitle)}>Sentry 🛡️</h1>
          </div>
        </div>

        <div className={css(styles.actions)}>
          <div className={css(styles.searchBox)}>
            <Search className={css(styles.searchIcon)} />
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              type="text"
              placeholder="Search vendors"
              className={css(styles.searchInput)}
            />
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className={css(styles.bellBtn)}
          >
            <Bell size={20} />
            <span className={css(styles.badge)}>
              {alertCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  </>
);

interface SummaryCardsProps {
  critical: number;
  medium: number;
  low: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ critical, medium, low }) => {
  const cards = [
    {
      label: 'Critical',
      count: critical,
      badgeStyles: { backgroundColor: 'hsla(356, 89%, 54%, 0.1)', color: colors.destructive },
      barStyles: { backgroundColor: colors.destructive },
      note: 'Immediate review'
    },
    {
      label: 'Medium',
      count: medium,
      badgeStyles: { backgroundColor: 'hsla(40, 96%, 51%, 0.12)', color: colors.warning },
      barStyles: { backgroundColor: colors.warning },
      note: 'Needs monitoring'
    },
    {
      label: 'Low',
      count: low,
      badgeStyles: { backgroundColor: 'hsla(149, 63%, 42%, 0.1)', color: colors.success },
      barStyles: { backgroundColor: colors.success },
      note: 'Healthy posture'
    },
  ];

  return (
    <div className={css(styles.grid)}>
      {cards.map((card) => (
        <article key={card.label} className={css(styles.card)}>
          <div className={css(styles.cardHeader)}>
            <div>
              <p className={css(styles.cardLabel)}>{card.label} Vendors</p>
              <p className={css(styles.cardCount)}>{card.count}</p>
            </div>
            <div className={css(styles.cardBadge)} style={card.badgeStyles}>{card.note}</div>
          </div>
          <div className={css(styles.progressTrack)}>
            <div
              className={css(styles.progressBar)}
              style={{ ...card.barStyles, width: `${Math.max(card.count, 1) * 33.33}%` }}
            />
          </div>
        </article>
      ))}
    </div>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    borderBottom: `1px solid ${colors.border}`,
    backgroundColor: 'rgba(210, 33%, 99%, 0.9)', // Matching the source bg-background/90
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  },
  container: {
    margin: '0 auto',
    display: 'flex',
    height: '80px',
    maxWidth: '1280px',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
    padding: '0 16px',
    '@media (min-width: 640px)': {
      padding: '0 24px',
    },
  },
  logoBox: {
    display: 'flex',
    minWidth: 0,
    alignItems: 'center',
    gap: '16px',
    borderRadius: '100px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.card,
    padding: '12px 16px',
    boxShadow: colors.shadowSoft,
  },
  logoIcon: {
    display: 'flex',
    height: '48px',
    width: '48px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    backgroundColor: colors.secondary,
    color: colors.primary,
  },
  logoContent: {
    minWidth: 0,
  },
  logoLabel: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.24em',
    color: colors.mutedForeground,
    margin: 0,
  },
  logoTitle: {
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '24px',
    fontWeight: 800,
    letterSpacing: '-0.025em',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    '@media (min-width: 640px)': {
      gap: '16px',
    },
  },
  searchBox: {
    position: 'relative',
    display: 'none',
    '@media (min-width: 768px)': {
      display: 'block',
    },
  },
  searchIcon: {
    pointerEvents: 'none',
    position: 'absolute',
    left: '16px',
    top: '50%',
    height: '16px',
    width: '16px',
    transform: 'translateY(-50%)',
    color: colors.mutedForeground,
  },
  searchInput: {
    height: '48px',
    width: '288px',
    borderRadius: '100px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.card,
    paddingLeft: '44px',
    paddingRight: '16px',
    fontSize: '14px',
    color: colors.foreground,
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    ':focus': {
      borderColor: colors.primary,
      boxShadow: `0 0 0 2px hsla(214, 72%, 39%, 0.15)`,
    },
    '::placeholder': {
      color: colors.mutedForeground,
    },
  },
  bellBtn: {
    position: 'relative',
    display: 'flex',
    height: '48px',
    width: '48px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    border: `1px solid ${colors.border}`,
    backgroundColor: colors.card,
    color: colors.primary,
    boxShadow: colors.shadowSoft,
    transition: 'background-color 0.2s',
    cursor: 'pointer',
    outline: 'none',
    ':hover': {
      backgroundColor: colors.secondary,
    },
  },
  badge: {
    position: 'absolute',
    right: '-4px',
    top: '-4px',
    display: 'flex',
    height: '20px',
    minWidth: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100px',
    backgroundColor: colors.destructive,
    padding: '0 4px',
    fontSize: '10px',
    fontWeight: 'bold',
    color: colors.destructiveForeground,
  },
  grid: {
    display: 'grid',
    gap: '16px',
    '@media (min-width: 768px)': {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },
  },
  card: {
    padding: '24px',
    background: colors.panelGradient,
    boxShadow: colors.shadowCard,
    borderRadius: '20px',
  },
  cardHeader: {
    marginBottom: '24px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '16px',
  },
  cardLabel: {
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.24em',
    color: colors.mutedForeground,
    margin: 0,
  },
  cardCount: {
    marginTop: '12px',
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '36px',
    fontWeight: 700,
    lineHeight: 1,
    margin: 0,
  },
  cardBadge: {
    borderRadius: '100px',
    padding: '4px 12px',
    fontSize: '12px',
    fontWeight: 600,
  },
  progressTrack: {
    height: '8px',
    borderRadius: '100px',
    backgroundColor: colors.secondary,
  },
  progressBar: {
    height: '100%',
    borderRadius: '100px',
  }
});

export { DashboardHeader, SummaryCards };
