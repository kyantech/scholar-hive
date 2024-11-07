'use client';

import React, { useState } from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { TableAvatar } from '@/components/table-avatar';
import { teachersData } from '@/lib/data';
import { TeacherModal } from './teacher-modal';
import { Teacher } from './types';

export default function TeachersTable() {
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (teacherId: string) => {
    const teacher = teachersData.find((t) => t.id === teacherId);
    if (teacher) {
      setSelectedTeacher(teacher as Teacher);
      setIsModalOpen(true);
    }
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
    {
      key: 'subjects',
      label: 'Subjects',
      render: (teacher: Teacher) => teacher.subjects.map((subject) => subject.name).join(', '),
    },
    {
      key: 'classes',
      label: 'Classes',
      render: (teacher: Teacher) => teacher.classes.map((cls) => cls.name).join(', '),
    },
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

  return (
    <DataTable<Teacher>
      data={teachersData as Teacher[]}
      columns={COLUMNS}
      title="All Teachers"
      searchFields={['name', 'email', 'subjects', 'classes', 'address']}
      formModal={
        <TeacherModal
          teacher={selectedTeacher}
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) setSelectedTeacher(null);
          }}
        />
      }
    />
  );
}
