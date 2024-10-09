'use client';

import { MoreHorizontal } from 'lucide-react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { name: 'Jan', income: 4000, expense: 2400 },
  { name: 'Feb', income: 3000, expense: 1398 },
  { name: 'Mar', income: 2000, expense: 9800 },
  { name: 'Apr', income: 2780, expense: 3908 },
  { name: 'May', income: 1890, expense: 4800 },
  { name: 'Jun', income: 2390, expense: 3800 },
  { name: 'Jul', income: 3490, expense: 4300 },
  { name: 'Aug', income: 3490, expense: 4300 },
  { name: 'Sep', income: 3490, expense: 4300 },
  { name: 'Oct', income: 3490, expense: 4300 },
  { name: 'Nov', income: 3490, expense: 4300 },
  { name: 'Dec', income: 3490, expense: 4300 },
];

const chartConfig = {
  income: {
    label: 'Income',
    color: '#3F94B1',
  },
  expense: {
    label: 'Expense',
    color: '#0F5976',
  },
} satisfies ChartConfig;

const FinanceChart = () => {
  return (
    <Card className="dark:border-input w-full h-full flex flex-col">
      <div className="flex flex-1 flex-row justify-between">
        <CardHeader className="flex-none">
          <CardTitle>Finance Chart - Income vs Expense</CardTitle>
          <CardDescription>January - December 2024</CardDescription>
        </CardHeader>
        <MoreHorizontal className="relative top-4 right-4 cursor-pointer" />
      </div>
      <CardContent className="flex-grow min-h-0 w-full">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#d1d5db' }} tickMargin={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#d1d5db' }} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="income" stroke={chartConfig.income.color} strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="expense" stroke={chartConfig.expense.color} strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-none">
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Income trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Showing income and expense for the last 12 months
            </div>
          </div>
        </div>
      </CardFooter> */}
    </Card>
  );
};

export default FinanceChart;
