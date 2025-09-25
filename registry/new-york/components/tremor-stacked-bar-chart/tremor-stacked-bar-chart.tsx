"use client";

import * as React from 'react';
import { 
  Box, 
  Card, 
  CardContent,
  Tabs, 
  Tab,
  Typography,
  Stack
} from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

interface PaymentData {
  month: string;
  successful: number;
  refunded: number;
  fraudulent: number;
  [key: string]: string | number;
}

interface RegionData {
  region: 'Europe' | 'North America';
  data: PaymentData[];
}

// Sample data matching the mockup
const mockData: RegionData[] = [
  {
    region: 'Europe',
    data: [
      { month: 'Jan 23', successful: 15, refunded: 2, fraudulent: 1 },
      { month: 'Feb 23', successful: 28, refunded: 3, fraudulent: 1 },
      { month: 'Mar 23', successful: 32, refunded: 4, fraudulent: 2 },
      { month: 'Apr 23', successful: 22, refunded: 2, fraudulent: 0 },
      { month: 'May 23', successful: 26, refunded: 3, fraudulent: 0 },
      { month: 'Jun 23', successful: 24, refunded: 2, fraudulent: 1 },
      { month: 'Jul 23', successful: 18, refunded: 1, fraudulent: 0 },
      { month: 'Aug 23', successful: 30, refunded: 4, fraudulent: 1 },
      { month: 'Sep 23', successful: 25, refunded: 2, fraudulent: 1 },
      { month: 'Oct 23', successful: 20, refunded: 2, fraudulent: 0 },
      { month: 'Nov 23', successful: 22, refunded: 2, fraudulent: 1 },
      { month: 'Dec 23', successful: 31, refunded: 3, fraudulent: 1 }
    ]
  },
  {
    region: 'North America',
    data: [
      { month: 'Jan 23', successful: 18, refunded: 3, fraudulent: 1 },
      { month: 'Feb 23', successful: 25, refunded: 4, fraudulent: 1 },
      { month: 'Mar 23', successful: 32, refunded: 5, fraudulent: 2 },
      { month: 'Apr 23', successful: 23, refunded: 3, fraudulent: 1 },
      { month: 'May 23', successful: 28, refunded: 4, fraudulent: 1 },
      { month: 'Jun 23', successful: 30, refunded: 5, fraudulent: 1 },
      { month: 'Jul 23', successful: 20, refunded: 2, fraudulent: 0 },
      { month: 'Aug 23', successful: 35, refunded: 6, fraudulent: 2 },
      { month: 'Sep 23', successful: 24, refunded: 3, fraudulent: 1 },
      { month: 'Oct 23', successful: 28, refunded: 4, fraudulent: 1 },
      { month: 'Nov 23', successful: 22, refunded: 3, fraudulent: 0 },
      { month: 'Dec 23', successful: 31, refunded: 5, fraudulent: 2 }
    ]
  }
];

const LegendItem = ({ 
  color, 
  label, 
  value 
}: { 
  color: string; 
  label: string; 
  value: number; 
}) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Box 
      sx={{ 
        width: 12, 
        height: 12, 
        bgcolor: color,
        borderRadius: 1
      }} 
    />
    <Typography variant="body2" sx={{ color: 'text.secondary', mr: 1 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
      {value}
    </Typography>
  </Box>
);

export default function TremorStackedBarChart() {
  const [selectedRegion, setSelectedRegion] = React.useState(0);
  
  const currentRegionData = mockData[selectedRegion];
  
  // Calculate totals for legend
  const totals = currentRegionData.data.reduce(
    (acc, item) => ({
      successful: acc.successful + item.successful,
      refunded: acc.refunded + item.refunded,
      fraudulent: acc.fraudulent + item.fraudulent
    }),
    { successful: 0, refunded: 0, fraudulent: 0 }
  );

  const handleRegionChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedRegion(newValue);
  };

  return (
    <Card 
      sx={{ 
        maxWidth: 600, 
        mx: 'auto',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: 1
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3,
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          Online payments
        </Typography>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs
            value={selectedRegion}
            onChange={handleRegionChange}
            aria-label="region selection tabs"
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '0.875rem',
                minHeight: 36,
                px: 0,
                mr: 4,
                color: 'text.secondary',
                '&.Mui-selected': {
                  color: 'primary.main',
                }
              },
              '& .MuiTabs-indicator': {
                height: 2,
                backgroundColor: 'primary.main',
              },
            }}
          >
            <Tab 
              label="Europe" 
              id="region-tab-0"
              aria-controls="chart-panel"
            />
            <Tab 
              label="North America" 
              id="region-tab-1"
              aria-controls="chart-panel"
            />
          </Tabs>
        </Box>

        {/* Chart */}
        <Box 
          id="chart-panel"
          role="tabpanel"
          aria-labelledby={`region-tab-${selectedRegion}`}
          aria-label={`Payment data chart for ${currentRegionData.region}`}
          sx={{ mb: 3 }}
        >
          <BarChart
            title={`Online payments data for ${currentRegionData.region}`}
            dataset={currentRegionData.data}
            xAxis={[{ 
              dataKey: 'month',
              scaleType: 'band',
              tickLabelStyle: {
                fontSize: 12,
                fill: '#6b7280'
              }
            }]}
            yAxis={[{
              tickLabelStyle: {
                fontSize: 12,
                fill: '#6b7280'
              }
            }]}
            series={[
              { 
                dataKey: 'successful', 
                stack: 'total',
                color: '#2563eb',
                label: 'Successful'
              },
              { 
                dataKey: 'refunded', 
                stack: 'total',
                color: '#8b5cf6',
                label: 'Refunded'
              },
              { 
                dataKey: 'fraudulent', 
                stack: 'total',
                color: '#ec4899',
                label: 'Fraudulent'
              }
            ]}
            height={300}
            margin={{ left: 40, right: 20, top: 20, bottom: 40 }}
            sx={{
              '& .MuiChartsAxis-root': {
                '& .MuiChartsAxis-line': {
                  stroke: '#e5e7eb',
                },
                '& .MuiChartsAxis-tick': {
                  stroke: '#e5e7eb',
                }
              },
              '& .MuiChartsLegend-root': {
                display: 'none'
              }
            }}
          />
        </Box>

        {/* Custom Legend */}
        <Stack 
          direction="row" 
          spacing={4}
          sx={{ 
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <LegendItem 
            color="#2563eb" 
            label="Successful" 
            value={totals.successful} 
          />
          <LegendItem 
            color="#8b5cf6" 
            label="Refunded" 
            value={totals.refunded} 
          />
          <LegendItem 
            color="#ec4899" 
            label="Fraudulent" 
            value={totals.fraudulent} 
          />
        </Stack>
      </CardContent>
    </Card>
  );
}