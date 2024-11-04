'use client';

import React from 'react';

import DataTable from '@/components/data-table';
import { studentsData } from '@/lib/data';
import { ActionButtons } from './action-buttons';
import { StudentAvatar } from './student-avatar';
import { StudentModal } from './student-modal';
import { Student } from './types';

const COLUMNS = [
  {
    key: 'info',
    label: 'Info',
    render: (student: Student) => <StudentAvatar student={student} />,
  },
  { key: 'id', label: 'Student ID' },
  { key: 'grade', label: 'Grade' },
  { key: 'class', label: 'Class' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  {
    key: 'actions',
    label: 'Actions',
    render: (student: Student) => <ActionButtons studentId={student.id} />,
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
