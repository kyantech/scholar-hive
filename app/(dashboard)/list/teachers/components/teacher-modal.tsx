'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { BloodTypeSelect } from '@/components/blood-type-select';
import { DatePicker } from '@/components/date-picker';
import { FormModal } from '@/components/form-modal';
import InputField from '@/components/input-field';
import { SexSelect } from '@/components/sex-select';
import { Label } from '@/components/ui/label';

const schema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters long!' })
    .max(20, { message: 'Username must be at most 20 characters long!' }),
  email: z.string().email({ message: 'Invalid email address!' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long!' }),
  firstName: z.string().min(1, { message: 'First name is required!' }),
  lastName: z.string().min(1, { message: 'Last name is required!' }),
  phone: z.string().min(1, { message: 'Phone is required!' }),
  address: z.string().min(1, { message: 'Address is required!' }),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    message: 'Blood Type is required!',
  }),
  birthday: z.date({ message: 'Birthday is required!' }),
  sex: z.enum(['male', 'female', 'non-binary', 'transgender', 'other', 'prefer-not-to-say'], {
    message: 'Sex is required!',
  }),
  img: z.instanceof(FileList, { message: 'Image is required' }),
});

type Inputs = z.infer<typeof schema>;

export function TeacherModal() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const selectedFile = watch('img');

  useEffect(() => {
    if (selectedFile && selectedFile[0] instanceof File) {
      const fileUrl = URL.createObjectURL(selectedFile[0]);
      setPreviewUrl(fileUrl);
      return () => URL.revokeObjectURL(fileUrl);
    }
  }, [selectedFile]);

  const onSubmit = handleSubmit((data) => {
    console.log('Form submitted with data:', data);
    reset();
    setPreviewUrl(null);
    setIsOpen(false);
  });

  return (
    <FormModal
      title="Add a new teacher"
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description="Fill the form to add a new teacher"
      onAction={onSubmit}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <form className="flex flex-col gap-2">
        <span className="text-sm text-muted-foreground font-medium mb-1">Authentication Information</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField label="Username" name="username" register={register} error={errors?.username} />
          <InputField label="Email" name="email" register={register} error={errors?.email} />
          <InputField label="Password" name="password" type="password" register={register} error={errors?.password} />
        </div>

        <span className="text-sm text-muted-foreground font-medium mt-3 mb-1">Personal Information</span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-2">
            <Label className="text-xs">Profile Photo</Label>
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 rounded-full overflow-hidden bg-gray-100 border-2 border-gray-200">
                {previewUrl ? (
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <ImageUp className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
              <label
                className="px-4 py-2 bg-gray-200 dark:bg-gray-100 rounded-md text-sm text-gray-700 hover:bg-gray-200 cursor-pointer transition"
                htmlFor="img"
              >
                Choose Photo
              </label>
            </div>
            <input type="file" id="img" accept="image/*" {...register('img')} className="hidden" />
            {errors.img?.message && <p className="text-xs text-red-400">{errors.img.message.toString()}</p>}
          </div>
          <div className="md:flex md:items-center">
            <InputField label="First Name" name="firstName" register={register} error={errors.firstName} />
          </div>
          <div className="md:flex md:items-center">
            <InputField label="Last Name" name="lastName" register={register} error={errors.lastName} />
          </div>
          <InputField label="Phone" name="phone" register={register} error={errors.phone} />
          <InputField label="Address" name="address" register={register} error={errors.address} />
          <BloodTypeSelect register={register} control={control} error={errors.bloodType} />
          <DatePicker label="Birthday" control={control} error={errors.birthday} />
          <SexSelect register={register} control={control} error={errors.sex} />
        </div>
      </form>
    </FormModal>
  );
}
