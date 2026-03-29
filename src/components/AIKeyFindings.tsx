import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { AlertTriangle, Info } from 'lucide-react';
import { colors } from '../theme';



interface AIKeyFindingsProps {
  findings: string[];
}

const AIKeyFindings: React.FC<AIKeyFindingsProps> = ({ findings }) => {
  return (
    <div className={css(styles.container)}>
      <div className={css(styles.header)}>
        <h3 className={css(styles.title)}>AI Key Findings</h3>
      </div>
      
      <ul className={css(styles.list)}>
        {findings.map((finding, idx) => {
          const isCritical = finding.includes('CRITICAL');
          return (
            <li key={idx} className={css(styles.listItem)}>
              {isCritical ? (
                 <AlertTriangle size={20} className={css(styles.iconCritical)} />
              ) : (
                 <Info size={20} className={css(styles.iconInfo)} />
              )}
              <p className={css(styles.text)}>{finding}</p>
            </li>
          );
        })}
      </ul>
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
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  title: {
    margin: 0,
    fontSize: '1.25rem',
    fontWeight: 600,
    color: colors.textHeading,
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  listItem: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start',
    backgroundColor: `${colors.border}`, 
    padding: '16px',
    borderRadius: '8px',
  },
  text: {
    margin: 0,
    lineHeight: '1.5',
    color: colors.textBody,
  },
  iconCritical: {
    color: colors.critical,
    flexShrink: 0,
  },
  iconInfo: {
    color: colors.secondary,
    flexShrink: 0,
  }
});


export default AIKeyFindings;
