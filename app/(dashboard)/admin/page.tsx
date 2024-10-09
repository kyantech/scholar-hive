import React from 'react';

import AnnouncementCard from '@/components/announcement-card';
import EventAlert from '@/components/event-card';
import { CalendarAdmin } from '@/components/events-calendar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { mockAnnouncements, mockEvents } from '@/mocks/mock';
import AttendanceChart from './components/attendance-chart';
import CountChart from './components/count-chart';
import FinanceChart from './components/finance-chart';
import UserCard from './components/user-card';

const AdminPage: React.FC = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="flex flex-col w-full gap-4 lg:w-2/3">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student" />
          <UserCard type="teacher" />
          <UserCard type="parent" />
          <UserCard type="staff" />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>
          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      <div className="w-full lg:w-1/3 gap-6 flex flex-col">
        <Card className="p-6 dark:border-input gap-6 flex flex-col">
          <CalendarAdmin />
          <CardTitle>Events</CardTitle>
          <CardContent className="p-0">
            {mockEvents.map((event) => (
              <EventAlert key={event.id} {...event} />
            ))}
          </CardContent>
        </Card>
        <Card className="p-6 dark:border-input gap-6 flex flex-col h-full overflow-auto">
          <CardTitle className="flex justify-between">
            <span>Annoucements</span>
            <span className="text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground">
              View All
            </span>
          </CardTitle>
          <CardContent className="p-0">
            {mockAnnouncements.map((annoucement) => (
              <AnnouncementCard key={annoucement.id} {...annoucement} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPage;
