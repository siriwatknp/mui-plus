import AiAssistantCard from '@/registry/new-york/components/ai-assistant-card/ai-assistant-card'
import { Box } from '@mui/material'

export default function AiAssistantCardPreview() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        p: 2,
      }}
    >
      <AiAssistantCard />
    </Box>
  )
}