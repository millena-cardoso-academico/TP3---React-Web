import React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { Locale } from 'date-fns';

interface DatePickerComponentProps {
  label: string;
  value: Date | null;
  onChange: (date: Date | null) => void;
  fullWidth?: boolean;
  locale?: Locale;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  label,
  value,
  onChange,
  fullWidth = false,
  locale,
}) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
      <DatePicker
        label={label}
        value={value}
        onChange={onChange}
        renderInput={(params) => <TextField {...params} fullWidth={fullWidth} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerComponent;