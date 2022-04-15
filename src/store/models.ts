export type FetchingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface Tag {
  slug: string;
  name: string;
  description?: string;
  color: string;
}
export const Tags: Tag[] = [
  {
    slug: 'event',
    name: 'Event',
    color: 'orange',
  },
  {
    slug: 'homework',
    name: 'Homework',
    color: 'red',
  },
  {
    slug: 'learn',
    name: 'Learn',
    color: 'green',
  },
  {
    slug: 'people',
    name: 'People',
    color: 'blue',
  },
  {
    slug: 'university',
    name: 'University',
    color: '#8cb641',
  },
  {
    slug: 'work',
    name: 'Work',
    color: 'brown',
  },
  {
    slug: 'selfcare',
    name: 'Self care',
    color: 'aqua',
  },
].sort((a, b) => a.name.localeCompare(b.name));
