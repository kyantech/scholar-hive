'use client';

import Link from 'next/link';
import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { assignmentsData } from '@/lib/data';
import { AssignmentModal } from './assignment-modal';
import { Assignment } from './types';

const handleEdit = (assignmentId: string) => {
  console.log('Editing assignment with ID:', assignmentId);
};

const handleDelete = (assignmentId: string) => {
  console.log('Deleting assignment with ID:', assignmentId);
};

const COLUMNS = [
  { key: 'subject', label: 'Subject' },
  { key: 'class', label: 'Class' },
  {
    key: 'teacher',
    label: 'Teacher',
    render: (assignment: Assignment) => (
      <Link href={`/list/teachers/${assignment.teacher.id}`} className="hover:underline">
        {assignment.teacher.name}
      </Link>
    ),
  },
  { key: 'dueDate', label: 'Due Date' },
  {
    key: 'actions',
    label: 'Actions',
    render: (assignment: Assignment) => (
      <TableActionButtons onEdit={() => handleEdit(assignment.id)} onDelete={() => handleDelete(assignment.id)} />
    ),
  },
];

export default function AssignmentsTable() {
  return (
    <DataTable<Assignment>
      data={assignmentsData}
      columns={COLUMNS}
      title="All Assignments"
      searchFields={['subject', 'class']}
      formModal={<AssignmentModal />}
      placeholder="Search assignments..."
    />
  );
}
