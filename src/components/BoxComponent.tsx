import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface BoxComponentProps extends BoxProps {
  children?: React.ReactNode;
}

const BoxComponent: React.FC<BoxComponentProps> = ({ children, ...props }) => {
  return (
    <Box {...props}>
      {children}
    </Box>
  );
};

export default BoxComponent;
  