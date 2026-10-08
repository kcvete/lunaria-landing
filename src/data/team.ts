/**
 * Team members. Role + bio copy lives in the translation dictionaries
 * (`team.members.<id>` in src/i18n/en.ts and sl.ts); this file holds the rest.
 */
export interface TeamMember {
  id: 'kevin' | 'rok' | 'zane' | 'aneja';
  name: string;
  /** Square portrait, path relative to /public (e.g. 'team/rok.jpg'). '' renders initials instead. */
  photo: string;
  links: { github?: string; linkedin?: string; site?: string };
}

export const team: TeamMember[] = [
  {
    id: 'kevin',
    name: 'Kevin Cvetežar',
    // TODO: real portrait. The GitHub avatar (public/team/kevin.png) is an auto-generated
    // identicon, not a photo, so the page shows initials until a portrait is added:
    // set e.g. photo: 'team/kevin.jpg' (square, ≥ 224px).
    photo: '',
    links: {
      github: 'https://github.com/kcvete',
      linkedin: '', // TODO: LinkedIn URL
    },
  },
  {
    id: 'rok',
    name: 'Rok Retar',
    photo: 'team/rok.jpg', // TODO: real portrait (currently GitHub avatar)
    links: {
      github: 'https://github.com/RetRo99',
      linkedin: 'https://www.linkedin.com/in/rok-retar/',
      site: 'https://www.retar.app',
    },
  },
  {
    id: 'zane',
    name: 'Zane Feodora', // TODO: confirm spelling
    photo: '', // TODO: real portrait (initials "ZF" until then)
    links: {
      linkedin: '', // TODO: LinkedIn URL
    },
  },
  {
    id: 'aneja',
    name: 'Aneja Fučka', // TODO: confirm spelling
    photo: '', // TODO: real portrait (initials "AF" until then)
    links: {
      linkedin: '', // TODO: LinkedIn URL
      site: '', // TODO: portfolio URL
    },
  },
];
