import { SITE_NAME } from '../config';

/**
 * English copy. This object's shape is the contract for every other language
 * (see `Dict` in ./index.ts) — add a key here and TypeScript will ask for it in sl.ts.
 *
 * Tokens in {braces} are filled from src/config.ts at render time (see lib/fill.ts):
 * {tz} {days} {minutes} {email} (privacy: {name} {retention} {emailProvider}).
 */

/** Who the studio is for. Owners: change this one string to retarget the hero. */
const audience = 'startups and growing businesses';

export const en = {
  meta: {
    title: `${SITE_NAME}: mobile app and backend development, Slovenia`,
    description:
      'Software development studio from Slovenia: iOS and Android apps in Kotlin Multiplatform, Node.js backends and custom software. Fixed quotes, code you own.',
    ogLocale: 'en_US',
    ogAlt: `${SITE_NAME}: mobile apps and backend systems for ${audience}.`,
  },
  a11y: {
    skip: 'Skip to content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    primaryNav: 'Primary',
    langNav: 'Language',
    externalLink: 'opens in a new tab',
    home: `${SITE_NAME} home`,
    required: 'required',
  },
  nav: {
    services: 'Services',
    work: 'Work',
    process: 'Process',
    team: 'Team',
    faq: 'FAQ',
  },
  /** One call to action, same label and destination everywhere on the page. */
  cta: 'Book a free consultation',
  hero: {
    audience,
    title: `Mobile apps and backend systems for ${audience}.`,
    sub: `${SITE_NAME} is a software development studio from Slovenia: two engineers, a business analyst and a designer. Fixed quotes, code you own.`,
    ctaSecondary: 'See our work',
    trust: 'A free {minutes}-minute call, with no obligation. We reply within 1 working day.',
    proof: {
      lead: 'Try our work live:',
      linkText: 'Product Trimmer',
      rest: 'cuts products out of photos with AI, right in your browser.',
    },
  },
  services: {
    title: 'What we build for you',
    intro: 'Requirements, design, mobile apps, backends and custom software from one team, so nothing gets lost between agencies.',
    location: 'Based in Ljubljana, Slovenia ({tz}). Our working day overlaps fully with the UK and the EU, and with mornings on the US East Coast.',
    items: [
      {
        title: 'Mobile apps',
        text: 'One codebase gives you native apps for iOS and Android. New features reach both platforms at once. We also set up payments, offline mode and store releases.',
        stack: ['Kotlin Multiplatform', 'Compose Multiplatform', 'Jetpack Compose', 'Ktor', 'SQLDelight'],
      },
      {
        title: 'Backend and APIs',
        text: 'We build the APIs, databases and cloud setup your product runs on, made to keep working as you grow. We connect payments, email and your CRM, and can fix or take over a backend you already have.',
        stack: ['Node.js', 'TypeScript', 'NestJS', 'PostgreSQL', 'GCP', 'DigitalOcean'],
      },
      {
        title: 'Custom software and AI features',
        text: 'Web apps and internal tools that fit how your team works. We add AI features to products you already have and automate dull manual work.',
        stack: ['Web apps', 'Internal tools', 'LLM integration', 'Automation'],
      },
    ],
  },
  work: {
    title: 'Products we have built',
    intro: 'Our own products, built end to end with the same stack and process we use for clients. Client work stays confidential unless you agree to show it.',
    status: {
      'in-development': 'In development',
      'early-access': 'Early access',
      'coming-soon': 'Coming soon to Google Play',
      beta: 'In beta',
      live: 'Live',
    },
    platformsLabel: 'Platforms',
    stackLabel: 'Built with',
    linksSoon: 'Store links once it launches.',
    linkLabels: {
      site: 'Visit website',
      demo: 'Try it live',
      appStore: 'App Store',
      playStore: 'Google Play',
      github: 'Source code',
    },
    screenshotAlt: 'Screenshot of',
    more: {
      title: 'Your project could be next.',
      text: 'Need an app, an API or both? Tell us about it on a free call, and we will tell you how we would build it.',
    },
  },
  testimonials: {
    title: 'What clients say',
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
        text: 'Nothing is merged until one of our engineers has read it, understood it and is ready to answer for it. Generated code never goes straight to production.',
      },
      {
        title: 'Your code stays yours',
        text: 'Your code and data are never used to train AI models. The code lives in your own repositories, documented and tested, so any engineer you hire later can pick it up.',
      },
    ],
  },
  process: {
    title: 'How we work',
    intro: 'A fixed price, a written plan and a working build every week. You always know what is being built, what it costs and when it ships.',
    steps: [
      { name: 'Discover', when: 'Free consultation', text: 'Our business analyst and an engineer go through your goals, users, processes and budget, and tell you honestly whether we are the right fit.' },
      { name: 'Scope', when: 'Spec and fixed quote', text: 'Your requirements become a written spec with designs for the key screens, milestones and a fixed quote, so scope and budget are settled before any code is written.' },
      { name: 'Build', when: 'Weekly demos', text: 'Short sprints, and a working build to try every week. You can change direction early instead of late.' },
      { name: 'Launch and support', when: 'After release', text: 'We ship to the App Store, Google Play and production, then stay on for fixes, monitoring and what comes next.' },
    ],
  },
  team: {
    title: 'Talk to the people doing the work, not a salesperson.',
    intro: 'Four people, and you talk to each of them directly. Kevin builds the Node.js and NestJS backends, Rok the iOS and Android apps in Kotlin Multiplatform, Zane turns your business needs into a clear spec, and Aneja designs how the product looks and works.',
    members: {
      kevin: {
        role: 'Backend engineer, co-founder',
        bio: 'About eight years building backend systems in Node.js, TypeScript and NestJS: APIs, data pipelines and cloud infrastructure for products in production.',
      },
      rok: {
        role: 'Mobile engineer, co-founder',
        bio: 'Android and Kotlin Multiplatform engineer who specialises in taking KMP apps to production on iOS. Works deep in Jetpack Compose and software architecture.',
      },
      zane: {
        role: 'Business process analyst',
        bio: 'Maps how your business actually works, adapts the product to each new customer’s needs, and writes the requirements the engineers build from: what to build, for whom, and how you will know it is done.',
      },
      aneja: {
        role: 'Graphic designer',
        bio: 'Designs visual identities, app and web interfaces, and marketing visuals, so the product looks finished and consistent from the first screen to the launch post.',
      },
    },
    linkLabels: { github: 'GitHub', linkedin: 'LinkedIn', site: 'Website' },
    photoAlt: 'Portrait of',
  },
  faq: {
    title: 'Cost, timing and ownership',
    items: [
      {
        q: 'How much does a project cost?',
        a: 'Every project gets its own fixed quote, sent after the free consultation call once we understand the scope. You know the full price before any work begins, with no open-ended hourly billing.',
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
        q: 'What if someone on the team is unavailable?',
        a: 'Both engineers know every codebase we work on, and the spec and designs are written down rather than kept in one person’s head. Shared ownership and a review on every change keep the project moving.',
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
    /** Shown inside the cost answer only when SHOW_PRICING is true. Replace every €TODO. */
    pricing: {
      lead: 'As a guide, typical projects start at:',
      items: [
        { label: 'Backend or API project', from: 'from €TODO' },
        { label: 'iOS and Android app with its backend', from: 'from €TODO' },
        { label: 'Ongoing support', from: 'from €TODO per month' },
      ],
    },
  },
  contact: {
    title: 'Have an idea? Let’s build it.',
    sub: 'Book a free consultation, or send a short brief with the form. Either way, a person replies.',
    nextTitle: 'What happens after you contact us',
    next: [
      { title: 'We reply within 1 working day', text: 'A real reply from the team, not an autoresponder, with a few times for a call.' },
      { title: 'A {minutes}-minute call', text: 'With one of our engineers and our business analyst. We talk about your goals, users, timeline and budget.' },
      { title: 'A written spec and fixed quote', text: 'Within {days} working days. You decide with no obligation.' },
    ],
    orEmail: 'Prefer email? Write to',
    formTitle: 'Tell us about your project',
    requiredNote: 'Fields marked * are required.',
    fields: {
      name: 'Name',
      email: 'Email',
      emailHint: 'We only use it to reply to you.',
      projectType: 'What do you need?',
      budget: 'Rough budget',
      budgetHint: 'Optional. A range helps us suggest the right scope.',
      message: 'Message',
      messageHint: 'A few lines is enough: what you want to build, for whom, and any deadline.',
      messagePlaceholder: 'For example: an iOS and Android app for booking appointments, with an admin panel. We would like to launch in spring.',
      choose: 'Choose one (optional)',
    },
    projectTypes: ['A mobile app', 'A backend or API', 'A web app or internal tool', 'An AI feature', 'Help with an existing project', 'Not sure yet'],
    budgets: ['Under €10k', '€10k to €25k', '€25k to €50k', 'Over €50k', 'Not sure yet'],
    submit: 'Send message',
    privacy: 'We use your details only to reply to your inquiry.',
    privacyLink: 'Privacy notice',
    noscript: 'The form needs JavaScript to open your email app. You can also write to us directly at {email}.',
    sent: {
      mailtoTitle: 'Your email app should now be open',
      mailtoText: 'Your message is filled in. Press send there and we will reply within 1 working day.',
      mailtoFallback: 'Nothing opened? Write to us at {email}.',
      title: 'Thanks, your message is on its way',
      text: 'We will reply within 1 working day.',
      bookPrompt: 'Want to skip the wait?',
      error: 'Something went wrong and the message was not sent. Please write to us at {email}.',
    },
  },
  footer: {
    tagline: 'Made in Slovenia, under the moon.',
    nameNote: 'Lunaria is the honesty plant (Lunaria annua). Its seed pods dry into small silver moons. We named the studio after it because we like straight answers.',
    rights: 'All rights reserved.',
    language: 'Language (footer)',
    imprint: 'Company details',
    imprintLabels: {
      company: 'Company',
      address: 'Address',
      registrationNo: 'Registration no.',
      taxNo: 'Tax / VAT no.',
      email: 'Email',
    },
    privacy: 'Privacy notice',
    noCookies: 'This site sets no cookies.',
  },
  privacy: {
    title: 'Privacy notice',
    metaTitle: `Privacy notice | ${SITE_NAME}`,
    metaDescription: `How ${SITE_NAME} handles the personal data you send through the contact form or by email. No cookies, no tracking.`,
    updated: 'Last updated:',
    /** Retention policy, and the email-host wording used while LEGAL.emailProvider is empty. */
    defaults: {
      retention: 'for up to 12 months after our last contact, unless a contract requires longer',
      emailProvider: 'an external email provider',
    },
    back: 'Back to the home page',
    sections: [
      {
        h: 'Who is responsible for your data',
        p: ['Your personal data is handled by the {name} team. You can reach us about it at any time at {email}.'],
      },
      {
        h: 'What we collect',
        p: [
          'Only what you send us through the contact form or by email: your name, email address, the type of project, an optional budget range and your message.',
          'This website sets no cookies and runs no analytics or tracking scripts.',
        ],
      },
      {
        h: 'Why we use it, and on what legal basis',
        p: [
          'We use your details to reply to your inquiry and, if you ask for one, to prepare an offer. The legal basis is Article 6(1)(b) GDPR (steps taken at your request before a contract) and, for general questions, Article 6(1)(f) GDPR (our legitimate interest in answering messages sent to us).',
          'We do not use your data for newsletters or advertising, and we do not sell or share it.',
        ],
      },
      {
        h: 'Who processes it for us',
        p: [
          'Our email is hosted by {emailProvider}. The website is hosted on GitHub Pages (GitHub, Inc.), which may log technical data such as IP addresses to deliver and secure the site.',
          'Where a provider is outside the EU, transfers are covered by the European Commission’s standard contractual clauses or an adequacy decision.',
        ],
      },
      {
        h: 'How long we keep it',
        p: ['We keep inquiries {retention}. If we start working together, your data becomes part of the project records and is kept as long as the contract and the law require.'],
      },
      {
        h: 'Your rights',
        p: [
          'You can ask us at any time to access, correct or delete your data, to restrict or object to its processing, or to receive it in a portable format. Write to {email}.',
          'You can also file a complaint with the Slovenian data protection authority: Informacijski pooblaščenec, Dunajska cesta 22, 1000 Ljubljana, www.ip-rs.si.',
        ],
      },
    ],
  },
};
