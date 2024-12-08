import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { Locale } from 'date-fns';

interface DateTimePickerComponentProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  fullWidth?: boolean;
  locale?: Locale;
}

const DateTimePickerComponent: React.FC<DateTimePickerComponentProps> = ({
  label,
  value,
  onChange,
  fullWidth = false,
  locale,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
      <DateTimePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => (
          <TextField {...params} fullWidth={fullWidth} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DateTimePickerComponent;
