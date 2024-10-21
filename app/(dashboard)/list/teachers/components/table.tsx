'use client';

import { ChevronLeft, ChevronRight, Edit, Eye, FileDown, Filter, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { teachersData, USER_ROLE } from '@/lib/data';

export default function TeachersCardTable() {
  const [filteredTeachers, setFilteredTeachers] = useState(teachersData);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const teachersPerPage = 10;

  useEffect(() => {
    const results = teachersData.filter(
      (teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.subjects.some((subject) => subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
        teacher.classes.some((cls) => cls.toLowerCase().includes(searchTerm.toLowerCase())) ||
        teacher.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeachers(results);
    setCurrentPage(1);
  }, [searchTerm]);

  const indexOfLastTeacher = currentPage * teachersPerPage;
  const indexOfFirstTeacher = indexOfLastTeacher - teachersPerPage;
  const currentTeachers = filteredTeachers.slice(indexOfFirstTeacher, indexOfLastTeacher);

  const totalPages = Math.ceil(filteredTeachers.length / teachersPerPage);

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
          <span>All Teachers</span>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              className="w-full sm:w-64 font-normal"
              placeholder="Search teachers..."
              type="search"
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
                <TableHead>Info</TableHead>
                <TableHead>Teacher ID</TableHead>
                <TableHead>Subjects</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentTeachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={teacher.photo} alt={teacher.name} />
                        <AvatarFallback>
                          {teacher.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{teacher.name}</div>
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{teacher.teacherId}</TableCell>
                  <TableCell>{teacher.subjects.join(', ')}</TableCell>
                  <TableCell>{teacher.classes.join(', ')}</TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>{teacher.address}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Link href={`teachers/${teacher.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
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
            Showing {indexOfFirstTeacher + 1}-{Math.min(indexOfLastTeacher, filteredTeachers.length)} of{' '}
            {filteredTeachers.length}
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
