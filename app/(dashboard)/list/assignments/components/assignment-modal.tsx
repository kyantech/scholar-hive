'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DatePicker } from '@/components/date-picker';
import { FormModal } from '@/components/form-modal';
import SelectField from '@/components/select-field';
import { classesData, subjectsData, teachersData } from '@/lib/data';
import { assignmentSchema } from '../schemas/schema';

import type { AssignmentFormInputs } from '../schemas/schema';

export function AssignmentModal() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<AssignmentFormInputs>({
    resolver: zodResolver(assignmentSchema),
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
      title="Add a new assignment"
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description="Fill the form to add a new assignment"
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
          <DatePicker label="Due Date" name="dueDate" control={control} error={errors.dueDate} />
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
