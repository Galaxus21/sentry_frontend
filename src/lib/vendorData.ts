export interface DimensionData {
  score: number;
  status: 'low' | 'medium' | 'high' | 'critical';
}

export interface VendorDimensions {
  financial: DimensionData;
  sanctions: DimensionData;
  sla: DimensionData;
  news: DimensionData;
}

export interface TrendData {
  day: string;
  score: number;
}

export interface RecommendedAction {
  title: string;
  icon: string;
  description: string;
}

export interface Vendor {
  id: number | string;
  name: string;
  sector: string;
  score: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  dimensions: VendorDimensions;
  trendHistory: TrendData[];
  aiFindings: string[];
  recommendedActions: RecommendedAction[];
  // Legacy fields for VendorTable compatibility
  financial: string;
  sanctions: string;
  sla: string;
  news: string;
  trend: number[];
  findings: string[];
  breakdown: { label: string; val: number }[];
}


export const VENDORS: Vendor[] = [
  {
    id: 1,
    name: "Byju's",
    sector: 'EdTech',
    score: 94,
    riskLevel: 'Critical',
    dimensions: {
      financial: { score: 98, status: 'critical' },
      sanctions: { score: 10, status: 'low' },
      sla: { score: 92, status: 'critical' },
      news: { score: 95, status: 'critical' },
    },
    trendHistory: [
      { day: 'Day 1', score: 65 },
      { day: 'Day 7', score: 78 },
      { day: 'Day 14', score: 85 },
      { day: 'Day 21', score: 91 },
      { day: 'Day 30', score: 94 },
    ],
    aiFindings: [
      "CRITICAL: Missed debt payment reported in multiple top-tier financial news outlets.",
      "CRITICAL: Auditor resignation flagged in regulatory filings.",
      "Severe SLA failures; platform availability dropped to 95% this week.",
      "Multiple ongoing legal proceedings regarding loan defaults."
    ],
    recommendedActions: [
      { title: "Freeze New SOWs", icon: "slash", description: "Immediately halt all new statements of work." },
      { title: "Prepare Alternates", icon: "copy", description: "Activate contingency plans with alternate vendors." },
      { title: "Legal Review", icon: "shield-alert", description: "Engage legal to review contract termination clauses." }
    ],
    financial: 'red',
    sanctions: 'green',
    sla: 'red',
    news: 'red',
    trend: [72, 75, 78, 80, 82, 85, 88, 86, 89, 90, 88, 91, 93, 90, 92, 91, 93, 94, 92, 93, 90, 91, 93, 92, 94, 93, 95, 94, 93, 94],
    findings: [
      "Sudden spike in negative social sentiment regarding management restructuring.",
      "Late filing of quarterly compliance reports (3 consecutive quarters).",
      "Service availability dropped to 94.2% in APAC region, breaching SLA."
    ],
    breakdown: [
      { label: 'Financial Health', val: 88 },
      { label: 'Regulatory Compliance', val: 12 },
      { label: 'News Sentiment', val: 95 },
      { label: 'SLA Performance', val: 78 },
    ],
  },
  {
    id: 2,
    name: 'Zomato',
    sector: 'Logistics',
    score: 41,
    riskLevel: 'Medium',
    dimensions: {
      financial: { score: 25, status: 'low' },
      sanctions: { score: 60, status: 'high' },
      sla: { score: 55, status: 'medium' },
      news: { score: 30, status: 'low' },
    },
    trendHistory: [
      { day: 'Day 1', score: 30 },
      { day: 'Day 7', score: 32 },
      { day: 'Day 14', score: 38 },
      { day: 'Day 21', score: 45 },
      { day: 'Day 30', score: 41 },
    ],
    aiFindings: [
      "Sanctions warning: Potential exposure to restricted entities in sub-tier supply chain.",
      "SLA dropped below 98% threshold twice in the last 14 days.",
      "Delivery partner protests mentioned in regional news feeds."
    ],
    recommendedActions: [
      { title: "Audit Supply Chain", icon: "search", description: "Investigate sub-tier vendors for sanctions compliance." },
      { title: "SLA Discussion", icon: "message-square", description: "Schedule review meeting regarding recent drop in performance." },
      { title: "Monitor News", icon: "activity", description: "Set up high-frequency alerts for regional protests." }
    ],
    financial: 'green',
    sanctions: 'yellow',
    sla: 'yellow',
    news: 'green',
    trend: [30, 32, 35, 38, 36, 40, 42, 38, 39, 41, 40, 43, 42, 40, 38, 39, 41, 42, 40, 41, 39, 40, 42, 41, 40, 39, 41, 40, 42, 41],
    findings: [
      "Sanctions watchlist flagged a subsidiary operating in restricted territory.",
      "SLA response times degraded 15% in Q4 due to scaling issues.",
      "Minor regulatory filing delay noted in last audit cycle."
    ],
    breakdown: [
      { label: 'Financial Health', val: 22 },
      { label: 'Regulatory Compliance', val: 48 },
      { label: 'News Sentiment', val: 18 },
      { label: 'SLA Performance', val: 55 },
    ],
  },
  {
    id: 3,
    name: 'Infosys',
    sector: 'IT Services',
    score: 12,
    riskLevel: 'Low',
    dimensions: {
      financial: { score: 10, status: 'low' },
      sanctions: { score: 0, status: 'low' },
      sla: { score: 15, status: 'low' },
      news: { score: 20, status: 'low' },
    },
    trendHistory: [
      { day: 'Day 1', score: 15 },
      { day: 'Day 7', score: 14 },
      { day: 'Day 14', score: 12 },
      { day: 'Day 21', score: 10 },
      { day: 'Day 30', score: 12 },
    ],
    aiFindings: [
      "Consistent SLA performance exceeding 99.9%.",
      "Strong quarterly financial statements published.",
      "No negative news detected across major tech aggregates."
    ],
    recommendedActions: [
      { title: "Extend Contract", icon: "check-circle", description: "Current performance justifies long-term renewal." },
      { title: "Review Roles", icon: "users", description: "Audit IAM roles to ensure least privilege." }
    ],
    financial: 'green',
    sanctions: 'green',
    sla: 'green',
    news: 'green',
    trend: [15, 14, 13, 12, 14, 13, 11, 12, 13, 12, 11, 10, 12, 13, 11, 12, 10, 11, 12, 13, 12, 11, 12, 11, 12, 13, 12, 11, 12, 12],
    findings: [
      "All compliance reports filed on time for the past 12 months.",
      "Strong financial performance with consistent quarterly growth.",
      "SLA adherence at 99.8% across all regions — exceeds benchmarks."
    ],
    breakdown: [
      { label: 'Financial Health', val: 8 },
      { label: 'Regulatory Compliance', val: 5 },
      { label: 'News Sentiment', val: 10 },
      { label: 'SLA Performance', val: 6 },
    ],
  },
];

export const summaryStats = {
  critical: 1,
  high: 0,
  medium: 1,
  low: 1,
  total: 3
};
