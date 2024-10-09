'use client';

import moment from 'moment';
import { Calendar, momentLocalizer, View, Views } from 'react-big-calendar';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState } from 'react';

import { calendarEvents } from '@/lib/data';

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      views={['work_week', 'day']}
      view={view}
      style={{ height: '98%' }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 0, 6, 0, 0)}
      max={new Date(2025, 1, 0, 23, 59, 0)}
    />
  );
};

export default BigCalendar;