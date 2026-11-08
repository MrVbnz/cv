import type { ResumeData } from '../types';

export default {
  meta: {
    title: 'Efremov Dmitry',
    description:
      'I am Dmitry Efremov, a Unity developer with team leadership experience. I develop VR projects, gameplay systems, and 3D editors, working with procedural geometry, shaders, VFX, and optimization. I also have full-stack development experience with ASP.NET, EF Core, and React.',
  },
  ui: {
    navigation: 'Resume navigation',
    toggleNavigation: 'Toggle navigation',
    language: 'Language',
    contacts: 'Contact links',
    skipToContent: 'Skip to content',
    portraitAlt: 'Dmitry Efremov',
    sections: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      interests: 'Interests',
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
    surname: 'Efremov',
    givenName: 'Dmitry',
    email: 'd.efremov2001@mail.ru',
    location: 'Yekaterinburg · remote · open to relocation',
    summary:
      'I am Dmitry Efremov, a Unity developer with team leadership experience. I develop VR projects, gameplay systems, and 3D editors, working with procedural geometry, shaders, VFX, and optimization. I also have full-stack development experience with ASP.NET, EF Core, and React.',
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
      title: 'Technical Skills',
      groups: [
        {
          title: 'Expert',
          items: ['Unity', 'C#'],
        },
        {
          title: 'Proficient',
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
          title: 'Intermediate',
          items: ['C/C++', 'JavaScript', 'Python', 'Java', 'WPF', 'Windows Forms'],
        },
      ],
    },
    {
      id: 'unity-assets',
      title: 'Unity Libraries and Tools',
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
      title: '3D and Gameplay Systems',
      groups: [
        {
          items: [
            'Matrix transformations and contour geometry',
            'Procedural mesh generation',
            'Component-based architecture and deterministic combat logic',
            'Shaders, VFX, and graphics optimization',
            'Unity Director and playback control',
          ],
        },
      ],
    },
    {
      id: 'teamwork',
      title: 'Teamwork',
      groups: [
        {
          items: [
            'Team communication',
            'Team management, task decomposition and delegation',
            'Training and onboarding new team members',
          ],
        },
      ],
    },
    {
      id: '3d-tools',
      title: '3D Tools',
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
      role: 'Unity developer',
      company: 'JetStyle',
      companyUrl: 'https://jet.style/',
      period: 'September 2025 — August 2026',
    },
    {
      id: 'ceramic-3d',
      role: 'Unity developer',
      company: 'Ceramic 3D',
      companyUrl: 'https://www.ceramic3d.com/',
      period: 'September 2024 — August 2025',
    },
    {
      id: 'novatrans',
      role: 'Unity VR developer, team lead',
      company: 'NovATrans',
      companyUrl: 'https://npcat.ru/',
      period: 'September 2023 — September 2024',
    },
  ],
  projects: [
    {
      id: 'jetstyle',
      title: 'JetStyle',
      items: [
        {
          id: 'mobile-multiplayer-rts',
          title: 'Mobile Multiplayer RTS',
          technologies: [{ label: 'Technologies', value: 'Unity, C#' }],
          paragraphs: [
            'Refactored the unit assembly system to introduce a component-based model. Contributed to refactoring the combat system, achieving deterministic battles. Added a new game mode based on these changes.',
            'Updated the UI, added a sound system, and ported features from the previous project iteration.',
          ],
        },
        {
          id: 'large-scale-vr-attraction',
          title: 'Large-Scale VR Attraction',
          technologies: [
            { label: 'Technologies', value: 'Unity, C#, Unity Director, VFX, shaders' },
          ],
          paragraphs: [
            'Prototyped mechanics and visual effects, built demo scenes, and refined prototypes through short feedback-driven iterations. Integrated prototypes into production scenarios.',
            'Worked with Unity Director on slow motion, playback control, and a custom sound system. Configured graphics and shaders and worked on optimization.',
          ],
        },
        {
          id: 'android-app-maintenance',
          title: 'Android Application Maintenance',
          technologies: [{ label: 'Technologies', value: 'Android, .NET MAUI, KCP Protocol' }],
          paragraphs: [
            'Fixed application crashes, multithreading bugs, and networking issues in an existing project.',
          ],
        },
        {
          id: 'vr-headset-api-research',
          title: 'VR Headset API Research',
          technologies: [{ label: 'Focus', value: 'VR, VR headset APIs' }],
          paragraphs: ['Researched new VR headset APIs and their potential use in projects.'],
        },
      ],
    },
    {
      id: 'ceramic-3d',
      title: 'Ceramic 3D',
      items: [
        {
          id: 'interior-furniture-editor',
          title: 'Interior, Furniture, and Storage System Editor',
          technologies: [
            { label: 'Technologies', value: 'Unity, C#, Delphi, SQLite, Addressables' },
          ],
          paragraphs: [
            'Developed features in an existing editor, working with legacy code and applying matrix transformations and contour geometry. Updated the importer for a proprietary model format, and refactored and extended the spatial measurement system.',
            'Fixed numerous procedural mesh generation bugs. Used Delphi knowledge to understand how to work with an undocumented legacy database.',
            'Refactored the system for loading available parts from local and remote databases.',
          ],
        },
      ],
    },
    {
      id: 'novatrans',
      title: 'NPC NovATrans',
      items: [
        {
          id: 'virtual-station',
          title: 'Virtual Station (Web Backend, Frontend)',
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
              label: 'Desktop Client',
              value: 'Unity',
            },
          ],
          paragraphs: [
            'Contributed to a multiplayer project with VR and desktop support. Initially focused on maintaining and enhancing backend functionality, later worked on frontend updates. Ported the infrastructure from an IIS Windows server to Docker Compose for improved deployment.',
          ],
        },
        {
          id: 'ar-exhibition',
          title: 'AR Exhibition Stand (Fullstack)',
          technologies: [
            {
              label: 'Backend',
              value: 'Node.js, Nginx',
            },
            {
              label: 'Frontend',
              value: 'JavaScript with Three.js and AR.js',
            },
          ],
          paragraphs: [
            'Developed a web-based AR application from scratch, enabling augmented reality experiences through local hosting with HTTPS to allow browser camera access. Designed for an exhibition stand combining physical miniatures and AR content.',
          ],
        },
        {
          id: 'museum-exhibition',
          title: 'Interactive Museum Exhibition',
          technologies: [
            {
              label: 'Technologies',
              value: 'Unity, Arduino IDE',
            },
          ],
          paragraphs: [
            'Created an interactive exhibit for a museum featuring touch screens displaying dynamic content. Designed a moving display controlled by servo motors, representing the development of high-speed railways over time.',
          ],
        },
        {
          id: 'tem18dm-simulator',
          title: 'VR Simulator for TEM18DM Locomotive Training',
          technologies: [
            {
              label: 'Technology',
              value: 'Unity with a Custom Scenario Editor',
            },
          ],
          paragraphs: [
            'Improved and extended a custom scenario editor, developing new mechanics and training scenarios to enhance simulator functionality.',
          ],
        },
        {
          id: 'ep2d-simulator',
          title: 'VR Simulator for Extreme Situations on EP2D Train',
          technologies: [
            {
              label: 'Technologies',
              value: 'Unity, Custom Scenario Editor, Physical Fire Simulation',
            },
          ],
          paragraphs: [
            'Redesigned a scenario editor using a node graph structure for creating branching and multiplayer scenarios, streamlining the workflow for new team members.',
            'Developed a node-based fire spread simulation tool with object property baking to simulate fire dynamics and interactions, such as extinguisher use. The fire effects are rendered using Unity Visual Effect Graph.',
            'Trained new employees and contributed to scenario creation using the new editor.',
          ],
        },
      ],
    },
    {
      id: 'personal',
      title: 'University / Personal Projects',
      items: [
        {
          id: 'graph-editor',
          title: 'Online Real-Time Graph Editor (Fullstack)',
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
            'Developed a collaborative graph editor supporting real-time, multi-user editing similar to Google Docs. Primarily worked on backend architecture and database integration, occasionally updating the frontend to align with API changes.',
          ],
        },
        {
          id: 'cloud-functions',
          title: 'Multi-Target Cloud Functions Runner (Backend)',
          technologies: [
            {
              label: 'Backend',
              value: 'Flask-RESTful, MongoDB',
            },
          ],
          paragraphs: [
            'Built a service that integrates multiple cloud function providers (AWS, Yandex, Sber, Selectel) into a unified REST API. The service supports versioning, uploading, and deploying functions, automatically adapting them to provider-specific formats.',
          ],
        },
      ],
    },
  ],
  interests: [
    {
      id: 'game-development',
      title: 'Game Mechanics / Shader Development',
      description: 'I enjoy creating unique gameplay mechanics and visual effects.',
    },
    {
      id: 'low-level-programming',
      title: 'Low-Level Programming',
      description:
        'I implement algorithms that interest me in C/C++ to better understand how they work and how to optimize them.',
    },
    {
      id: 'outdoors',
      title: 'Outdoor Activities',
      description: 'I enjoy trekking, hiking, and cycling.',
    },
    {
      id: 'miniatures',
      title: '3D Printing and Miniature Painting',
      description: 'I enjoy 3D printing, creating and painting miniatures.',
    },
  ],
} satisfies ResumeData;
