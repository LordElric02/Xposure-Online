import { styled } from '@mui/material/styles';
import { Container, Paper, Typography, Grid } from '@mui/material';

const RootContainer = styled(Container)(({ theme }) => ({
  backgroundColor: 'rgba(12, 1, 1, 0.9)', // Darker background
  borderRadius: 15,
  color: 'white',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  backgroundColor: 'rgba(255, 255, 255, 0.05)', // Darker background
  backdropFilter: 'blur(10px)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
}));

const Header = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 'bold',
  fontSize: '2rem',
  textAlign: 'center',
  color: 'white',
}));

const UploadSection = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: 10,
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly lighter gray
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
  marginTop: theme.spacing(2),
}));

const VideoPlayerContainer = styled(Grid)(({ theme }) => ({
  borderRadius: 10,
  overflow: 'hidden',
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Darker background
  padding: theme.spacing(1),
  border: '2px solid rgba(255, 255, 255, 0.3)',
}));

export { RootContainer, StyledPaper, Header, UploadSection, VideoPlayerContainer };