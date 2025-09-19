'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import AddIcon from '@mui/icons-material/Add'

export default function AiAssistantCard() {
  return (
    <Card
      sx={theme => ({
        maxWidth: 400,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        p: 3,
        position: 'relative',
        ...theme.applyStyles('dark', {
          bgcolor: 'grey.900',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }),
      })}
    >
      {/* Header with Avatar and Actions */}
      <Stack 
        direction="row" 
        justifyContent="space-between" 
        alignItems="flex-start"
        sx={{ mb: 2 }}
      >
        {/* AI Assistant Avatar */}
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #9c27b0, #e1bee7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              width: '60%',
              height: '60%',
              background: 'linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
              borderRadius: '50%',
              transform: 'rotate(-20deg)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: '20%',
                right: '20%',
                width: '30%',
                height: '30%',
                background: 'rgba(255,255,255,0.6)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }
            }}
          />
        </Box>
        
        {/* Action Buttons */}
        <Stack direction="row" spacing={0.5}>
          <IconButton 
            size="small"
            aria-label="More options for AI assistant"
            sx={{ color: 'text.secondary' }}
          >
            <MoreHorizIcon />
          </IconButton>
          <IconButton 
            size="small"
            aria-label="Add new AI assistant"
            sx={{ color: 'text.secondary' }}
          >
            <AddIcon />
          </IconButton>
        </Stack>
      </Stack>

      {/* Content */}
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Typography
          variant="caption"
          sx={{
            color: 'text.secondary',
            letterSpacing: 1,
            fontWeight: 500,
            mb: 1.5,
            display: 'block',
          }}
        >
          AI ASSISTANT
        </Typography>
        
        <Typography
          variant="h5"
          component="h2"
          sx={{
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 3,
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          Since yesterday,{' '}
          <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}>
            your wallet has grown by{' '}
          </Box>
          <Box
            component="span"
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary',
              fontSize: '1.75rem',
              display: 'block',
              mt: 0.5,
            }}
          >
            $5,859.36
          </Box>
        </Typography>
      </CardContent>

      {/* Bottom Actions */}
      <CardActions sx={{ p: 0, justifyContent: 'space-between', alignItems: 'center' }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: 6,
            textTransform: 'none',
            px: 2.5,
            py: 1,
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover',
            },
          }}
        >
          Get details
        </Button>
        
        {/* Pagination Dots */}
        <Stack direction="row" spacing={1} role="tablist" aria-label="Card navigation">
          <IconButton
            size="small"
            aria-label="View first card"
            role="tab"
            aria-selected="true"
            sx={{
              width: 16,
              height: 16,
              minWidth: 16,
              p: 0,
              bgcolor: 'text.primary',
              borderRadius: '50%',
              '&:hover': { bgcolor: 'text.primary', transform: 'scale(1.1)' },
            }}
          />
          <IconButton
            size="small"
            aria-label="View second card"
            role="tab"
            aria-selected="false"
            sx={{
              width: 16,
              height: 16,
              minWidth: 16,
              p: 0,
              bgcolor: 'text.disabled',
              borderRadius: '50%',
              '&:hover': { bgcolor: 'text.secondary', transform: 'scale(1.1)' },
            }}
          />
          <IconButton
            size="small"
            aria-label="View third card"
            role="tab"
            aria-selected="false"
            sx={{
              width: 16,
              height: 16,
              minWidth: 16,
              p: 0,
              bgcolor: 'text.disabled',
              borderRadius: '50%',
              '&:hover': { bgcolor: 'text.secondary', transform: 'scale(1.1)' },
            }}
          />
        </Stack>
      </CardActions>
    </Card>
  )
}