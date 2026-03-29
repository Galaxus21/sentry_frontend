import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { colors } from '../theme';
import type { TrendData } from '../lib/vendorData';



interface TrendChartProps {
  data: TrendData[];
}

const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className={css(styles.container)}>
      <h3 className={css(styles.title)}>30-Day Risk Trend</h3>
      <div className={css(styles.chartWrapper)}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={colors.border} vertical={false} />
            <XAxis
              dataKey="day"
              stroke={colors.textMuted}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              domain={[0, 100]}
              stroke={colors.textMuted}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.surfaceHover,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                color: colors.textHeading,
              }}
              itemStyle={{ color: colors.primary }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke={colors.primary}
              strokeWidth={3}
              dot={{ fill: colors.primary, r: 4, strokeWidth: 2, stroke: colors.surface }}
              activeDot={{ r: 6, fill: colors.critical, stroke: 'none' }}
            />
          </LineChart>
        </ResponsiveContainer>
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
    height: '100%',
    minHeight: '300px',
  },
  title: {
    margin: '0 0 24px 0',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: colors.textHeading,
  },
  chartWrapper: {
    height: '250px',
    width: '100%',
  }
});


export default TrendChart;
