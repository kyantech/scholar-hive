import { Control, Controller, FieldError } from 'react-hook-form';

import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

type Option = {
  id: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  name: string;
  control: Control<any>;
  options: Option[];
  error?: FieldError;
  placeholder?: string;
};

const SelectField = ({ label, name, control, options, error, placeholder = 'Select an option' }: SelectFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      <Label className="text-xs mb-2">{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error?.message && <p className="text-xs text-red-400 mt-2">{error.message}</p>}
    </div>
  );
};

export default SelectField;
