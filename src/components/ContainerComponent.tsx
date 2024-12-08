import React from 'react';
import Container from '@mui/material/Container';

interface ContainerComponentProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  children: React.ReactNode;
  [key: string]: any;
}

const ContainerComponent: React.FC<ContainerComponentProps> = ({ maxWidth = 'sm', children, ...props }) => {
  return (
    <Container maxWidth={maxWidth} {...props}>
      {children}
    </Container>
  );
};

export default ContainerComponent;
