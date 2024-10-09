import {
  Award,
  Bell,
  BookMarked,
  BookOpen,
  Calendar,
  CheckSquare,
  ClipboardList,
  FileSpreadsheet,
  Home,
  LucideIcon,
  MessageSquare,
  School,
  Settings,
  User,
  Users,
} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  visible: string[];
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
  visible: string[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: 'Menu',
      menus: [
        {
          href: '/',
          label: 'Home',
          active: pathname === '/',
          icon: Home,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
        {
          href: '',
          label: 'Users',
          active:
            pathname.includes('/list/teachers') ||
            pathname.includes('/list/students') ||
            pathname.includes('/list/parents'),
          icon: Users,
          submenus: [
            {
              href: '/list/teachers',
              label: 'Teachers',
              active: pathname === '/list/teachers',
              visible: ['admin', 'teacher'],
            },
            {
              href: '/list/students',
              label: 'Students',
              active: pathname === '/list/students',
              visible: ['admin', 'teacher'],
            },
            {
              href: '/list/parents',
              label: 'Parents',
              active: pathname === '/list/parents',
              visible: ['admin', 'teacher'],
            },
          ],
          visible: ['admin', 'teacher'],
        },
        {
          href: '/list/subjects',
          label: 'Subjects',
          active: pathname === '/list/subjects',
          icon: BookOpen,
          submenus: [],
          visible: ['admin'],
        },
        {
          href: '/list/classes',
          label: 'Classes',
          active: pathname === '/list/classes',
          icon: School,
          submenus: [],
          visible: ['admin', 'teacher'],
        },
        {
          href: '/list/lessons',
          label: 'Lessons',
          active: pathname === '/list/lessons',
          icon: BookMarked,
          submenus: [],
          visible: ['admin', 'teacher'],
        },
        {
          href: '/list/exams',
          label: 'Exams',
          active: pathname === '/list/exams',
          icon: FileSpreadsheet,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
        {
          href: '/list/assignments',
          label: 'Assignments',
          active: pathname === '/list/assignments',
          icon: ClipboardList,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
        {
          href: '/list/results',
          label: 'Results',
          active: pathname === '/list/results',
          icon: Award,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
        {
          href: '/list/attendance',
          label: 'Attendance',
          active: pathname === '/list/attendance',
          icon: CheckSquare,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
        {
          href: '/list/events',
          label: 'Events',
          active: pathname === '/list/events',
          icon: Calendar,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
        {
          href: '/list/messages',
          label: 'Messages',
          active: pathname === '/list/messages',
          icon: MessageSquare,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
        {
          href: '/list/announcements',
          label: 'Announcements',
          active: pathname === '/list/announcements',
          icon: Bell,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
      ],
    },
    {
      groupLabel: 'Other',
      menus: [
        {
          href: '/profile',
          label: 'Profile',
          active: pathname === '/profile',
          icon: User,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
        {
          href: '/settings',
          label: 'Settings',
          active: pathname === '/settings',
          icon: Settings,
          submenus: [],
          visible: ['admin', 'teacher', 'student', 'parent'],
        },
      ],
    },
  ];
}
