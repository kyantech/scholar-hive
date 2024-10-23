'use client';

import { MoreHorizontal } from 'lucide-react';
import { Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Card } from './ui/card';

const data = [
  { name: 'Group A', value: 92, fill: '#3F94B1' },
  { name: 'Group B', value: 8, fill: '#0F5976' },
];

const Performance = () => {
  return (
    <Card className="dark:border-input p-4 rounded-md h-80 relative">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold">Performance</h1>
        <MoreHorizontal />
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            fill="#0F5976"
            stroke="none"
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-3xl font-bold">9.2</h1>
        <p className="text-xs dark:text-gray-400">of 10 max LTS</p>
      </div>
      <h2 className="font-medium absolute bottom-16 left-0 right-0 m-auto text-center">1st Semester - 2nd Semester</h2>
    </Card>
  );
};

export default Performance;
