import React from 'react';
import logo from '../assets/logo.png';

interface LogoComponentProps {
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

const LogoComponent: React.FC<LogoComponentProps> = ({ width = 100, height, style }) => {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{ width, height, marginBottom: '16px', ...style }}
    />
  );
};

export default LogoComponent;
