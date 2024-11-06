'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { FormModal } from '@/components/form-modal';
import InputField from '@/components/input-field';
import SelectField from '@/components/select-field';
import { teachersData } from '@/lib/data';
import { classSchema } from '../schemas/schema';

import type { ClassFormInputs } from '../schemas/schema';

export function ClassModal() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ClassFormInputs>({
    resolver: zodResolver(classSchema),
  });

  const handleModalClose = (open: boolean) => {
    if (!open) {
      reset();
    }
    setIsOpen(open);
  };

  const handleFormSubmit = handleSubmit((data) => {
    console.log('Form submitted with data:', data);
    handleModalClose(false);
  });

  return (
    <FormModal
      title="Add a new class"
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description="Fill the form to add a new class"
      onAction={handleFormSubmit}
      open={isOpen}
      onOpenChange={handleModalClose}
      size="lg"
    >
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Class Name" name="name" register={register} error={errors.name} />
          <InputField label="Grade" name="grade" register={register} error={errors.grade} />
          <InputField label="Capacity" name="capacity" type="number" register={register} error={errors.capacity} />
          <SelectField
            label="Supervisor Teacher"
            name="supervisor"
            control={control}
            options={teachersData.map((teacher) => ({
              id: teacher.id,
              label: teacher.name,
            }))}
            error={errors.supervisor}
            placeholder="Select a supervisor"
          />
        </div>
      </form>
    </FormModal>
  );
}
