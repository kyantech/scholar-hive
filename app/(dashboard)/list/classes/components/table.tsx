'use client';

import { ChevronLeft, ChevronRight, Edit, FileDown, Filter, Plus, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { USER_ROLE } from '@/lib/data';

const classesData = [
  {
    id: 1,
    name: '1A',
    capacity: 20,
    grade: 1,
    supervisor: 'Joseph Padilla',
  },
  {
    id: 2,
    name: '2B',
    capacity: 22,
    grade: 2,
    supervisor: 'Blake Joseph',
  },
  {
    id: 3,
    name: '3C',
    capacity: 20,
    grade: 3,
    supervisor: 'Tom Bennett',
  },
  {
    id: 4,
    name: '4B',
    capacity: 18,
    grade: 4,
    supervisor: 'Aaron Collins',
  },
  {
    id: 5,
    name: '5A',
    capacity: 16,
    grade: 5,
    supervisor: 'Iva Frank',
  },
  {
    id: 6,
    name: '5B',
    capacity: 20,
    grade: 5,
    supervisor: 'Leila Santos',
  },
  {
    id: 7,
    name: '7A',
    capacity: 18,
    grade: 7,
    supervisor: 'Carrie Walton',
  },
  {
    id: 8,
    name: '6B',
    capacity: 22,
    grade: 6,
    supervisor: 'Christopher Butler',
  },
  {
    id: 9,
    name: '6C',
    capacity: 18,
    grade: 6,
    supervisor: 'Marc Miller',
  },
  {
    id: 10,
    name: '6D',
    capacity: 20,
    grade: 6,
    supervisor: 'Ophelia Marsh',
  },
];

export default function ClassesCardTable() {
  const [filteredClasses, setFilteredClasses] = useState(classesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const classesPerPage = 10;

  useEffect(() => {
    const results = classesData.filter(
      (classItem) =>
        classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        classItem.grade.toString().includes(searchTerm)
    );
    setFilteredClasses(results);
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastClass = currentPage * classesPerPage;
  const indexOfFirstClass = indexOfLastClass - classesPerPage;
  const currentClasses = filteredClasses.slice(indexOfFirstClass, indexOfLastClass);

  const totalPages = Math.ceil(filteredClasses.length / classesPerPage);

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
          <span>All Classes</span>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              className="w-full sm:w-64 font-normal"
              placeholder="Search classes..."
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
                <TableHead>Class Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentClasses.map((classItem) => (
                <TableRow key={classItem.id}>
                  <TableCell className="font-medium">{classItem.name}</TableCell>
                  <TableCell>{classItem.grade}</TableCell>
                  <TableCell>{classItem.capacity}</TableCell>
                  <TableCell>{classItem.supervisor}</TableCell>
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
            Showing {indexOfFirstClass + 1}-{Math.min(indexOfLastClass, filteredClasses.length)} of{' '}
            {filteredClasses.length}
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
