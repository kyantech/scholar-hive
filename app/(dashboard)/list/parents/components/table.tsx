'use client';

import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { TableAvatar } from '@/components/table-avatar';
import { parentsData } from '@/lib/data';
import { ParentModal } from './parent-modal';
import { Parent } from './types';

const handleEdit = (parentId: string) => {
  console.log('Editing parent with ID:', parentId);
};

const handleDelete = (parentId: string) => {
  console.log('Deleting parent with ID:', parentId);
};

const COLUMNS = [
  {
    key: 'info',
    label: 'Parent',
    render: (parent: Parent) => <TableAvatar name={parent.name} image={parent.photo} />,
  },
  {
    key: 'students',
    label: 'Students',
    render: (parent: Parent) => parent.students.join(', '),
  },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  {
    key: 'address',
    label: 'Address',
    render: (parent: Parent) => <div className="truncate max-w-[200px]">{parent.address}</div>,
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (parent: Parent) => (
      <TableActionButtons onEdit={() => handleEdit(parent.id)} onDelete={() => handleDelete(parent.id)} />
    ),
  },
];

export default function ParentsTable() {
  return (
    <DataTable<Parent>
      data={parentsData}
      columns={COLUMNS}
      title="All Parents"
      searchFields={['name', 'email', 'students', 'phone', 'address']}
      formModal={<ParentModal />}
    />
  );
}
