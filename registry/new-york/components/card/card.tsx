'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Stack,
  CircularProgress,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ContactlessOutlined as ContactlessIcon,
  CheckCircle as CheckCircleIcon,
  ArrowForward as ArrowForwardIcon,
  CreditCard as CreditCardIcon,
} from '@mui/icons-material';

export default function CardComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');

  const periods = ['Daily', 'Weekly', 'Monthly'];

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        p: 3,
        bgcolor: 'background.default',
      }}
    >
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 3 }}
      >
        <Stack direction="row" alignItems="center" spacing={1}>
          <CreditCardIcon sx={{ color: 'text.secondary' }} />
          <Typography variant="h5" fontWeight={600}>
            My Cards
          </Typography>
        </Stack>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            borderRadius: 3,
            px: 2,
            py: 1,
            textTransform: 'none',
          }}
        >
          Add Card
        </Button>
      </Stack>

      {/* Main Card */}
      <Card
        role="region"
        aria-label="Savings card details"
        sx={{
          p: 3,
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
          mb: 3,
          position: 'relative',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%)',
          border: '1px solid rgba(0,0,0,0.04)',
          backdropFilter: 'blur(10px)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            background: 'linear-gradient(135deg, transparent 0%, rgba(0,0,0,0.015) 100%)',
            borderRadius: 'inherit',
            pointerEvents: 'none',
          },
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {/* Card Header */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            sx={{ mb: 4 }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              {/* Card Brand Logo */}
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #4285f4 0%, #1a73e8 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(66, 133, 244, 0.3)',
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 16,
                    bgcolor: 'white',
                    borderRadius: '1px',
                    position: 'relative',
                    transform: 'perspective(80px) rotateY(-12deg)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 2,
                      left: 2,
                      right: 2,
                      bottom: 2,
                      background: 'linear-gradient(135deg, #4285f4 0%, #1a73e8 100%)',
                      borderRadius: '0.5px',
                    },
                  }}
                />
              </Box>
              
              {/* Contactless Icon */}
              <ContactlessIcon sx={{ color: 'text.secondary', fontSize: 28 }} />
              
              {/* Active Status */}
              <Chip
                icon={<CheckCircleIcon sx={{ fontSize: '18px !important' }} />}
                label="Active"
                variant="filled"
                color="success"
                size="small"
                sx={{
                  borderRadius: 2,
                  fontWeight: 500,
                  '& .MuiChip-icon': {
                    color: 'inherit',
                  },
                }}
              />
            </Stack>

            {/* Mastercard Logo & Navigation */}
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: 2,
                }}
                aria-label="Mastercard"
              >
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: '#EB001B',
                    mr: -0.75,
                    zIndex: 1,
                  }}
                />
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: '#FF5F00',
                  }}
                />
              </Box>
              
              <IconButton
                size="small"
                aria-label="Previous card"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.9)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="Next card"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.9)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,1)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Stack>

          {/* Card Details */}
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 0.5, fontWeight: 500, fontSize: '0.95rem' }}
            >
              Savings Card
            </Typography>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: 'text.primary',
                mb: 0.5,
                fontSize: '2.5rem',
              }}
            >
              $16,058
              <Typography
                component="span"
                variant="h4"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 300,
                  fontSize: '2rem',
                }}
              >
                .94
              </Typography>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Time Period Selector */}
      <Box
        role="tablist"
        aria-label="Time period selector"
        sx={{
          mb: 3,
          p: 0.5,
          bgcolor: 'grey.100',
          borderRadius: 2,
          width: 'fit-content',
          display: 'flex',
          gap: 0.5,
        }}
      >
        {periods.map((period) => (
          <Button
            key={period}
            role="tab"
            aria-selected={selectedPeriod === period}
            variant={selectedPeriod === period ? 'contained' : 'text'}
            onClick={() => setSelectedPeriod(period)}
            sx={{
              minWidth: 'auto',
              px: 2,
              py: 0.75,
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              color: selectedPeriod === period ? 'white' : 'text.primary',
              bgcolor: selectedPeriod === period ? 'text.primary' : 'transparent',
              '&:hover': {
                bgcolor: selectedPeriod === period ? 'text.primary' : 'grey.200',
              },
            }}
          >
            {period}
          </Button>
        ))}
      </Box>

      {/* Spending Limit Section */}
      <Card
        role="region"
        aria-label="Spending limit information"
        sx={{
          p: 2.5,
          borderRadius: 2,
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        }}
      >
        <CardContent sx={{ p: 0 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Progress Circle */}
            <Box 
              sx={{ position: 'relative', display: 'inline-flex' }}
              role="progressbar"
              aria-valuenow={30}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuetext="30% of spending limit used"
              aria-label="Spending progress"
            >
              <CircularProgress
                variant="determinate"
                value={30}
                size={60}
                thickness={6}
                sx={{
                  color: 'primary.main',
                  '& .MuiCircularProgress-circle': {
                    strokeLinecap: 'round',
                  },
                }}
              />
              <CircularProgress
                variant="determinate"
                value={100}
                size={60}
                thickness={6}
                sx={{
                  color: 'grey.200',
                  position: 'absolute',
                  left: 0,
                  zIndex: -1,
                }}
              />
            </Box>

            {/* Spending Info */}
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, mb: 0.5 }}
              >
                Spending Limit
              </Typography>
              <Typography variant="body1" color="text.secondary">
                <Typography
                  component="span"
                  sx={{ fontWeight: 600, color: 'text.primary' }}
                >
                  $1,500.00
                </Typography>
                {' / week'}
              </Typography>
            </Box>

            {/* Arrow Button */}
            <IconButton
              aria-label="View spending details"
              sx={{
                bgcolor: 'grey.100',
                '&:hover': {
                  bgcolor: 'grey.200',
                },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}