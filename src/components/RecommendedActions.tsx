import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { CheckCircle, Search, MessageSquare, Activity, Slash, Copy, ShieldAlert, Users } from 'lucide-react';
import { colors } from '../theme';
import type { RecommendedAction } from '../lib/vendorData';



interface ActionIconProps {
  name: string;
  size?: number;
}

const ActionIcon: React.FC<ActionIconProps> = ({ name, size = 24 }) => {
  switch (name) {
    case 'check-circle': return <CheckCircle size={size} />;
    case 'search': return <Search size={size} />;
    case 'message-square': return <MessageSquare size={size} />;
    case 'activity': return <Activity size={size} />;
    case 'slash': return <Slash size={size} />;
    case 'copy': return <Copy size={size} />;
    case 'shield-alert': return <ShieldAlert size={size} />;
    case 'users': return <Users size={size} />;
    default: return <Activity size={size} />;
  }
};

interface RecommendedActionsProps {
  actions: RecommendedAction[];
}

const RecommendedActions: React.FC<RecommendedActionsProps> = ({ actions }) => {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.header)}>
        <h3 className={css(styles.title)}>Recommended Actions</h3>
      </div>

      <div className={css(styles.grid)}>
        {actions.map((action, idx) => (
          <div key={idx} className={css(styles.actionCard)}>
            <div className={css(styles.iconBox)}>
              <ActionIcon name={action.icon} />
            </div>
            <div className={css(styles.content)}>
              <span className={css(styles.actionTitle)}>{action.title}</span>
              <span className={css(styles.description)}>{action.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '24px',
    marginTop: '24px',
  },
  header: {
    marginBottom: '20px',
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
    color: colors.textHeading,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  actionCard: {
    display: 'flex',
    gap: '16px',
    padding: '20px',
    backgroundColor: colors.surfaceHover,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    transition: 'transform 0.2s, border-color 0.2s',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-2px)',
      borderColor: colors.primary,
    }
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    backgroundColor: `${colors.primary}20`,
    color: colors.primary,
    flexShrink: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  actionTitle: {
    color: colors.textHeading,
    fontWeight: 600,
    fontSize: '1rem',
    marginBottom: '4px',
  },
  description: {
    color: colors.textMuted,
    fontSize: '0.875rem',
    lineHeight: '1.5',
  }
});


export default RecommendedActions;
