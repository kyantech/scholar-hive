'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { ImageUp } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/components/form-modal';
import InputField from '@/components/input-field';
import MultipleSelector from '@/components/multi-select';
import { Label } from '@/components/ui/label';
import { studentsData } from '@/lib/data';
import { parentSchema } from '../schemas/schema';
import { Parent } from './types';

import type { ParentFormInputs } from '../schemas/schema';

interface ParentModalProps {
  parent?: Parent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ParentModal({ parent, open, onOpenChange }: ParentModalProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

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

  const populateParentFields = useCallback(
    (parentData: Parent) => {
      const parentFields: Partial<ParentFormInputs> = {
        email: parentData.email,
        password: parentData.password,
        name: parentData.name,
        phone: parentData.phone,
        address: parentData.address,
        students: parentData.students.map((student) => ({
          value: student.id,
          label: student.name,
        })),
      };

      Object.entries(parentFields).forEach(([field, value]) => {
        setValue(field as keyof ParentFormInputs, value);
      });

      setPreviewUrl(parentData.photo);
    },
    [setValue]
  );

  const handleFilePreview = (file: File) => {
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    return () => URL.revokeObjectURL(fileUrl);
  };

  useEffect(() => {
    if (!parent) return;
    populateParentFields(parent);
  }, [parent, populateParentFields]);

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
      id: parent?.id,
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      address: data.address,
      students: data.students.map((student) => ({
        id: student.value,
        name: student.label,
      })),
      photo: previewUrl || '',
    };

    console.log(`${parent ? 'Updating' : 'Creating'} parent with data:`, formData);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <InputField label="Name" name="name" register={register} error={errors.name} />
        </div>
        <div className="md:flex md:items-center">
          <InputField label="Phone" name="phone" register={register} error={errors.phone} />
        </div>
        <div className="md:col-span-3">
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
      title={parent ? 'Edit parent' : 'Add a new parent'}
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description={parent ? 'Edit parent information' : 'Fill the form to add a new parent'}
      onAction={handleFormSubmit}
      open={open}
      onOpenChange={handleModalClose}
    >
      <form className="flex flex-col gap-2">
        {renderPersonalInformationFields()}
        {renderStudentsInformationFields()}
        {renderAuthenticationFields()}
      </form>
    </FormModal>
  );
}
