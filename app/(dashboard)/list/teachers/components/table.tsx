'use client';

import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { TableAvatar } from '@/components/table-avatar';
import { teachersData } from '@/lib/data';
import { TeacherModal } from './teacher-modal';
import { Teacher } from './types';

const handleEdit = (teacherId: string) => {
  console.log('Editing teacher with ID:', teacherId);
};

const handleDelete = (teacherId: string) => {
  console.log('Deleting teacher with ID:', teacherId);
};

const COLUMNS = [
  {
    key: 'info',
    label: 'Info',
    render: (teacher: Teacher) => <TableAvatar name={teacher.name} image={teacher.photo} email={teacher.email} />,
  },
  { key: 'id', label: 'Teacher ID' },
  { key: 'subjects', label: 'Subjects' },
  { key: 'classes', label: 'Classes' },
  { key: 'phone', label: 'Phone' },
  {
    key: 'address',
    label: 'Address',
    render: (teacher: Teacher) => <div className="truncate max-w-[200px]">{teacher.address}</div>,
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (teacher: Teacher) => (
      <TableActionButtons
        viewHref={`teachers/${teacher.id}`}
        onEdit={() => handleEdit(teacher.id)}
        onDelete={() => handleDelete(teacher.id)}
      />
    ),
  },
];

export default function TeachersTable() {
  return (
    <DataTable<Teacher>
      data={teachersData}
      columns={COLUMNS}
      title="All Teachers"
      searchFields={['name', 'email', 'subjects', 'classes', 'address']}
      formModal={<TeacherModal />}
    />
  );
}
