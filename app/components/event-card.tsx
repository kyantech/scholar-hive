import { CalendarIcon } from 'lucide-react';
import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface EventAlertProps {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

const EventAlert: React.FC<EventAlertProps> = ({ title, description, startTime, endTime }) => {
  return (
    <Alert className="mb-4">
      <CalendarIcon className="h-4 w-4" />
      <AlertTitle className="text-sm font-semibold">{title}</AlertTitle>
      <AlertDescription>
        <p className="text-xs">{description}</p>
        <p className="text-xs text-gray-500 mt-1">
          {startTime} - {endTime}
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default EventAlert;
