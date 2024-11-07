'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { DatePicker } from '@/components/date-picker';
import { FormModal } from '@/components/form-modal';
import InputField from '@/components/input-field';
import SelectField from '@/components/select-field';
import { classesData, studentsData, subjectsData, teachersData } from '@/lib/data';
import { resultSchema } from '../schemas/schema';

import type { ResultFormInputs } from '../schemas/schema';

export function ResultModal() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ResultFormInputs>({
    resolver: zodResolver(resultSchema),
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
      title="Add a new result"
      actionLabel="Confirm"
      cancelLabel="Cancel"
      description="Fill the form to add a new result"
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
          <SelectField
            label="Student"
            name="student"
            control={control}
            options={studentsData.map((student) => ({
              id: student.id,
              label: student.name,
            }))}
            error={errors.student}
            placeholder="Select a student"
          />
          <DatePicker label="Date" name="date" control={control} error={errors.date} />
          <InputField
            label="Score"
            name="score"
            type="number"
            register={register}
            error={errors.score}
            min={0}
            max={100}
          />
        </div>
      </form>
    </FormModal>
  );
}
