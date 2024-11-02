'use client';

import React, { useEffect, useState } from 'react';

import { TableFilters } from '@/components/table-filters';
import Pagination from '@/components/table-pagination';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { USER_ROLE } from '@/lib/data';

interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  title: string;
  searchFields: (keyof T)[];
  initialPageSize?: number;
  formModal: React.ReactNode;
}

export default function DataTable<T extends { id: string | number }>({
  data,
  columns,
  title,
  searchFields,
  formModal,
  initialPageSize = 10,
}: DataTableProps<T>) {
  const [filteredItems, setFilteredItems] = useState<T[]>(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialPageSize);

  useEffect(() => {
    const filterItems = (term: string) => {
      return data.filter((item) =>
        searchFields.some((field) => {
          const value = item[field];
          const searchValue = Array.isArray(value) ? value.join(' ') : String(value);
          return searchValue.toLowerCase().includes(term.toLowerCase());
        })
      );
    };

    setFilteredItems(filterItems(searchTerm));
    setCurrentPage(1);
  }, [searchTerm, data, searchFields]);

  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  const getPaginatedItems = () => {
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    return filteredItems.slice(firstIndex, lastIndex);
  };

  const getTotalPages = () => Math.ceil(filteredItems.length / itemsPerPage);
  const handlePrevious = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, getTotalPages()));
  const handlePageSizeChange = (size: number) => {
    setItemsPerPage(size);
    setCurrentPage(1);
  };

  const renderTableCell = (item: T, column: Column<T>) => {
    if (column.render) {
      return column.render(item);
    }
    const value = item[column.key as keyof T];
    return Array.isArray(value) ? value.join(', ') : String(value);
  };

  return (
    <Card className="w-full dark:border-input">
      <CardHeader>
        <CardTitle className="text-xl font-bold flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <span>{title}</span>
          <div className="flex gap-2 items-center">
            <TableFilters searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search teachers..." />
            {USER_ROLE === 'admin' && formModal}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map(({ label }) => (
                  <TableHead key={label}>{label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {getPaginatedItems().map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={`${item.id}-${column.key}`}>{renderTableCell(item, column)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={getTotalPages()}
          onPrevious={handlePrevious}
          onNext={handleNext}
          pageSize={itemsPerPage}
          totalItems={filteredItems.length}
          onPageSizeChange={handlePageSizeChange}
        />
      </CardContent>
    </Card>
  );
}
