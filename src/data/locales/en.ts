import type { ResumeData } from '../types';

const summary = [
  'C# developer with three years of professional experience. In Unity, I built scenario authoring tools for VR training simulators and took gameplay mechanics for a VR attraction from prototype to project handover. I also worked on the combat system for a mobile multiplayer RTS and procedural mesh generation in a 3D interior and furniture design tool.',
  'I enjoy integration work and exploring unfamiliar technologies. I often take on tasks beyond Unity development.',
];

export default {
  meta: {
    title: 'Dmitry Efremov',
    description: summary.join(' '),
  },
  ui: {
    navigation: 'Resume navigation',
    toggleNavigation: 'Toggle navigation',
    language: 'Language',
    contacts: 'Contact links',
    sections: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      interests: 'Interests',
      education: 'Education',
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
    summary: summary,
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
    givenNameFirst: true,
  },
  skills: [
    {
      id: 'technical',
      title: 'Core Stack and Focus Areas',
      groups: [
        {
          items: [
            'Unity, C#',
            'VR training simulators and LBE',
            'Gameplay systems',
            '3D editors, geometry, and procedural meshes',
            'Shaders, VFX, and graphics optimization',
          ],
        },
      ],
    },
    {
      id: 'unity-assets',
      title: 'Unity Tools and Libraries',
      groups: [
        {
          items: [
            'Zenject',
            'VContainer',
            'Mirror',
            'DOTween',
            'UniTask',
            'R3 (successor to UniRx)',
            'MemoryPack',
            'BNG VR Interaction Framework',
            'Playable Director',
            'Addressables',
            'Visual Effect Graph',
          ],
        },
      ],
    },
    {
      id: 'team-leadership',
      title: 'Development Coordination',
      groups: [
        {
          items: [
            'Task allocation within a development team',
            'Coordination with 3D modelers',
            'Onboarding and mentoring new developers',
            'Release coordination and client handover',
          ],
        },
      ],
    },
    {
      id: 'other-tools',
      title: 'Other Languages and Tools',
      groups: [
        {
          items: ['C/C++', 'Python', 'Blender', 'Cinema 4D'],
        },
        {
          title: 'AI-assisted development',
          items: [
            'Repository instructions (AGENTS.md)',
            'Implementation plans for multi-step tasks (ExecPlans)',
            'MCP tools',
          ],
        },
      ],
    },
    {
      id: 'project-technologies',
      title: 'Additional Project Technologies',
      groups: [
        {
          title: 'Web development and deployment',
          text: 'ASP.NET, EF Core, React (TypeScript), SignalR, Docker Compose, Nginx',
        },
        {
          title: 'Android app maintenance',
          text: '.NET MAUI',
        },
        {
          title: 'Web-based AR application',
          text: 'JavaScript, Three.js, AR.js',
        },
      ],
    },
  ],
  experience: [
    {
      id: 'jetstyle',
      role: 'Unity Developer',
      company: 'JetStyle',
      companyUrl: 'https://jet.style/',
      period: 'September 2025 – August 2026',
    },
    {
      id: 'ceramic-3d',
      role: 'Unity Developer',
      company: 'Ceramic 3D',
      companyUrl: 'https://www.ceramic3d.com/',
      period: 'September 2024 – August 2025',
    },
    {
      id: 'novatrans',
      role: 'Unity VR Developer',
      company: 'NovATrans',
      companyUrl: 'https://npcat.ru/',
      period: 'September 2023 – September 2024',
    },
  ],
  projects: [
    {
      id: 'jetstyle',
      title: 'JetStyle',
      items: [
        {
          id: 'large-scale-vr-attraction',
          title: 'Location-Based VR Attraction',
          technologies: [
            {
              label: 'Technologies',
              value: 'Unity, C#, Playable Director, HDRP, ray tracing, shaders, VFX',
            },
            {
              label: 'Platforms',
              value:
                'PC VR · Quest 2, Quest 3, and PICO 4 for development · VIVE Focus Vision for testing and as the release target',
            },
          ],
          paragraphs: [
            'A location-based entertainment (LBE) experience focused on high-quality graphics and immersion. The recording feature used physical camera tracking to composite footage of the player with gameplay from the virtual world.',
            'I developed gameplay mechanics from prototype through project handover. I prototyped visual effects, built demo scenes, and integrated prototypes into playable sequences. I also worked on slow motion, playback control, and a custom audio system, and tuned shaders.',
            'I compared performance across scene sections, inspected rendering with Frame Debugger, and analyzed loaded meshes, textures, and materials. Environment meshes and global illumination were the main bottlenecks. To preserve lighting quality, we started by optimizing the environment geometry. We switched from mesh-based terrain to Unity Terrain, introduced automatic LOD generation for environment assets, added tree impostors, replaced distant vegetation with custom models, and enabled foveated rendering. Optimizing the environment let us increase the render resolution in VR.',
          ],
          experienceSummary: {
            contribution: 'gameplay mechanics from prototype to project handover',
          },
        },
        {
          id: 'mobile-multiplayer-rts',
          title: 'Mobile Multiplayer RTS',
          technologies: [
            {
              label: 'Technologies',
              value: 'Unity, C#, Mirror',
            },
            {
              label: 'Platforms',
              value: 'Headless server builds for Linux, with clients for Windows and Android',
            },
          ],
          paragraphs: [
            'I joined the project after the game launched. The game was still supported when I left the project.',
            'I separated unit logic from its Unity presentation layer and connected them through a single event bus. I replaced prefab-bound settings with serializable presets that the client and server could share, and added a fluent builder API for assembling and configuring units.',
            'I added per-tick and event logging and built a tool for analyzing simulation discrepancies. I traced differences to client and server prefab settings, operation order and precision in physics and pathfinding, collection iteration order, and floating-point behavior across architectures.',
            'The updated unit system and deterministic combat logic enabled the team to bring the single-player campaign from an earlier iteration into the previously multiplayer-only game.',
            'Updated the UI, added a sound system, and ported features from the previous project iteration.',
          ],
          experienceSummary: {
            contribution: 'unit assembly and combat systems',
          },
        },
        {
          id: 'android-app-maintenance',
          title: 'Android App Maintenance',
          technologies: [
            {
              label: 'Technologies',
              value: 'Android, .NET MAUI, KCP Protocol',
            },
          ],
          paragraphs: [
            'I fixed crashes, multithreading bugs, and network issues in an existing Android app built with .NET MAUI.',
          ],
          experienceSummary: {
            contribution: 'crash fixes and network debugging in .NET MAUI',
          },
        },
        {
          id: 'vr-headset-api-research',
          title: 'QR Code Tracking on VR Headsets',
          technologies: [
            {
              label: 'Technologies',
              value: 'Camera access APIs, spatial anchors',
            },
            {
              label: 'Platforms',
              value: 'Meta Quest, PICO',
            },
          ],
          paragraphs: [
            'I evaluated updated camera access APIs on Meta Quest and PICO headsets for QR code recognition and tracking. I built an app that tracked a QR code, determined its distance, and placed a spatial anchor for displaying virtual content. My evaluation indicated that access to the required PICO camera features was limited to direct business customers at the time.',
          ],
          experienceSummary: {
            contribution: 'camera API research and a working app',
          },
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
            {
              label: 'Technologies',
              value: 'Unity, C#, Delphi, SQLite, MySQL, Addressables',
            },
            {
              label: 'Platforms',
              value: 'WebGL',
            },
          ],
          paragraphs: [
            'I worked on the WebGL version of the editor while the team was preparing its next major release.',
            'I extended the importer for a proprietary binary model format to support more catalog models. I fixed how it handled hierarchical transforms and override flags, updated the import of 2D projection contours, and added splitting for meshes that exceeded platform limits. I eliminated duplicate materials and set up material indexing.',
            'I reworked measurement tools for different furniture types to make it easier to produce a single drawing and display relevant dimensions. I refactored parts of the procedural mesh generator. Mesh generation then worked reliably for most catalog models.',
            'I optimized contour casting in the measurement tools. I profiled hot paths with Unity’s built-in tools and ran isolated worst-case tests. I replaced the ray intersection implementation with a more cache-friendly one that required fewer memory accesses. This let us switch measurement calculations from fixed-step updates to real-time updates.',
            'I updated how the editor loaded parts. It could now load them from the main product database and still supported local exports.',
          ],
          experienceSummary: {
            contribution: 'model import, measurements, and procedural meshes',
            title: '3D Interior and Furniture Editor',
          },
        },
      ],
    },
    {
      id: 'novatrans',
      title: 'NPC NovATrans',
      items: [
        {
          id: 'ep2d-simulator',
          title: 'EP2D VR Training Simulator',
          technologies: [
            {
              label: 'Technologies',
              value: 'Unity, C#, Mirror, Unity Job System, Burst, Visual Effect Graph',
            },
            {
              label: 'Platforms',
              value: 'PC VR · HTC Vive, HTC Vive Pro, HTC Vive Cosmos',
            },
            {
              label: 'XR',
              value: 'OpenXR',
            },
          ],
          paragraphs: [
            'I reworked the scenario editor. In the new version, scenarios were defined as graphs of conditions and events. We kept a semi-automated migration path for existing scenarios. To add a mechanic, a programmer defined a data component in the graph and a stateless system that ran when the scenario reached that component. Scenario execution was synchronized across participants via Mirror.',
            'I developed a fire spread simulation using a grid of points on scene objects. Points could be generated or placed by hand, with configurable combustible material properties. Triggers handled ignition and extinguishing, and the state of the points drove burn masks and effects in Unity Visual Effect Graph. The simulation could optionally use the Unity Job System with Burst compilation. It ran independently and connected to training scenarios through a dedicated integration system.',
            'I assigned tasks and led development in a five-person programming team. I coordinated with a team of three 3D modelers, both directly and through their lead.',
            'I helped two programmers who joined during development set up their environments and get familiar with the project structure, shared systems, and team practices. Within 1.5–2 weeks, they built their first scenario and implemented their first mechanic. They built scenarios faster as they learned to reuse existing implementations and developed their own workflows.',
            'I led the project through release, presented the simulator to the client on site, and handed it over. After handover, I provided technical support and implemented changes requested by the client. The simulator was used in practice.',
          ],
          experienceSummary: {
            contribution: 'project team lead, scenario editor, and fire spread simulation',
          },
        },
        {
          id: 'tem18dm-simulator',
          title: 'TEM18DM Locomotive VR Simulator',
          technologies: [
            {
              label: 'Technology',
              value: 'Unity with a Custom Scenario Editor',
            },
            {
              label: 'Platforms',
              value: 'PC VR · HTC Vive, HTC Vive Pro, HTC Vive Cosmos',
            },
            {
              label: 'XR',
              value: 'Valve OpenVR · migration to OpenXR and XR Interaction Toolkit',
            },
          ],
          paragraphs: [
            'Improved and extended a custom scenario editor, developing new mechanics and training scenarios to enhance simulator functionality. The simulator was handed over to the client.',
          ],
          experienceSummary: {
            contribution: 'editor improvements and new training scenarios',
          },
        },
        {
          id: 'museum-exhibition',
          title: 'Interactive Museum Exhibit',
          technologies: [
            {
              label: 'Technologies',
              value: 'Unity, Arduino IDE',
            },
          ],
          paragraphs: [
            'Created an interactive exhibit for a museum featuring touch screens displaying dynamic content. Designed a moving display controlled by servo motors, representing the development of high-speed railways over time.',
            'I helped install, configure, test, and hand over the exhibits on site. The exhibit was put into use.',
          ],
          experienceSummary: {
            contribution: 'touchscreen content and a servo-driven display',
          },
        },
        {
          id: 'ar-exhibition',
          title: 'AR Exhibition Stand',
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
            'Developed a web-based AR application from scratch, enabling augmented reality experiences through local hosting with HTTPS to allow browser camera access. Designed for an exhibition stand combining physical miniatures and AR content. The stand was handed over to the client and put into use.',
          ],
          experienceSummary: {
            contribution: 'WebAR application built from scratch',
          },
        },
        {
          id: 'virtual-station',
          title: 'Virtual Station',
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
          experienceSummary: {
            contribution: 'web development and migration to Docker Compose',
          },
        },
      ],
    },
    {
      id: 'personal',
      title: 'Personal and Academic Projects',
      items: [
        {
          id: 'graph-editor',
          title: 'Collaborative Graph Editor',
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
            'I focused on backend architecture and database integration for real-time collaborative editing.',
          ],
        },
        {
          id: 'cloud-functions',
          title: 'Multi-Provider Cloud Functions Service',
          technologies: [
            {
              label: 'Backend',
              value: 'Python, Flask-RESTful, MongoDB',
            },
          ],
          paragraphs: [
            'I built a unified REST API for uploading, versioning, and deploying cloud functions across four providers.',
          ],
        },
      ],
    },
  ],
  interests: 'Hiking, cycling, 3D printing, and miniature painting.',
  education: [
    {
      title: 'Ural Federal University (UrFU)',
      description: 'Undergraduate studies in Software Engineering · 3 of 4 years completed.',
    },
    {
      title: 'English · B2 (self-assessed)',
      description:
        'Comfortable reading technical documentation and following technical discussions on calls. I can answer implementation questions when I’ve had time to prepare.',
    },
  ],
} satisfies ResumeData;
