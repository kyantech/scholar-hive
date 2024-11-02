import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  pageSize: number;
  totalItems: number;
  onPageSizeChange: (size: number) => void;
}

const PAGE_SIZE_OPTIONS = [5, 10, 30, 50, 100] as const;

const TablePagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  pageSize,
  totalItems,
  onPageSizeChange,
}) => {
  const getItemRange = () => {
    const firstItem = (currentPage - 1) * pageSize + 1;
    const lastItem = Math.min(currentPage * pageSize, totalItems);
    return { firstItem, lastItem };
  };

  const { firstItem, lastItem } = getItemRange();

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const renderPageSizeSelector = () => (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-500">Mostrar</span>
      <select
        value={pageSize}
        onChange={(e) => onPageSizeChange(Number(e.target.value))}
        className="border rounded p-1 text-sm"
        aria-label="Selecionar quantidade de registros por página"
      >
        {PAGE_SIZE_OPTIONS.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <span className="text-sm text-gray-500">registros por página</span>
    </div>
  );

  const renderItemsInfo = () => (
    <div className="text-sm text-gray-500">
      Mostrando {firstItem}-{lastItem} de {totalItems}
    </div>
  );

  const renderNavigationButtons = () => (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={onPrevious} disabled={isFirstPage} aria-label="Página anterior">
        <ChevronLeft className="h-4 w-4 mr-2" />
        Anterior
      </Button>
      <Button variant="outline" size="sm" onClick={onNext} disabled={isLastPage} aria-label="Próxima página">
        Próximo
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 py-4">
      {renderPageSizeSelector()}
      {renderItemsInfo()}
      {renderNavigationButtons()}
    </div>
  );
};

export default TablePagination;
