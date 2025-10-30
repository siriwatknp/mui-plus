import { Box } from "@mui/material";
import InviteCard from "@/registry/new-york/components/invite-card/invite-card";

export default function InviteCardPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
        bgcolor: "grey.50",
      }}
    >
      <InviteCard />
    </Box>
  );
}