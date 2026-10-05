// Single source of truth for resume content, sourced from the LinkedIn profile PDF.
// Edit freely — add a personal site/GitHub link, expand bullets, etc.
export const resume = {
  name: 'Ramsudan Dongol',
  headline: 'Web / Hybrid App Developer',
  linkedin: 'https://www.linkedin.com/in/ramsudand',
  github: '',
  summary:
    'Solutions-driven, highly motivated developer with experience designing and ' +
    'developing user experiences for diverse industry organizations. Experienced ' +
    'in technical maintenance, optimization, and upgrades of tech stacks, monorepo ' +
    'architectures, and micro frontends, with expertise in observables. Recent ' +
    'experience with Capacitor app development for a unified development workflow. ' +
    'Currently building up an AI-focused skill set — tinkering with MCP, local ' +
    'models, Ollama, ComfyUI, n8n, and CrewAI for workflow orchestration.',

  experience: [
    {
      company: 'Charter Communications',
      title: 'Web / Hybrid App Developer - Software Engineer VI',
      start: 'Dec 2021',
      end: 'Present',
      bullets: [
        'Built various harnesses in Kiro (skills, agents and more) for AI-driven workflows for tech-debt and upgrade automations etc. Supported the analysis and review of AIDLC process pilot',
        'Built review tool for reviewing various artifacts (skills, agents and more) developed for kiro combining both non deterministic as well as deterministic checks for adherence to best practices in addition to the eval testing harness. Championed the eval driven development approach for outputting quality artifacts for kiro.',
        'Created proof-of-concept bot with AI backend to help developers query our architecture docs, best practices as well as automate our JIRA intake and ticket creation process freeing up our time to focus on other things',
        'Worked on effort on app development with current micro frontend monorepo with multiple shells and MFEs to unify the code to achieve the holy grail of developing features once that works across all web, iOS and Android devices.',
        'Built a config-driven development approach for Angular, enabling remarkably versatile pages generated from configuration.',
        'Led Angular upgrades from 13 to 20 (NgRx, RxJS, module federation, Node etc) and CapacitorJS upgrades from 5 to 7.',
        'Standardized and automated various aspects of code standards and code hygiene across entire micro frontend monorepo, both general and company specific with Prettier/ESLint and custom lint rules.',
        'Improved build performance and bundle sizes for our monorepo build needing ~16GB of memory by mapping circular dependencies and tuning webpack/TS/angular configurations, optimized chunking and shared assets, plugging minification gaps in jsons and GraphQL etc to reduce bundle sizes as well as improve app quality scores and ran esbuild and Nx migration proof-of-concept for leadership estimates.',
        'Built and stabilized mobile flows (biometrics, push, deep/universal links etc), integrated native SDK plugins on Android and iOS, and fixed various production-blocking defects.',
        'Remediated a large backlog of Veracode and Gitguardian vulnerability findings across various libraries, MFEs, and the mobile app, and built an automated secrets-incident reporting harness.',
        'Created architecture L diagrams and design docs enabling independent feature team delivery.',
        'Automated e2e results comparisons to speed up the regression triage that was done manually before, to significantly reduce time to production.'
      ],
    },
    {
      company: 'State Compensation Insurance Fund',
      title: 'Web Developer',
      start: 'Feb 2015',
      end: 'Mar 2021',
      bullets: [
        'Developed features for a provider data entry and management system, an anti-fraud workbench, a provider data aggregator, and corporate dashboards.',
        'Migrated projects from legacy .NET 4.5 to a modern .NET Core and Angular stack.',
      ],
    },
    {
      company: 'U.S. Bank',
      title: 'Web Developer',
      start: 'Jul 2014',
      end: 'Jan 2015',
      bullets: [
        'Led a team of developers building a bank mobile application, implementing responsive CSS and transforming design prototypes into working mobile pages.',
      ],
    },
    {
      company: 'Cengage Learning',
      title: 'Web Developer',
      start: 'Apr 2013',
      end: 'Jul 2014',
      bullets: [
        'Built features for Mindtap and MTX, the company’s educational platform for delivering course materials, with a focus on modular design and Test Driven Development.',
      ],
    },
    {
      company: 'Verizon',
      title: 'Web Developer',
      start: 'Sep 2012',
      end: 'Mar 2013',
      bullets: [
        'Developed features for FiOS TV, focused on code reusability and performance optimization.',
      ],
    },
  ],

  skills: [
    'CapacitorJS',
    'Xcode',
    'Android Studio',
    'Angular',
    'NgRx',
    'TypeScript',
    '.NET Core',
    'Observables / RxJS',
    'Module Federation / Micro Frontends',
    'Monorepo Architecture',
    'Application Security',
    'Node/Express',
    'Gitlab CI/CD',
    'Responsive / Mobile UI',
    'Test Driven Development',
    'Lucid'
  ],

  certifications: ['Multi AI Agent Systems with crewAI'],

  exploring: [
    'Model Context Protocol (MCP)',
    'Local LLMs with Ollama',
    'ComfyUI',
    'n8n workflow automation',
    'CrewAI multi-agent orchestration',
  ],
};
