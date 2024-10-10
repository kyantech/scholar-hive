'use client';

import { ChevronLeft, ChevronRight, Edit, FileDown, Filter, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { USER_ROLE } from '@/lib/data';

const lessonsData = [
  {
    id: 1,
    subject: 'Math',
    class: '1A',
    teacher: 'Tommy Wise',
  },
  {
    id: 2,
    subject: 'English',
    class: '2A',
    teacher: 'Rhoda Frank',
  },
  {
    id: 3,
    subject: 'Science',
    class: '3A',
    teacher: 'Della Dunn',
  },
  {
    id: 4,
    subject: 'Social Studies',
    class: '1B',
    teacher: 'Bruce Rodriguez',
  },
  {
    id: 5,
    subject: 'Art',
    class: '4A',
    teacher: 'Birdie Butler',
  },
  {
    id: 6,
    subject: 'Music',
    class: '5A',
    teacher: 'Bettie Oliver',
  },
  {
    id: 7,
    subject: 'History',
    class: '6A',
    teacher: 'Herman Howard',
  },
  {
    id: 8,
    subject: 'Geography',
    class: '6B',
    teacher: 'Lucinda Thomas',
  },
  {
    id: 9,
    subject: 'Physics',
    class: '6C',
    teacher: 'Ronald Roberts',
  },
  {
    id: 10,
    subject: 'Chemistry',
    class: '4B',
    teacher: 'Julia Pittman',
  },
];

export default function LessonsCardTable() {
  const [filteredLessons, setFilteredLessons] = useState(lessonsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 10;

  useEffect(() => {
    const results = lessonsData.filter(
      (lesson) =>
        lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.teacher.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLessons(results);
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastLesson = currentPage * lessonsPerPage;
  const indexOfFirstLesson = indexOfLastLesson - lessonsPerPage;
  const currentLessons = filteredLessons.slice(indexOfFirstLesson, indexOfLastLesson);

  const totalPages = Math.ceil(filteredLessons.length / lessonsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Card className="w-full dark:border-input">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span>All Lessons</span>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              className="w-full sm:w-64 font-normal"
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FileDown className="h-4 w-4" />
            </Button>
            {USER_ROLE === 'admin' && (
              <Button size="icon">
                <Plus className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Teacher</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLessons.map((lesson) => (
                <TableRow key={lesson.id}>
                  <TableCell className="font-medium">{lesson.subject}</TableCell>
                  <TableCell>{lesson.class}</TableCell>
                  <TableCell>{lesson.teacher}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstLesson + 1}-{Math.min(indexOfLastLesson, filteredLessons.length)} of{' '}
            {filteredLessons.length}
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={handleNext} disabled={currentPage === totalPages}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
