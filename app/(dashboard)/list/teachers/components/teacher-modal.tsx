'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { BloodTypeSelect } from '@/components/blood-type-select';
import { DatePicker } from '@/components/date-picker';
import { FormModal } from '@/components/form-modal';
import InputField from '@/components/input-field';
import MultipleSelector from '@/components/multi-select';
import { SexSelect } from '@/components/sex-select';
import { Label } from '@/components/ui/label';
import { classesData, subjectsData } from '@/lib/data';
import { teacherSchema } from '../schemas/schema';
import { Teacher } from './types';

import type { TeacherFormInputs } from '../schemas/schema';

interface TeacherModalProps {
  teacher?: Teacher | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TeacherModal({ teacher, open, onOpenChange }: TeacherModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<TeacherFormInputs>({
    resolver: zodResolver(teacherSchema),
  });

  const selectedFile = watch('img');

  const populateTeacherFields = useCallback(
    (teacherData: Teacher) => {
      const teacherFields: Partial<TeacherFormInputs> = {
        email: teacherData.email,
        password: teacherData.password,
        name: teacherData.name,
        phone: teacherData.phone,
        address: teacherData.address,
        bloodType: teacherData.bloodType,
        birthday: new Date(teacherData.birthday),
        sex: teacherData.sex,
        classes: teacherData.classes.map((c) => c.id),
        subjects: teacherData.subjects.map((s) => s.id),
      };

      Object.entries(teacherFields).forEach(([field, value]) => {
        setValue(field as keyof TeacherFormInputs, value);
      });

      setPreviewUrl(teacherData.photo);
    },
    [setValue, setPreviewUrl]
  );

  const handleFilePreview = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    return () => URL.revokeObjectURL(fileUrl);
  };

  useEffect(() => {
    if (!teacher) return;
    populateTeacherFields(teacher);
  }, [teacher, setValue, populateTeacherFields]);

  useEffect(() => {
    if (!selectedFile?.[0] || !(selectedFile[0] instanceof File)) return;
    return handleFilePreview(selectedFile[0]);
  }, [selectedFile]);

  const resetForm = () => {
    reset();
    setPreviewUrl(null);
  };

  const handleModalClose = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  const handleFormSubmit = handleSubmit((data) => {
    const formData = {
      ...data,
      classes: data?.classes?.map((id) => id),
      subjects: data.subjects.map((id) => id),
      ...(teacher && { id: teacher.id }),
    };

    console.log(`${teacher ? 'Updating' : 'Creating'} teacher with data:`, formData);
    handleModalClose(false);
  });

  const ProfilePhotoUpload = () => (
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

  const AuthenticationFields = () => (
    <>
      <span className="text-sm text-muted-foreground font-medium mb-1">Authentication Information</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Email" name="email" register={register} error={errors?.email} />
        <InputField label="Password" name="password" type="password" register={register} error={errors?.password} />
      </div>
    </>
  );

  const PersonalInformationFields = () => (
    <>
      <span className="text-sm text-muted-foreground font-medium mt-3 mb-1">Personal Information</span>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ProfilePhotoUpload />
        <div className="md:flex md:items-center">
          <InputField label="Full Name" name="name" register={register} error={errors.name} />
        </div>
        <div className="md:flex md:items-center">
          <InputField label="Phone" name="phone" register={register} error={errors.phone} />
        </div>
        <InputField label="Address" name="address" register={register} error={errors.address} />
        <BloodTypeSelect register={register} control={control} error={errors.bloodType} />
        <DatePicker label="Birthday" name="birthday" control={control} error={errors.birthday} disableFutureDates />
        <SexSelect register={register} control={control} error={errors.sex} />
      </div>
    </>
  );

  const renderMultiSelect = (
    name: 'classes' | 'subjects',
    label: string,
    options: { id: string; name: string }[],
    placeholder: string
  ) => (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium">{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value = [] } }) => (
          <MultipleSelector
            value={value.map((id) => ({
              value: id,
              label: options.find((item) => item.id === id)?.name || '',
            }))}
            onChange={(selectedOptions) => onChange(selectedOptions.map((opt) => opt.value))}
            options={options.map((item) => ({
              value: item.id,
              label: item.name,
            }))}
            placeholder={placeholder}
          />
        )}
      />
      {errors[name] && <p className="text-xs text-red-400">{errors[name]?.message}</p>}
    </div>
  );

  const ClassesInformationFields = () => (
    <>
      <span className="text-sm text-muted-foreground font-medium mt-3 mb-1">Teacher Classes and Subjects</span>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {renderMultiSelect('classes', 'Classes', classesData, 'Select classes, type to search...')}
        {renderMultiSelect('subjects', 'Subjects', subjectsData, 'Select subjects, type to search...')}
      </div>
    </>
  );

  return (
    <FormModal
      title={teacher ? 'Edit teacher' : 'Add a new teacher'}
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description={teacher ? 'Edit teacher information' : 'Fill the form to add a new teacher'}
      onAction={handleFormSubmit}
      open={open}
      onOpenChange={handleModalClose}
    >
      <form className="flex flex-col gap-2">
        <PersonalInformationFields />
        <ClassesInformationFields />
        <AuthenticationFields />
      </form>
    </FormModal>
  );
}
