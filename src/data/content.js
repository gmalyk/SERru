// Shared content data for all designs
// Based on omoreco.ru content

export const organizationInfo = {
  name: 'Союз Экологов России',
  fullName: 'Общероссийское межотраслевое объединение работодателей в сфере экологии и природопользования',
  shortName: 'ОМОР',
  registration: {
    ogrn: '1237700611862',
    inn: '9707007208',
    date: '14 сентября 2023'
  }
};

export const contactInfo = {
  address: '119334, Москва, ул. Вавилова, д. 24, подъезд 3, офис 618',
  phone: '+7 495 410 15 21',
  email: 'info@omor-eco.ru',
  telegram: '@soyuzecologov'
};

export const navigation = [
  { id: 'home', label: 'Главная', href: '#' },
  { id: 'about', label: 'О Союзе', href: '#about', submenu: [
    { label: 'Цели и задачи', href: '#goals' },
    { label: 'Устав', href: '#charter' },
    { label: 'Полномочия', href: '#authority' },
    { label: 'Как вступить', href: '#join' }
  ]},
  { id: 'activities', label: 'Деятельность ОМОР', href: '#activities' },
  { id: 'structure', label: 'Структура ОМОР', href: '#structure' },
  { id: 'events', label: 'Мероприятия', href: '#events' },
  { id: 'news', label: 'Новости', href: '#news' },
  { id: 'seminars', label: 'Семинары', href: '#seminars' },
  { id: 'contacts', label: 'Контакты', href: '#contacts' }
];

export const leadership = [
  {
    id: 1,
    name: 'Кондратьева Виктория',
    position: 'Президент',
    description: 'Руководит стратегическим развитием организации'
  },
  {
    id: 2,
    name: 'Прокофьев Сергей',
    position: 'Вице-президент',
    description: 'Председатель Совета по профессиональным квалификациям'
  },
  {
    id: 3,
    name: 'Тюрин Владислав',
    position: 'Генеральный директор',
    description: 'Управление операционной деятельностью организации'
  }
];

export const services = [
  {
    id: 1,
    title: 'Профессиональные стандарты',
    description: 'Разработка и актуализация профессиональных стандартов в сфере экологии',
    icon: 'document'
  },
  {
    id: 2,
    title: 'Обучающие семинары',
    description: 'Вебинары и семинары по экологическому законодательству и практике',
    icon: 'education'
  },
  {
    id: 3,
    title: 'Независимая оценка квалификаций',
    description: 'Сертификация специалистов в области экологии',
    icon: 'certificate'
  },
  {
    id: 4,
    title: 'Консультации',
    description: 'Экспертная поддержка по вопросам природопользования',
    icon: 'consultation'
  },
  {
    id: 5,
    title: 'Социальное партнёрство',
    description: 'Развитие взаимодействия между государством, обществом и бизнесом',
    icon: 'partnership'
  },
  {
    id: 6,
    title: 'Нормативная база',
    description: 'Актуальная информация об экологическом законодательстве',
    icon: 'legal'
  }
];

export const news = [
  {
    id: 1,
    title: 'Вебинар по отчётности в Росприроднадзор',
    date: '27 ноября 2025',
    excerpt: 'Приглашаем на вебинар о порядке предоставления отчётности в территориальные органы Росприроднадзора.',
    category: 'Вебинары'
  },
  {
    id: 2,
    title: 'Экологическая модернизация бизнеса',
    date: '9 октября 2025',
    excerpt: 'Обзор изменений законодательства и практические рекомендации для предприятий.',
    category: 'Семинары'
  },
  {
    id: 3,
    title: 'Расширенная ответственность производителей',
    date: '15 сентября 2025',
    excerpt: 'Новые требования к системе РОП и порядок выполнения нормативов утилизации.',
    category: 'Законодательство'
  },
  {
    id: 4,
    title: 'Заседание Совета по профквалификациям',
    date: '1 сентября 2025',
    excerpt: 'Утверждены новые профессиональные стандарты в области обращения с отходами.',
    category: 'Новости'
  }
];

export const statistics = [
  { value: '500+', label: 'Членов организации' },
  { value: '50+', label: 'Проведённых семинаров' },
  { value: '1000+', label: 'Обученных специалистов' },
  { value: '15', label: 'Профессиональных стандартов' }
];

export const aboutText = {
  mission: 'Союз Экологов России развивает социальное партнёрство и межотраслевое взаимодействие в сфере экологии и природопользования, обеспечивая участие работодателей в выработке единой политики в области трудовых отношений.',
  goals: [
    'Развитие социального партнёрства в сфере экологии',
    'Разработка профессиональных стандартов',
    'Проведение независимой оценки квалификаций',
    'Организация обучающих мероприятий',
    'Взаимодействие с органами государственной власти'
  ]
};

export const footerLinks = [
  {
    title: 'О Союзе',
    links: [
      { label: 'Цели и задачи', href: '#goals' },
      { label: 'Устав', href: '#charter' },
      { label: 'Руководство', href: '#leadership' },
      { label: 'Как вступить', href: '#join' }
    ]
  },
  {
    title: 'Деятельность',
    links: [
      { label: 'Мероприятия', href: '#events' },
      { label: 'Семинары', href: '#seminars' },
      { label: 'Новости', href: '#news' },
      { label: 'Документы', href: '#documents' }
    ]
  },
  {
    title: 'Квалификации',
    links: [
      { label: 'Профстандарты', href: '#standards' },
      { label: 'СПК', href: '#spk' },
      { label: 'Сертификация', href: '#certification' },
      { label: 'Реестр', href: '#registry' }
    ]
  }
];
