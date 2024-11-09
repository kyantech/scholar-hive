'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { FormModal } from '@/components/form-modal';
import InputField from '@/components/input-field';
import MultipleSelector from '@/components/multi-select';
import { teachersData } from '@/lib/data';
import { subjectsSchema } from '../schemas/schema';

import type { SubjectFormInputs } from '../schemas/schema';

export function SubjectModal() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SubjectFormInputs>({
    resolver: zodResolver(subjectsSchema),
  });

  const teacherOptions = teachersData.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const resetForm = () => {
    reset();
    setValue('teachers', []);
  };

  const handleModalClose = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    setIsOpen(open);
  };

  const mapSelectedTeachers = (teacherIds: string[] | undefined) => {
    if (!teacherIds) return [];
    return teachersData.filter((teacher) => teacherIds.includes(teacher.id)).map(({ id, name }) => ({ id, name }));
  };

  const handleFormSubmit = handleSubmit((data) => {
    const selectedTeachers = mapSelectedTeachers(data.teachers);
    const submitData = {
      name: data.name,
      teachers: selectedTeachers,
    };

    console.log('Form submitted with data:', submitData);
    handleModalClose(false);
  });

  const renderTeacherSelector = () => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Teachers</label>
      <Controller
        name="teachers"
        control={control}
        render={({ field: { onChange, value = [] } }) => (
          <MultipleSelector
            value={value.map((id) => ({
              value: id,
              label: teachersData.find((t) => t.id === id)?.name || '',
            }))}
            onChange={(options) => onChange(options.map((opt) => opt.value))}
            options={teacherOptions}
            placeholder="Select teachers, type to search..."
          />
        )}
      />
      {errors.teachers && <p className="text-xs text-red-400">{errors.teachers.message}</p>}
    </div>
  );

  return (
    <FormModal
      title="Add a new subject"
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description="Fill the form to add a new subject"
      onAction={handleFormSubmit}
      open={isOpen}
      onOpenChange={handleModalClose}
      size="lg"
    >
      <form className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <InputField label="Subject Name" name="name" register={register} error={errors.name} />
          {renderTeacherSelector()}
        </div>
      </form>
    </FormModal>
  );
}
