import type { ImageMetadata } from 'astro';
import kevinPhoto from '../assets/team/kevin.jpg';
import rokPhoto from '../assets/team/rok.jpg';
import zanePhoto from '../assets/team/zane.jpg';
import anejaPhoto from '../assets/team/aneja.jpg';

/**
 * Team members. Role + bio copy lives in the translation dictionaries
 * (`team.members.<id>` in src/i18n/en.ts and sl.ts); this file holds the rest.
 *
 * Photos: square images in src/assets/team/, cropped so the face sits in the
 * centre of the circle. Astro outputs WebP at the displayed size (and 2× where the
 * source is large enough). `photo: null` shows the person's initials instead.
 */
export interface TeamMember {
  id: 'kevin' | 'rok' | 'zane' | 'aneja';
  name: string;
  photo: ImageMetadata | null;
  links: { github?: string; linkedin?: string; site?: string };
}

export const team: TeamMember[] = [
  {
    id: 'kevin',
    name: 'Kevin Cvetežar',
    photo: kevinPhoto, // cropped from the 200×200 LinkedIn photo; a larger original would be sharper on 2× screens
    links: {
      github: 'https://github.com/kcvete',
      linkedin: 'https://www.linkedin.com/in/kevin-cvete%C5%BEar-836087167/',
    },
  },
  {
    id: 'rok',
    name: 'Rok Retar',
    photo: rokPhoto, // 460×460 GitHub avatar (same photo as LinkedIn, higher resolution)
    links: {
      github: 'https://github.com/RetRo99',
      linkedin: 'https://www.linkedin.com/in/rok-retar/',
      site: 'https://www.retar.app',
    },
  },
  {
    id: 'zane',
    name: 'Zane Feodorova',
    photo: zanePhoto, // cropped from the 200×200 LinkedIn photo
    links: {
      linkedin: 'https://www.linkedin.com/in/zane-feodorova-a75a98151/',
    },
  },
  {
    id: 'aneja',
    name: 'Aneja Fučka',
    photo: anejaPhoto, // 200×200 LinkedIn photo
    links: {
      linkedin: 'https://www.linkedin.com/in/aneja-fu%C4%8Dka-242670211/',
      site: '', // TODO: portfolio URL (optional)
    },
  },
];
