// src/components/GridComponent.tsx
import React from 'react';
import Grid, { GridProps } from '@mui/material/Grid';

interface GridComponentProps extends GridProps {
  children: React.ReactNode;
}

const GridComponent: React.FC<GridComponentProps> = ({ children, ...props }) => {
  return (
    <Grid {...props}>
      {children}
    </Grid>
  );
};

export default GridComponent;
