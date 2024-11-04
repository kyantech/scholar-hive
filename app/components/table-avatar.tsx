'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TableAvatarProps {
  name: string;
  image?: string;
  email?: string;
}

export function TableAvatar({ name, image, email }: TableAvatarProps) {
  const getInitials = (fullName: string): string => {
    return fullName
      .split(' ')
      .map((word) => word[0])
      .join('');
  };

  const renderUserInfo = () => (
    <div>
      <div className="font-medium">{name}</div>
      {email && <div className="text-sm text-gray-500">{email}</div>}
    </div>
  );

  return (
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={image} alt={name} />
        <AvatarFallback>{getInitials(name)}</AvatarFallback>
      </Avatar>
      {renderUserInfo()}
    </div>
  );
}
