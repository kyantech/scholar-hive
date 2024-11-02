import { FileDown, Filter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  showAddButton?: boolean;
  modalProps?: {
    title: string;
    description: string;
    buttonLabel?: string;
    size?: 'sm' | 'md' | 'lg' | '2xl' | '3xl' | '4xl';
    children: React.ReactNode;
    onAction?: () => Promise<boolean>;
    actionLabel?: string;
    cancelLabel?: string;
    trigger?: React.ReactElement;
  };
}

export function TableFilters({ searchTerm, onSearchChange, placeholder = 'Search...' }: TableFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Input
        className="w-full sm:w-64 font-normal"
        placeholder={placeholder}
        type="search"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon">
        <FileDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
