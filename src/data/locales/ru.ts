import type { ResumeData } from '../types';

export default {
  meta: {
    title: 'Ефремов Дмитрий — резюме',
    description:
      'Я Дмитрий Ефремов, Unity-разработчик с опытом руководства командой. Разрабатываю VR-проекты, игровые механики и 3D-редакторы. Работаю с процедурной геометрией, шейдерами, VFX и оптимизацией. Есть опыт fullstack-разработки на ASP.NET, EF Core и React.',
  },
  ui: {
    navigation: 'Навигация по резюме',
    toggleNavigation: 'Переключить навигацию',
    language: 'Язык',
    contacts: 'Способы связи',
    skipToContent: 'Перейти к содержанию',
    portraitAlt: 'Дмитрий Ефремов',
    sections: {
      about: 'О себе',
      skills: 'Навыки',
      experience: 'Опыт',
      projects: 'Проекты',
      interests: 'Интересы',
    },
  },
  languages: [
    {
      code: 'en',
      label: 'EN',
    },
    {
      code: 'ru',
      label: 'RU',
    },
  ],
  profile: {
    surname: 'Ефремов',
    givenName: 'Дмитрий',
    email: 'd.efremov2001@mail.ru',
    location: 'Екатеринбург · удалённо · готов к переезду',
    summary:
      'Я Дмитрий Ефремов, Unity-разработчик с опытом руководства командой. Разрабатываю VR-проекты, игровые механики и 3D-редакторы. Работаю с процедурной геометрией, шейдерами, VFX и оптимизацией. Есть опыт fullstack-разработки на ASP.NET, EF Core и React.',
    social: [
      {
        label: 'GitHub',
        kind: 'github',
        href: 'https://github.com/MrVbnz',
      },
      {
        label: 'Telegram',
        kind: 'telegram',
        href: 'https://t.me/mrvbnz',
      },
      {
        label: 'LinkedIn',
        kind: 'linkedin',
        href: 'https://www.linkedin.com/in/dmitry-efr/',
      },
    ],
  },
  skills: [
    {
      id: 'technical',
      title: 'Технические навыки',
      groups: [
        {
          title: 'Экспертный уровень',
          items: ['Unity', 'C#'],
        },
        {
          title: 'Уверенное владение',
          items: [
            'ASP.NET',
            'Entity Framework Core',
            'Nginx',
            'SignalR',
            'React (TypeScript)',
            'Docker Compose',
          ],
        },
        {
          title: 'Средний уровень',
          items: ['C/C++', 'JavaScript', 'Python', 'Java', 'WPF', 'Windows Forms'],
        },
      ],
    },
    {
      id: 'unity-assets',
      title: 'Библиотеки и инструменты Unity',
      groups: [
        {
          items: [
            'Zenject',
            'VContainer',
            'Mirror',
            'DOTween',
            'UniTask',
            'BNG VR Interaction Framework',
          ],
        },
      ],
    },
    {
      id: '3d-development',
      title: '3D и игровые системы',
      groups: [
        {
          items: [
            'Матричные преобразования и геометрия контуров',
            'Процедурная генерация мешей',
            'Компонентная архитектура и детерминированная боевая логика',
            'Шейдеры, VFX и оптимизация графики',
            'Unity Director и управление воспроизведением',
          ],
        },
      ],
    },
    {
      id: 'teamwork',
      title: 'Командная работа',
      groups: [
        {
          items: [
            'Коммуникация в команде',
            'Управление командой, декомпозиция и распределение задач',
            'Обучение и адаптация новых сотрудников',
          ],
        },
      ],
    },
    {
      id: '3d-tools',
      title: '3D-инструменты',
      groups: [
        {
          items: ['Cinema 4D', 'Blender'],
        },
      ],
    },
  ],
  experience: [
    {
      id: 'jetstyle',
      role: 'Unity-разработчик',
      company: 'JetStyle',
      companyUrl: 'https://jetstyle.ru/',
      period: 'Сентябрь 2026 — настоящее время',
    },
    {
      id: 'ceramic-3d',
      role: 'Unity-разработчик',
      company: 'Ceramic 3D',
      companyUrl: 'https://ru.ceramic3d.com/',
      period: 'Сентябрь 2024 — август 2026',
    },
    {
      id: 'novatrans',
      role: 'Unity VR-разработчик, тимлид',
      company: 'NovATrans',
      companyUrl: 'https://npcat.ru/',
      period: 'Сентябрь 2023 — сентябрь 2024',
    },
  ],
  projects: [
    {
      id: 'jetstyle',
      title: 'JetStyle',
      items: [
        {
          id: 'mobile-multiplayer-rts',
          title: 'Мобильная многопользовательская RTS',
          technologies: [{ label: 'Технологии', value: 'Unity, C#' }],
          paragraphs: [
            'Переработал систему сборки юнитов, внедрив компонентную модель. Участвовал в рефакторинге боевой системы: добились детерминированных боёв. На основе этих изменений добавил новый игровой режим.',
            'Обновлял интерфейс, добавил систему звуков и переносил функциональность из предыдущей итерации проекта.',
          ],
        },
        {
          id: 'large-scale-vr-attraction',
          title: 'Масштабный VR-аттракцион',
          technologies: [{ label: 'Технологии', value: 'Unity, C#, Unity Director, VFX, шейдеры' }],
          paragraphs: [
            'Прототипировал механики и визуальные эффекты, собирал демонстрационные сцены и дорабатывал прототипы короткими итерациями по обратной связи. Интегрировал прототипы в рабочие сценарии.',
            'Работал с Unity Director: реализовывал замедление времени, управление воспроизведением и собственную систему звуков. Настраивал графику и шейдеры, занимался оптимизацией.',
          ],
        },
        {
          id: 'android-app-maintenance',
          title: 'Поддержка Android-приложения',
          technologies: [{ label: 'Технологии', value: 'Android, .NET MAUI, KCP Protocol' }],
          paragraphs: [
            'Исправлял падения приложения, ошибки многопоточности и сетевого взаимодействия в существующем проекте.',
          ],
        },
        {
          id: 'vr-headset-api-research',
          title: 'Исследование API VR-шлемов',
          technologies: [{ label: 'Направление', value: 'VR, API VR-шлемов' }],
          paragraphs: ['Исследовал новые API VR-шлемов и возможности их применения в проектах.'],
        },
      ],
    },
    {
      id: 'ceramic-3d',
      title: 'Ceramic 3D',
      items: [
        {
          id: 'interior-furniture-editor',
          title: 'Редактор интерьеров, мебели и систем хранения',
          technologies: [{ label: 'Технологии', value: 'Unity, C#, Delphi, SQLite, Addressables' }],
          paragraphs: [
            'Развивал существующий редактор, работая с легаси-кодом и применяя матричные преобразования и геометрию контуров. Обновил импортёр моделей собственного формата, переработал и расширил систему пространственных измерений.',
            'Исправил многочисленные ошибки процедурной генерации мешей. Использовал знания Delphi, чтобы разобраться в работе со старой базой данных без документации.',
            'Переработал систему загрузки доступных деталей из локальных и удалённых баз данных.',
          ],
        },
      ],
    },
    {
      id: 'novatrans',
      title: 'НПЦ NovATrans',
      items: [
        {
          id: 'virtual-station',
          title: 'Виртуальная станция (Web Backend, Frontend)',
          technologies: [
            {
              label: 'Backend',
              value: 'ASP.NET, EF Core',
            },
            {
              label: 'Frontend',
              value: 'Vite, React (TypeScript), Bootstrap',
            },
            {
              label: 'Десктоп-клиент',
              value: 'Unity',
            },
          ],
          paragraphs: [
            'Участвовал в разработке многопользовательского проекта с поддержкой VR и ПК. Первоначально занимался поддержкой и улучшением бэкенда, позже работал над обновлениями фронтенда. Перенёс инфраструктуру с IIS (Windows Server) на Docker Compose для упрощения развертывания.',
          ],
        },
        {
          id: 'ar-exhibition',
          title: 'AR-стенд для выставки (Fullstack)',
          technologies: [
            {
              label: 'Backend',
              value: 'Node.js, Nginx',
            },
            {
              label: 'Frontend',
              value: 'JavaScript с Three.js и AR.js',
            },
          ],
          paragraphs: [
            'Разработал веб-приложение с дополненной реальностью с нуля, реализовав локальный хостинг через HTTPS для доступа к камере браузера. Проект предназначен для выставочного стенда, объединяющего физические макеты с AR-контентом.',
          ],
        },
        {
          id: 'museum-exhibition',
          title: 'Интерактивная музейная экспозиция',
          technologies: [
            {
              label: 'Технологии',
              value: 'Unity, Arduino IDE',
            },
          ],
          paragraphs: [
            'Создал интерактивную экспозицию для музея с сенсорными экранами, отображающими динамический контент. Разработал движущийся стенд с сервоприводами, визуализирующий развитие скоростных железных дорог.',
          ],
        },
        {
          id: 'tem18dm-simulator',
          title: 'VR-симулятор для обучения на локомотиве ТЭМ18ДМ',
          technologies: [
            {
              label: 'Технология',
              value: 'Unity с кастомным редактором сценариев',
            },
          ],
          paragraphs: [
            'Улучшил и расширил редактор сценариев, разработав новые механики и учебные сценарии для повышения функциональности симулятора.',
          ],
        },
        {
          id: 'ep2d-simulator',
          title: 'VR-симулятор экстремальных ситуаций на поезде ЭП2Д',
          technologies: [
            {
              label: 'Технологии',
              value: 'Unity, кастомный редактор сценариев, физическая симуляция огня',
            },
          ],
          paragraphs: [
            'Переработал редактор сценариев, используя граф задач для создания нелинейных многопользовательских сценариев и упростив работу для новых сотрудников.',
            'Разработал инструмент симуляции распространения огня на основе графа с запеканием свойств объектов, позволяющий моделировать динамику пожара и взаимодействие с ним (например, использование огнетушителя). Визуальные эффекты огня реализованы с помощью Unity Visual Effect Graph.',
            'Проводил обучение новых сотрудников и помогал в создании сценариев с использованием нового редактора.',
          ],
        },
      ],
    },
    {
      id: 'personal',
      title: 'Университетские / личные проекты',
      items: [
        {
          id: 'graph-editor',
          title: 'Онлайн-редактор графов в реальном времени (Fullstack)',
          technologies: [
            {
              label: 'Backend',
              value: 'ASP.NET, EF Core, SignalR',
            },
            {
              label: 'Frontend',
              value: 'React (TypeScript), Bootstrap',
            },
          ],
          paragraphs: [
            'Разработал редактор графов с поддержкой совместного редактирования в реальном времени, аналогично Google документам. В основном работал над архитектурой бэкенда и интеграцией с базой данных, иногда обновляя фронтенд для соответствия изменениям API.',
          ],
        },
        {
          id: 'cloud-functions',
          title: 'Многоцелевой сервис для выполнения облачных функций (Backend)',
          technologies: [
            {
              label: 'Backend',
              value: 'Flask-RESTful, MongoDB',
            },
          ],
          paragraphs: [
            'Разработал сервис, объединяющий несколько провайдеров облачных функций (AWS, Yandex, Sber, Selectel) в единый REST API. Поддерживает версионирование, загрузку и развертывание функций, автоматически адаптируя их под форматы разных провайдеров.',
          ],
        },
      ],
    },
  ],
  interests: [
    {
      id: 'game-development',
      title: 'Разработка механик / шейдеров',
      description: 'Люблю создавать уникальные игровые механики и визуальные эффекты.',
    },
    {
      id: 'low-level-programming',
      title: 'Низкоуровневое программирование',
      description:
        'Реализую интересные мне алгоритмы на C/C++, чтобы лучше понять их суть и методы оптимизации.',
    },
    {
      id: 'outdoors',
      title: 'Активный отдых',
      description: 'Увлекаюсь треккингом, походами и велопрогулками.',
    },
    {
      id: 'miniatures',
      title: '3D-печать и покраска миниатюр',
      description: 'Люблю 3D-печать, создаю и крашу миниатюры.',
    },
  ],
} satisfies ResumeData;
