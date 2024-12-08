import React from 'react';
import TypographyComponent from './TypographyComponent';
import { useAppContext } from '../Context';

interface SonoDetailsProps {
  start_time: string | null;
  end_time: string | null;
  notes: string | null;
}

const SonoDetails: React.FC<SonoDetailsProps> = ({ start_time, end_time, notes }) => {
  const { translate } = useAppContext();

  const formattedStartTime = start_time
    ? new Date(start_time).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';

  const formattedEndTime = end_time
    ? new Date(end_time).toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
      })
    : 'N/A';

  return (
    <>
      <TypographyComponent variant="body2">
        <strong>{translate('sleep_start_time')}:</strong> {formattedStartTime}
      </TypographyComponent>
      <TypographyComponent variant="body2">
        <strong>{translate('sleep_end_time')}:</strong> {formattedEndTime}
      </TypographyComponent>
      {notes && (
        <TypographyComponent variant="body2">
          <strong>{translate('notes')}:</strong> {notes}
        </TypographyComponent>
      )}
    </>
  );
};

export default SonoDetails;
