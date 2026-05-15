import { CardItem } from './types';

const mock_data: CardItem[] = [
  {
    id: '1',
    title: 'First news',
    description: 'This is the first news card',
    createdAt: '2025-01-10T12:00:00Z',
  },
  {
    id: '2',
    title: 'Second news',
    description: 'This is the second news card',
    createdAt: '2025-02-15T09:30:00Z',
  },
  {
    id: '3',
    title: 'Third news',
    description: 'This is the third news card',
    createdAt: '2025-03-01T18:45:00Z',
  },
  {
    id: '4',
    title: 'Fourth news',
    description: 'This is the fourth news card',
    createdAt: '2025-04-20T08:10:00Z',
  },
];

interface CardsOptions {
  delay?: number;
  data?: CardItem[];
}

export const cardsFetching = ({
  delay = 1000,
  data = mock_data,
}: CardsOptions = {}): Promise<CardItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
};