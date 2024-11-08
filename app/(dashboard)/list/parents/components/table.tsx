'use client';

import Link from 'next/link';
import React, { useState } from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { TableAvatar } from '@/components/table-avatar';
import { parentsData } from '@/lib/data';
import { ParentModal } from './parent-modal';
import { Parent } from './types';

export default function ParentsTable() {
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (parentId: string) => {
    const parent = parentsData.find((p) => p.id === parentId);
    if (parent) {
      setSelectedParent(parent);
      setIsModalOpen(true);
    }
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
      render: (parent: Parent) => (
        <>
          {parent.students.map((student, index) => (
            <React.Fragment key={student.id}>
              {index > 0 && ', '}
              <Link href={`/list/students/${student.id}`} className="hover:underline">
                {student.name}
              </Link>
            </React.Fragment>
          ))}
        </>
      ),
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

  return (
    <DataTable<Parent>
      data={parentsData}
      columns={COLUMNS}
      title="All Parents"
      searchFields={['name', 'email', 'students', 'phone', 'address']}
      formModal={
        <ParentModal
          parent={selectedParent}
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) setSelectedParent(null);
          }}
        />
      }
    />
  );
}
