import React from 'react';
import TypographyComponent from './TypographyComponent';
import { useAppContext } from '../Context';

interface FraldaDetailsProps {
  date_time: string | null;
  diaper_type: string | null;
  notes: string | null;
}

const FraldaDetails: React.FC<FraldaDetailsProps> = ({ date_time, diaper_type, notes }) => {
  const { translate } = useAppContext();

  const formattedDateTime = date_time
    ? new Date(date_time).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';

  return (
    <>
      <TypographyComponent variant="body2">
        <strong>{translate('diaper_change_date_time')}:</strong> {formattedDateTime}
      </TypographyComponent>
      <TypographyComponent variant="body2">
        <strong>{translate('diaper_type')}:</strong> {diaper_type || 'N/A'}
      </TypographyComponent>
      {notes && (
        <TypographyComponent variant="body2">
          <strong>{translate('notes')}:</strong> {notes}
        </TypographyComponent>
      )}
    </>
  );
};

export default FraldaDetails;
