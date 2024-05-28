import { LinearProgress, linearProgressClasses, styled } from "@mui/material";

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorSecondary}`]: {
    backgroundColor: "#dcdcdc",
  },
  [`& .${linearProgressClasses.barColorPrimary}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.success,
    color: "#00D75E"
  },
}));