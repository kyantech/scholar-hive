'use client';

import React, { useState } from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { TableAvatar } from '@/components/table-avatar';
import { studentsData } from '@/lib/data';
import { StudentModal } from './student-modal';
import { Student } from './types';

export default function StudentsTable() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (studentId: string) => {
    const student = studentsData.find((s) => s.id === studentId);
    if (student) {
      setSelectedStudent(student as Student);
      setIsModalOpen(true);
    }
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
    { key: 'class', label: 'Class', render: (student: Student) => student.class.name },
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
          viewHref={`students/${student.id}`}
          onEdit={() => handleEdit(student.id)}
          onDelete={() => handleDelete(student.id)}
        />
      ),
    },
  ];

  return (
    <DataTable<Student>
      data={studentsData as Student[]}
      columns={COLUMNS}
      title="All Students"
      searchFields={['name', 'email', 'grade', 'class', 'address']}
      formModal={
        <StudentModal
          student={selectedStudent}
          open={isModalOpen}
          onOpenChange={(open) => {
            setIsModalOpen(open);
            if (!open) setSelectedStudent(null);
          }}
        />
      }
    />
  );
}
