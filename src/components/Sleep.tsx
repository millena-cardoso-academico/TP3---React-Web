import React from 'react';
import GridComponent from './GridComponent';
import DateTimePickerComponent from './DateTimePickerComponent';
import TextFieldComponent from './TextFieldComponent';
import { useAppContext } from '../Context';

interface SleepFormProps {
  formData: any;
  onUpdate: (newData: any) => void;
}

const SleepForm: React.FC<SleepFormProps> = ({ formData = {}, onUpdate }) => {
  const { translate } = useAppContext();

  const handleChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  const startTime = formData.start_time ? new Date(formData.start_time) : null;
  const endTime = formData.end_time ? new Date(formData.end_time) : null;

  return (
    <GridComponent container spacing={2} sx={{ marginTop: '20px' }}>
      <GridComponent item xs={12}>
        <DateTimePickerComponent
          label={translate('start_sleep')}
          value={startTime}
          onChange={(date: Date | null) => handleChange('start_time', date)}
          fullWidth
        />
      </GridComponent>
      <GridComponent item xs={12}>
        <DateTimePickerComponent
          label={translate('end_sleep')}
          value={endTime}
          onChange={(date: Date | null) => handleChange('end_time', date)}
          fullWidth
        />
      </GridComponent>
      <GridComponent item xs={12}>
        <TextFieldComponent
          label={translate('notes')}
          value={formData.notes || ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('notes', e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
      </GridComponent>
    </GridComponent>
  );
};

export default SleepForm;
