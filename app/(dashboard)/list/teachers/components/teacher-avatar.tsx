import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Teacher } from './types';

export function TeacherAvatar({ teacher }: { teacher: Teacher }) {
  return (
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={teacher.photo} alt={teacher.name} />
        <AvatarFallback>
          {teacher.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{teacher.name}</div>
        <div className="text-sm text-gray-500">{teacher.email}</div>
      </div>
    </div>
  );
}
