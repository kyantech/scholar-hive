const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      hashedPassword: hashedPassword,
      role: 'admin',
    },
  });

  // Create subjects
  const subjects = await Promise.all([
    prisma.subject.create({ data: { name: 'Math' } }),
    prisma.subject.create({ data: { name: 'English' } }),
    prisma.subject.create({ data: { name: 'Physics' } }),
    prisma.subject.create({ data: { name: 'Biology' } }),
    prisma.subject.create({ data: { name: 'History' } }),
  ]);

  // Create teachers
  const teacherData = [
    {
      email: 'pedro.santos@school.com',
      name: 'Pedro Santos',
      phone: '1234567890',
      address: 'Rua XV de Novembro, 1299 - Centro, Curitiba - PR, 80060-000',
      firstName: 'Pedro',
      lastName: 'Santos',
      bloodType: 'A_POSITIVE',
      subjects: [subjects[0].id, subjects[2].id], // Math and Physics
    },
    {
      email: 'ana.silva@school.com',
      name: 'Ana Paula Silva',
      phone: '1234567891',
      address: 'Av. Cândido de Abreu, 817 - Centro Cívico, Curitiba - PR, 80530-000',
      firstName: 'Ana',
      lastName: 'Silva',
      bloodType: 'B_POSITIVE',
      subjects: [subjects[1].id], // English
    },
    {
      email: 'marcos.oliveira@school.com',
      name: 'Marcos Oliveira',
      phone: '1234567892',
      address: 'Rua Mateus Leme, 4700 - São Lourenço, Curitiba - PR, 82130-000',
      firstName: 'Marcos',
      lastName: 'Oliveira',
      bloodType: 'O_NEGATIVE',
      subjects: [subjects[3].id], // Biology
    },
    {
      email: 'carla.rodrigues@school.com',
      name: 'Carla Rodrigues',
      phone: '1234567893',
      address: 'Rua Nilo Peçanha, 1552 - Bom Retiro, Curitiba - PR, 80520-000',
      firstName: 'Carla',
      lastName: 'Rodrigues',
      bloodType: 'AB_POSITIVE',
      subjects: [subjects[4].id], // History
    },
  ];

  const teachers = await Promise.all(
    teacherData.map(async (teacher) => {
      return prisma.user.create({
        data: {
          email: teacher.email,
          name: teacher.name,
          hashedPassword: hashedPassword,
          phone: teacher.phone,
          address: teacher.address,
          role: 'teacher',
          teacherDetails: {
            create: {
              firstName: teacher.firstName,
              lastName: teacher.lastName,
              bloodType: teacher.bloodType,
              birthday: new Date('1980-01-01'),
              sex: 'male',
            },
          },
        },
        include: {
          teacherDetails: true,
        },
      });
    })
  );

  // Create classes
  const classesData = [
    { name: '1A', grade: '1', capacity: 25 },
    { name: '1B', grade: '1', capacity: 25 },
    { name: '2A', grade: '2', capacity: 30 },
    { name: '2B', grade: '2', capacity: 30 },
  ];

  const classes = await Promise.all(
    classesData.map((classData, index) =>
      prisma.class.create({
        data: {
          ...classData,
          supervisorId: teachers[index % teachers.length].teacherDetails.id,
        },
      })
    )
  );

  // Create students
  const studentData = [
    {
      email: 'pedro.oliveira@school.com',
      name: 'Pedro Oliveira',
      firstName: 'Pedro',
      lastName: 'Oliveira',
      bloodType: 'O_POSITIVE',
      classId: classes[0].id,
    },
    {
      email: 'ana.santos@school.com',
      name: 'Ana Clara Santos',
      firstName: 'Ana',
      lastName: 'Santos',
      bloodType: 'A_NEGATIVE',
      classId: classes[0].id,
    },
    {
      email: 'miguel.costa@school.com',
      name: 'Miguel Costa',
      firstName: 'Miguel',
      lastName: 'Costa',
      bloodType: 'B_POSITIVE',
      classId: classes[1].id,
    },
    {
      email: 'julia.ferreira@school.com',
      name: 'Julia Ferreira',
      firstName: 'Julia',
      lastName: 'Ferreira',
      bloodType: 'AB_NEGATIVE',
      classId: classes[1].id,
    },
  ];

  const students = await Promise.all(
    studentData.map(async (student) => {
      return prisma.user.create({
        data: {
          email: student.email,
          name: student.name,
          hashedPassword: hashedPassword,
          role: 'student',
          studentDetails: {
            create: {
              firstName: student.firstName,
              lastName: student.lastName,
              bloodType: student.bloodType,
              birthday: new Date('2010-01-01'),
              sex: 'male',
              grade: '5',
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

  // Create parents
  const parentData = [
    {
      email: 'roberto.silva@gmail.com',
      name: 'Roberto Silva Santos',
      firstName: 'Roberto',
      lastName: 'Silva Santos',
      students: [students[0], students[1]],
    },
    {
      email: 'ana.oliveira@gmail.com',
      name: 'Ana Paula Oliveira',
      firstName: 'Ana Paula',
      lastName: 'Oliveira',
      students: [students[2]],
    },
    {
      email: 'carlos.ferreira@gmail.com',
      name: 'Carlos Eduardo Ferreira',
      firstName: 'Carlos',
      lastName: 'Ferreira',
      students: [students[3]],
    },
  ];

  const parents = await Promise.all(
    parentData.map(async (parent) => {
      return prisma.user.create({
        data: {
          email: parent.email,
          name: parent.name,
          hashedPassword: hashedPassword,
          role: 'parent',
          parentDetails: {
            create: {
              firstName: parent.firstName,
              lastName: parent.lastName,
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

  // Create exams
  const exams = await Promise.all(
    classes.map(async (class_, index) => {
      return prisma.exam.create({
        data: {
          date: new Date('2025-01-01'),
          subjectId: subjects[index % subjects.length].id,
          classId: class_.id,
          teacherId: teachers[index % teachers.length].teacherDetails.id,
        },
      });
    })
  );

  // Create results for each student and exam
  const results = await Promise.all(
    students.flatMap((student) =>
      exams.map((exam) =>
        prisma.result.create({
          data: {
            score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
            date: new Date('2025-01-01'),
            type: 'exam',
            examId: exam.id,
            studentId: student.studentDetails.id,
            teacherId: teachers[0].teacherDetails.id,
            subjectId: subjects[0].id,
          },
        })
      )
    )
  );

  // Create announcements
  const announcements = await Promise.all(
    classes.map((class_) =>
      prisma.announcement.create({
        data: {
          title: `Important Announcement for ${class_.name}`,
          description: `This is an important announcement for class ${class_.name}`,
          date: new Date('2025-01-01'),
          classId: class_.id,
        },
      })
    )
  );

  // Create events
  const events = await Promise.all(
    classes.map((class_) =>
      prisma.event.create({
        data: {
          title: `Special Event - ${class_.name}`,
          date: new Date('2025-01-01'),
          startTime: '10:00',
          endTime: '11:00',
          classId: class_.id,
        },
      })
    )
  );

  console.log({
    adminUser,
    teachers: teachers.length,
    classes: classes.length,
    students: students.length,
    parents: parents.length,
    exams: exams.length,
    results: results.length,
    announcements: announcements.length,
    events: events.length,
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
