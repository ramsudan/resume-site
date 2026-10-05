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
        'Built AI developer tooling in Kiro (skills, hooks, and code- and security-review agents) and piloted AI-driven workflows for tech-debt and upgrade automation.',
        'Architecture-team engineer on Spectrum’s Angular/NgRx micro-frontend monorepo (Spectrum.net and the My Spectrum app via CapacitorJS), where features ship once across web, iOS, and Android. ~1,200 commits since late 2021.',
        'Built a config-driven development approach for Angular, enabling remarkably versatile pages generated from configuration.',
        'Led Angular upgrades from 13 to 20 (NgRx, RxJS, Material, module federation, Node 20) and CapacitorJS upgrades from 5 to 7, moving toward standalone components.',
        'Migrated all micro-frontends from FlexLayout to the Kite Design System, and standardized the monorepo with Prettier/ESLint, bundle budgets, and custom lint rules.',
        'Fixed a monorepo build needing ~16GB of memory by mapping circular dependencies and tuning webpack/TS; optimized chunking and shared assets, and ran esbuild and Nx proofs-of-concept for leadership estimates.',
        'Built and stabilized mobile flows (biometrics, push, deep/universal links, live updates), integrated native SDK plugins on Android and iOS, and fixed production-blocking defects like white-screen-on-resume and token refresh.',
        'Remediated a large backlog of Veracode and NowSecure findings across libraries, MFEs, and the mobile app, pinned dependencies against npm supply-chain attacks, and built an automated secrets-incident reporting harness.',
        'Wrote architecture diagrams and design docs enabling independent team delivery; drove an SSO performance initiative; reverted a change behind ~600 nightly E2E failures and stabilized the regression infrastructure.',
      ],
    },
    {
      company: 'State Compensation Insurance Fund',
      title: 'Web Developer',
      start: 'Feb 2015',
      end: 'Mar 2021',
      bullets: [
        'Developed UI features for a provider data entry and management system, an anti-fraud workbench, a provider data aggregator, and corporate dashboards.',
        'Migrated projects from legacy .NET 4.5 to a modern .NET Core and Angular stack.',
      ],
    },
    {
      company: 'U.S. Bank',
      title: 'Web User Interface Developer',
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
        'Built UI features for Mindtap and MTX, the company’s educational platform for delivering course materials, with a focus on modular design and Test Driven Development.',
      ],
    },
    {
      company: 'Verizon',
      title: 'Web User Interface Developer',
      start: 'Sep 2012',
      end: 'Mar 2013',
      bullets: [
        'Developed UI features for FiOS TV, focused on code reusability and performance optimization.',
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
    'Webpack / Module Federation',
    'Application Security',
    'Node/Express',
    'Gitlab CI/CD',
    'Micro Frontends',
    'Monorepo Architecture',
    'Responsive / Mobile UI',
    'Test Driven Development',
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
