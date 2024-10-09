'use client';

import { ChevronLeft, ChevronRight, Edit, FileDown, Filter, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { USER_ROLE } from '@/lib/data';

const examsData = [
  {
    id: 1,
    subject: 'Math',
    class: '1A',
    teacher: 'Martha Morris',
    date: '2025-01-01',
  },
  {
    id: 2,
    subject: 'English',
    class: '2A',
    teacher: 'Randall Garcia',
    date: '2025-01-01',
  },
  {
    id: 3,
    subject: 'Science',
    class: '3A',
    teacher: 'Myrtie Scott',
    date: '2025-01-01',
  },
  {
    id: 4,
    subject: 'Social Studies',
    class: '1B',
    teacher: 'Alvin Swanson',
    date: '2025-01-01',
  },
  {
    id: 5,
    subject: 'Art',
    class: '4A',
    teacher: 'Mabelle Wallace',
    date: '2025-01-01',
  },
  {
    id: 6,
    subject: 'Music',
    class: '5A',
    teacher: 'Dale Thompson',
    date: '2025-01-01',
  },
  {
    id: 7,
    subject: 'History',
    class: '6A',
    teacher: 'Allie Conner',
    date: '2025-01-01',
  },
  {
    id: 8,
    subject: 'Geography',
    class: '6B',
    teacher: 'Hunter Fuller',
    date: '2025-01-01',
  },
  {
    id: 9,
    subject: 'Physics',
    class: '7A',
    teacher: 'Lois Lindsey',
    date: '2025-01-01',
  },
  {
    id: 10,
    subject: 'Chemistry',
    class: '8A',
    teacher: 'Vera Soto',
    date: '2025-01-01',
  },
];

export default function ExamsCardTable() {
  const [filteredExams, setFilteredExams] = useState(examsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const examsPerPage = 10;

  useEffect(() => {
    const results = examsData.filter(
      (exam) =>
        exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.date.includes(searchTerm)
    );
    setFilteredExams(results);
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = filteredExams.slice(indexOfFirstExam, indexOfLastExam);

  const totalPages = Math.ceil(filteredExams.length / examsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span>All Exams</span>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              className="w-full sm:w-64 font-normal"
              placeholder="Search exams..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <FileDown className="h-4 w-4" />
            </Button>
            {USER_ROLE === 'admin' ||
              (USER_ROLE === 'teacher' && (
                <Button size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              ))}
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
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.subject}</TableCell>
                  <TableCell>{exam.class}</TableCell>
                  <TableCell>{exam.teacher}</TableCell>
                  <TableCell>{exam.date}</TableCell>
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
            Showing {indexOfFirstExam + 1}-{Math.min(indexOfLastExam, filteredExams.length)} of {filteredExams.length}
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
