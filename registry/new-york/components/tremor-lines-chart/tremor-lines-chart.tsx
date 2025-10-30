'use client';

import React from 'react';
import { Box, Card, Typography, Stack } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

// Sample data that matches the mockup pattern
const portfolioData = [
  { date: 'Aug 25', etf: 120, vitainvest: 80, ishares: 150 },
  { date: 'Aug 29', etf: 110, vitainvest: 85, ishares: 180 },
  { date: 'Sep 02', etf: 160, vitainvest: 90, ishares: 175 },
  { date: 'Sep 06', etf: 155, vitainvest: 95, ishares: 170 },
  { date: 'Sep 10', etf: 190, vitainvest: 110, ishares: 165 },
  { date: 'Sep 14', etf: 165, vitainvest: 125, ishares: 140 },
  { date: 'Sep 18', etf: 200, vitainvest: 115, ishares: 155 },
  { date: 'Sep 22', etf: 220, vitainvest: 135, ishares: 145 },
  { date: 'Sep 26', etf: 250, vitainvest: 140, ishares: 130 }
];

const dates = portfolioData.map(item => item.date);
const etfData = portfolioData.map(item => item.etf);
const vitainvestData = portfolioData.map(item => item.vitainvest);
const isharesData = portfolioData.map(item => item.ishares);

// Custom colors matching the mockup
const chartColors = ['#4F46E5', '#06B6D4', '#EC4899'];

export default function TremorLinesChart() {
  return (
    <Card 
      sx={theme => ({
        maxWidth: 600,
        mx: 'auto',
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 1,
        ...theme.applyStyles('dark', {
          bgcolor: 'grey.900',
        }),
      })}
    >
      <Stack spacing={3}>
        {/* Header Section */}
        <Box>
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'text.secondary',
              fontWeight: 500,
              mb: 0.5
            }}
          >
            Portfolio Value
          </Typography>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700,
              color: 'text.primary'
            }}
          >
            $328,505.10
          </Typography>
        </Box>

        {/* Chart Section */}
        <Box sx={{ width: '100%', height: 300, px: 0.5 }}>
          <LineChart
            series={[
              {
                data: etfData,
                label: 'ETF Shares Vital',
                color: chartColors[0],
                curve: 'monotoneX',
                showMark: false
              },
              {
                data: vitainvestData,
                label: 'Vitainvest Core',
                color: chartColors[1],
                curve: 'monotoneX',
                showMark: false
              },
              {
                data: isharesData,
                label: 'iShares Tech Growth',
                color: chartColors[2],
                curve: 'monotoneX',
                showMark: false
              }
            ]}
            xAxis={[{
              data: dates,
              scaleType: 'point'
            }]}
            yAxis={[{
              min: 50,
              max: 300,
              width: 0
            }]}
            height={300}
            width={undefined}
            grid={{ horizontal: true, vertical: false }}
            sx={theme => ({
              '.MuiLineElement-root': {
                strokeWidth: 2.5
              },
              '.MuiChartsGrid-line': {
                stroke: (theme.vars || theme).palette.divider,
                strokeOpacity: 0.3
              },
              '.MuiChartsLegend-root': {
                mb: 1.5
              },
              '.MuiChartsLegend-series': {
                gap: '12px !important'
              },
              '.MuiChartsAxis-tickLabel': {
                fontSize: '0.875rem',
                fill: (theme.vars || theme).palette.text.secondary
              },
              '.MuiChartsAxis-line': {
                display: 'none'
              },
              '.MuiChartsAxis-tick': {
                display: 'none'
              },
              ...theme.applyStyles('dark', {
                '.MuiChartsGrid-line': {
                  stroke: (theme.vars || theme).palette.grey[800],
                }
              })
            })}
          />
        </Box>
      </Stack>
    </Card>
  );
}