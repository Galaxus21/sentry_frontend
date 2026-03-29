import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import SummaryCards from './SummaryCards';
import VendorTable from './VendorTable';
import { VENDORS, type Vendor } from '@/lib/vendorData';



interface DashboardViewProps {
  onVendorSelect: (vendor: Vendor) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onVendorSelect }) => {
  return (
    <div className={css(styles.container)}>
      <SummaryCards />
      <VendorTable onSelect={onVendorSelect} vendors={VENDORS} />
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: '32px',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
  }
});


export default DashboardView;
