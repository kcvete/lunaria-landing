import { SITE_NAME } from '../config';

/**
 * English copy. This object's shape is the contract for every other language
 * (see `Dict` in ./index.ts) — add a key here and TypeScript will ask for it in sl.ts.
 */
export const en = {
  meta: {
    title: `${SITE_NAME} — mobile apps and backend systems, built on demand`,
    description:
      'Two senior engineers from Slovenia building Kotlin Multiplatform apps for iOS and Android, Node.js and NestJS backends, and custom software. AI-assisted, reviewed by hand, shipped in weeks.',
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
    cta: 'Book a call',
  },
  hero: {
    title: 'Apps and backend systems, built on demand.',
    sub: 'We are two senior engineers from Slovenia. Rok builds iOS and Android apps in Kotlin Multiplatform; Kevin builds the Node.js and NestJS backends behind them. AI tools take care of the routine parts, so your first version ships in weeks, not months.',
    ctaPrimary: 'Book a call',
    ctaSecondary: 'See our work',
    trust: 'The first call is free and commits you to nothing. We reply within 24 hours.',
  },
  services: {
    title: 'What we build',
    intro: 'One small team covers every layer, from the screen in your customer’s hand to the database behind it. We are based in Slovenia and work with clients across the EU.',
    items: [
      {
        title: 'Mobile apps',
        text: 'One Kotlin Multiplatform codebase that compiles to native iOS and Android apps. Shared business logic, native performance, and UI in Compose Multiplatform or Jetpack Compose. We handle offline sync, payments and store releases too.',
        stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Jetpack Compose', 'Ktor', 'SQLDelight'],
      },
      {
        title: 'Backend and APIs',
        text: 'APIs, data pipelines and the infrastructure underneath them, built to keep working as your user count grows. We also connect the payment, email, analytics and CRM services your product depends on.',
        stack: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'GCP', 'DigitalOcean'],
      },
      {
        title: 'Custom software and AI features',
        text: 'Web apps and internal tools shaped around how your team actually works, LLM features built into existing products, and automation for the repetitive jobs nobody wants to do by hand.',
        stack: ['Web apps', 'Internal tools', 'LLM integration', 'Automation'],
      },
    ],
  },
  work: {
    title: 'Our own products',
    intro: 'Between client projects we build products of our own. Client work stays confidential unless you would like it shown here.',
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
      text: 'Need an app, an API or both? Tell us what you have in mind and we will tell you honestly how we would build it.',
      cta: 'Start a project',
    },
  },
  ai: {
    title: 'AI is our accelerator, not our engineer.',
    intro: 'We use AI coding tools every day. Here is where they help and where we draw the line.',
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
    title: 'How a project runs',
    intro: 'Four phases, the same every time. You always know what is being built, what it costs and when it lands.',
    steps: [
      { name: 'Discover', when: 'Free call', text: 'We talk through your idea, your users and your constraints. No pitch deck, no pressure.' },
      { name: 'Scope', when: 'Fixed quote', text: 'You get a written plan with milestones and a fixed quote, so the budget is settled before work starts.' },
      { name: 'Build', when: 'Weekly demos', text: 'Short sprints, and a working build to try every week. You can change direction early instead of late.' },
      { name: 'Launch and support', when: 'After release', text: 'We ship to the App Store, Google Play and production, then stay on for fixes, monitoring and what comes next.' },
    ],
  },
  team: {
    title: 'Talk to the engineers, not a salesperson.',
    intro: 'Small team, senior hands. You talk directly to the people who write your code.',
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
    title: 'Questions clients ask first',
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
    sub: 'Book a free call, or send a few lines about your project. We reply within 24 hours.',
    ctaBook: 'Book a call',
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
