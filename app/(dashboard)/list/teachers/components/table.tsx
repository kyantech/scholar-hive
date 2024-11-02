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
  { key: 'teacherId', label: 'ID do Professor' },
  { key: 'subjects', label: 'Disciplinas' },
  { key: 'classes', label: 'Turmas' },
  { key: 'phone', label: 'Telefone' },
  { key: 'address', label: 'Endereço' },
  {
    key: 'actions',
    label: 'Ações',
    render: (teacher: Teacher) => <ActionButtons teacherId={teacher.id} />,
  },
];

export default function TeachersTable() {
  return (
    <DataTable<Teacher>
      data={teachersData}
      columns={COLUMNS}
      title="Todos os Professores"
      searchFields={['name', 'email', 'subjects', 'classes', 'address']}
      formModal={<TeacherModal />}
    />
  );
}
