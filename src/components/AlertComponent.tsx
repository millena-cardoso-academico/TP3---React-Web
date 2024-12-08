import React from 'react';
import Alert, { AlertProps } from '@mui/material/Alert';

interface AlertComponentProps extends AlertProps {
  children: React.ReactNode;
}

const AlertComponent: React.FC<AlertComponentProps> = ({ severity = 'info', variant = 'standard', children, ...rest }) => {
  return (
    <Alert severity={severity} variant={variant} {...rest}>
      {children}
    </Alert>
  );
};

export default AlertComponent;
