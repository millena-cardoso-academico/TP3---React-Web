import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const FabComponent: React.FC = () => {
  return (
    <Fab color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  );
};

export default FabComponent;
