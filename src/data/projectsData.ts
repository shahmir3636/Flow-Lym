import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'applicant-processing-platform',
    projectNumber: '01',
    title: 'AI-Powered Applicant Processing Platform',
    client: 'RPL Advisor',
    industry: 'Education & Workforce Certification',
    category: 'ai-automation',
    categoryTags: ['AI Automation', 'CRM Automation', 'Document Processing', 'Lead Management'],
    shortDesc: 'End-to-end applicant processing pipeline from lead capture and document collection to AI screening, candidate scoring, and CRM synchronization.',
    fullDesc: 'Built an end-to-end automation system that manages the applicant journey from lead capture through document collection, AI screening, CRM management, and follow-up communication.',
    businessProblem: 'Recruitment and evaluation teams spent dozens of hours per week manually chasing applicant documents, checking eligibility requirements, transcribing records into HubSpot, and manually composing status updates across email and WhatsApp.',
    solutionArchitecture: 'Engineered an event-driven orchestration architecture connecting webhooks from custom capture forms and Tally to an n8n processing core. The system auto-provisions candidate Google Drive directories, runs AI CV extraction and scoring models against evaluation rubrics, identifies missing documents, and pushes synchronized updates into HubSpot CRM and messaging channels.',
    keyCapabilities: [
      'Automated lead capture through forms and webhooks',
      'HubSpot CRM integration',
      'Automated email communication',
      'WhatsApp communication integration',
      'Automatic Google Drive folder creation for applicants',
      'Tally-powered document collection',
      'Automated retrieval and processing of candidate documents',
      'AI-powered CV/document screening',
      'Eligibility evaluation',
      'Candidate scoring',
      'Missing-document detection',
      'Automated status classification such as Approved, Missing Information, and Not Approved',
      'Automated lead-processing workflows'
    ],
    businessImpact: 'Reduced repetitive manual processing and created an automated applicant-processing pipeline that allows teams to focus on qualified applicants instead of manually reviewing and routing every lead.',
    technologyStack: ['n8n', 'HubSpot', 'Tally', 'Google Drive', 'Gmail', 'WhatsApp API', 'AI/LLMs', 'Webhooks'],
    categorizedTechStack: [
      { name: 'HubSpot', category: 'CRM' },
      { name: 'AI/LLMs', category: 'AI / LLM' },
      { name: 'n8n Engine', category: 'Integration' },
      { name: 'Webhooks', category: 'Integration' },
      { name: 'WhatsApp API', category: 'Messaging' },
      { name: 'Gmail API', category: 'Messaging' },
      { name: 'Google Drive', category: 'Storage & Docs' },
      { name: 'Tally Forms', category: 'Storage & Docs' }
    ],
    workflowSteps: [
      'Lead Capture & Webhook Ingestion',
      'Applicant Google Drive Directory Provisioning',
      'Tally Document Collection & Sync',
      'AI Multimodal CV & Document Screening',
      'Eligibility Evaluation & Scoring',
      'Missing-Document Verification & Classification',
      'HubSpot CRM & WhatsApp Automated Updates'
    ],
    diagramNodes: [
      {
        id: 'node-1',
        stepNumber: 1,
        title: 'Lead Capture & Webhook',
        tool: 'Tally / Custom Form',
        category: 'trigger',
        description: 'Candidate submits application form triggering instant webhook payload with metadata.',
        dataPayload: '{ applicantId, email, phone, targetProgram, submissionTime }'
      },
      {
        id: 'node-2',
        stepNumber: 2,
        title: 'Folder Provisioning',
        tool: 'Google Drive API',
        category: 'storage',
        description: 'Auto-provisions a dedicated applicant repository with standardized security permissions.',
        dataPayload: '{ folderId, folderUrl, parentDir: "/RPL_Applicants/2026" }'
      },
      {
        id: 'node-3',
        stepNumber: 3,
        title: 'CV & Document Ingestion',
        tool: 'Document Parser',
        category: 'storage',
        description: 'Fetches uploaded PDF/DOCX resumes and certifications for automated OCR text extraction.',
        dataPayload: '{ rawText, certList, pagesCount, fileHashes }'
      },
      {
        id: 'node-4',
        stepNumber: 4,
        title: 'AI Multimodal Screening',
        tool: 'AI / LLM Agent',
        category: 'ai',
        description: 'Evaluates applicant qualifications against strict criteria, detects missing documents, and scores readiness.',
        dataPayload: '{ eligibilityScore: 92, missingDocs: [], status: "Approved" }'
      },
      {
        id: 'node-5',
        stepNumber: 5,
        title: 'CRM Record Sync',
        tool: 'HubSpot CRM',
        category: 'crm',
        description: 'Updates deal stage, logs candidate evaluation report, and assigns to admissions officer.',
        dataPayload: '{ contactId, dealStage: "Qualified_Review", score: 92 }'
      },
      {
        id: 'node-6',
        stepNumber: 6,
        title: 'Multi-Channel Alert',
        tool: 'WhatsApp & Gmail API',
        category: 'dispatch',
        description: 'Dispatches personalized confirmation message with next steps to the applicant.',
        dataPayload: '{ dispatchStatus: "Delivered", channel: "WhatsApp_Business" }'
      }
    ],
    aiComponents: [
      'CV & Academic Transcript Multimodal Extraction',
      'Structured Qualification Scoring Rubric',
      'Automated Missing Document Gap Detection',
      'Status Classification Engine (Approved, Missing Info, Not Approved)'
    ],
    integrations: ['HubSpot CRM', 'Tally Forms', 'Google Drive API', 'Gmail API', 'WhatsApp Business API', 'n8n Automation Engine'],
    image: '/assets/rpl-advisor/01-overview.png',
    gallery: [
      '/assets/rpl-advisor/01-overview.png',
      '/assets/rpl-advisor/02-certification.png',
      '/assets/rpl-advisor/03-community-services.png',
      '/assets/rpl-advisor/04-documents.png',
      '/assets/rpl-advisor/05-document-submission.png',
      '/assets/rpl-advisor/06-individual-support.png'
    ]
  },
  {
    id: 'enterprise-crm-automation',
    projectNumber: '02',
    title: 'Enterprise CRM Automation System',
    client: 'Enterprise Client',
    industry: 'Operations & Enterprise Software',
    category: 'crm-workflow',
    categoryTags: ['CRM Automation', 'API Integration', 'Workflow Engineering'],
    shortDesc: 'Modern automation layer engineered around a legacy PHP CRM to modernize lead-processing and operational execution without requiring a costly core rebuild.',
    fullDesc: 'Built an automation layer around an existing PHP-based CRM to modernize its lead-processing and operational workflows without requiring a complete CRM rebuild.',
    businessProblem: 'A legacy PHP 5.6 CRM was deeply rooted in day-to-day operations but lacked modern API integrations, conditional routing, and automated lead triage, leading to high administrative friction and delayed follow-ups.',
    solutionArchitecture: 'Constructed an event-driven automation layer utilizing custom webhook listeners, scheduled data extractors, and JavaScript normalization pipelines. The system triggers multi-record workflows, conditionally routes leads based on dynamic business criteria, and executes CRM updates autonomously without disrupting legacy database schemas.',
    keyCapabilities: [
      'CRM-to-n8n integration',
      'Webhook/API communication',
      'Automated lead retrieval',
      'Conditional lead processing',
      'Multi-record workflow execution',
      'Automated CRM actions',
      'Lead-status-based routing',
      'Custom JavaScript processing',
      'Integration between legacy CRM infrastructure and modern automation systems'
    ],
    businessImpact: 'Extended the capabilities of an existing legacy CRM by adding a modern automation layer, reducing manual work while preserving the existing CRM infrastructure.',
    technologyStack: ['PHP 5.6', 'n8n', 'JavaScript', 'Webhooks', 'APIs', 'CRM'],
    categorizedTechStack: [
      { name: 'PHP 5.6 CRM', category: 'CRM' },
      { name: 'n8n Engine', category: 'Integration' },
      { name: 'Custom Webhooks', category: 'Integration' },
      { name: 'REST APIs', category: 'Integration' },
      { name: 'JavaScript Pipeline', category: 'Integration' }
    ],
    workflowSteps: [
      'Legacy CRM Webhook / API Ingestion',
      'Custom JavaScript Data Transformation & Validation',
      'Conditional Business Logic Evaluation',
      'Multi-Record Workflow Batch Processing',
      'Automated CRM State Transition & Notification'
    ],
    diagramNodes: [
      {
        id: 'crm-1',
        stepNumber: 1,
        title: 'Legacy CRM Event Hook',
        tool: 'PHP 5.6 Webhook Trigger',
        category: 'trigger',
        description: 'Captures record creation or modification event from the existing PHP CRM instance.',
        dataPayload: '{ lead_id: 84920, legacy_status: "raw_inbound", raw_fields: [...] }'
      },
      {
        id: 'crm-2',
        stepNumber: 2,
        title: 'Data Normalization',
        tool: 'JavaScript Transformer',
        category: 'engine',
        description: 'Sanitizes legacy field types, parses character sets, and formats payload into standard JSON.',
        dataPayload: '{ leadId: 84920, normalizedEmail, scoreMatrix, cleanPhone }'
      },
      {
        id: 'crm-3',
        stepNumber: 3,
        title: 'Conditional Rule Matrix',
        tool: 'n8n Workflow Engine',
        category: 'engine',
        description: 'Executes multi-branch operational logic, assigning priority weights and routing criteria.',
        dataPayload: '{ assignedGroup: "Tier_1_Enterprise", slaMinutes: 15 }'
      },
      {
        id: 'crm-4',
        stepNumber: 4,
        title: 'Batch Action Execution',
        tool: 'Multi-Record Dispatcher',
        category: 'engine',
        description: 'Executes linked database operations, updates contact relations, and initializes task schedules.',
        dataPayload: '{ tasksCreated: 2, relationsLinked: 4, batchSync: true }'
      },
      {
        id: 'crm-5',
        stepNumber: 5,
        title: 'CRM State Sync',
        tool: 'PHP CRM API Callback',
        category: 'crm',
        description: 'Pushes processed state and assigned owner back into the legacy CRM database.',
        dataPayload: '{ statusUpdated: "Assigned_In_Progress", timestamp: "ISO-8601" }'
      }
    ],
    aiComponents: [
      'Rule-Based Dynamic Triage Evaluator',
      'Automated Status Progression Triggers'
    ],
    integrations: ['Legacy PHP 5.6 CRM', 'n8n Workflow Core', 'REST Webhooks', 'Custom Data Pipeline'],
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Legacy Architecture', value: '100% Preserved' },
      { label: 'Lead Processing', value: 'Automated Routing' },
      { label: 'Operational Speed', value: 'Sub-Second Sync' }
    ]
  },
  {
    id: 'ai-social-media-suite',
    projectNumber: '03',
    title: 'AI Social Media Automation Suite',
    client: 'Multi-Brand Marketing & Growth Agency',
    industry: 'Digital Marketing & Social Commerce',
    category: 'social-ai',
    categoryTags: ['Social Media Automation', 'AI', 'Lead Generation', 'Marketing Automation'],
    shortDesc: 'Intelligent automation architecture for Facebook and Instagram orchestrating AI conversational DMs, scheduled multi-platform publishing, and automated comment triage.',
    fullDesc: 'Designed an automation architecture for Facebook and Instagram that can automate customer interactions, content publishing, comments, and lead-generation workflows.',
    businessProblem: 'Managing high-velocity customer inquiries across direct messages and post comments on Facebook and Instagram led to slow response times, lost prospect opportunities, and fragmented content scheduling.',
    solutionArchitecture: 'Designed a unified Meta Graph API integration layer connected to AI language models and an event-driven automation engine. Incoming direct messages are parsed for intent, answered with conversational AI, and qualified before being routed to CRM and sales representatives. Post comments are monitored and classified to capture warm leads, while content distribution pipelines automate media formatting and publishing across channels.',
    keyCapabilities: [
      'Process incoming Facebook and Instagram messages',
      'Automatically respond to common questions with AI conversational models',
      'Lead qualification and customer information collection',
      'CRM integration with sales-team routing and automated follow-up',
      'Content preparation and automated multi-platform publishing workflows',
      'Media handling and content scheduling integration',
      'Comment monitoring and relevance classification',
      'Automated responses to predefined questions with lead extraction into CRM'
    ],
    capabilitySections: [
      {
        title: 'Automated DMs',
        items: [
          'Process incoming Facebook and Instagram messages',
          'Automatically respond to common questions',
          'AI-powered conversational responses',
          'Lead qualification',
          'Customer information collection',
          'CRM integration',
          'Sales-team routing',
          'Automated follow-up'
        ]
      },
      {
        title: 'Automated Posts',
        items: [
          'Content preparation',
          'Media handling',
          'Automated publishing',
          'Multi-platform publishing workflows',
          'Content scheduling/integration'
        ]
      },
      {
        title: 'Automated Comments',
        items: [
          'Monitor comments',
          'Detect relevant comments',
          'Classify comments',
          'Automatically respond to predefined questions',
          'Identify potential leads',
          'Send qualified users into CRM/lead workflows'
        ]
      }
    ],
    businessImpact: 'Transforms social-media activity into an automated customer-service and lead-generation system while reducing repetitive manual work.',
    technologyStack: ['Facebook', 'Instagram', 'Meta APIs', 'n8n', 'AI/LLMs', 'Webhooks', 'CRM', 'APIs'],
    categorizedTechStack: [
      { name: 'Meta APIs', category: 'Media & APIs' },
      { name: 'Facebook Graph', category: 'Media & APIs' },
      { name: 'Instagram Graph', category: 'Media & APIs' },
      { name: 'AI / LLMs', category: 'AI / LLM' },
      { name: 'n8n Core', category: 'Integration' },
      { name: 'Webhooks', category: 'Integration' },
      { name: 'CRM Systems', category: 'CRM' }
    ],
    workflowSteps: [
      'Meta Graph Webhook Ingestion (DMs / Comments / Media Triggers)',
      'Natural Language Intent & Sentiment Classification',
      'Conversational AI Response & Dynamic FAQ Resolution',
      'Lead Qualification & Contact Detail Extraction',
      'CRM Record Creation & Sales Rep Notification',
      'Automated Multi-Channel Scheduled Publishing'
    ],
    diagramNodes: [
      {
        id: 'soc-1',
        stepNumber: 1,
        title: 'Meta Webhook Ingestion',
        tool: 'Meta Graph API',
        category: 'trigger',
        description: 'Listens to real-time events for incoming Instagram/Facebook DMs and post comments.',
        dataPayload: '{ sender_id, message_text, platform: "instagram", post_id }'
      },
      {
        id: 'soc-2',
        stepNumber: 2,
        title: 'Intent & Sentiment Triage',
        tool: 'AI Language Model',
        category: 'ai',
        description: 'Analyzes user intent: product inquiry, pricing, support question, or high-intent buyer lead.',
        dataPayload: '{ intent: "Pricing_Inquiry", sentiment: "Positive", confidence: 0.96 }'
      },
      {
        id: 'soc-3',
        stepNumber: 3,
        title: 'Conversational Generation',
        tool: 'AI Context Agent',
        category: 'ai',
        description: 'Crafts on-brand, natural contextual response answering the query and collecting key info.',
        dataPayload: '{ responseText: "Hi! Our package includes...", nextPrompt: "Ask email" }'
      },
      {
        id: 'soc-4',
        stepNumber: 4,
        title: 'Direct Response Dispatch',
        tool: 'Meta Messaging API',
        category: 'dispatch',
        description: 'Instantly sends conversational response back into the user’s DM conversation.',
        dataPayload: '{ deliveryStatus: "Sent", latencyMs: 820 }'
      },
      {
        id: 'soc-5',
        stepNumber: 5,
        title: 'Lead & CRM Ingestion',
        tool: 'CRM Webhook',
        category: 'crm',
        description: 'Creates lead profile, logs transcript history, and alerts human sales team if qualified.',
        dataPayload: '{ leadCreated: true, source: "IG_DM_Automation", qualified: true }'
      }
    ],
    aiComponents: [
      'Conversational Intent Detection & Tone Adaptation',
      'Prospect Qualification & Information Extraction Agent',
      'Comment Sentiment & Purchase-Intent Classifier',
      'Context-Aware Automated Direct Response Generation'
    ],
    integrations: ['Meta Graph API (Facebook & Instagram)', 'n8n Automation Engine', 'CRM Systems', 'Cloud Media Storage'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Response Velocity', value: 'Instant 24/7' },
      { label: 'Lead Capture Flow', value: 'Direct to CRM' },
      { label: 'Social Coverage', value: 'Unified Architecture' }
    ]
  },
  {
    id: 'ai-restaurant-menu-automation',
    projectNumber: '04',
    title: 'AI Restaurant Menu Automation',
    client: 'Hospitality & Restaurant Group',
    industry: 'Food & Beverage / Hospitality Tech',
    category: 'ai-automation',
    categoryTags: ['Restaurant Automation', 'AI', 'Content Management'],
    shortDesc: 'Centralized menu intelligence workflow that ingests culinary catalogs, extracts items and pricing, generates professional descriptions, and syndicates structured menu content.',
    fullDesc: 'Built an automation concept that allows restaurants to manage menu information through a centralized automated workflow.',
    businessProblem: 'Hospitality operators struggled with repetitive, fragmented data entry when updating menus, dietary tags, seasonal specials, and item descriptions across multiple digital ordering channels and marketing platforms.',
    solutionArchitecture: 'Engineered a centralized data management pipeline integrating Google Sheets and Google Drive with multimodal AI extractors. The workflow parses item names, categories, pricing, and ingredients, applies LLMs to craft appetizing and professional menu copy, normalizes data into structured JSON catalogs, and syndicates updates across connected digital touchpoints.',
    keyCapabilities: [
      'Process menu information',
      'Extract item names',
      'Extract descriptions',
      'Extract prices',
      'Identify categories',
      'Process ingredients and variations',
      'Generate professional menu descriptions using AI',
      'Structure menu data',
      'Generate digital menu content',
      'Synchronize menu information with connected systems',
      'Generate promotional content from menu items',
      'Create workflows for updating menu information across multiple digital channels'
    ],
    businessImpact: 'Reduces the repetitive work involved in maintaining restaurant menus and creates a centralized source of structured menu data.',
    technologyStack: ['n8n', 'AI/LLMs', 'Google Sheets', 'Google Drive', 'APIs', 'Webhooks'],
    categorizedTechStack: [
      { name: 'AI / LLMs', category: 'AI / LLM' },
      { name: 'n8n Engine', category: 'Integration' },
      { name: 'Google Sheets', category: 'Storage & Docs' },
      { name: 'Google Drive', category: 'Storage & Docs' },
      { name: 'POS / Channel APIs', category: 'Media & APIs' },
      { name: 'Webhooks', category: 'Integration' }
    ],
    workflowSteps: [
      'Raw Menu Ingestion (Sheets, Drive Assets, Documents)',
      'AI Entity Extraction (Items, Prices, Ingredients, Dietary Variations)',
      'AI Culinary Copywriting & Description Enrichment',
      'Structured Catalog Normalization & Schema Validation',
      'Multi-Channel Digital Menu Synchronization & Promotional Content Generation'
    ],
    diagramNodes: [
      {
        id: 'rest-1',
        stepNumber: 1,
        title: 'Master Catalog Ingestion',
        tool: 'Google Sheets & Drive API',
        category: 'trigger',
        description: 'Monitors updates in centralized kitchen ingredient sheets and raw chef notes.',
        dataPayload: '{ updatedRow: 42, itemRaw: "Truffle Tagliolini", priceRaw: "28" }'
      },
      {
        id: 'rest-2',
        stepNumber: 2,
        title: 'AI Entity Extraction',
        tool: 'Multimodal AI Model',
        category: 'ai',
        description: 'Extracts allergen tags, dietary restrictions (GF, Vegan), and preparation details.',
        dataPayload: '{ allergens: ["Dairy"], dietary: ["Vegetarian"], spiceLevel: 0 }'
      },
      {
        id: 'rest-3',
        stepNumber: 3,
        title: 'Culinary Copy Enrichment',
        tool: 'AI Marketing Copywriter',
        category: 'ai',
        description: 'Generates sensory, appetizing descriptions suited for digital menus and delivery apps.',
        dataPayload: '{ description: "Handmade ribbons tossed with black winter truffle..." }'
      },
      {
        id: 'rest-4',
        stepNumber: 4,
        title: 'JSON Catalog Normalization',
        tool: 'n8n Schema Validator',
        category: 'engine',
        description: 'Validates strict menu schema, currency formatting, and category taxonomies.',
        dataPayload: '{ schemaValid: true, sku: "PASTA-TRF-01", price: 28.00 }'
      },
      {
        id: 'rest-5',
        stepNumber: 5,
        title: 'Channel Syndication',
        tool: 'Digital Menu & POS APIs',
        category: 'dispatch',
        description: 'Syndicates menu state across ordering apps, digital boards, and website menus.',
        dataPayload: '{ syncedEndpoints: ["Website", "POS", "QR_Menu"], time: "0.4s" }'
      }
    ],
    aiComponents: [
      'Menu Entity & Price Extraction Parser',
      'Culinary Copywriting & Marketing Description Generator',
      'Dietary & Allergen Classification Model',
      'Promotional Micro-Copy Generator'
    ],
    integrations: ['Google Sheets', 'Google Drive API', 'n8n Automation Core', 'POS/Digital Menu APIs', 'Webhooks'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Data Source', value: 'Single Source of Truth' },
      { label: 'Menu Enrichment', value: 'AI-Generated Copy' },
      { label: 'Channel Sync', value: 'Multi-Platform' }
    ]
  },
  {
    id: 'shopify-product-automation-pipeline',
    projectNumber: '05',
    title: 'Shopify Product Automation Pipeline',
    client: 'E-Commerce Brand & Retail Operator',
    industry: 'E-Commerce & Digital Retail',
    category: 'ecommerce-automation',
    categoryTags: ['E-commerce Automation', 'Shopify', 'Product Management'],
    shortDesc: 'Automated product catalog pipeline processing supplier data and digital assets from centralized cloud storage and pushing structured listings directly to Shopify.',
    fullDesc: 'Built an automated product-management workflow that processes product information and assets from centralized sources and pushes them into Shopify.',
    businessProblem: 'Launching new collections and maintaining high-SKU inventories required manual spreadsheet collation, tedious image uploads, variant configuration, and repetitive Shopify Admin publishing tasks.',
    solutionArchitecture: 'Developed an automated asset and data pipeline that monitors Google Drive folders and Google Sheets product logs. The workflow validates product attributes, pairs high-resolution imagery with SKU records, formats payloads according to Shopify Admin REST and GraphQL specifications, and creates or updates product listings without human data entry.',
    keyCapabilities: [
      'Product data processing',
      'Google Drive integration',
      'Product asset handling',
      'Automated product creation',
      'Product updates',
      'Structured product information',
      'Shopify integration'
    ],
    businessImpact: 'Reduces manual product-entry work and creates a repeatable automated product publishing pipeline.',
    technologyStack: ['Shopify', 'n8n', 'Google Drive', 'Google Sheets', 'APIs'],
    categorizedTechStack: [
      { name: 'Shopify Admin API', category: 'E-commerce' },
      { name: 'n8n Workflow Engine', category: 'Integration' },
      { name: 'Google Drive API', category: 'Storage & Docs' },
      { name: 'Google Sheets API', category: 'Storage & Docs' },
      { name: 'GraphQL / REST APIs', category: 'Integration' }
    ],
    workflowSteps: [
      'Google Drive & Google Sheets Asset Monitoring',
      'Data Extraction & Attribute Normalization',
      'Variant Matrix & Image Association Handling',
      'Shopify API Payload Generation & Validation',
      'Automated Product Creation / Update & Status Logging'
    ],
    diagramNodes: [
      {
        id: 'shop-1',
        stepNumber: 1,
        title: 'Supplier File Ingestion',
        tool: 'Google Sheets / Drive Poller',
        category: 'trigger',
        description: 'Detects new product SKU rows and matching photography folders in Drive.',
        dataPayload: '{ sku: "WNT-JKT-09", title: "Alpine Shell", imageFolderId: "drv_992" }'
      },
      {
        id: 'shop-2',
        stepNumber: 2,
        title: 'Attribute Matrix Builder',
        tool: 'n8n Data Transformer',
        category: 'engine',
        description: 'Constructs option matrices (Sizes: S/M/L, Colors: Black/Navy) and inventory barcodes.',
        dataPayload: '{ variants: 6, totalInventory: 240, barcodeAssigned: true }'
      },
      {
        id: 'shop-3',
        stepNumber: 3,
        title: 'Image CDN Pipeline',
        tool: 'Asset Processor',
        category: 'storage',
        description: 'Fetches high-res media, creates web-optimized assets, and stages CDN URLs.',
        dataPayload: '{ stagedImages: ["cdn.brand.com/img1.jpg", "cdn.brand.com/img2.jpg"] }'
      },
      {
        id: 'shop-4',
        stepNumber: 4,
        title: 'Shopify GraphQL Mutation',
        tool: 'Shopify Admin API',
        category: 'crm',
        description: 'Executes productCreate mutation with tags, SEO metadata, variant pricing, and images.',
        dataPayload: '{ productId: "gid://shopify/Product/847291", handle: "alpine-shell" }'
      },
      {
        id: 'shop-5',
        stepNumber: 5,
        title: 'Status Logging & Audit',
        tool: 'Audit Spreadsheet Sync',
        category: 'dispatch',
        description: 'Writes live Shopify URL and sync timestamp back into the master spreadsheet.',
        dataPayload: '{ publishedLive: true, liveUrl: "store.com/products/alpine-shell" }'
      }
    ],
    aiComponents: [
      'Attribute Standardizer & Category Taxonomist',
      'Automated SEO Tag & Description Formatter'
    ],
    integrations: ['Shopify Admin API (REST & GraphQL)', 'Google Drive API', 'Google Sheets API', 'n8n Workflow Engine'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Publishing Method', value: 'Repeatable Pipeline' },
      { label: 'Asset Linking', value: 'Cloud Drive Sync' },
      { label: 'Manual Data Entry', value: 'Substantially Reduced' }
    ]
  },


  {
    id: 'real-time-sales-notifications',
    projectNumber: '06',
    title: 'Real-Time Sales Notification Automation',
    client: 'B2B Sales & Growth Organization',
    industry: 'Sales Technology & Enterprise CRM',
    category: 'crm-workflow',
    categoryTags: ['Sales Automation', 'CRM', 'Notifications'],
    shortDesc: 'Event-driven notification architecture alerting sales representatives to mission-critical CRM and lead lifecycle events without requiring dashboard monitoring.',
    fullDesc: 'Built an event-driven notification architecture designed to notify sales representatives about important CRM and lead events without requiring them to continuously monitor the CRM dashboard.',
    businessProblem: 'Inbound high-intent leads and critical lead-status updates often sat unattended for hours because sales representatives were on calls or away from the CRM dashboard, hurting response times and conversion rates.',
    solutionArchitecture: 'Constructed a resilient 24/7 event-driven notification engine that listens to CRM status changes and high-priority lead triggers via webhooks. The workflow instantly identifies lead priority, maps the record to the appropriate account executive, generates rich actionable notifications, and dispatches real-time alerts across preferred communication channels with direct-access deep links.',
    keyCapabilities: [
      'CRM event monitoring',
      'Lead-status detection',
      'Event-based workflows',
      'Automated notifications',
      'Sales-agent routing',
      '24/7 notification architecture',
      'Integration with external communication/notification platforms'
    ],
    businessImpact: 'Allows sales teams to react to important lead events faster instead of manually monitoring the CRM.',
    technologyStack: ['n8n', 'CRM', 'Webhooks', 'APIs', 'Notification platforms'],
    categorizedTechStack: [
      { name: 'CRM Event Webhooks', category: 'CRM' },
      { name: 'n8n Workflow Core', category: 'Integration' },
      { name: 'Notification Platforms', category: 'Messaging' },
      { name: 'REST APIs', category: 'Integration' }
    ],
    workflowSteps: [
      'CRM Event Trigger & Webhook Ingestion',
      'Lead Status & Deal Stage Detection',
      'Account Executive & Territory Routing Logic',
      'Rich Payload & Action Button Construction',
      'Multi-Platform Instant Notification Delivery'
    ],
    diagramNodes: [
      {
        id: 'sale-1',
        stepNumber: 1,
        title: 'CRM Status Change Event',
        tool: 'CRM Webhook Trigger',
        category: 'trigger',
        description: 'Fires instantly when high-value deal moves stage or new qualified lead registers.',
        dataPayload: '{ deal_id: 3948, stage: "Demo_Requested", deal_value: 24000 }'
      },
      {
        id: 'sale-2',
        stepNumber: 2,
        title: 'Territory & Rep Routing',
        tool: 'n8n Logic Matrix',
        category: 'engine',
        description: 'Checks round-robin schedules, territory assignments, and current rep availability.',
        dataPayload: '{ assignedRep: "Michael T.", mobileNumber: "+15550192", region: "US_West" }'
      },
      {
        id: 'sale-3',
        stepNumber: 3,
        title: 'Actionable Alert Builder',
        tool: 'Message Templating Node',
        category: 'engine',
        description: 'Builds rich interactive cards with deep links to 1-click call and CRM records.',
        dataPayload: '{ quickActions: ["Call Now", "Open Deal in CRM", "Snooze 10m"] }'
      },
      {
        id: 'sale-4',
        stepNumber: 4,
        title: 'Multi-Channel Push',
        tool: 'Notification Gateway',
        category: 'dispatch',
        description: 'Dispatches real-time ping via Slack, Telegram, WhatsApp, and SMS.',
        dataPayload: '{ deliveryLatency: "1.2s", channelsPushed: ["Slack", "SMS"] }'
      }
    ],
    aiComponents: [
      'Lead Intent & Urgency Classifier',
      'Contextual Alert Summary Generator'
    ],
    integrations: ['CRM Platforms', 'n8n Automation Engine', 'Communication & Messaging APIs', 'Webhook Gateways'],
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    metrics: [
      { label: 'Alert Dispatch', value: 'Real-Time < 2s' },
      { label: 'Uptime Coverage', value: '24/7 Event-Driven' },
      { label: 'Manual Monitoring', value: 'Replaced by Push' }
    ]
  },


  {
    id: 'pakistan-car-rental-ai-automation',
    projectNumber: '07',
    title: 'Pakistan Car Rental AI Automation System',
    client: 'Car Rental Operations Demo',
    industry: 'Automotive & Mobility',
    category: 'ai-automation',
    categoryTags: ['AI Automation', 'Car Rental', 'CRM Automation', 'WhatsApp AI'],
    shortDesc: 'AI-powered car rental operations system that automates enquiries, booking management, fleet tracking, follow-ups, call handling and reporting from one operational dashboard.',
    fullDesc: 'Built a Pakistan-focused car rental automation system that connects AI customer conversations with booking operations, fleet availability, follow-ups, agent workflows and analytics. The dashboard provides a realistic operational view of how an AI employee can handle repetitive rental enquiries while keeping humans in control of exceptions and high-value bookings.',
    businessProblem: 'Car rental teams repeatedly answer availability questions, collect customer details, create bookings, update calendars, follow up with undecided customers and monitor fleet status manually. These disconnected tasks create slow response times, missed follow-ups and unnecessary administrative work.',
    solutionArchitecture: 'Designed an event-driven automation layer around WhatsApp and voice AI, structured customer and booking data, calendar actions, fleet records, follow-up scheduling and human escalation. Incoming enquiries can be classified, matched against available vehicles, converted into booking records and routed to an AI or human agent while the dashboard exposes the operational state in real time.',
    keyCapabilities: [
      'AI WhatsApp customer conversations',
      'AI-assisted vehicle availability and pricing responses',
      'Automated booking creation and calendar synchronization',
      'Customer and lead data capture',
      'Fleet availability and rental-status tracking',
      'AI call-agent workflow support',
      'Automated follow-up queue for inactive prospects',
      'Agent performance and conversion tracking',
      'Booking status and payment/deposit tracking',
      'Operational analytics and source attribution',
      'Human override and escalation paths',
      'Interactive CRM dashboard for demonstrations'
    ],
    businessImpact: 'Creates a 24/7 front-line rental assistant that can answer routine questions, qualify customers, reduce booking friction, keep fleet and booking records organized and ensure follow-ups are not lost between calls or messages.',
    technologyStack: ['n8n', 'WhatsApp Business API', 'Voice AI', 'Google Calendar', 'CRM', 'Webhooks', 'JavaScript', 'REST APIs'],
    categorizedTechStack: [
      { name: 'n8n Automation Engine', category: 'Integration' },
      { name: 'WhatsApp Business API', category: 'Messaging' },
      { name: 'Voice AI Agent', category: 'AI / LLM' },
      { name: 'Google Calendar', category: 'Storage & Docs' },
      { name: 'CRM / Booking Data', category: 'CRM' },
      { name: 'Webhook Gateway', category: 'Integration' }
    ],
    workflowSteps: [
      'WhatsApp or voice enquiry enters the automation layer',
      'AI identifies customer intent, dates, vehicle preference and rental requirements',
      'Vehicle availability and pricing data are checked',
      'Customer and booking records are created or updated',
      'Booking confirmation and calendar actions are triggered',
      'Unresponsive leads enter an automated follow-up queue',
      'Complex requests are escalated to a human rental agent',
      'Operations dashboard tracks bookings, fleet, agents, revenue and conversion'
    ],
    diagramNodes: [
      {
        id: 'car-1',
        stepNumber: 1,
        title: 'Customer Enquiry Ingestion',
        tool: 'WhatsApp / Voice Webhook',
        category: 'trigger',
        description: 'Receives a rental enquiry from messaging or voice channels and creates a structured conversation event.',
        dataPayload: '{ customer: "Ayesha Malik", channel: "WhatsApp", dates: "5-8 Aug", passengers: 4 }'
      },
      {
        id: 'car-2',
        stepNumber: 2,
        title: 'AI Rental Qualification',
        tool: 'AI Agent + Memory',
        category: 'ai',
        description: 'Extracts vehicle preference, dates, pickup requirements, budget and other booking constraints from natural conversation.',
        dataPayload: '{ vehicle: "Honda City", pickup: "Islamabad", durationDays: 3, intent: "book" }'
      },
      {
        id: 'car-3',
        stepNumber: 3,
        title: 'Fleet Availability Check',
        tool: 'Fleet / CRM Data',
        category: 'storage',
        description: 'Checks vehicle availability, rental status and pricing before the AI offers an option to the customer.',
        dataPayload: '{ vehicleId: "ISB-05-IJ-7890", available: true, dailyRate: 18000 }'
      },
      {
        id: 'car-4',
        stepNumber: 4,
        title: 'Booking & Calendar Sync',
        tool: 'n8n + Google Calendar',
        category: 'crm',
        description: 'Creates the booking record, calculates the rental total and updates the operational calendar.',
        dataPayload: '{ bookingId: "BK-3047", total: 64800, deposit: 25000, calendar: "updated" }'
      },
      {
        id: 'car-5',
        stepNumber: 5,
        title: 'Follow-up Automation',
        tool: 'n8n Scheduler',
        category: 'dispatch',
        description: 'Schedules reminders for prospects who asked for a quote but have not completed a booking.',
        dataPayload: '{ followUpAt: "tomorrow 10:00", channel: "WhatsApp", attempts: 1 }'
      },
      {
        id: 'car-6',
        stepNumber: 6,
        title: 'Human Escalation & Reporting',
        tool: 'CRM Dashboard',
        category: 'engine',
        description: 'Routes exceptions to a human agent and aggregates booking, fleet, source and agent performance metrics.',
        dataPayload: '{ escalation: false, agent: "Ayla AI", conversionRate: "68%" }'
      }
    ],
    aiComponents: [
      'Conversational rental-sales agent',
      'Intent and booking requirement extraction',
      'Vehicle recommendation logic',
      'Availability-aware response generation',
      'Follow-up message generation',
      'Call transcript and lead summarization',
      'Human escalation summarization'
    ],
    integrations: ['WhatsApp Business API', 'Voice AI', 'Google Calendar', 'CRM / Booking Database', 'n8n Automation Engine', 'Webhook Gateway'],
    image: '/assets/drivepak-car-rental-dashboard.png',
    gallery: ['/assets/drivepak-car-rental-dashboard.png'],
    metrics: [
      { label: 'AI Response', value: '24/7 Front Line' },
      { label: 'Booking Flow', value: 'Enquiry → Quote → Book' },
      { label: 'Operations', value: 'Fleet + CRM + Follow-ups' },
      { label: 'Demo', value: 'Interactive Dashboard' }
    ]
  },

  {
    id: 'pakistan-travel-ai-employee',
    projectNumber: '08',
    title: 'Pakistan Travel Agency AI Employee',
    client: 'Travel Operations Demo',
    industry: 'Travel & Hospitality',
    category: 'ai-automation',
    categoryTags: ['AI Automation', 'WhatsApp Automation', 'Lead Management', 'Travel Operations'],
    shortDesc: 'An AI travel employee that handles WhatsApp enquiries, qualifies travellers, recommends packages, generates itineraries, manages follow-ups and escalates complex requests.',
    fullDesc: 'Built a complete AI employee workflow for a Pakistan-focused travel agency. The system turns incoming WhatsApp enquiries into structured leads, asks the right qualification questions, reads package data, recommends relevant trips, supports itinerary generation, schedules follow-ups and routes edge cases to a human travel consultant.',
    businessProblem: 'Travel teams lose sales when enquiries arrive after hours, agents repeatedly ask the same qualification questions, package information is scattered across spreadsheets, and unresponsive prospects are forgotten. Manual follow-up also makes it difficult to maintain a consistent customer experience as enquiry volume grows.',
    solutionArchitecture: 'Designed an event-driven n8n orchestration layer around WhatsApp Business messaging, Google Sheets package and lead data, an LLM agent, automated follow-up scheduling and a human-escalation path. The AI employee extracts destination, budget, travel dates and passenger count, retrieves matching packages, maintains structured lead state and triggers the next action without requiring an agent to manually manage every conversation.',
    keyCapabilities: [
      'WhatsApp AI customer conversations',
      'Automatic destination, budget, travel-date and passenger qualification',
      'Google Sheets lead management',
      'Package catalog lookup and recommendation',
      'AI-assisted itinerary generation',
      'Structured lead-stage tracking',
      'Automated follow-up scheduling for quiet leads',
      'Human escalation for complex or sensitive requests',
      'Payment-link workflow readiness',
      '24/7 first-response coverage',
      'Read-only operations dashboard for monitoring',
      'Interactive demo environment for sales presentations'
    ],
    businessImpact: 'Creates a 24/7 front-line travel sales employee that can qualify more enquiries, respond consistently, keep lead data organized and hand high-value or exceptional conversations to humans instead of letting them disappear in an inbox.',
    technologyStack: ['n8n', 'WhatsApp Business API', 'Google Sheets', 'Groq / LLMs', 'Webhooks', 'JavaScript', 'Payment Gateway API'],
    categorizedTechStack: [
      { name: 'n8n Engine', category: 'Integration' },
      { name: 'WhatsApp Business API', category: 'Messaging' },
      { name: 'Google Sheets', category: 'Storage & Docs' },
      { name: 'Groq / LLM', category: 'AI / LLM' },
      { name: 'Webhook Layer', category: 'Integration' },
      { name: 'Payment Gateway API', category: 'Media & APIs' }
    ],
    workflowSteps: [
      'WhatsApp enquiry received through webhook',
      'AI extracts customer intent and travel requirements',
      'Lead is created or updated in the structured lead sheet',
      'Package catalog is searched for relevant Pakistan destinations',
      'AI recommends packages and builds an itinerary',
      'Qualified leads move through the sales pipeline',
      'Quiet leads enter an automated follow-up schedule',
      'Complex cases are summarized and escalated to a human agent',
      'Payment-link workflow is triggered when the customer is ready to book'
    ],
    diagramNodes: [
      {
        id: 'travel-1',
        stepNumber: 1,
        title: 'WhatsApp Message Ingestion',
        tool: 'WhatsApp Business API',
        category: 'trigger',
        description: 'Receives inbound customer messages and passes the conversation event into the automation layer.',
        dataPayload: '{ phone: "+92300...", message, timestamp, conversationId }'
      },
      {
        id: 'travel-2',
        stepNumber: 2,
        title: 'AI Qualification',
        tool: 'LLM Agent',
        category: 'ai',
        description: 'Collects destination, budget, travel dates and passenger count while keeping the conversation natural.',
        dataPayload: '{ destination: "Hunza", budget: 180000, passengers: 4, dates: "Sep 12-18" }'
      },
      {
        id: 'travel-3',
        stepNumber: 3,
        title: 'Lead State Sync',
        tool: 'Google Sheets',
        category: 'storage',
        description: 'Creates or updates the structured lead record and tracks pipeline stage and follow-up state.',
        dataPayload: '{ stage: "Qualified", followUpCount: 0, updatedAt }'
      },
      {
        id: 'travel-4',
        stepNumber: 4,
        title: 'Package Retrieval',
        tool: 'Google Sheets Package Catalog',
        category: 'storage',
        description: 'Retrieves packages matching destination, budget and traveller preferences.',
        dataPayload: '{ package: "Hunza Explorer", price: 179500, duration: "7 Days" }'
      },
      {
        id: 'travel-5',
        stepNumber: 5,
        title: 'AI Recommendation & Itinerary',
        tool: 'LLM Agent',
        category: 'ai',
        description: 'Turns package data into a customer-friendly recommendation and day-by-day itinerary.',
        dataPayload: '{ recommendation, itinerary, nextAction: "quote" }'
      },
      {
        id: 'travel-6',
        stepNumber: 6,
        title: 'Follow-up & Escalation',
        tool: 'n8n Scheduler + Human Queue',
        category: 'dispatch',
        description: 'Schedules re-engagement for silent leads and sends concise summaries to a human when the AI cannot safely complete a request.',
        dataPayload: '{ followUpAt, escalation: false, reason: null }'
      }
    ],
    aiComponents: [
      'Conversational travel-sales agent',
      'Structured intent and requirement extraction',
      'Package recommendation logic',
      'Itinerary generation',
      'Lead-stage classification',
      'Follow-up message generation',
      'Human-escalation summarization'
    ],
    integrations: ['WhatsApp Business API', 'Google Sheets', 'Groq / LLM API', 'n8n Automation Engine', 'Webhook Gateway', 'Payment Gateway API'],
    image: '/assets/pakistan-travel-ai-dashboard.svg',
    metrics: [
      { label: 'First Response', value: '< 30 Seconds' },
      { label: 'Coverage', value: '24/7 AI Front Line' },
      { label: 'Demo Modules', value: '8 Interactive Views' },
      { label: 'Lead Flow', value: 'Capture → Qualify → Book' }
    ]
  },
];
