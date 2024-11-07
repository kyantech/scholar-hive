'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DatePicker } from '@/components/date-picker';
import { FormModal } from '@/components/form-modal';
import SelectField from '@/components/select-field';
import { classesData, subjectsData, teachersData } from '@/lib/data';
import { examSchema } from '../schemas/schema';

import type { ExamFormInputs } from '../schemas/schema';

export function ExamModal() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ExamFormInputs>({
    resolver: zodResolver(examSchema),
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
      title="Add a new exam"
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description="Fill the form to add a new exam"
      onAction={handleFormSubmit}
      open={isOpen}
      onOpenChange={handleModalClose}
      size="lg"
    >
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Subject"
            name="subject"
            control={control}
            options={subjectsData.map((subject) => ({
              id: subject.id,
              label: subject.name,
            }))}
            error={errors.subject}
            placeholder="Select a subject"
          />
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
          <SelectField
            label="Teacher"
            name="teacher"
            control={control}
            options={teachersData.map((teacher) => ({
              id: teacher.id,
              label: teacher.name,
            }))}
            error={errors.teacher}
            placeholder="Select a teacher"
          />
        </div>
      </form>
    </FormModal>
  );
}
