import { MoreHorizontal } from 'lucide-react';
import React from 'react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export interface UserCardProps {
  type: string;
}

const UserCard: React.FC<UserCardProps> = ({ type }) => {
  return (
    <Card className="flex-1 p-4 dark:border-input">
      <div className="flex justify-between items-center">
        <Badge className="text-xs" variant="outline">
          2024/25
        </Badge>
        <MoreHorizontal className="cursor-pointer" />
      </div>
      <h1 className="text-2xl font-semibold my-4">1.243</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </Card>
  );
};

export default UserCard;
