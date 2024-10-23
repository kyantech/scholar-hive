import { BookMarked, Calendar, CalendarPlus, LibraryBig, Mail, Phone, School, Syringe } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import AnnouncementAlert from '@/components/announcement-card';
import BigCalendar from '@/components/big-calendar';
import Performance from '@/components/performace-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { mockAnnouncements } from '@/mocks/mock';

interface ContactInfoItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ icon: Icon, text }) => (
  <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
    <Icon className="w-5 h-5" />
    <span>{text}</span>
  </div>
);

interface StatCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, value, label }) => (
  <Card className="dark:border-input w-full p-4 flex gap-4 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center">
    <Icon className="w-6 h-6" />
    <div>
      <h1 className="text-xl font-semibold">{value}</h1>
      <span className="text-sm text-foreground">{label}</span>
    </div>
  </Card>
);

const StudentDetailsPage: React.FC = () => {
  const contactInfo = [
    { icon: Syringe, text: 'O+' },
    { icon: Calendar, text: 'January 1995' },
    { icon: Mail, text: 'sgubocose@gmail.com' },
    { icon: Phone, text: '+55 41 99573362' },
  ];

  const stats = [
    { icon: CalendarPlus, value: '95%', label: 'Attendance' },
    { icon: LibraryBig, value: '6th', label: 'Grade' },
    { icon: BookMarked, value: '18', label: 'Lessons' },
    { icon: School, value: '3A', label: 'Class' },
  ];

  const shortcuts = [
    "Student's Lessons",
    "Student's Teachers",
    "Student's Results",
    "Student's Exams",
    "Student's Assignments",
  ];

  return (
    <div className="flex-1 flex flex-col gap-4 xl:flex-row">
      <div className="w-full xl:w-2/3">
        <div className="flex flex-col lg:flex-row gap-4">
          <Card className="flex-1 flex gap-4 py-6 px-4 dark:border-input">
            <div className="w-1/3 flex 2xl:items-center justify-center">
              <Image
                src="https://img.freepik.com/premium-photo/young-asian-indian-student-with-glasses-backpack-holds-book-shows-thumbs-up_928503-89.jpg"
                alt="teacher"
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <h1 className="text-xl font-semibold">Humaluk Rounuluh</h1>
              <p className="text-sm text-foreground">
                It is a long established fact that a reader will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                {contactInfo.map((info, index) => (
                  <ContactInfoItem key={index} icon={info.icon} text={info.text} />
                ))}
              </div>
            </div>
          </Card>
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {stats.map((stat, index) => (
              <StatCard key={index} icon={stat.icon} value={stat.value} label={stat.label} />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <Card className="dark:border-input">
            <CardTitle className="p-6">Student&apos;s Schedule</CardTitle>
            <CardContent>
              <BigCalendar />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <Card className="dark:border-input p-4">
          <h1 className="text-base font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap">
            {shortcuts.map((shortcut, index) => (
              <Button key={index} className="p-3 text-xs" variant="outline">
                {shortcut}
              </Button>
            ))}
          </div>
        </Card>
        <Performance />
        <Card className="p-6 dark:border-input gap-6 flex flex-col h-fit overflow-auto">
          <CardTitle className="flex justify-between">
            <span>Annoucements</span>
            <span className="text-xs font-normal text-muted-foreground cursor-pointer hover:text-foreground">
              View All
            </span>
          </CardTitle>
          <CardContent className="p-0">
            {mockAnnouncements.map((announcement) => (
              <AnnouncementAlert key={announcement.id} {...announcement} />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDetailsPage;
