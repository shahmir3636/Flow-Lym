import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ai-automation',
    title: 'Business Process Automation',
    category: 'ai-automation',
    shortDesc: 'End-to-end robotic process automation, automated document parsing, n8n workflows, and hands-free business pipelines.',
    fullDesc: 'Eliminate tedious manual data entry and multi-system copy-pasting. We construct autonomous workflows linking your email, CRM, ERP, and payment systems seamlessly.',
    iconName: 'Bot',
    deliverables: [
      'n8n & Zapier Enterprise Workflow Orchestration',
      'Automated Invoice & Document Parsing',
      'Multi-Channel Lead Qualification Pipelines',
      'Automated Financial Reporting & Reconciliation',
      'Custom Web Scraping & Data Extraction'
    ],
    techStack: ['n8n', 'Python', 'Playwright', 'Node.js', 'Zapier', 'PostgreSQL'],
    businessImpact: 'Reduces repetitive manual work by connecting the tools your team already uses.',
    avgTimeline: '3 - 6 Weeks'
  },
  {
    id: 'ai-solutions',
    title: 'AI Solutions & LLM Integration',
    category: 'ai-automation',
    shortDesc: 'Generative AI integration, fine-tuned domain models, RAG document search engines, and intelligent customer agents.',
    fullDesc: 'Transform your enterprise data into an active strategic advantage. We embed advanced Gemini and OpenAI models, build Retrieval-Augmented Generation (RAG) pipelines, and deploy autonomous AI assistants.',
    iconName: 'Sparkles',
    deliverables: [
      'Custom LLM Fine-Tuning & Prompt Pipelines',
      'Retrieval-Augmented Generation (RAG)',
      'Autonomous AI Customer Support Agents',
      'Predictive Analytics & Forecasting Models',
      'Computer Vision & Speech Processing'
    ],
    techStack: ['Gemini AI', 'OpenAI', 'Python', 'LangChain', 'Pinecone', 'FastAPI'],
    businessImpact: 'Can automate repetitive customer and operational interactions while keeping human review where it is needed.',
    avgTimeline: '4 - 10 Weeks',
    featured: true
  },
  {
    id: 'web-development',
    title: 'Custom Web Engineering',
    category: 'development',
    shortDesc: 'High-performance web applications, enterprise SaaS platforms, and progressive web apps built for ultimate speed and scalability.',
    fullDesc: 'We architect modern, resilient web applications that deliver lightning-fast load times, flawless security, and effortless user experiences. From high-traffic SaaS portals to complex enterprise platforms, our web solutions power seamless digital operations.',
    iconName: 'Globe',
    deliverables: [
      'Custom React / Next.js Web Applications',
      'Enterprise SaaS Architecture',
      'Progressive Web Apps (PWA)',
      'Design System Implementation',
      'SEO & Performance Optimization'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'GraphQL'],
    businessImpact: 'Focused on performance, usability and a maintainable foundation for future growth.',
    avgTimeline: '6 - 12 Weeks',
    featured: true
  },
  {
    id: 'custom-software',
    title: 'Enterprise Custom Software',
    category: 'development',
    shortDesc: 'Tailor-made software systems designed around your unique business logic, workflows, and legacy software integration.',
    fullDesc: 'Off-the-shelf software often fails to meet complex enterprise needs. We engineer bespoke backend architectures, custom ERP/CRM platforms, and data pipelines that integrate directly into your existing enterprise stack.',
    iconName: 'Cpu',
    deliverables: [
      'Custom Enterprise Resource Planning (ERP)',
      'Legacy System Modernization',
      'Custom Internal Dashboards & Portals',
      'Microservice Systems Architecture',
      'Automated Compliance & Security Controls'
    ],
    techStack: ['Node.js', 'Python', 'Go', 'Java', 'PostgreSQL', 'Docker'],
    businessImpact: 'Streamlines internal operations by replacing repetitive manual processes with software built around the business logic.',
    avgTimeline: '10 - 20 Weeks',
    featured: true
  },
  {
    id: 'api-backend-dev',
    title: 'API & Backend Architecture',
    category: 'development',
    shortDesc: 'Secure REST & GraphQL APIs, high-throughput microservices, and real-time WebSocket communication infrastructure.',
    fullDesc: 'Power your apps with secure, maintainable backend infrastructure designed around the application’s actual traffic and integration requirements.',
    iconName: 'Server',
    deliverables: [
      'RESTful & GraphQL API Design',
      'Microservices & Event-Driven Systems',
      'Real-Time WebSockets & Pub/Sub',
      'Database Modeling & Index Tuning',
      'API Gateway & Auth Integration'
    ],
    techStack: ['Node.js', 'Go', 'Python', 'Redis', 'PostgreSQL', 'Kafka'],
    businessImpact: 'Scalable infrastructure and integrations designed around the project’s actual traffic and reliability needs.',
    avgTimeline: '4 - 8 Weeks'
  },
  {
    id: 'mobile-development',
    title: 'Native & Cross-Platform Mobile Apps',
    category: 'development',
    shortDesc: 'Native iOS and Android apps, plus cross-platform Flutter and React Native builds with offline-first synchronization.',
    fullDesc: 'Deliver rich, native mobile experiences across iOS and Android. We build sleek mobile applications with offline storage, real-time push notifications, biometric security, and fluid 60fps animations.',
    iconName: 'Smartphone',
    deliverables: [
      'iOS & Android Native Apps',
      'Cross-Platform Flutter / React Native',
      'Offline Data Synchronization Engine',
      'Biometric Auth & In-App Payments',
      'App Store & Play Store Deployment'
    ],
    techStack: ['Flutter', 'React Native', 'Swift', 'Kotlin', 'Firebase', 'SQLite'],
    businessImpact: 'Production-ready applications designed for performance, usability and maintainability.',
    avgTimeline: '8 - 14 Weeks',
    featured: true
  },
  {
    id: 'maintenance-support',
    title: 'Maintenance & Support',
    category: 'infrastructure',
    shortDesc: 'Continuous monitoring, security maintenance, performance tuning and support options based on the project.',
    fullDesc: 'Maintain the applications and automations we build with monitoring, maintenance, bug fixes, dependency updates and practical security hardening.',
    iconName: 'ShieldCheck',
    deliverables: [
      'Application and workflow monitoring',
      'Priority incident response options',
      'Regular Security Patches & Dependency Audits',
      'Monthly Performance & Speed Tuning',
      'Direct technical support and maintenance'
    ],
    techStack: ['Datadog', 'Sentry', 'PagerDuty', 'Prometheus', 'CloudWatch'],
    businessImpact: 'Includes practical monitoring, error handling and maintenance guidance where the project requires it.',
    avgTimeline: 'Ongoing Monthly Managed Service'
  }
];
