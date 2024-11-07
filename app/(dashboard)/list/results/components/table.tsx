'use client';

import Link from 'next/link';
import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { resultsData } from '@/lib/data';
import { ResultModal } from './result-modal';
import { Result } from './types';

const handleEdit = (resultId: string) => {
  console.log('Editing result with ID:', resultId);
};

const handleDelete = (resultId: string) => {
  console.log('Deleting result with ID:', resultId);
};

const COLUMNS = [
  { key: 'subject', label: 'Subject' },
  { key: 'class', label: 'Class' },
  {
    key: 'teacher',
    label: 'Teacher',
    render: (result: Result) => (
      <Link href={`/list/teachers/${result.teacher.id}`} className="hover:underline">
        {result.teacher.name}
      </Link>
    ),
  },
  {
    key: 'student',
    label: 'Student',
    render: (result: Result) => (
      <Link href={`/list/students/${result.student.id}`} className="hover:underline">
        {result.student.name}
      </Link>
    ),
  },
  { key: 'date', label: 'Date' },
  { key: 'score', label: 'Score' },
  {
    key: 'actions',
    label: 'Actions',
    render: (result: Result) => (
      <TableActionButtons onEdit={() => handleEdit(result.id)} onDelete={() => handleDelete(result.id)} />
    ),
  },
];

export default function ResultsTable() {
  return (
    <DataTable<Result>
      data={resultsData}
      columns={COLUMNS}
      title="All Results"
      searchFields={['subject', 'class']}
      formModal={<ResultModal />}
      placeholder="Search results..."
    />
  );
}
