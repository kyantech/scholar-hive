import React from 'react';

import AnnouncementCard from '@/components/announcement-card';
import BigCalendar from '@/components/big-calendar';
import EventAlert from '@/components/event-card';
import { CalendarAdmin } from '@/components/events-calendar';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { mockAnnouncements, mockEvents } from '@/mocks/mock';

const StudentPage: React.FC = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <div className="flex flex-col w-full gap-4 lg:w-2/3">
        <Card className="dark:border-input">
          <CardTitle className="p-6">Schedule (4A)</CardTitle>
          <CardContent>
            <BigCalendar />
          </CardContent>
        </Card>
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

export default StudentPage;
