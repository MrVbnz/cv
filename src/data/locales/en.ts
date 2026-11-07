import type { ResumeData } from '../types';

export default {
  "meta": {
    "title": "Efremov Dmitry CV",
    "description": "I am Dmitry Efremov, a dedicated software developer and team leader with a strong technical foundation in Unity, C# and full-stack development. My expertise spans VR development, backend systems, and web applications, with hands-on experience in technologies like Unity,  ASP.NET, EF Core and React."
  },
  "ui": {
    "navigation": "Resume navigation",
    "toggleNavigation": "Toggle navigation",
    "language": "Language",
    "contacts": "Contact links",
    "skipToContent": "Skip to content",
    "portraitAlt": "Dmitry Efremov",
    "sections": {
      "about": "About",
      "skills": "Skills",
      "experience": "Experience",
      "projects": "Projects",
      "interests": "Interests"
    }
  },
  "languages": [
    {
      "code": "en",
      "label": "EN"
    },
    {
      "code": "ru",
      "label": "RU"
    }
  ],
  "profile": {
    "surname": "Efremov",
    "givenName": "Dmitry",
    "email": "d.efremov2001@mail.ru",
    "location": "Remote, Open to relocation",
    "summary": "I am Dmitry Efremov, a dedicated software developer and team leader with a strong technical foundation in Unity, C# and full-stack development. My expertise spans VR development, backend systems, and web applications, with hands-on experience in technologies like Unity,  ASP.NET, EF Core and React.",
    "social": [
      {
        "label": "GitHub",
        "kind": "github",
        "href": "https://github.com/MrVbnz"
      },
      {
        "label": "Telegram",
        "kind": "telegram",
        "href": "https://t.me/mrvbnz"
      },
      {
        "label": "LinkedIn",
        "kind": "linkedin",
        "href": "https://www.linkedin.com/in/dmitry-efr/"
      }
    ]
  },
  "skills": [
    {
      "id": "skill-0",
      "title": "Hard",
      "groups": [
        {
          "title": "Expert",
          "items": [
            "Unity",
            "C#"
          ]
        },
        {
          "title": "Proficient",
          "items": [
            "ASP.NET",
            "Entity Framework Core",
            "Nginx",
            "SignalR",
            "React (TypeScript)",
            "Docker Compose"
          ]
        },
        {
          "title": "Intermediate",
          "items": [
            "C/C++",
            "Pure JavaScript",
            "Python",
            "Java",
            "WPF",
            "Windows Forms"
          ]
        }
      ]
    },
    {
      "id": "skill-1",
      "title": "Unity Assets",
      "groups": [
        {
          "items": [
            "Zenject",
            "LeoECS",
            "DOTween",
            "UniTask",
            "BNG VR Interaction Framework"
          ]
        }
      ]
    },
    {
      "id": "skill-2",
      "title": "Soft",
      "groups": [
        {
          "items": [
            "Strong communication skills",
            "Team management, task decomposition and delegation",
            "Training and onboarding new team members"
          ]
        }
      ]
    },
    {
      "id": "skill-3",
      "title": "Other",
      "groups": [
        {
          "items": [
            "Cinema 4d",
            "Blender"
          ]
        }
      ]
    }
  ],
  "experience": [
    {
      "id": "job-0",
      "role": "Unity developer",
      "company": "Ceramic 3d",
      "period": "September 2024 - Present"
    },
    {
      "id": "job-1",
      "role": "Unity VR developer, team lead",
      "company": "NovATrans",
      "period": "September 2023 – September 2024"
    }
  ],
  "projects": [
    {
      "id": "project-group-0",
      "title": "University / Personal Projects",
      "items": [
        {
          "id": "project-1-0",
          "title": "Online Real-Time Graph Editor (Fullstack)",
          "technologies": [
            {
              "label": "Backend",
              "value": "ASP.NET, EF Core, SignalR"
            },
            {
              "label": "Frontend",
              "value": "React (TypeScript), Bootstrap"
            }
          ],
          "paragraphs": [
            "Developed a collaborative graph editor supporting real-time, multi-user editing similar to Google Docs. Primarily worked on backend architecture and database integration, occasionally updating the frontend to align with API changes."
          ]
        },
        {
          "id": "project-1-1",
          "title": "Multi-Target Cloud Functions Runner (Backend)",
          "technologies": [
            {
              "label": "Backend",
              "value": "Flask-RESTful, MongoDB"
            }
          ],
          "paragraphs": [
            "Built a service that integrates multiple cloud function providers (AWS, Yandex, Sber, Selectel) into a unified REST API. The service supports versioning, uploading, and deploying functions, automatically adapting them to provider-specific formats."
          ]
        }
      ]
    },
    {
      "id": "project-group-1",
      "title": "NPC NovATrans",
      "items": [
        {
          "id": "project-2-0",
          "title": "Virtual Station (Web Backend, Frontend)",
          "technologies": [
            {
              "label": "Backend",
              "value": "ASP.NET, EF Core"
            },
            {
              "label": "Frontend",
              "value": "Vite, React (TypeScript), Bootstrap"
            },
            {
              "label": "Desktop Client",
              "value": "Unity"
            }
          ],
          "paragraphs": [
            "Contributed to an open-world multiplayer project with VR and desktop support. Initially focused on maintaining and enhancing backend functionality, later worked on frontend updates. Ported the infrastructure from an IIS Windows server to Docker Compose for improved deployment."
          ]
        },
        {
          "id": "project-2-1",
          "title": "AR Exhibition Stand (Fullstack)",
          "technologies": [
            {
              "label": "Backend",
              "value": "Node.js, Nginx"
            },
            {
              "label": "Frontend",
              "value": "Pure JavaScript with Three.js and AR.js"
            }
          ],
          "paragraphs": [
            "Developed a web-based AR application from scratch, enabling augmented reality experiences through local hosting with HTTPS to allow browser camera access. Designed for an exhibition stand combining physical miniatures and AR content."
          ]
        },
        {
          "id": "project-2-2",
          "title": "Interactive Museum Exhibition",
          "technologies": [
            {
              "label": "Technologies",
              "value": "Unity, Arduino IDE"
            }
          ],
          "paragraphs": [
            "Created an interactive exhibit for a museum featuring touch screens displaying dynamic content. Designed a moving display controlled by servo motors, representing the development of high-speed railways over time."
          ]
        },
        {
          "id": "project-2-3",
          "title": "VR Simulator for TEM18DM Locomotive Training",
          "technologies": [
            {
              "label": "Technology",
              "value": "Unity with a Custom Scenario Editor"
            }
          ],
          "paragraphs": [
            "Improved and extended a custom scenario editor, developing new mechanics and training scenarios to enhance simulator functionality."
          ]
        },
        {
          "id": "project-2-4",
          "title": "VR Simulator for Extreme Situations on EP2D Train",
          "technologies": [
            {
              "label": "Technologies",
              "value": "Unity, Custom Node-Based Scenario Editor, Physical Fire Simulation"
            }
          ],
          "paragraphs": [
            "Redesigned a scenario editor using a node graph structure for creating branching and multiplayer scenarios, streamlining the workflow for new team members.",
            "Developed a node-based fire spread simulation tool with object property baking to simulate fire dynamics and interactions, such as extinguisher use. The fire effects are rendered using Unity Visual Effect Graph.",
            "Trained new employees and contributed to scenario creation using the new editor."
          ]
        }
      ]
    }
  ],
  "interests": [
    {
      "id": "interest-0",
      "title": "Game mechanics / Shader developement",
      "description": "I am having fun developing unique game mechanics or visual effects even if it isn't going to be released."
    },
    {
      "id": "interest-1",
      "title": "Outdoor Activities",
      "description": "Passionate about tracking, hiking, and cycling, which allow me to stay active and explore nature."
    },
    {
      "id": "interest-2",
      "title": "3D Printing and Miniature Painting",
      "description": "Enthusiast of 3D printing, where I design and print miniatures, which I then enjoy painting and customizing."
    }
  ]
} satisfies ResumeData;
