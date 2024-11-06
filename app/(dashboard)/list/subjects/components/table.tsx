'use client';

import Link from 'next/link';
import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { subjectsData } from '@/lib/data';
import { SubjectModal } from './subject-modal';
import { Subject } from './types';

const handleEdit = (subjectId: string) => {
  console.log('Editing subject with ID:', subjectId);
};

const handleDelete = (subjectId: string) => {
  console.log('Deleting subject with ID:', subjectId);
};

const COLUMNS = [
  { key: 'name', label: 'Subject Name' },
  {
    key: 'teachers',
    label: 'Teachers',
    render: (subject: Subject) =>
      subject.teachers.map((teacher, index) => (
        <React.Fragment key={teacher.id}>
          {index > 0 && ', '}
          <Link href={`/list/teachers/${teacher.id}`} className=" hover:underline">
            {teacher.name}
          </Link>
        </React.Fragment>
      )),
  },
  {
    key: 'actions',
    label: 'Actions',
    render: (subject: Subject) => (
      <TableActionButtons onEdit={() => handleEdit(subject.id)} onDelete={() => handleDelete(subject.id)} />
    ),
  },
];

export default function SubjectsTable() {
  return (
    <DataTable<Subject>
      data={subjectsData}
      columns={COLUMNS}
      title="All Subjects"
      searchFields={['name']}
      formModal={<SubjectModal />}
      placeholder="Search subjects..."
    />
  );
}
