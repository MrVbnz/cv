import type { ResumeData } from '../types';

export default {
  "meta": {
    "title": "Ефремов Дмитрий — резюме",
    "description": "Я Дмитрий Ефремов, разработчик программного обеспечения, тимлид. Занимаюсь VR, fullstack разработкой с практическим опытом работы Unity, ASP.NET, EF Core и React."
  },
  "ui": {
    "navigation": "Навигация по резюме",
    "toggleNavigation": "Переключить навигацию",
    "language": "Язык",
    "contacts": "Способы связи",
    "skipToContent": "Перейти к содержанию",
    "portraitAlt": "Дмитрий Ефремов",
    "sections": {
      "about": "О себе",
      "skills": "Навыки",
      "experience": "Опыт",
      "projects": "Проекты",
      "interests": "Интересы"
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
    "surname": "Ефремов",
    "givenName": "Дмитрий",
    "email": "d.efremov2001@mail.ru",
    "location": "Екатеринбург, Удаленно",
    "summary": "Я Дмитрий Ефремов, разработчик программного обеспечения, тимлид. Занимаюсь VR, fullstack разработкой с практическим опытом работы Unity, ASP.NET, EF Core и React.",
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
          "items": [
            "Unity",
            "C#",
            "ASP.NET",
            "Entity Framework Core",
            "Nginx",
            "SignalR",
            "React (TypeScript)",
            "Docker Compose",
            "C/C++",
            "JavaScript",
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
      "title": "Soft",
      "groups": [
        {
          "items": [
            "Управление командой, разделение и назначение задач",
            "Разделение и назначение задач",
            "Обучение, включение в процесс новых сотрудников"
          ]
        }
      ]
    },
    {
      "id": "skill-2",
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
      "role": "Unity-разработчик",
      "company": "Ceramic 3D",
      "period": "Сентябрь 2024 - настоящее время"
    },
    {
      "id": "job-1",
      "role": "Unity VR-разработчик, тимлид",
      "company": "NovATrans",
      "period": "Сентябрь 2023 – Сентябрь 2024"
    }
  ],
  "projects": [
    {
      "id": "project-group-0",
      "title": "Университетские / Личные проекты",
      "items": [
        {
          "id": "project-1-0",
          "title": "Онлайн-редактор графов в реальном времени (Fullstack)",
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
            "Разработал редактор графов с поддержкой совместного редактирования в реальном времени, аналогично Google документам. В основном работал над архитектурой бэкенда и интеграцией с базой данных, иногда обновляя фронтенд для соответствия изменениям API."
          ]
        },
        {
          "id": "project-1-1",
          "title": "Многоцелевой сервис для выполнения облачных функций (Backend)",
          "technologies": [
            {
              "label": "Backend",
              "value": "Flask-RESTful, MongoDB"
            }
          ],
          "paragraphs": [
            "Разработал сервис, объединяющий несколько провайдеров облачных функций (AWS, Yandex, Sber, Selectel) в единый REST API. Поддерживает версионирование, загрузку и развертывание функций, автоматически адаптируя их под форматы разных провайдеров."
          ]
        }
      ]
    },
    {
      "id": "project-group-1",
      "title": "НПЦ NovATrans",
      "items": [
        {
          "id": "project-2-0",
          "title": "Виртуальная станция (Web Backend, Frontend)",
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
              "label": "Десктоп-клиент",
              "value": "Unity"
            }
          ],
          "paragraphs": [
            "Участвовал в разработке многопользовательского проекта с поддержкой VR и ПК. Первоначально занимался поддержкой и улучшением бэкенда, позже работал над обновлениями фронтенда. Перенёс инфраструктуру с IIS (Windows Server) на Docker Compose для упрощения развертывания."
          ]
        },
        {
          "id": "project-2-1",
          "title": "AR-стенд для выставки (Fullstack)",
          "technologies": [
            {
              "label": "Backend",
              "value": "Node.js, Nginx"
            },
            {
              "label": "Frontend",
              "value": "JavaScript с Three.js и AR.js"
            }
          ],
          "paragraphs": [
            "Разработал веб-приложение с дополненной реальностью с нуля, реализовав локальный хостинг через HTTPS для доступа к камере браузера. Проект предназначен для выставочного стенда, объединяющего физические макеты с AR-контентом."
          ]
        },
        {
          "id": "project-2-2",
          "title": "Интерактивная музейная экспозиция",
          "technologies": [
            {
              "label": "Технологии",
              "value": "Unity, Arduino IDE"
            }
          ],
          "paragraphs": [
            "Создал интерактивную экспозицию для музея с сенсорными экранами, отображающими динамический контент. Разработал движущийся стенд с сервоприводами, визуализирующий развитие скоростных железных дорог."
          ]
        },
        {
          "id": "project-2-3",
          "title": "VR-симулятор для обучения на локомотиве ТЭМ18ДМ",
          "technologies": [
            {
              "label": "Технология",
              "value": "Unity с кастомным редактором сценариев"
            }
          ],
          "paragraphs": [
            "Улучшил и расширил редактор сценариев, разработав новые механики и учебные сценарии для повышения функциональности симулятора."
          ]
        },
        {
          "id": "project-2-4",
          "title": "VR-симулятор экстремальных ситуаций на поезде ЭП2Д",
          "technologies": [
            {
              "label": "Технологии",
              "value": "Unity, кастомный редактор сценариев, физическая симуляция огня"
            }
          ],
          "paragraphs": [
            "Переработал редактор сценариев, используя граф задач для создания нелинейных многопользовательских сценариев и упростив работу для новых сотрудников.",
            "Разработал инструмент симуляции распространения огня на основе графа с запеканием свойств объектов, позволяющий моделировать динамику пожара и взаимодействие с ним (например, использование огнетушителя). Визуальные эффекты огня реализованы с помощью Unity Visual Effect Graph.",
            "Проводил обучение новых сотрудников и помогал в создании сценариев с использованием нового редактора."
          ]
        }
      ]
    }
  ],
  "interests": [
    {
      "id": "interest-0",
      "title": "Разработка механик / Шейдеров",
      "description": "Люблю создавать уникальные игровые механики и визуальные эффекты"
    },
    {
      "id": "interest-1",
      "title": "Низкоуровневое программирование",
      "description": "Реализую интересные мне алгоритмы на C/C++ чтобы лучше понять их суть и методы оптимизации"
    },
    {
      "id": "interest-2",
      "title": "Активный отдых",
      "description": "Увлекаюсь треккингом, походами и велопрогулками"
    },
    {
      "id": "interest-3",
      "title": "3D-печать и покраска миниатюр",
      "description": "Люблю 3D-печать, создаю и крашу миниатюры."
    }
  ]
} satisfies ResumeData;
