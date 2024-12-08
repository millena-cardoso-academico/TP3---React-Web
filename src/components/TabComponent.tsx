// src/components/TabComponent.tsx

import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface TabComponentProps {
  value: string;
  onChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabs: { label: string; value: string }[];
}

const TabComponent: React.FC<TabComponentProps> = ({ value, onChange, tabs }) => {
  return (
    <Tabs
      value={value}
      onChange={onChange}
      variant="fullWidth"
      indicatorColor="secondary"
      textColor="secondary"
    >
      {tabs.map((tab) => (
        <Tab key={tab.value} label={tab.label} value={tab.value} />
      ))}
    </Tabs>
  );
};

export default TabComponent;
