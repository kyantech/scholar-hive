const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker/locale/pt_BR');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@escola.com' },
    update: {},
    create: {
      email: 'admin@escola.com',
      name: 'Administrador',
      hashedPassword,
      role: 'admin',
      bloodType: 'A_POSITIVE',
      birthday: new Date('1980-01-01'),
      sex: 'male',
    },
  });

  // Subjects (15 matérias)
  const subjectsData = [
    'Matemática',
    'Português',
    'História',
    'Geografia',
    'Ciências',
    'Física',
    'Química',
    'Biologia',
    'Educação Física',
    'Artes',
    'Inglês',
    'Espanhol',
    'Filosofia',
    'Sociologia',
    'Literatura',
  ];

  const subjects = await Promise.all(
    subjectsData.map((name) =>
      prisma.subject.create({
        data: { name },
      })
    )
  );

  // Teachers (20 professores)
  const teacherData = Array(20)
    .fill(null)
    .map(() => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(true),
      bloodType: faker.helpers.arrayElement([
        'A_POSITIVE',
        'A_NEGATIVE',
        'B_POSITIVE',
        'B_NEGATIVE',
        'AB_POSITIVE',
        'AB_NEGATIVE',
        'O_POSITIVE',
        'O_NEGATIVE',
      ]),
      birthday: faker.date.between({ from: '1970-01-01', to: '1995-12-31' }),
      sex: faker.helpers.arrayElement(['male', 'female']),
      subjects: faker.helpers.arrayElements(
        subjects.map((s) => s.id),
        { min: 1, max: 3 }
      ),
    }));

  const teachers = await Promise.all(
    teacherData.map(async (teacher) => {
      return prisma.user.create({
        data: {
          email: teacher.email,
          name: teacher.name,
          hashedPassword,
          phone: teacher.phone,
          address: teacher.address,
          role: 'teacher',
          bloodType: teacher.bloodType,
          birthday: teacher.birthday,
          sex: teacher.sex,
          teacherDetails: {
            create: {
              subjects: {
                connect: teacher.subjects.map((id) => ({ id })),
              },
            },
          },
        },
        include: {
          teacherDetails: true,
        },
      });
    })
  );

  // Classes (12 turmas)
  const classesData = [
    { name: '1º Ano A', grade: '1', capacity: 30 },
    { name: '1º Ano B', grade: '1', capacity: 30 },
    { name: '2º Ano A', grade: '2', capacity: 30 },
    { name: '2º Ano B', grade: '2', capacity: 30 },
    { name: '3º Ano A', grade: '3', capacity: 30 },
    { name: '3º Ano B', grade: '3', capacity: 30 },
    { name: '4º Ano A', grade: '4', capacity: 30 },
    { name: '4º Ano B', grade: '4', capacity: 30 },
    { name: '5º Ano A', grade: '5', capacity: 30 },
    { name: '5º Ano B', grade: '5', capacity: 30 },
    { name: '6º Ano A', grade: '6', capacity: 30 },
    { name: '6º Ano B', grade: '6', capacity: 30 },
  ];

  const classes = await Promise.all(
    classesData.map((classData, index) =>
      prisma.class.create({
        data: {
          ...classData,
          supervisorId: teachers[index % teachers.length].teacherDetails.id,
          teachers: {
            connect: faker.helpers.arrayElements(
              teachers.map((t) => ({ id: t.teacherDetails.id })),
              { min: 3, max: 6 }
            ),
          },
        },
      })
    )
  );

  // Students (50 alunos)
  const studentData = Array(50)
    .fill(null)
    .map(() => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      bloodType: faker.helpers.arrayElement([
        'A_POSITIVE',
        'A_NEGATIVE',
        'B_POSITIVE',
        'B_NEGATIVE',
        'AB_POSITIVE',
        'AB_NEGATIVE',
        'O_POSITIVE',
        'O_NEGATIVE',
      ]),
      birthday: faker.date.between({ from: '2010-01-01', to: '2015-12-31' }),
      sex: faker.helpers.arrayElement(['male', 'female']),
      grade: faker.helpers.arrayElement(['1', '2', '3', '4', '5', '6']),
      classId: faker.helpers.arrayElement(classes).id,
    }));

  const students = await Promise.all(
    studentData.map(async (student) => {
      return prisma.user.create({
        data: {
          email: student.email,
          name: student.name,
          hashedPassword,
          role: 'student',
          bloodType: student.bloodType,
          birthday: student.birthday,
          sex: student.sex,
          studentDetails: {
            create: {
              grade: student.grade,
              classId: student.classId,
            },
          },
        },
        include: {
          studentDetails: true,
        },
      });
    })
  );

  // Parents (30 pais)
  const parentData = Array(30)
    .fill(null)
    .map(() => ({
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(true),
      bloodType: faker.helpers.arrayElement([
        'A_POSITIVE',
        'A_NEGATIVE',
        'B_POSITIVE',
        'B_NEGATIVE',
        'AB_POSITIVE',
        'AB_NEGATIVE',
        'O_POSITIVE',
        'O_NEGATIVE',
      ]),
      birthday: faker.date.between({ from: '1970-01-01', to: '1990-12-31' }),
      sex: faker.helpers.arrayElement(['male', 'female']),
      students: faker.helpers.arrayElements(students, { min: 1, max: 3 }),
    }));

  const parents = await Promise.all(
    parentData.map(async (parent) => {
      return prisma.user.create({
        data: {
          email: parent.email,
          name: parent.name,
          hashedPassword,
          phone: parent.phone,
          address: parent.address,
          role: 'parent',
          bloodType: parent.bloodType,
          birthday: parent.birthday,
          sex: parent.sex,
          parentDetails: {
            create: {
              students: {
                connect: parent.students.map((student) => ({
                  id: student.studentDetails.id,
                })),
              },
            },
          },
        },
      });
    })
  );

  // Exams (30 provas)
  const examData = Array(30)
    .fill(null)
    .map(() => ({
      date: faker.date.future(),
      subjectId: faker.helpers.arrayElement(subjects).id,
      classId: faker.helpers.arrayElement(classes).id,
      teacherId: faker.helpers.arrayElement(teachers).teacherDetails.id,
    }));

  const exams = await Promise.all(
    examData.map((exam) =>
      prisma.exam.create({
        data: exam,
      })
    )
  );

  // Results (150 resultados)
  const results = await Promise.all(
    Array(150)
      .fill(null)
      .map(() =>
        prisma.result.create({
          data: {
            score: faker.number.int({ min: 0, max: 100 }),
            date: faker.date.recent(),
            type: faker.helpers.arrayElement(['exam', 'assignment']),
            examId: faker.helpers.arrayElement(exams).id,
            studentId: faker.helpers.arrayElement(students).studentDetails.id,
            teacherId: faker.helpers.arrayElement(teachers).teacherDetails.id,
            subjectId: faker.helpers.arrayElement(subjects).id,
          },
        })
      )
  );

  // Assignments (40 tarefas)
  const assignments = await Promise.all(
    Array(40)
      .fill(null)
      .map(() =>
        prisma.assignment.create({
          data: {
            dueDate: faker.date.future(),
            subjectId: faker.helpers.arrayElement(subjects).id,
            classId: faker.helpers.arrayElement(classes).id,
            teacherId: faker.helpers.arrayElement(teachers).teacherDetails.id,
          },
        })
      )
  );

  // Announcements (25 anúncios)
  const announcements = await Promise.all(
    Array(25)
      .fill(null)
      .map(() =>
        prisma.announcement.create({
          data: {
            title: faker.lorem.sentence(),
            description: faker.lorem.paragraphs(),
            date: faker.date.recent(),
            classId: faker.helpers.arrayElement(classes).id,
          },
        })
      )
  );

  // Events (20 eventos)
  const events = await Promise.all(
    Array(20)
      .fill(null)
      .map(() => {
        const startHour = faker.number.int({ min: 8, max: 16 });
        return prisma.event.create({
          data: {
            title: faker.lorem.words(3),
            date: faker.date.future(),
            startTime: `${startHour}:00`,
            endTime: `${startHour + 2}:00`,
            classId: faker.helpers.arrayElement(classes).id,
          },
        });
      })
  );

  // Calendar Events (15 eventos de calendário)
  const calendarEvents = await Promise.all(
    Array(15)
      .fill(null)
      .map(() => {
        const startHour = faker.number.int({ min: 8, max: 16 });
        return prisma.calendarEvent.create({
          data: {
            title: faker.lorem.words(3),
            date: faker.date.future(),
            startTime: `${startHour}:00`,
            endTime: `${startHour + 2}:00`,
            classId: faker.helpers.arrayElement(classes).id,
          },
        });
      })
  );

  console.log({
    adminUser: 1,
    subjects: subjects.length,
    teachers: teachers.length,
    classes: classes.length,
    students: students.length,
    parents: parents.length,
    exams: exams.length,
    results: results.length,
    assignments: assignments.length,
    announcements: announcements.length,
    events: events.length,
    calendarEvents: calendarEvents.length,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
