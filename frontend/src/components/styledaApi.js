import { styled } from '@mui/material/styles';
import { Container, Paper, Typography, Grid } from '@mui/material';

const RootContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(45deg,rgb(231, 94, 140) 30%,rgb(91, 18, 139) 90%)',
  borderRadius: 15,
  color: 'white',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
}));

const Header = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const UploadSection = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

const VideoPlayerContainer = styled(Grid)(({ theme }) => ({
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
}));

export { RootContainer, StyledPaper, Header, UploadSection, VideoPlayerContainer };