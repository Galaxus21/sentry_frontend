import React, { useMemo, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import { Bell, Search, ShieldAlert, ChevronRight } from 'lucide-react';
import { colors } from '@/theme';
import type { Vendor } from '@/lib/vendorData';

interface DashboardHeaderProps {
  alertCount: number;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  vendors: Vendor[];
  onVendorSelect: (vendor: Vendor) => void;
}



const DashboardHeader: React.FC<DashboardHeaderProps> = ({ alertCount, searchQuery, onSearchChange, vendors, onVendorSelect }) => {
  const [isFocused, setIsFocused] = useState(false);

  const suggestions = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return vendors.filter((v) =>
      [v.name, v.sector].some((val) => val.toLowerCase().includes(q)),
    );
  }, [searchQuery, vendors]);

  const showDropdown = isFocused && searchQuery.trim().length > 0;

  const handleSelect = (vendor: Vendor) => {
    setIsFocused(false);
    onSearchChange('');
    onVendorSelect(vendor);
  };

  const riskColor = (score: number) => score > 70 ? colors.destructive : score > 30 ? colors.warning : colors.success;
  const riskBg = (score: number) => score > 70 ? 'hsla(356,89%,54%,0.1)' : score > 30 ? 'hsla(40,96%,51%,0.15)' : 'hsla(149,63%,42%,0.1)';

  return (
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
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              type="text"
              placeholder="Search vendors"
              className={css(styles.searchInput)}
            />
            {showDropdown && (
              <div className={css(styles.dropdown)}>
                {suggestions.length > 0 ? (
                  suggestions.map((vendor) => (
                    <button
                      key={vendor.id}
                      type="button"
                      className={css(styles.dropdownItem)}
                      onMouseDown={() => handleSelect(vendor)}
                    >
                      <div className={css(styles.dropdownLeft)}>
                        <span className={css(styles.dropdownName)}>{vendor.name}</span>
                        <span className={css(styles.dropdownSector)}>{vendor.sector}</span>
                      </div>
                      <div className={css(styles.dropdownRight)}>
                        <span
                          className={css(styles.dropdownScore)}
                          style={{ color: riskColor(vendor.score), backgroundColor: riskBg(vendor.score) }}
                        >
                          {vendor.score}
                        </span>
                        <ChevronRight size={14} color={colors.mutedForeground} />
                      </div>
                    </button>
                  ))
                ) : (
                  <div className={css(styles.noResults)}>No vendors found</div>
                )}
              </div>
            )}
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
  );
};

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
  },
  dropdown: {
    position: 'absolute',
    top: '56px',
    left: 0,
    right: 0,
    backgroundColor: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '16px',
    boxShadow: '0 16px 48px -12px rgba(0,0,0,0.15)',
    zIndex: 100,
    overflow: 'hidden',
    maxHeight: '320px',
    overflowY: 'auto',
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '14px 16px',
    background: 'none',
    border: 'none',
    borderBottom: `1px solid ${colors.border}`,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.15s',
    ':hover': {
      backgroundColor: colors.secondary,
    },
    ':last-child': {
      borderBottom: 'none',
    },
  },
  dropdownLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  dropdownName: {
    fontSize: '14px',
    fontWeight: 600,
    color: colors.foreground,
  },
  dropdownSector: {
    fontSize: '12px',
    color: colors.mutedForeground,
  },
  dropdownRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  dropdownScore: {
    fontFamily: '"JetBrains Mono", monospace',
    fontSize: '13px',
    fontWeight: 700,
    borderRadius: '100px',
    padding: '4px 10px',
  },
  noResults: {
    padding: '20px 16px',
    textAlign: 'center',
    fontSize: '14px',
    color: colors.mutedForeground,
  },
});

export { DashboardHeader, SummaryCards };
