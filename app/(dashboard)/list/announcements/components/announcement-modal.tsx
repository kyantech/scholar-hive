'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DatePicker } from '@/components/date-picker';
import { FormModal } from '@/components/form-modal';
import InputField from '@/components/input-field';
import SelectField from '@/components/select-field';
import { classesData } from '@/lib/data';
import { announcementSchema } from '../schemas/schema';

import type { AnnouncementFormInputs } from '../schemas/schema';

export function AnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AnnouncementFormInputs>({
    resolver: zodResolver(announcementSchema),
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
      title="Add a new announcement"
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description="Fill the form to add a new announcement"
      onAction={handleFormSubmit}
      open={isOpen}
      onOpenChange={handleModalClose}
      size="lg"
    >
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4">
          <InputField label="Title" name="title" register={register} error={errors.title} />
          <InputField label="Description" name="description" register={register} error={errors.description} />
          <SelectField
            label="Class"
            name="class"
            control={control}
            options={classesData.map((classItem) => ({
              id: classItem.id,
              label: classItem.name,
            }))}
            error={errors.class}
            placeholder="Select a class"
          />
          <DatePicker label="Date" name="date" control={control} error={errors.date} />
        </div>
      </form>
    </FormModal>
  );
}
