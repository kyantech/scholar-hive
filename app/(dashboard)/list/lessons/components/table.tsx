'use client';

import Link from 'next/link';
import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { lessonsData } from '@/lib/data';
import { LessonModal } from './lesson-modal';
import { Lesson } from './types';

const handleEdit = (lessonId: string) => {
  console.log('Editing lesson with ID:', lessonId);
};

const handleDelete = (lessonId: string) => {
  console.log('Deleting lesson with ID:', lessonId);
};

const COLUMNS = [
  { key: 'subject', label: 'Subject' },
  { key: 'class', label: 'Class' },
  {
    key: 'teacher',
    label: 'Teacher',
    render: (lesson: Lesson) => (
      <Link href={`/list/teachers/${lesson.teacher.id}`} className="hover:underline">
        {lesson.teacher.name}
      </Link>
    ),
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (lesson: Lesson) => (
      <TableActionButtons onEdit={() => handleEdit(lesson.id)} onDelete={() => handleDelete(lesson.id)} />
    ),
  },
];

export default function LessonsTable() {
  return (
    <DataTable<Lesson>
      data={lessonsData}
      columns={COLUMNS}
      title="All Lessons"
      searchFields={['subject', 'class']}
      formModal={<LessonModal />}
      placeholder="Search lessons or classes..."
    />
  );
}
