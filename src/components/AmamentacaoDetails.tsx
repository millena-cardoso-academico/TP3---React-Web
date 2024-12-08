import React from 'react';
import TypographyComponent from './TypographyComponent';
import { useAppContext } from '../Context';

interface AmamentacaoDetailsProps {
  date_time: string | null;
  type: string | null;
  duration: number | null;
  notes: string | null;
}

const AmamentacaoDetails: React.FC<AmamentacaoDetailsProps> = ({ date_time, type, duration, notes }) => {
  const { translate } = useAppContext();

  const formattedDateTime = date_time
    ? new Date(date_time).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : translate('no_records_found');

  const tipoAmamentacao =
    type === 'mamadeira'
      ? translate('breastfeeding_bottle')
      : type === 'peito'
      ? translate('breastfeeding_breast')
      : translate('no_records_found');

  return (
    <>
      <TypographyComponent variant="body2">
        <strong>{translate('breastfeeding_date_time')}:</strong> {formattedDateTime}
      </TypographyComponent>
      <TypographyComponent variant="body2">
        <strong>{translate('breastfeeding_type')}:</strong> {tipoAmamentacao}
      </TypographyComponent>
      {duration !== null && (
        <TypographyComponent variant="body2">
          <strong>{translate('breastfeeding_duration')}:</strong> {duration} {translate('duration_minutes')}
        </TypographyComponent>
      )}
      {notes && (
        <TypographyComponent variant="body2">
          <strong>{translate('notes')}:</strong> {notes}
        </TypographyComponent>
      )}
    </>
  );
};

export default AmamentacaoDetails;
