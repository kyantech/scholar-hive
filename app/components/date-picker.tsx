'use client';

import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { Control, Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface DatePickerProps {
  label: string;
  control: Control<any>;
  error?: { message?: string };
  disableFutureDates?: boolean;
  name: string;
}

const EARLIEST_YEAR = 1900;
const DEFAULT_MONTH = new Date().getMonth();
const DEFAULT_YEAR = new Date().getFullYear();

function generateYearRange(startYear: number, endYear: number): number[] {
  return Array.from({ length: endYear - startYear + 1 }, (_, index) => startYear + index);
}

export function DatePicker({ label, control, error, disableFutureDates = false, name }: DatePickerProps) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = React.useState<number>(DEFAULT_YEAR);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState<Date>(new Date(DEFAULT_YEAR, DEFAULT_MONTH, 1));

  const years = generateYearRange(EARLIEST_YEAR, currentYear);

  const handleYearChange = (value: string) => {
    const year = parseInt(value);
    setSelectedYear(year);
    setSelectedMonth(new Date(year, selectedMonth.getMonth(), 1));
  };

  const isDateDisabled = (date: Date) => {
    if (disableFutureDates && date > new Date()) {
      return true;
    }
    return date < new Date(`${EARLIEST_YEAR}-01-01`);
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs">{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn('w-full justify-start text-left font-normal', !field.value && 'text-muted-foreground')}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div className="p-3 border-b flex justify-end">
                <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {years.reverse().map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setIsOpen(false);
                }}
                disabled={isDateDisabled}
                initialFocus
                showOutsideDays={false}
                captionLayout="buttons"
                fromYear={EARLIEST_YEAR}
                toYear={currentYear}
                month={selectedMonth}
                onMonthChange={setSelectedMonth}
                defaultMonth={new Date()}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {error?.message && <p className="text-xs text-red-400">{error.message.toString()}</p>}
    </div>
  );
}
