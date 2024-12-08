import React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import Container from '@mui/material/Container';

interface AppBarComponentProps {
  title: string;
  showDeleteIcon?: boolean;
  onDelete?: () => void;
}

const AppBarComponent: React.FC<AppBarComponentProps> = ({
  title,
  showDeleteIcon = false,
  onDelete,
}) => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ backgroundColor: '#FFB6C1' }}>
      <Container maxWidth="sm">
        <Toolbar disableGutters>
          <IconButton edge="start" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          {showDeleteIcon && (
            <IconButton edge="end" color="inherit" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppBarComponent;
