import { FieldError } from 'react-hook-form';

import { Input } from './ui/input';
import { Label } from './ui/label';

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({ label, type = 'text', register, name, defaultValue, error, inputProps }: InputFieldProps) => {
  return (
    <div className="flex flex-col w-full">
      <Label className="text-xs mb-2">{label}</Label>
      <Input type={type} {...register(name)} {...inputProps} defaultValue={defaultValue} />
      {error?.message && <p className="text-xs text-red-400">{error.message.toString()}</p>}
    </div>
  );
};

export default InputField;
