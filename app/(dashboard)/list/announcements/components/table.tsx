'use client';

import React from 'react';

import DataTable from '@/components/data-table';
import { TableActionButtons } from '@/components/table-action-buttons';
import { announcementsData } from '@/lib/data';
import { AnnouncementModal } from './announcement-modal';
import { Announcement } from './types';

const handleEdit = (announcementId: string) => {
  console.log('Editing announcement with ID:', announcementId);
};

const handleDelete = (announcementId: string) => {
  console.log('Deleting announcement with ID:', announcementId);
};

const COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'description', label: 'Description' },
  { key: 'class', label: 'Class' },
  { key: 'date', label: 'Date' },
  {
    key: 'actions',
    label: 'Actions',
    render: (announcement: Announcement) => (
      <TableActionButtons onEdit={() => handleEdit(announcement.id)} onDelete={() => handleDelete(announcement.id)} />
    ),
  },
];

export default function AnnouncementsTable() {
  return (
    <DataTable<Announcement>
      data={announcementsData}
      columns={COLUMNS}
      title="All Announcements"
      searchFields={['title', 'description']}
      formModal={<AnnouncementModal />}
      placeholder="Search announcements..."
    />
  );
}
