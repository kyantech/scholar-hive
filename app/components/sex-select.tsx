import { Control, Controller, UseFormRegister } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SexSelectProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  error?: { message?: string };
}

export function SexSelect({ control, error }: SexSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs">Sex</Label>
      <Controller
        name="sex"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select sex" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="non-binary">Non-binary</SelectItem>
              <SelectItem value="transgender">Transgender</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {error?.message && <p className="text-xs text-red-400">{error.message.toString()}</p>}
    </div>
  );
}
