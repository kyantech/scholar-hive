'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/components/form-modal';
import InputField from '@/components/input-field';
import MultipleSelector from '@/components/multi-select';
import { Label } from '@/components/ui/label';
import { studentsData } from '@/lib/data';
import { parentSchema } from '../schemas/schema';

import type { ParentFormInputs } from '../schemas/schema';

export function ParentModal() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<ParentFormInputs>({
    resolver: zodResolver(parentSchema),
  });

  const selectedFile = watch('img');

  const handleModalClose = (open: boolean) => {
    if (!open) {
      reset();
      setPreviewUrl(null);
      setValue('students', []);
    }
    setIsOpen(open);
  };

  useEffect(() => {
    if (!selectedFile?.[0] || !(selectedFile[0] instanceof File)) return;

    const fileUrl = URL.createObjectURL(selectedFile[0]);
    setPreviewUrl(fileUrl);
    return () => URL.revokeObjectURL(fileUrl);
  }, [selectedFile]);

  const handleFormSubmit = handleSubmit((data) => {
    console.log('Form submitted with data:', data);
    handleModalClose(false);
  });

  const renderProfilePhotoUpload = () => (
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
  );

  const renderAuthenticationFields = () => (
    <>
      <span className="text-sm text-muted-foreground font-medium mb-1">Authentication Information</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField label="Username" name="username" register={register} error={errors?.username} />
        <InputField label="Email" name="email" register={register} error={errors?.email} />
        <InputField label="Password" name="password" type="password" register={register} error={errors?.password} />
      </div>
    </>
  );

  const studentOptions = studentsData.map((student) => ({
    value: student.id,
    label: student.name,
  }));

  const renderPersonalInformationFields = () => (
    <>
      <span className="text-sm text-muted-foreground font-medium mt-3 mb-1">Personal Information</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {renderProfilePhotoUpload()}
        <div className="md:flex md:items-center">
          <InputField label="First Name" name="firstName" register={register} error={errors.firstName} />
        </div>
        <div className="md:flex md:items-center">
          <InputField label="Last Name" name="lastName" register={register} error={errors.lastName} />
        </div>
        <InputField label="Phone" name="phone" register={register} error={errors.phone} />
        <div className="md:col-span-2">
          <InputField label="Address" name="address" register={register} error={errors.address} />
        </div>
      </div>
    </>
  );

  const renderStudentsInformationFields = () => (
    <>
      <span className="text-sm text-muted-foreground font-medium mt-3 mb-1">Students Information</span>
      <div className="w-full">
        <div className="flex flex-col gap-2">
          <Label className="text-xs">Students</Label>
          <Controller
            name="students"
            control={control}
            render={({ field: { onChange, value } }) => (
              <MultipleSelector
                value={value}
                onChange={onChange}
                options={studentOptions}
                placeholder="Select students, type to search..."
              />
            )}
          />
          {errors.students && <p className="text-xs text-red-400">{errors.students.message}</p>}
        </div>
      </div>
    </>
  );

  return (
    <FormModal
      title="Add a new parent"
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description="Fill the form to add a new parent"
      onAction={handleFormSubmit}
      open={isOpen}
      onOpenChange={handleModalClose}
    >
      <form className="flex flex-col gap-2">
        {renderAuthenticationFields()}
        {renderPersonalInformationFields()}
        {renderStudentsInformationFields()}
      </form>
    </FormModal>
  );
}
