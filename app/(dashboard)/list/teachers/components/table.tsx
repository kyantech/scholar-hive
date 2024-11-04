'use client';

import React from 'react';

import DataTable from '@/components/data-table';
import { teachersData } from '@/lib/data';
import { ActionButtons } from './action-buttons';
import { TeacherAvatar } from './teacher-avatar';
import { TeacherModal } from './teacher-modal';
import { Teacher } from './types';

const COLUMNS = [
  {
    key: 'info',
    label: 'Info',
    render: (teacher: Teacher) => <TeacherAvatar teacher={teacher} />,
  },
  { key: 'id', label: 'Teacher ID' },
  { key: 'subjects', label: 'Subjects' },
  { key: 'classes', label: 'Classes' },
  { key: 'phone', label: 'Phone' },
  { key: 'address', label: 'Address' },
  {
    key: 'actions',
    label: 'Actions',
    render: (teacher: Teacher) => <ActionButtons teacherId={teacher.id} />,
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
