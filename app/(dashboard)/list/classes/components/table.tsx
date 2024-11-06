'use client';

import Link from 'next/link';
import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { classesData } from '@/lib/data';
import { ClassModal } from './class-modal';
import { Class } from './types';

const handleEdit = (classId: string) => {
  console.log('Editing class with ID:', classId);
};

const handleDelete = (classId: string) => {
  console.log('Deleting class with ID:', classId);
};

const COLUMNS = [
  { key: 'name', label: 'Class Name' },
  { key: 'grade', label: 'Grade' },
  { key: 'capacity', label: 'Capacity' },
  {
    key: 'supervisor',
    label: 'Supervisor',
    render: (classItem: Class) => {
      return (
        <Link href={`/list/teachers/${classItem.supervisor.id}`} className="hover:underline">
          {classItem.supervisor.name}
        </Link>
      );
    },
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (classItem: Class) => (
      <TableActionButtons onEdit={() => handleEdit(classItem.id)} onDelete={() => handleDelete(classItem.id)} />
    ),
  },
];

export default function ClassesTable() {
  return (
    <DataTable<Class>
      data={classesData}
      columns={COLUMNS}
      title="All Classes"
      searchFields={['name']}
      formModal={<ClassModal />}
      placeholder="Search classes..."
    />
  );
}
