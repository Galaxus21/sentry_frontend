import { StyleSheet, css } from 'aphrodite';
import { Search, Bell } from 'lucide-react';
import { colors } from '../theme';

export default function Header() {
  return (
    <header className={css(styles.header)}>
      <div className={css(styles.leftBox)}>
        <h1 className={css(styles.title)}>Sentry 🛡️</h1>
      </div>

      <div className={css(styles.rightBox)}>
        <div className={css(styles.searchContainer)}>
          <Search size={18} className={css(styles.searchIcon)} />
          <input
            type="text"
            placeholder="Search vendors, sectors..."
            className={css(styles.searchInput)}
          />
        </div>

        <div className={css(styles.bellContainer)}>
          <Bell size={24} />
          <span className={css(styles.alertBadge)}>3</span>
        </div>
      </div>
    </header>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 32px',
    backgroundColor: colors.surface,
    borderBottom: `1px solid ${colors.border}`,
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
  leftBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: colors.textHeading,
    margin: 0,
  },
  rightBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  searchContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    color: colors.textMuted,
  },
  searchInput: {
    backgroundColor: colors.background,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '8px 16px 8px 40px',
    color: colors.textBody,
    width: '300px',
    outline: 'none',
    transition: 'border-color 0.2s',
    ':focus': {
      borderColor: colors.primary,
    }
  },
  bellContainer: {
    position: 'relative',
    cursor: 'pointer',
    color: colors.textBody,
    ':hover': {
      color: colors.textHeading,
    }
  },
  alertBadge: {
    position: 'absolute',
    top: '-4px',
    right: '-4px',
    backgroundColor: colors.critical,
    color: '#fff',
    fontSize: '0.65rem',
    fontWeight: 'bold',
    width: '16px',
    height: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  }
});
