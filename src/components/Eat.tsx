import React from 'react';
import GridComponent from './GridComponent';
import DateTimePickerComponent from './DateTimePickerComponent';
import TextFieldComponent from './TextFieldComponent';
import SingleSelectButtonGroup from './SingleSelectButtonGroup';
import { useAppContext } from '../Context';

interface EatFormProps {
  formData: any;
  onUpdate: (newData: any) => void;
}

const EatForm: React.FC<EatFormProps> = ({ formData, onUpdate }) => {
  const { translate } = useAppContext();

  const handleChange = (field: string, value: any) => {
    onUpdate({ [field]: value });
  };

  // Opções de alimentação
  const feedingOptions = [
    { value: 'mamadeira', label: translate('breastfeeding_bottle') },
    { value: 'peito', label: translate('breastfeeding_breast') },
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

      {/* Tipo de Alimentação */}
      <GridComponent item xs={12}>
        <SingleSelectButtonGroup
          options={feedingOptions}
          selectedValue={formData.type || ''}
          onChange={(value) => handleChange('type', value)}
        />
      </GridComponent>

      {/* Duração */}
      <GridComponent item xs={12}>
        <TextFieldComponent
          label={translate('duration_minutes')}
          value={formData.duration || ''}
          onChange={(e: any) => handleChange('duration', e.target.value)}
          fullWidth
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

export default EatForm;
