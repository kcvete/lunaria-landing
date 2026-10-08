import { SITE_NAME } from '../config';

/**
 * English copy. This object's shape is the contract for every other language
 * (see `Dict` in ./index.ts) — add a key here and TypeScript will ask for it in sl.ts.
 */
export const en = {
  meta: {
    title: `${SITE_NAME}: software development studio for mobile apps and backends`,
    description:
      `${SITE_NAME} is a software development studio from Slovenia. We build iOS and Android apps with Kotlin Multiplatform, backends and APIs with Node.js and NestJS, and custom software with AI integrations. Fixed quotes, weekly demos.`,
    ogLocale: 'en_US',
  },
  a11y: {
    skip: 'Skip to content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    primaryNav: 'Primary',
    langNav: 'Language',
    externalLink: 'opens in a new tab',
    home: `${SITE_NAME} home`,
  },
  nav: {
    services: 'Services',
    work: 'Work',
    process: 'Process',
    team: 'Team',
    faq: 'FAQ',
    cta: 'Book a consultation',
  },
  hero: {
    title: 'We build mobile apps and backend systems for your business.',
    sub: `${SITE_NAME} is a software development studio from Slovenia. Two senior engineers, fixed quotes, code you own.`,
    servicesLabel: 'What we build',
    services: [
      { name: 'Mobile apps', detail: 'iOS and Android from one Kotlin Multiplatform codebase' },
      { name: 'Backend and APIs', detail: 'Node.js, NestJS and PostgreSQL on GCP or DigitalOcean' },
      { name: 'Custom software', detail: 'Web apps, internal tools and AI integrations' },
    ],
    ctaPrimary: 'Book a free consultation',
    ctaSecondary: 'Start a project',
    trust: 'The consultation is free and non-binding. We reply within 24 hours.',
  },
  services: {
    title: 'Services',
    intro: 'Mobile, backend and custom software from one team, so there are no handoffs between agencies. We are based in Slovenia and work with clients across the EU.',
    items: [
      {
        title: 'Mobile apps',
        text: 'Native iOS and Android apps from one Kotlin Multiplatform codebase, so every feature ships to both platforms at once. UI in Compose Multiplatform or Jetpack Compose. We also handle offline sync, payments and App Store and Google Play releases.',
        stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Jetpack Compose', 'Ktor', 'SQLDelight'],
      },
      {
        title: 'Backend and APIs',
        text: 'APIs, data pipelines and cloud infrastructure that keep working as your user count grows. We integrate the payment, email, analytics and CRM services your product depends on, and can take over and stabilise an existing backend.',
        stack: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'GCP', 'DigitalOcean'],
      },
      {
        title: 'Custom software and AI features',
        text: 'Web apps and internal tools built around how your team works, LLM features added to existing products, and automation that removes repetitive manual work.',
        stack: ['Web apps', 'Internal tools', 'LLM integration', 'Automation'],
      },
    ],
  },
  work: {
    title: 'Products we have built',
    intro: 'Our own products, built end to end with the same stack and process we use for clients. Client work stays confidential unless you agree to show it.',
    status: {
      'in-development': 'In development',
      beta: 'In beta',
      live: 'Live',
    },
    platformsLabel: 'Platforms',
    stackLabel: 'Built with',
    linksSoon: 'Store links once it launches.',
    linkLabels: {
      site: 'Website',
      demo: 'Try it',
      appStore: 'App Store',
      playStore: 'Google Play',
      github: 'Source code',
    },
    more: {
      title: 'Your project could be next.',
      text: 'Need an app, an API or both? Send a short brief and we will reply with how we would build it and a rough plan.',
      cta: 'Start a project',
    },
  },
  ai: {
    title: 'AI is our accelerator, not our engineer.',
    intro: 'We use AI coding tools daily to deliver faster. Here is what that means for your project.',
    points: [
      {
        title: 'Faster on the routine work',
        text: 'Boilerplate, test scaffolding, migrations and quick prototypes of competing approaches. The hours saved go into the parts of your product that need real thought.',
      },
      {
        title: 'Every line is reviewed',
        text: 'Nothing is merged until one of us has read it, understood it and is ready to answer for it. Generated code never goes straight to production.',
      },
      {
        title: 'Code you own and can hand over',
        text: 'You get documented, tested, production-grade code in your own repositories, readable by any engineer you hire after us.',
      },
    ],
  },
  process: {
    title: 'How we work',
    intro: 'A fixed price, a written plan and a working build every week. You always know what is being built, what it costs and when it ships.',
    steps: [
      { name: 'Discover', when: 'Free consultation', text: 'We go through your goals, users, timeline and budget, and tell you honestly whether we are the right fit.' },
      { name: 'Scope', when: 'Fixed quote', text: 'You get a written plan with milestones and a fixed quote, so the budget is settled before work starts.' },
      { name: 'Build', when: 'Weekly demos', text: 'Short sprints, and a working build to try every week. You can change direction early instead of late.' },
      { name: 'Launch and support', when: 'After release', text: 'We ship to the App Store, Google Play and production, then stay on for fixes, monitoring and what comes next.' },
    ],
  },
  team: {
    title: 'Talk to the engineers, not a salesperson.',
    intro: 'Two senior engineers. Rok builds the iOS and Android apps in Kotlin Multiplatform; Kevin builds the Node.js and NestJS backends behind them. You talk directly to the people who write your code.',
    members: {
      kevin: {
        role: 'Backend engineer, co-founder',
        bio: 'About eight years building backend systems in Node.js, TypeScript and NestJS: APIs, data pipelines and cloud infrastructure for products with a lot of users.',
      },
      rok: {
        role: 'Mobile engineer, co-founder',
        bio: 'Android and Kotlin Multiplatform engineer who specialises in taking KMP apps to production on iOS. Works deep in Jetpack Compose and software architecture.',
      },
    },
    linkLabels: { github: 'GitHub', linkedin: 'LinkedIn', site: 'Website' },
    photoAlt: 'Portrait of',
  },
  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'How much does a project cost?',
        a: 'Every project gets a fixed quote after a free scoping call. You know the full price before any work begins, with no open-ended hourly billing.',
      },
      {
        q: 'How long does it take?',
        a: 'Most first versions ship in 4 to 12 weeks, depending on scope. We agree on milestones up front and show you working software every week.',
      },
      {
        q: 'Who owns the code?',
        a: 'You do, 100%. The code, the repositories and the infrastructure accounts are yours from day one.',
      },
      {
        q: 'What if one of you is unavailable?',
        a: 'Both of us know every codebase we work on. Shared ownership, a review on every change and written documentation keep the project moving.',
      },
      {
        q: 'Do you work with clients outside Slovenia?',
        a: 'Yes. We work with clients across the EU and beyond, in English or Slovenian, remotely or in person when it helps.',
      },
      {
        q: 'Can you take over an existing project?',
        a: 'Yes. We start with a short review of the code and infrastructure, tell you plainly what we find, and propose a plan to stabilise it and move forward.',
      },
    ],
  },
  contact: {
    title: 'Have an idea? Let’s build it.',
    sub: 'Book a free consultation or send a short brief. We reply within 24 hours with next steps.',
    ctaBook: 'Book a free consultation',
    orEmail: 'Prefer email? Write to',
    formTitle: 'Tell us about your project',
    fields: {
      name: 'Name',
      email: 'Email',
      projectType: 'What do you need?',
      budget: 'Rough budget',
      message: 'Message',
      messagePlaceholder: 'What would you like to build, and is there a deadline?',
      choose: 'Choose one',
    },
    projectTypes: ['A mobile app', 'A backend or API', 'A web app or internal tool', 'An AI feature', 'Help with an existing project', 'Not sure yet'],
    budgets: ['Under €10k', '€10k to €25k', '€25k to €50k', 'Over €50k', 'Not sure yet'],
    submit: 'Send message',
    mailtoNote: 'This opens your email app with the message filled in.',
  },
  footer: {
    tagline: 'Made in Slovenia, under the moon.',
    rights: 'All rights reserved.',
    language: 'Language',
  },
};
