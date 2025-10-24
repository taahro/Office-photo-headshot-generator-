
import type { HeadshotStyle } from './types';

export const HEADSHOT_STYLES: HeadshotStyle[] = [
  {
    id: 'corporate_grey',
    name: 'Corporate Grey Backdrop',
    prompt: 'a professional corporate headshot, sharp lighting, against a solid light grey backdrop, looking confidently at the camera',
    thumbnail: 'https://picsum.photos/seed/corporate/200'
  },
  {
    id: 'tech_office',
    name: 'Modern Tech Office',
    prompt: 'a professional headshot in a modern tech office with a blurred background, natural window lighting, looking friendly and approachable',
    thumbnail: 'https://picsum.photos/seed/tech/200'
  },
  {
    id: 'outdoor_natural',
    name: 'Outdoor Natural Light',
    prompt: 'an outdoor professional headshot with soft, natural lighting, a slightly blurred background of greenery, warm tones, looking relaxed',
    thumbnail: 'https://picsum.photos/seed/outdoor/200'
  },
  {
    id: 'black_white_classic',
    name: 'Classic Black & White',
    prompt: 'a classic, professional black and white studio headshot with high contrast and dramatic lighting, looking thoughtful',
    thumbnail: 'https://picsum.photos/seed/bw/200'
  },
  {
    id: 'creative_colorful',
    name: 'Creative & Colorful',
    prompt: 'a creative professional headshot against a vibrant, colorful, out-of-focus urban background, looking energetic and innovative',
    thumbnail: 'https://picsum.photos/seed/creative/200'
  }
];
