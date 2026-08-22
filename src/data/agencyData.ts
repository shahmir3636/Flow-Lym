import { AgencyValue, AgencyStat } from '../types';

export const AGENCY_MISSION = {
  headline: 'Practical AI automation and software built around the way your business actually works.',
  subheadline: 'FLOWLYM helps businesses automate repetitive operations, connect their existing tools, and build custom web and software products without unnecessary complexity.',
  foundingYear: 2026,
  headquarters: 'Pakistan · Working with clients remotely',
  coreFocus: 'AI Automation, Workflow Engineering, Web Development, and Custom Software'
};

export const AGENCY_STATS: AgencyStat[] = [
  {
    label: 'AI Automation Experience',
    value: '3+ Years',
    detail: 'Hands-on experience designing and deploying business automations.'
  },
  {
    label: 'Project Focus',
    value: 'Automation First',
    detail: 'Lead management, CRM workflows, document processing, social media and more.'
  },
  {
    label: 'Development',
    value: 'Web + Software',
    detail: 'Custom websites, dashboards, integrations and business applications.'
  },
  {
    label: 'Working Style',
    value: 'Direct & Practical',
    detail: 'Clear scope, direct communication and solutions built for real operations.'
  }
];

export const AGENCY_VALUES: AgencyValue[] = [
  {
    id: 'business-first',
    title: 'Business-First Automation',
    tagline: 'Automate work that actually matters',
    description: 'We start with the business process, not the tool. The goal is to remove repetitive work, reduce errors and create measurable operational value.',
    iconName: 'Target'
  },
  {
    id: 'reliable-workflows',
    title: 'Reliable Workflows',
    tagline: 'Built for real-world edge cases',
    description: 'Workflows are designed with validation, error handling, retries and clear failure paths so they are easier to operate and maintain.',
    iconName: 'ShieldCheck'
  },
  {
    id: 'deep-integration',
    title: 'Connect What You Already Use',
    tagline: 'No unnecessary platform replacement',
    description: 'We connect CRMs, forms, spreadsheets, databases, messaging platforms and APIs around your existing stack whenever possible.',
    iconName: 'Network'
  },
  {
    id: 'custom-development',
    title: 'Custom Development When Needed',
    tagline: 'Automation is not always enough',
    description: 'When a workflow needs a custom dashboard, portal, API or application, we build the software layer that completes the solution.',
    iconName: 'Code'
  },
  {
    id: 'security',
    title: 'Security-Conscious by Default',
    tagline: 'Credentials and data handled carefully',
    description: 'We follow practical security principles around access, credentials, webhooks, API permissions and sensitive business data.',
    iconName: 'Lock'
  },
  {
    id: 'direct-partnership',
    title: 'Direct Collaboration',
    tagline: 'No unnecessary layers',
    description: 'You work directly with the people designing the solution, keeping communication fast and technical decisions clear.',
    iconName: 'Users'
  }
];

export const AGENCY_STORY = {
  originTitle: 'Built from hands-on automation experience',
  paragraph1: 'FLOWLYM focuses on a simple idea: businesses should not have people spending hours moving information between systems when software can do it reliably.',
  paragraph2: 'With more than three years of hands-on AI automation experience, we build workflows around CRMs, lead capture, documents, communication, social media, e-commerce and internal operations. We also develop the websites, dashboards and software needed around those workflows.',
  paragraph3: 'The result is practical technology that fits the client’s existing process, removes repetitive work and leaves the business with a system they can understand and maintain.'
};

export const ENGINEERING_STANDARDS = [
  {
    title: 'Validation & Structured Data',
    desc: 'Incoming data is checked and normalized before it is passed to the next step of a workflow.'
  },
  {
    title: 'Error Handling & Retries',
    desc: 'Important workflows include sensible failure handling so temporary API or network problems do not silently break operations.'
  },
  {
    title: 'Clear Integrations',
    desc: 'APIs, webhooks and credentials are organized so the automation remains understandable and easier to troubleshoot.'
  },
  {
    title: 'Documentation & Handover',
    desc: 'Clients receive clear workflow explanations and practical handover information for the systems we build.'
  }
];
