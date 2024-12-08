// src/components/CardComponent.tsx
import React from 'react';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

interface CardComponentProps extends CardProps {
  children: React.ReactNode;
}

const CardComponent: React.FC<CardComponentProps> = ({ children, ...props }) => {
  return (
    <Card {...props}>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};

export default CardComponent;
