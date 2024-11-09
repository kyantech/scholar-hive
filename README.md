# ScholarHive

**ScholarHive** is an open-source school management platform designed to enhance collaboration and streamline educational processes. Our mission is to cultivate knowledge and foster community in education.

## ✨ Features

- 📚 **Class Management:** Efficiently organize and manage classes
- 👥 **Collaboration Tools:** Foster discussions and interactions between students and teachers
- 📊 **Performance Tracking:** Monitor student progress with reports and analytics
- 📅 **School Calendar:** Integrate events, deadlines, and school activities
- 🌟 **Open Source:** Customizable platform that allows community contributions and improvements

## 📚 API Documentation

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/[...nextauth]` | Authentication endpoints |
| GET | `/api/auth/me` | Get current user info |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List users |
| GET | `/api/users/:id` | Get user details |

### Teachers

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/teachers` | List teachers |
| POST | `/api/teachers` | Create teacher |
| GET | `/api/teachers/:id` | Get teacher details |
| PATCH | `/api/teachers/:id` | Update teacher |
| DELETE | `/api/teachers/:id` | Delete teacher |
| GET | `/api/teachers/:id/subjects` | Get teacher's subjects **Not implemented** |

### Students

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | List students |
| POST | `/api/students` | Create student |
| GET | `/api/students/:id` | Get student details |
| PATCH | `/api/students/:id` | Update student |
| DELETE | `/api/students/:id` | Delete student |
| GET | `/api/students/:id/results` | Get student's results **Not implemented**|

### Classes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/classes` | List classes |
| POST | `/api/classes` | Create class |
| GET | `/api/classes/:id` | Get class details |
| PATCH | `/api/classes/:id` | Update class |
| DELETE | `/api/classes/:id` | Delete class |

### Subjects

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/subjects` | List subjects |
| POST | `/api/subjects` | Create subject |
| GET | `/api/subjects/:id` | Get subject details |
| PATCH | `/api/subjects/:id` | Update subject |
| DELETE | `/api/subjects/:id` | Delete subject |

### Exams

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/exams` | List exams |
| POST | `/api/exams` | Create exam |
| GET | `/api/exams/:id` | Get exam details |
| PATCH | `/api/exams/:id` | Update exam |
| DELETE | `/api/exams/:id` | Delete exam |

### Results

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/results` | List results |
| POST | `/api/results` | Create result |
| GET | `/api/results/:id` | Get result details |
| PATCH | `/api/results/:id` | Update result |
| DELETE | `/api/results/:id` | Delete result |

### Assignments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignments` | List assignments |
| POST | `/api/assignments` | Create assignment |
| GET | `/api/assignments/:id` | Get assignment details |
| PATCH | `/api/assignments/:id` | Update assignment |
| DELETE | `/api/assignments/:id` | Delete assignment |

### Announcements

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/announcements` | List announcements |
| POST | `/api/announcements` | Create announcement |
| GET | `/api/announcements/:id` | Get announcement details |
| PATCH | `/api/announcements/:id` | Update announcement |
| DELETE | `/api/announcements/:id` | Delete announcement |

### Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/events` | List events |
| POST | `/api/events` | Create event |
| GET | `/api/events/:id` | Get event details |
| PATCH | `/api/events/:id` | Update event |
| DELETE | `/api/events/:id` | Delete event |

### Calendar Events

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/calendar-events` | List calendar events |
| POST | `/api/calendar-events` | Create calendar event |
| GET | `/api/calendar-events/:id` | Get calendar event details |
| PATCH | `/api/calendar-events/:id` | Update calendar event |
| DELETE | `/api/calendar-events/:id` | Delete calendar event |
