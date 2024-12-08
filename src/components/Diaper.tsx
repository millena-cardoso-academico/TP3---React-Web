import React from 'react';
import GridComponent from './GridComponent';
import DateTimePickerComponent from './DateTimePickerComponent';
import TextFieldComponent from './TextFieldComponent';
import SingleSelectButtonGroup from './SingleSelectButtonGroup';
import { useAppContext } from '../Context';

interface DiaperFormProps {
  formData: any;
  onUpdate: (newData: any) => void;
}

const DiaperForm: React.FC<DiaperFormProps> = ({ formData, onUpdate }) => {
  const { translate } = useAppContext();

  const handleChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  // Opções de fralda
  const diaperOptions = [
    { value: 'molhada', label: translate('molhada') },
    { value: 'suja', label: translate('suja') },
    { value: 'limpa', label: translate('limpa') },
    { value: 'os dois', label: translate('os_dois') },
  ];

  const dateTime = formData.date_time ? new Date(formData.date_time) : null;

  return (
    <GridComponent container spacing={2} sx={{ marginTop: '20px' }}>
      {/* Data e Hora */}
      <GridComponent item xs={12}>
        <DateTimePickerComponent
          label={translate('date_time')}
          value={dateTime}
          onChange={(date: Date | null) => handleChange('date_time', date)}
          fullWidth
        />
      </GridComponent>

      {/* Tipo de Fralda */}
      <GridComponent item xs={12}>
        <SingleSelectButtonGroup
          options={diaperOptions}
          selectedValue={formData.diaper_type || ''}
          onChange={(value) => handleChange('diaper_type', value)}
        />
      </GridComponent>

      {/* Observações */}
      <GridComponent item xs={12}>
        <TextFieldComponent
          label={translate('notes')}
          value={formData.notes || ''}
          onChange={(e: any) => handleChange('notes', e.target.value)}
          fullWidth
          multiline
          rows={4}
        />
      </GridComponent>
    </GridComponent>
  );
};

export default DiaperForm;
