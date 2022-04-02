export type FetchingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface Tag {
  slug: string;
  name: string;
  description?: string;
  color: string;
}
export const Tags: Tag[] = [
  {
    slug: 'work',
    name: 'Work',
    color: 'red',
  },
  {
    slug: 'study',
    name: 'Study',
    color: 'green',
  },
];
