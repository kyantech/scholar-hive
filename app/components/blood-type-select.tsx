import { Control, Controller, UseFormRegister } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

interface BloodTypeSelectProps {
  register: UseFormRegister<any>;
  control: Control<any>;
  error?: { message?: string };
}

export function BloodTypeSelect({ control, error }: BloodTypeSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs">Blood Type</Label>
      <Controller
        name="bloodType"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select blood type" />
            </SelectTrigger>
            <SelectContent>
              {BLOOD_TYPES.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error?.message && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  );
}
