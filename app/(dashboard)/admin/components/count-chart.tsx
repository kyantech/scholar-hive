'use client';

import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const boys = 14;
const girls = 22;
const total = boys + girls;

const data = [
  {
    name: 'Girls',
    value: (girls / total) * 100,
    fill: '#3F94B1',
  },
  {
    name: 'Boys',
    value: (boys / total) * 100,
    fill: '#0F5976',
  },
];

const legendData = [
  { label: 'Boys', value: boys, color: '#0F5976' },
  { label: 'Girls', value: girls, color: '#3F94B1' },
];

const CountChart = () => {
  return (
    <Card className="dark:border-input w-full h-full flex flex-col">
      <div className="flex flex-1 flex-row justify-between">
        <CardHeader className="flex-none">
          <CardTitle>Students</CardTitle>
        </CardHeader>
        <MoreHorizontal className="relative top-4 right-4 cursor-pointer" />
      </div>
      <CardContent className="relative w-full h-[100%] p-0">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="50%"
            outerRadius="80%"
            barSize={30}
            data={data}
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar background={{ fill: 'hsl(var(--accent))' }} dataKey="value" cornerRadius={0} label={false} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <Image src="/male_and_female.svg" alt="Male and Female Icons" width={50} height={50} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col w-full justify-between">
        <div className="flex justify-between items-center w-full">
          <div className="text-base font-medium">Total Students</div>
          <div className="text-base font-bold">{total}</div>
        </div>
        <div className="mt-2 space-y-2 w-full">
          {legendData.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm">{item.label}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{item.value}</span>
                <span className="text-xs text-gray-500">({Math.round((item.value / total) * 100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default CountChart;
