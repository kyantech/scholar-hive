// TEMPORARY DATA

export type UserRolesType = 'student' | 'admin' | 'teacher' | 'parent';

export const USER_ROLE: UserRolesType = 'admin';

export const teachersData = [
  {
    id: 'clh1u2xkg0000qwer1234567',
    name: 'Pedro Santos',
    email: 'pedro.santos@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [
      { id: 'clh1u2xkg0021qwer1234587', name: 'Math' },
      { id: 'clh1u2xkg0022qwer1234588', name: 'Geometry' },
    ],
    classes: [
      { id: 'clh1u2xkg0001qwer1234567', name: '1B' },
      { id: 'clh1u2xkg0002qwer1234568', name: '2A' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Rua XV de Novembro, 1299 - Centro, Curitiba - PR, 80060-000',
    bloodType: 'A+',
    birthday: new Date('1995-01-15'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0001qwer1234568',
    name: 'Ana Paula Silva',
    email: 'ana.silva@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [
      { id: 'clh1u2xkg0023qwer1234589', name: 'Physics' },
      { id: 'clh1u2xkg0024qwer1234590', name: 'Chemistry' },
    ],
    classes: [
      { id: 'clh1u2xkg0004qwer1234570', name: '5A' },
      { id: 'clh1u2xkg0005qwer1234571', name: '4B' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Av. Cândido de Abreu, 817 - Centro Cívico, Curitiba - PR, 80530-000',
    bloodType: 'O+',
    birthday: new Date('1988-06-22'),
    sex: 'female',
  },
  {
    id: 'clh1u2xkg0002qwer1234569',
    name: 'Marcos Oliveira',
    email: 'marcos.oliveira@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [{ id: 'clh1u2xkg0025qwer1234591', name: 'Biology' }],
    classes: [
      { id: 'clh1u2xkg0004qwer1234570', name: '5A' },
      { id: 'clh1u2xkg0005qwer1234571', name: '4B' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Rua Mateus Leme, 4700 - São Lourenço, Curitiba - PR, 82130-000',
    bloodType: 'B+',
    birthday: new Date('1992-03-10'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0003qwer1234570',
    name: 'João Costa',
    email: 'joao.costa@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [{ id: 'clh1u2xkg0026qwer1234592', name: 'History' }],
    classes: [
      { id: 'clh1u2xkg0004qwer1234570', name: '5A' },
      { id: 'clh1u2xkg0005qwer1234571', name: '4B' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Rua Padre Agostinho, 2885 - Bigorrilho, Curitiba - PR, 80710-000',
    bloodType: 'AB+',
    birthday: new Date('1990-11-05'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0004qwer1234571',
    name: 'Maria Fernanda Souza',
    email: 'maria.souza@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [
      { id: 'clh1u2xkg0027qwer1234593', name: 'Music' },
      { id: 'clh1u2xkg0026qwer1234592', name: 'History' },
    ],
    classes: [
      { id: 'clh1u2xkg0004qwer1234570', name: '5A' },
      { id: 'clh1u2xkg0005qwer1234571', name: '4B' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Av. Manoel Ribas, 5875 - Santa Felicidade, Curitiba - PR, 82400-000',
    bloodType: 'A-',
    birthday: new Date('1993-08-17'),
    sex: 'female',
  },
  {
    id: 'clh1u2xkg0005qwer1234572',
    name: 'Carla Rodrigues',
    email: 'carla.rodrigues@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [{ id: 'clh1u2xkg0023qwer1234589', name: 'Physics' }],
    classes: [
      { id: 'clh1u2xkg0004qwer1234570', name: '5A' },
      { id: 'clh1u2xkg0005qwer1234571', name: '4B' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Rua Nilo Peçanha, 1552 - Bom Retiro, Curitiba - PR, 80520-000',
    bloodType: 'O-',
    birthday: new Date('1991-04-30'),
    sex: 'female',
  },
  {
    id: 'clh1u2xkg0006qwer1234573',
    name: 'Roberto Almeida',
    email: 'roberto.almeida@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [
      { id: 'clh1u2xkg0028qwer1234594', name: 'English' },
      { id: 'clh1u2xkg0029qwer1234595', name: 'Spanish' },
    ],
    classes: [
      { id: 'clh1u2xkg0004qwer1234570', name: '5A' },
      { id: 'clh1u2xkg0005qwer1234571', name: '4B' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Rua Visconde de Nácar, 1505 - Centro, Curitiba - PR, 80410-201',
    bloodType: 'B-',
    birthday: new Date('1987-12-03'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0007qwer1234574',
    name: 'Beatriz Lima',
    email: 'beatriz.lima@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [
      { id: 'clh1u2xkg0021qwer1234587', name: 'Math' },
      { id: 'clh1u2xkg0022qwer1234588', name: 'Geometry' },
    ],
    classes: [
      { id: 'clh1u2xkg0004qwer1234570', name: '5A' },
      { id: 'clh1u2xkg0005qwer1234571', name: '4B' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Rua Brigadeiro Franco, 2300 - Centro, Curitiba - PR, 80250-030',
    bloodType: 'AB-',
    birthday: new Date('1994-09-25'),
    sex: 'female',
  },
  {
    id: 'clh1u2xkg0008qwer1234575',
    name: 'Lucas Ferreira',
    email: 'lucas.ferreira@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [
      { id: 'clh1u2xkg0030qwer1234596', name: 'Literature' },
      { id: 'clh1u2xkg0028qwer1234594', name: 'English' },
    ],
    classes: [
      { id: 'clh1u2xkg0004qwer1234570', name: '5A' },
      { id: 'clh1u2xkg0005qwer1234571', name: '4B' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Av. República Argentina, 4406 - Novo Mundo, Curitiba - PR, 81050-001',
    bloodType: 'A+',
    birthday: new Date('1989-07-14'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0009qwer1234576',
    name: 'Gabriel Pereira',
    email: 'gabriel.pereira@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    subjects: [{ id: 'clh1u2xkg0025qwer1234591', name: 'Biology' }],
    classes: [
      { id: 'clh1u2xkg0004qwer1234570', name: '5A' },
      { id: 'clh1u2xkg0005qwer1234571', name: '4B' },
      { id: 'clh1u2xkg0003qwer1234569', name: '3C' },
    ],
    address: 'Rua Desembargador Motta, 2200 - Centro, Curitiba - PR, 80420-190',
    bloodType: 'O+',
    birthday: new Date('1996-02-28'),
    sex: 'male',
  },
];

export const studentsData = [
  {
    id: 'clh1u2xkg0001qwer1234567',
    name: 'Pedro Oliveira',
    email: 'pedro.oliveira@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/2888150/pexels-photo-2888150.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0000qwer1234567', name: '1A' },
    address: 'Rua Mateus Leme, 1908 - Centro Cívico, Curitiba - PR, 80530-010',
    bloodType: 'A+',
    birthday: new Date('2012-03-15'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0002qwer1234568',
    name: 'Ana Clara Santos',
    email: 'ana.santos@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/936126/pexels-photo-936126.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0004qwer1234571', name: '5A' },
    address: 'Rua Padre Agostinho, 2885 - Bigorrilho, Curitiba - PR, 80710-000',
    bloodType: 'O-',
    birthday: new Date('2012-07-22'),
    sex: 'female',
  },
  {
    id: 'clh1u2xkg0003qwer1234569',
    name: 'Miguel Costa',
    email: 'miguel.costa@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/428328/pexels-photo-428328.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0004qwer1234571', name: '5A' },
    address: 'Av. Sete de Setembro, 3293 - Centro, Curitiba - PR, 80230-010',
    bloodType: 'B+',
    birthday: new Date('2012-11-30'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0004qwer1234570',
    name: 'Julia Ferreira',
    email: 'julia.ferreira@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1187765/pexels-photo-1187765.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0004qwer1234571', name: '5A' },
    address: 'Rua Marechal Deodoro, 630 - Centro, Curitiba - PR, 80010-010',
    bloodType: 'AB+',
    birthday: new Date('2012-05-18'),
    sex: 'female',
  },
  {
    id: 'clh1u2xkg0005qwer1234571',
    name: 'Thiago Almeida',
    email: 'thiago.almeida@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0004qwer1234571', name: '5A' },
    address: 'Rua XV de Novembro, 1299 - Centro, Curitiba - PR, 80060-000',
    bloodType: 'O+',
    birthday: new Date('2012-09-07'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0006qwer1234572',
    name: 'Mariana Silva',
    email: 'mariana.silva@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0004qwer1234571', name: '5A' },
    address: 'Av. Cândido de Abreu, 817 - Centro Cívico, Curitiba - PR, 80530-000',
    bloodType: 'A-',
    birthday: new Date('2012-01-25'),
    sex: 'female',
  },
  {
    id: 'clh1u2xkg0007qwer1234573',
    name: 'Lucas Ribeiro',
    email: 'lucas.ribeiro@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0004qwer1234571', name: '5A' },
    address: 'Rua Comendador Araújo, 499 - Centro, Curitiba - PR, 80420-000',
    bloodType: 'B-',
    birthday: new Date('2012-04-12'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0008qwer1234574',
    name: 'Isabella Martins',
    email: 'isabella.martins@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0004qwer1234571', name: '5A' },
    address: 'Rua Desembargador Westphalen, 15 - Centro, Curitiba - PR, 80010-110',
    bloodType: 'AB-',
    birthday: new Date('2012-08-03'),
    sex: 'female',
  },
  {
    id: 'clh1u2xkg0009qwer1234575',
    name: 'Gabriel Santos',
    email: 'gabriel.santos@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0004qwer1234571', name: '5A' },
    address: 'Av. Vicente Machado, 320 - Centro, Curitiba - PR, 80420-010',
    bloodType: 'O+',
    birthday: new Date('2012-06-28'),
    sex: 'male',
  },
  {
    id: 'clh1u2xkg0010qwer1234576',
    name: 'Sofia Pereira',
    email: 'sofia.pereira@school.com',
    password: 'password123',
    photo: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1200',
    phone: '1234567890',
    grade: '5',
    class: { id: 'clh1u2xkg0004qwer1234571', name: '5A' },
    address: 'Rua Emiliano Perneta, 466 - Centro, Curitiba - PR, 80420-080',
    bloodType: 'A+',
    birthday: new Date('2012-10-15'),
    sex: 'female',
  },
];

export const parentsData = [
  {
    id: 'clh1u2xkg0011qwer1234577',
    name: 'Roberto Silva Santos',
    students: [{ id: 'clh1u2xkg0031qwer1234597', name: 'Pedro Silva Santos' }],
    email: 'roberto.silva@gmail.com',
    phone: '1234567890',
    address: 'Rua Marechal Deodoro, 630 - Centro, Curitiba - PR, 80010-010',
    photo: 'https://i.pinimg.com/474x/03/19/8d/03198defbf9905613bedbbdd2323228d.jpg',
    password: 'password123',
  },
  {
    id: 'clh1u2xkg0012qwer1234578',
    name: 'Ana Paula Oliveira',
    students: [{ id: 'clh1u2xkg0032qwer1234598', name: 'Julia Oliveira' }],
    email: 'ana.oliveira@hotmail.com',
    phone: '1234567890',
    address: 'Av. Sete de Setembro, 4698 - Batel, Curitiba - PR, 80240-000',
    photo: '',
    password: 'password123',
  },
  {
    id: 'clh1u2xkg0013qwer1234579',
    name: 'Carlos Eduardo Ferreira',
    students: [{ id: 'clh1u2xkg0033qwer1234599', name: 'João Paulo Ferreira' }],
    email: 'carlos.ferreira@gmail.com',
    phone: '1234567890',
    address: 'Rua Padre Agostinho, 2885 - Bigorrilho, Curitiba - PR, 80710-000',
    photo: '',
    password: 'password123',
  },
  {
    id: 'clh1u2xkg0014qwer1234580',
    name: 'Fernanda Costa Lima',
    students: [
      { id: 'clh1u2xkg0034qwer1234600', name: 'Mariana Costa Lima' },
      { id: 'clh1u2xkg0035qwer1234601', name: 'Rafael Costa Lima' },
    ],
    email: 'fernanda.lima@gmail.com',
    phone: '1234567890',
    address: 'Av. República Argentina, 1228 - Água Verde, Curitiba - PR, 80620-010',
    photo: '',
    password: 'password123',
  },
  {
    id: 'clh1u2xkg0015qwer1234581',
    name: 'Ricardo Almeida Souza',
    students: [{ id: 'clh1u2xkg0036qwer1234602', name: 'Lucas Almeida Souza' }],
    email: 'ricardo.souza@hotmail.com',
    phone: '1234567890',
    address: 'Rua Bispo Dom José, 2495 - Batel, Curitiba - PR, 80440-080',
    photo: '',
    password: 'password123',
  },
  {
    id: 'clh1u2xkg0016qwer1234582',
    name: 'Patricia Mendes Santos',
    students: [{ id: 'clh1u2xkg0037qwer1234603', name: 'Gabriel Mendes Santos' }],
    email: 'patricia.mendes@gmail.com',
    phone: '1234567890',
    address: 'Av. Silva Jardim, 567 - Rebouças, Curitiba - PR, 80230-000',
    photo: '',
    password: 'password123',
  },
  {
    id: 'clh1u2xkg0017qwer1234583',
    name: 'Marcelo Pereira Lima',
    students: [
      { id: 'clh1u2xkg0038qwer1234604', name: 'Thiago Pereira Lima' },
      { id: 'clh1u2xkg0039qwer1234605', name: 'Isabella Pereira Lima' },
    ],
    email: 'marcelo.lima@gmail.com',
    phone: '1234567890',
    address: 'Rua Nilo Peçanha, 1552 - São Francisco, Curitiba - PR, 80520-000',
    photo: '',
    password: 'password123',
  },
  {
    id: 'clh1u2xkg0018qwer1234584',
    name: 'Luciana Rodrigues Costa',
    students: [{ id: 'clh1u2xkg0040qwer1234606', name: 'Felipe Rodrigues Costa' }],
    email: 'luciana.costa@hotmail.com',
    phone: '1234567890',
    address: 'Rua Tibagi, 294 - Centro, Curitiba - PR, 80060-110',
    photo: '',
    password: 'password123',
  },
  {
    id: 'clh1u2xkg0019qwer1234585',
    name: 'André Santos Oliveira',
    students: [
      { id: 'clh1u2xkg0041qwer1234607', name: 'Beatriz Santos Oliveira' },
      { id: 'clh1u2xkg0042qwer1234608', name: 'Bruno Santos Oliveira' },
    ],
    email: 'andre.oliveira@gmail.com',
    phone: '1234567890',
    address: 'Rua Mateus Leme, 1908 - Centro Cívico, Curitiba - PR, 80530-010',
    photo: '',
    password: 'password123',
  },
  {
    id: 'clh1u2xkg0020qwer1234586',
    name: 'Mariana Costa Silva',
    students: [{ id: 'clh1u2xkg0043qwer1234609', name: 'Guilherme Costa Silva' }],
    email: 'mariana.silva@hotmail.com',
    phone: '1234567890',
    address: 'Av. Manoel Ribas, 4255 - Santa Felicidade, Curitiba - PR, 82025-160',
    photo: '',
    password: 'password123',
  },
];

export const subjectsData = [
  {
    id: 'clh1u2xkg0021qwer1234587',
    name: 'Math',
    teachers: [
      { id: 'clh1u2xkg0001qwer1234567', name: 'João Pedro Silva' },
      { id: 'clh1u2xkg0002qwer1234568', name: 'Maria Oliveira Santos' },
    ],
  },
  {
    id: 'clh1u2xkg0022qwer1234588',
    name: 'English',
    teachers: [
      { id: 'clh1u2xkg0003qwer1234569', name: 'Ana Paula Ferreira' },
      { id: 'clh1u2xkg0004qwer1234570', name: 'Carlos Eduardo Lima' },
    ],
  },
  {
    id: 'clh1u2xkg0023qwer1234589',
    name: 'Physics',
    teachers: [
      { id: 'clh1u2xkg0005qwer1234571', name: 'Marcos Antonio Costa' },
      { id: 'clh1u2xkg0006qwer1234572', name: 'Patricia Ribeiro' },
    ],
  },
  {
    id: 'clh1u2xkg0024qwer1234590',
    name: 'Chemistry',
    teachers: [
      { id: 'clh1u2xkg0007qwer1234573', name: 'Fernanda Almeida' },
      { id: 'clh1u2xkg0008qwer1234574', name: 'Ricardo Souza' },
    ],
  },
  {
    id: 'clh1u2xkg0025qwer1234591',
    name: 'Biology',
    teachers: [
      { id: 'clh1u2xkg0009qwer1234575', name: 'Luciana Martins' },
      { id: 'clh1u2xkg0010qwer1234576', name: 'José Roberto Santos' },
    ],
  },
  {
    id: 'clh1u2xkg0026qwer1234592',
    name: 'History',
    teachers: [
      { id: 'clh1u2xkg0011qwer1234577', name: 'Mariana Costa' },
      { id: 'clh1u2xkg0012qwer1234578', name: 'Paulo Henrique Silva' },
    ],
  },
  {
    id: 'clh1u2xkg0027qwer1234593',
    name: 'Geography',
    teachers: [
      { id: 'clh1u2xkg0013qwer1234579', name: 'Beatriz Gomes' },
      { id: 'clh1u2xkg0014qwer1234580', name: 'André Luis Pereira' },
    ],
  },
  {
    id: 'clh1u2xkg0028qwer1234594',
    name: 'Art',
    teachers: [
      { id: 'clh1u2xkg0015qwer1234581', name: 'Camila Rodrigues' },
      { id: 'clh1u2xkg0016qwer1234582', name: 'Thiago Mendes' },
    ],
  },
  {
    id: 'clh1u2xkg0029qwer1234595',
    name: 'Music',
    teachers: [
      { id: 'clh1u2xkg0017qwer1234583', name: 'Renata Carvalho' },
      { id: 'clh1u2xkg0018qwer1234584', name: 'Daniel Santos' },
    ],
  },
  {
    id: 'clh1u2xkg0030qwer1234596',
    name: 'Literature',
    teachers: [
      { id: 'clh1u2xkg0019qwer1234585', name: 'Amanda Nogueira' },
      { id: 'clh1u2xkg0020qwer1234586', name: 'Bruno Oliveira' },
    ],
  },
];

export const classesData = [
  {
    id: 'clh1u2xkg0000qwer1234567',
    name: '1A',
    capacity: 20,
    grade: '1',
    supervisor: {
      id: 'clh1u2xkg0021qwer1234587',
      name: 'Joseph Padilla',
    },
  },
  {
    id: 'clh1u2xkg0001qwer1234568',
    name: '2B',
    capacity: 22,
    grade: '2',
    supervisor: {
      id: 'clh1u2xkg0022qwer1234588',
      name: 'Blake Joseph',
    },
  },
  {
    id: 'clh1u2xkg0002qwer1234569',
    name: '3C',
    capacity: 20,
    grade: '3',
    supervisor: {
      id: 'clh1u2xkg0023qwer1234589',
      name: 'Tom Bennett',
    },
  },
  {
    id: 'clh1u2xkg0003qwer1234570',
    name: '4B',
    capacity: 18,
    grade: '4',
    supervisor: {
      id: 'clh1u2xkg0024qwer1234590',
      name: 'Aaron Collins',
    },
  },
  {
    id: 'clh1u2xkg0004qwer1234571',
    name: '5A',
    capacity: 16,
    grade: '5',
    supervisor: {
      id: 'clh1u2xkg0025qwer1234591',
      name: 'Iva Frank',
    },
  },
  {
    id: 'clh1u2xkg0005qwer1234572',
    name: '5B',
    capacity: 20,
    grade: '5',
    supervisor: {
      id: 'clh1u2xkg0026qwer1234592',
      name: 'Leila Santos',
    },
  },
  {
    id: 'clh1u2xkg0006qwer1234573',
    name: '7A',
    capacity: 18,
    grade: '7',
    supervisor: {
      id: 'clh1u2xkg0027qwer1234593',
      name: 'Carrie Walton',
    },
  },
  {
    id: 'clh1u2xkg0007qwer1234574',
    name: '6B',
    capacity: 22,
    grade: '6',
    supervisor: {
      id: 'clh1u2xkg0028qwer1234594',
      name: 'Christopher Butler',
    },
  },
  {
    id: 'clh1u2xkg0008qwer1234575',
    name: '6C',
    capacity: 18,
    grade: '6',
    supervisor: {
      id: 'clh1u2xkg0029qwer1234595',
      name: 'Marc Miller',
    },
  },
  {
    id: 'clh1u2xkg0009qwer1234576',
    name: '6D',
    capacity: 20,
    grade: '6',
    supervisor: {
      id: 'clh1u2xkg0030qwer1234596',
      name: 'Ophelia Marsh',
    },
  },
];

export const lessonsData = [
  {
    id: 'clh1u2xkg0041qwer1234607',
    subject: {
      id: 'clh1u2xkg0021qwer1234587',
      name: 'Math',
    },
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1A',
    },
    teacher: {
      id: 'clh1u2xkg0031qwer1234597',
      name: 'Tommy Wise',
    },
  },
  {
    id: 'clh1u2xkg0042qwer1234608',
    subject: {
      id: 'clh1u2xkg0028qwer1234594',
      name: 'English',
    },
    class: {
      id: 'clh1u2xkg0001qwer1234568',
      name: '2B',
    },
    teacher: {
      id: 'clh1u2xkg0032qwer1234598',
      name: 'Rhoda Frank',
    },
  },
  {
    id: 'clh1u2xkg0043qwer1234609',
    subject: {
      id: 'clh1u2xkg0025qwer1234591',
      name: 'Biology',
    },
    class: {
      id: 'clh1u2xkg0002qwer1234569',
      name: '3C',
    },
    teacher: {
      id: 'clh1u2xkg0033qwer1234599',
      name: 'Della Dunn',
    },
  },
  {
    id: 'clh1u2xkg0044qwer1234610',
    subject: {
      id: 'clh1u2xkg0026qwer1234592',
      name: 'History',
    },
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1B',
    },
    teacher: {
      id: 'clh1u2xkg0034qwer1234600',
      name: 'Bruce Rodriguez',
    },
  },
  {
    id: 'clh1u2xkg0045qwer1234611',
    subject: {
      id: 'clh1u2xkg0028qwer1234594',
      name: 'Art',
    },
    class: {
      id: 'clh1u2xkg0003qwer1234570',
      name: '4B',
    },
    teacher: {
      id: 'clh1u2xkg0035qwer1234601',
      name: 'Jose Ruiz',
    },
  },
  {
    id: 'clh1u2xkg0046qwer1234612',
    subject: {
      id: 'clh1u2xkg0027qwer1234593',
      name: 'Music',
    },
    class: {
      id: 'clh1u2xkg0004qwer1234571',
      name: '5A',
    },
    teacher: {
      id: 'clh1u2xkg0036qwer1234602',
      name: 'Birdie Butler',
    },
  },
  {
    id: 'clh1u2xkg0047qwer1234613',
    subject: {
      id: 'clh1u2xkg0026qwer1234592',
      name: 'History',
    },
    class: {
      id: 'clh1u2xkg0005qwer1234572',
      name: '5B',
    },
    teacher: {
      id: 'clh1u2xkg0037qwer1234603',
      name: 'Shawn Norman',
    },
  },
  {
    id: 'clh1u2xkg0048qwer1234614',
    subject: {
      id: 'clh1u2xkg0027qwer1234593',
      name: 'Geography',
    },
    class: {
      id: 'clh1u2xkg0007qwer1234574',
      name: '6B',
    },
    teacher: {
      id: 'clh1u2xkg0038qwer1234604',
      name: 'Don Holloway',
    },
  },
  {
    id: 'clh1u2xkg0049qwer1234615',
    subject: {
      id: 'clh1u2xkg0023qwer1234589',
      name: 'Physics',
    },
    class: {
      id: 'clh1u2xkg0006qwer1234573',
      name: '7A',
    },
    teacher: {
      id: 'clh1u2xkg0039qwer1234605',
      name: 'Franklin Gregory',
    },
  },
  {
    id: 'clh1u2xkg0050qwer1234616',
    subject: {
      id: 'clh1u2xkg0024qwer1234590',
      name: 'Chemistry',
    },
    class: {
      id: 'clh1u2xkg0009qwer1234576',
      name: '6D',
    },
    teacher: {
      id: 'clh1u2xkg0040qwer1234606',
      name: 'Danny Nguyen',
    },
  },
];

export const examsData = [
  {
    id: 'clh1u2xkg0051qwer1234617',
    subject: {
      id: 'clh1u2xkg0021qwer1234587',
      name: 'Math',
    },
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1A',
    },
    teacher: {
      id: 'clh1u2xkg0041qwer1234607',
      name: 'Martha Morris',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0052qwer1234618',
    subject: {
      id: 'clh1u2xkg0028qwer1234594',
      name: 'English',
    },
    class: {
      id: 'clh1u2xkg0001qwer1234568',
      name: '2B',
    },
    teacher: {
      id: 'clh1u2xkg0042qwer1234608',
      name: 'Randall Garcia',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0053qwer1234619',
    subject: {
      id: 'clh1u2xkg0025qwer1234591',
      name: 'Biology',
    },
    class: {
      id: 'clh1u2xkg0002qwer1234569',
      name: '3C',
    },
    teacher: {
      id: 'clh1u2xkg0043qwer1234609',
      name: 'Myrtie Scott',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0054qwer1234620',
    subject: {
      id: 'clh1u2xkg0026qwer1234592',
      name: 'History',
    },
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1B',
    },
    teacher: {
      id: 'clh1u2xkg0054qwer1234620',
      name: 'Willie Medina',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0055qwer1234621',
    subject: {
      id: 'clh1u2xkg0028qwer1234594',
      name: 'Art',
    },
    class: {
      id: 'clh1u2xkg0003qwer1234570',
      name: '4B',
    },
    teacher: {
      id: 'clh1u2xkg0055qwer1234621',
      name: 'Jose Ruiz',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0056qwer1234622',
    subject: {
      id: 'clh1u2xkg0027qwer1234593',
      name: 'Music',
    },
    class: {
      id: 'clh1u2xkg0004qwer1234571',
      name: '5A',
    },
    teacher: {
      id: 'clh1u2xkg0056qwer1234622',
      name: 'Cassandra Monteiro',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0057qwer1234623',
    subject: {
      id: 'clh1u2xkg0026qwer1234592',
      name: 'History',
    },
    class: {
      id: 'clh1u2xkg0005qwer1234572',
      name: '5B',
    },
    teacher: {
      id: 'clh1u2xkg0057qwer1234623',
      name: 'Shawn Norman',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0058qwer1234624',
    subject: {
      id: 'clh1u2xkg0027qwer1234593',
      name: 'Geography',
    },
    class: {
      id: 'clh1u2xkg0007qwer1234574',
      name: '6B',
    },
    teacher: {
      id: 'clh1u2xkg0058qwer1234624',
      name: 'Don Holloway',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0059qwer1234625',
    subject: {
      id: 'clh1u2xkg0023qwer1234589',
      name: 'Physics',
    },
    class: {
      id: 'clh1u2xkg0006qwer1234573',
      name: '7A',
    },
    teacher: {
      id: 'clh1u2xkg0059qwer1234625',
      name: 'Franklin Gregory',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0060qwer1234626',
    subject: {
      id: 'clh1u2xkg0024qwer1234590',
      name: 'Chemistry',
    },
    class: {
      id: 'clh1u2xkg0009qwer1234576',
      name: '6D',
    },
    teacher: {
      id: 'clh1u2xkg0060qwer1234626',
      name: 'Danny Nguyen',
    },
    date: '2025-01-01',
  },
];

export const assignmentsData = [
  {
    id: 'clh1u2xkg0061qwer1234627',
    subject: {
      id: 'clh1u2xkg0021qwer1234587',
      name: 'Math',
    },
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1A',
    },
    teacher: {
      id: 'clh1u2xkg0051qwer1234617',
      name: 'Anthony Boone',
    },
    dueDate: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0062qwer1234628',
    subject: {
      id: 'clh1u2xkg0028qwer1234594',
      name: 'English',
    },
    class: {
      id: 'clh1u2xkg0001qwer1234568',
      name: '2B',
    },
    teacher: {
      id: 'clh1u2xkg0052qwer1234618',
      name: 'Clifford Bowen',
    },
    dueDate: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0063qwer1234629',
    subject: {
      id: 'clh1u2xkg0025qwer1234591',
      name: 'Biology',
    },
    class: {
      id: 'clh1u2xkg0002qwer1234569',
      name: '3C',
    },
    teacher: {
      id: 'clh1u2xkg0053qwer1234619',
      name: 'Catherine Malone',
    },
    dueDate: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0064qwer1234630',
    subject: {
      id: 'clh1u2xkg0026qwer1234592',
      name: 'History',
    },
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1B',
    },
    teacher: {
      id: 'clh1u2xkg0054qwer1234620',
      name: 'Willie Medina',
    },
    dueDate: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0065qwer1234631',
    subject: {
      id: 'clh1u2xkg0028qwer1234594',
      name: 'Art',
    },
    class: {
      id: 'clh1u2xkg0003qwer1234570',
      name: '4B',
    },
    teacher: {
      id: 'clh1u2xkg0055qwer1234621',
      name: 'Jose Ruiz',
    },
    dueDate: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0066qwer1234632',
    subject: {
      id: 'clh1u2xkg0027qwer1234593',
      name: 'Music',
    },
    class: {
      id: 'clh1u2xkg0004qwer1234571',
      name: '5A',
    },
    teacher: {
      id: 'clh1u2xkg0056qwer1234622',
      name: 'Cassandra Monteiro',
    },
    dueDate: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0067qwer1234633',
    subject: {
      id: 'clh1u2xkg0026qwer1234592',
      name: 'History',
    },
    class: {
      id: 'clh1u2xkg0005qwer1234572',
      name: '5B',
    },
    teacher: {
      id: 'clh1u2xkg0057qwer1234623',
      name: 'Shawn Norman',
    },
    dueDate: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0068qwer1234634',
    subject: {
      id: 'clh1u2xkg0027qwer1234593',
      name: 'Geography',
    },
    class: {
      id: 'clh1u2xkg0007qwer1234574',
      name: '6B',
    },
    teacher: {
      id: 'clh1u2xkg0058qwer1234624',
      name: 'Don Holloway',
    },
    dueDate: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0069qwer1234635',
    subject: {
      id: 'clh1u2xkg0023qwer1234589',
      name: 'Physics',
    },
    class: {
      id: 'clh1u2xkg0006qwer1234573',
      name: '7A',
    },
    teacher: {
      id: 'clh1u2xkg0059qwer1234625',
      name: 'Franklin Gregory',
    },
    dueDate: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0070qwer1234636',
    subject: {
      id: 'clh1u2xkg0024qwer1234590',
      name: 'Chemistry',
    },
    class: {
      id: 'clh1u2xkg0009qwer1234576',
      name: '6D',
    },
    teacher: {
      id: 'clh1u2xkg0060qwer1234626',
      name: 'Danny Nguyen',
    },
    dueDate: '2025-01-01',
  },
];

export const resultsData = [
  {
    id: 'clh1u2xkg0071qwer1234637',
    subject: {
      id: 'clh1u2xkg0021qwer1234587',
      name: 'Math',
    },
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1A',
    },
    teacher: {
      id: 'clh1u2xkg0041qwer1234607',
      name: 'Jurema Olivença',
    },
    student: {
      id: 'clh1u2xkg0001qwer1234567',
      name: 'Pedro Oliveira',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
  {
    id: 'clh1u2xkg0072qwer1234638',
    subject: {
      id: 'clh1u2xkg0028qwer1234594',
      name: 'English',
    },
    class: {
      id: 'clh1u2xkg0001qwer1234568',
      name: '2B',
    },
    teacher: {
      id: 'clh1u2xkg0042qwer1234608',
      name: 'Teodoro Queiroz',
    },
    student: {
      id: 'clh1u2xkg0002qwer1234568',
      name: 'Ana Clara Santos',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
  {
    id: 'clh1u2xkg0073qwer1234639',
    subject: {
      id: 'clh1u2xkg0025qwer1234591',
      name: 'Biology',
    },
    class: {
      id: 'clh1u2xkg0002qwer1234569',
      name: '3C',
    },
    teacher: {
      id: 'clh1u2xkg0043qwer1234609',
      name: 'Berenice Alcântara',
    },
    student: {
      id: 'clh1u2xkg0003qwer1234569',
      name: 'Miguel Costa',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
  {
    id: 'clh1u2xkg0074qwer1234640',
    subject: {
      id: 'clh1u2xkg0026qwer1234592',
      name: 'History',
    },
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1B',
    },
    teacher: {
      id: 'clh1u2xkg0044qwer1234610',
      name: 'Tibúrcio Vasconcelos',
    },
    student: {
      id: 'clh1u2xkg0004qwer1234570',
      name: 'Julia Ferreira',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
  {
    id: 'clh1u2xkg0075qwer1234641',
    subject: {
      id: 'clh1u2xkg0028qwer1234594',
      name: 'Art',
    },
    class: {
      id: 'clh1u2xkg0003qwer1234570',
      name: '4B',
    },
    teacher: {
      id: 'clh1u2xkg0045qwer1234611',
      name: 'Iracema Botelho',
    },
    student: {
      id: 'clh1u2xkg0005qwer1234571',
      name: 'Thiago Almeida',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
  {
    id: 'clh1u2xkg0076qwer1234642',
    subject: {
      id: 'clh1u2xkg0027qwer1234593',
      name: 'Music',
    },
    class: {
      id: 'clh1u2xkg0004qwer1234571',
      name: '5A',
    },
    teacher: {
      id: 'clh1u2xkg0046qwer1234612',
      name: 'Cassandra Monteiro',
    },
    student: {
      id: 'clh1u2xkg0006qwer1234572',
      name: 'Mariana Silva',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
  {
    id: 'clh1u2xkg0077qwer1234643',
    subject: {
      id: 'clh1u2xkg0026qwer1234592',
      name: 'History',
    },
    class: {
      id: 'clh1u2xkg0005qwer1234572',
      name: '5B',
    },
    teacher: {
      id: 'clh1u2xkg0047qwer1234613',
      name: 'Osvaldo Paraguaçu',
    },
    student: {
      id: 'clh1u2xkg0007qwer1234573',
      name: 'Lucas Ribeiro',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
  {
    id: 'clh1u2xkg0078qwer1234644',
    subject: {
      id: 'clh1u2xkg0027qwer1234593',
      name: 'Geography',
    },
    class: {
      id: 'clh1u2xkg0007qwer1234574',
      name: '6B',
    },
    teacher: {
      id: 'clh1u2xkg0048qwer1234614',
      name: 'Artemísia Buarque',
    },
    student: {
      id: 'clh1u2xkg0008qwer1234574',
      name: 'Isabella Martins',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
  {
    id: 'clh1u2xkg0079qwer1234645',
    subject: {
      id: 'clh1u2xkg0023qwer1234589',
      name: 'Physics',
    },
    class: {
      id: 'clh1u2xkg0006qwer1234573',
      name: '7A',
    },
    teacher: {
      id: 'clh1u2xkg0049qwer1234615',
      name: 'Demétrio Alencar',
    },
    student: {
      id: 'clh1u2xkg0009qwer1234575',
      name: 'Gabriel Santos',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
  {
    id: 'clh1u2xkg0080qwer1234646',
    subject: {
      id: 'clh1u2xkg0024qwer1234590',
      name: 'Chemistry',
    },
    class: {
      id: 'clh1u2xkg0009qwer1234576',
      name: '6D',
    },
    teacher: {
      id: 'clh1u2xkg0050qwer1234616',
      name: 'Violeta Portinari',
    },
    student: {
      id: 'clh1u2xkg0010qwer1234576',
      name: 'Sofia Pereira',
    },
    date: '2025-01-01',
    type: 'exam',
    score: 90,
  },
];

export const eventsData = [
  {
    id: 'clh1u2xkg0091qwer1234657',
    title: 'Lake Trip',
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1A',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 'clh1u2xkg0092qwer1234658',
    title: 'Picnic',
    class: {
      id: 'clh1u2xkg0001qwer1234568',
      name: '2B',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 'clh1u2xkg0093qwer1234659',
    title: 'Beach Trip',
    class: {
      id: 'clh1u2xkg0002qwer1234569',
      name: '3C',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 'clh1u2xkg0094qwer1234660',
    title: 'Museum Trip',
    class: {
      id: 'clh1u2xkg0003qwer1234570',
      name: '4B',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 'clh1u2xkg0095qwer1234661',
    title: 'Music Concert',
    class: {
      id: 'clh1u2xkg0004qwer1234571',
      name: '5A',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 'clh1u2xkg0096qwer1234662',
    title: 'Magician Show',
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1A',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 'clh1u2xkg0097qwer1234663',
    title: 'Lake Trip',
    class: {
      id: 'clh1u2xkg0001qwer1234568',
      name: '2B',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 'clh1u2xkg0098qwer1234664',
    title: 'Cycling Race',
    class: {
      id: 'clh1u2xkg0002qwer1234569',
      name: '3C',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 'clh1u2xkg0099qwer1234665',
    title: 'Art Exhibition',
    class: {
      id: 'clh1u2xkg0003qwer1234570',
      name: '4B',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
  {
    id: 'clh1u2xkg0100qwer1234666',
    title: 'Sports Tournament',
    class: {
      id: 'clh1u2xkg0005qwer1234572',
      name: '5B',
    },
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
  },
];

export const announcementsData = [
  {
    id: 'clh1u2xkg0101qwer1234667',
    title: 'About 4A Math Test',
    description:
      'Important information about the upcoming math test for class 4A. Please review all chapters covered in class.',
    class: {
      id: 'clh1u2xkg0003qwer1234570',
      name: '4B',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0102qwer1234668',
    title: 'About 3A Math Test',
    description: 'Details about the math test for class 3A. Make sure to practice algebra problems from chapters 1-5.',
    class: {
      id: 'clh1u2xkg0002qwer1234569',
      name: '3C',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0103qwer1234669',
    title: 'About 3B Math Test',
    description: 'Information regarding the upcoming math assessment for class 3B. Focus on geometry and fractions.',
    class: {
      id: 'clh1u2xkg0002qwer1234569',
      name: '3C',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0104qwer1234670',
    title: 'About 6A Math Test',
    description:
      'Important announcement about the math exam for class 6A. Study advanced algebra and trigonometry concepts.',
    class: {
      id: 'clh1u2xkg0007qwer1234574',
      name: '6B',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0105qwer1234671',
    title: 'About 8C Math Test',
    description: 'Details for class 8C math examination. Review calculus fundamentals and complex equations.',
    class: {
      id: 'clh1u2xkg0009qwer1234576',
      name: '6D',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0106qwer1234672',
    title: 'About 2A Math Test',
    description: 'Information about the math test for class 2A. Focus on basic arithmetic and problem-solving skills.',
    class: {
      id: 'clh1u2xkg0001qwer1234568',
      name: '2B',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0107qwer1234673',
    title: 'About 4C Math Test',
    description:
      'Announcement regarding the math assessment for class 4C. Study multiplication, division, and word problems.',
    class: {
      id: 'clh1u2xkg0003qwer1234570',
      name: '4B',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0108qwer1234674',
    title: 'About 4B Math Test',
    description: 'Important details about the upcoming math test for class 4B. Review fractions and decimals.',
    class: {
      id: 'clh1u2xkg0003qwer1234570',
      name: '4B',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0109qwer1234675',
    title: 'About 3C Math Test',
    description:
      'Information about the math examination for class 3C. Practice measurement and basic geometry concepts.',
    class: {
      id: 'clh1u2xkg0002qwer1234569',
      name: '3C',
    },
    date: '2025-01-01',
  },
  {
    id: 'clh1u2xkg0110qwer1234676',
    title: 'About 1C Math Test',
    description: 'Details about the math assessment for class 1C. Focus on number recognition and basic addition.',
    class: {
      id: 'clh1u2xkg0000qwer1234567',
      name: '1A',
    },
    date: '2025-01-01',
  },
];

// YOU SHOULD CHANGE THE DATES OF THE EVENTS TO THE CURRENT DATE TO SEE THE EVENTS ON THE CALENDAR
export const calendarEvents = [
  {
    title: 'Math',
    allDay: false,
    start: new Date(2024, 9, 21, 8, 0),
    end: new Date(2024, 9, 21, 9, 30),
  },
  {
    title: 'English',
    allDay: false,
    start: new Date(2024, 9, 21, 10, 0),
    end: new Date(2024, 9, 21, 11, 30),
  },
  {
    title: 'Biology',
    allDay: false,
    start: new Date(2024, 9, 21, 13, 0),
    end: new Date(2024, 9, 21, 14, 30),
  },
  {
    title: 'Physics',
    allDay: false,
    start: new Date(2024, 9, 21, 15, 0),
    end: new Date(2024, 9, 21, 17, 0),
  },
  {
    title: 'Chemistry',
    allDay: false,
    start: new Date(2024, 9, 22, 8, 0),
    end: new Date(2024, 9, 22, 9, 30),
  },
  {
    title: 'History',
    allDay: false,
    start: new Date(2024, 9, 22, 10, 0),
    end: new Date(2024, 9, 22, 11, 30),
  },
  {
    title: 'English',
    allDay: false,
    start: new Date(2024, 9, 22, 13, 0),
    end: new Date(2024, 9, 22, 14, 30),
  },
  {
    title: 'Biology',
    allDay: false,
    start: new Date(2024, 9, 22, 15, 0),
    end: new Date(2024, 9, 22, 16, 30),
  },
  {
    title: 'Physics',
    allDay: false,
    start: new Date(2024, 9, 23, 8, 0),
    end: new Date(2024, 9, 23, 9, 30),
  },
  {
    title: 'History',
    allDay: false,
    start: new Date(2024, 9, 23, 10, 0),
    end: new Date(2024, 9, 23, 12, 0),
  },
  {
    title: 'Math',
    allDay: false,
    start: new Date(2024, 9, 23, 13, 0),
    end: new Date(2024, 9, 23, 14, 30),
  },
  {
    title: 'Biology',
    allDay: false,
    start: new Date(2024, 9, 23, 15, 0),
    end: new Date(2024, 9, 23, 16, 30),
  },
  {
    title: 'Chemistry',
    allDay: false,
    start: new Date(2024, 9, 24, 8, 0),
    end: new Date(2024, 9, 24, 9, 30),
  },
  {
    title: 'History',
    allDay: false,
    start: new Date(2024, 9, 24, 10, 0),
    end: new Date(2024, 9, 24, 11, 30),
  },
  {
    title: 'English',
    allDay: false,
    start: new Date(2024, 9, 24, 13, 0),
    end: new Date(2024, 9, 24, 14, 30),
  },
  {
    title: 'Biology',
    allDay: false,
    start: new Date(2024, 9, 24, 15, 0),
    end: new Date(2024, 9, 24, 16, 30),
  },
  {
    title: 'Physics',
    allDay: false,
    start: new Date(2024, 9, 25, 8, 0),
    end: new Date(2024, 9, 25, 10, 0),
  },
  {
    title: 'History',
    allDay: false,
    start: new Date(2024, 9, 25, 10, 30),
    end: new Date(2024, 9, 25, 12, 0),
  },
  {
    title: 'Math',
    allDay: false,
    start: new Date(2024, 9, 25, 13, 0),
    end: new Date(2024, 9, 25, 14, 30),
  },
  {
    title: 'English',
    allDay: false,
    start: new Date(2024, 9, 25, 15, 0),
    end: new Date(2024, 9, 25, 16, 30),
  },
];
