import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Student } from './types';

export function StudentAvatar({ student }: { student: Student }) {
  return (
    <div className="flex items-center space-x-3">
      <Avatar>
        <AvatarImage src={student.photo} alt={student.name} />
        <AvatarFallback>
          {student.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{student.name}</div>
        <div className="text-sm text-gray-500">{student.email}</div>
      </div>
    </div>
  );
}
