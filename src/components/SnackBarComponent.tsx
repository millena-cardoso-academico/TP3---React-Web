import React from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';

interface SnackBarComponentProps extends SnackbarProps {
  message: string;
}

const SnackBarComponent: React.FC<SnackBarComponentProps> = ({ message, ...props }) => {
  return (
    <Snackbar
      message={message}
      {...props}
    />
  );
};

export default SnackBarComponent;
