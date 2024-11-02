import { Control, Controller, UseFormRegister } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
              <SelectItem value="A+">A+</SelectItem>
              <SelectItem value="A-">A-</SelectItem>
              <SelectItem value="B+">B+</SelectItem>
              <SelectItem value="B-">B-</SelectItem>
              <SelectItem value="AB+">AB+</SelectItem>
              <SelectItem value="AB-">AB-</SelectItem>
              <SelectItem value="O+">O+</SelectItem>
              <SelectItem value="O-">O-</SelectItem>
            </SelectContent>
          </Select>
        )}
      />
      {error?.message && <p className="text-xs text-red-400">{error.message.toString()}</p>}
    </div>
  );
}
