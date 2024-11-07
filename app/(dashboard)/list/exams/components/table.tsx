'use client';

import Link from 'next/link';
import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { examsData } from '@/lib/data';
import { ExamModal } from './exam-modal';
import { Exam } from './types';

const handleEdit = (examId: string) => {
  console.log('Editing exam with ID:', examId);
};

const handleDelete = (examId: string) => {
  console.log('Deleting exam with ID:', examId);
};

const COLUMNS = [
  { key: 'subject', label: 'Subject' },
  { key: 'class', label: 'Class' },
  {
    key: 'teacher',
    label: 'Teacher',
    render: (exam: Exam) => (
      <Link href={`/list/teachers/${exam.teacher.id}`} className="hover:underline">
        {exam.teacher.name}
      </Link>
    ),
  },
  { key: 'date', label: 'Date' },
  {
    key: 'actions',
    label: 'Actions',
    render: (exam: Exam) => (
      <TableActionButtons onEdit={() => handleEdit(exam.id)} onDelete={() => handleDelete(exam.id)} />
    ),
  },
];

export default function ExamsTable() {
  return (
    <DataTable<Exam>
      data={examsData}
      columns={COLUMNS}
      title="All Exams"
      searchFields={['subject', 'class']}
      formModal={<ExamModal />}
      placeholder="Search exams..."
    />
  );
}
