'use client';

import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { TableAvatar } from '@/components/table-avatar';
import { studentsData } from '@/lib/data';
import { StudentModal } from './student-modal';
import { Student } from './types';

const handleEdit = (studentId: string) => {
  console.log('Editing student with ID:', studentId);
};

const handleDelete = (studentId: string) => {
  console.log('Deleting student with ID:', studentId);
};

const COLUMNS = [
  {
    key: 'info',
    label: 'Info',
    render: (student: Student) => <TableAvatar name={student.name} image={student.photo} email={student.email} />,
  },
  { key: 'id', label: 'Student ID' },
  { key: 'grade', label: 'Grade' },
  { key: 'class', label: 'Class' },
  { key: 'phone', label: 'Phone' },
  {
    key: 'address',
    label: 'Address',
    render: (student: Student) => <div className="truncate max-w-[200px]">{student.address}</div>,
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (student: Student) => (
      <TableActionButtons
        viewHref={`/students/${student.id}`}
        onEdit={() => handleEdit(student.id)}
        onDelete={() => handleDelete(student.id)}
      />
    ),
  },
];

export default function StudentsTable() {
  return (
    <DataTable<Student>
      data={studentsData}
      columns={COLUMNS}
      title="All Students"
      searchFields={['name', 'email', 'grade', 'class', 'address']}
      formModal={<StudentModal />}
    />
  );
}
