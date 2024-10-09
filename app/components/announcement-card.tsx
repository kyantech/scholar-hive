import { BellIcon } from 'lucide-react';
import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface AnnouncementAlertProps {
  title: string;
  description: string;
  date: string;
}

const AnnouncementAlert: React.FC<AnnouncementAlertProps> = ({ title, description, date }) => {
  return (
    <Alert className="mb-4 bg-primary/10 dark:bg-inherit">
      <BellIcon className="h-4 w-4" />
      <div className="w-full">
        <div className="flex justify-between items-center">
          <AlertTitle className="text-sm font-medium">{title}</AlertTitle>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <AlertDescription className="text-xs text-gray-600 mt-1">{description}</AlertDescription>
      </div>
    </Alert>
  );
};

export default AnnouncementAlert;
