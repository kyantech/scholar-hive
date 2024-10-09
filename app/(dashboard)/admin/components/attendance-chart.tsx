'use client';

import { MoreHorizontal } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

type DataPoint = {
  name: string;
  present: number;
  absent: number;
};

const today = new Date();
const dayOfWeek = today.getDay();
const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

const lastMonday = new Date(today);

lastMonday.setDate(today.getDate() - daysSinceMonday);

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

const attendanceMap: { [key: string]: { present: number; absent: number } } = {
  Mon: { present: 10, absent: 2 },
  Tue: { present: 22, absent: 4 },
  Wed: { present: 15, absent: 12 },
  Thu: { present: 2, absent: 25 },
  Fri: { present: 10, absent: 0 },
};

const chartConfig = {
  present: {
    label: 'Present',
    color: '#3F94B1',
  },
  absent: {
    label: 'Absent',
    color: '#0F5976',
  },
} satisfies ChartConfig;

const data: DataPoint[] = daysOfWeek.map((day) => ({
  name: day,
  present: attendanceMap[day].present,
  absent: attendanceMap[day].absent,
}));

const AttendanceChart = () => {
  return (
    <Card className="dark:border-input w-full h-full flex flex-col">
      <div className="flex flex-1 flex-row justify-between">
        <CardHeader className="flex-none">
          <CardTitle>Attendance</CardTitle>
        </CardHeader>
        <MoreHorizontal className="relative top-4 right-4 cursor-pointer" />
      </div>
      <CardContent className="relative w-full h-[100%] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={chartConfig}>
            <BarChart data={data} barSize={30} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#ddd" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#d1d5db' }} tickMargin={10} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
              <Legend
                verticalAlign="bottom"
                align="center"
                height={36}
                iconType="circle"
                iconSize={10}
                formatter={(value: string) => value.charAt(0).toUpperCase() + value.slice(1)}
                wrapperStyle={{
                  fontSize: '14px',
                  paddingTop: '10px',
                }}
              />
              <Bar dataKey="present" fill={chartConfig.present.color} radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent" fill={chartConfig.absent.color} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
