import React from 'react';
import { Box, Button } from '@mui/material';

interface Option {
  value: string;
  label: string;
}

interface SingleSelectButtonGroupProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SingleSelectButtonGroup: React.FC<SingleSelectButtonGroupProps> = ({
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => onChange(option.value)}
          variant={selectedValue === option.value ? 'contained' : 'outlined'}
          sx={{
            flex: '1 1 calc(50% - 8px)', // Subtraímos o gap para manter o alinhamento
            backgroundColor: selectedValue === option.value ? '#FFB6C1' : 'white',
            color: selectedValue === option.value ? 'white' : 'black',
            borderColor: '#FFB6C1',
            '&:hover': {
              backgroundColor: selectedValue === option.value ? '#FF69B4' : '#f0f0f0',
              borderColor: '#FF69B4',
            },
            textTransform: 'none',
          }}
        >
          {option.label}
        </Button>
      ))}
    </Box>
  );
};

export default SingleSelectButtonGroup;
