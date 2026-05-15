import { CardItem } from './types';

import './Card.css';

interface CardProps {
  item: CardItem;
  onClick: (cardId: string) => void;
}

export const Card = ({ item, onClick}: CardProps) => {
  return (
    <div className="card" onClick={() => onClick(item.id)}>
      <div className="content">
        <div className="title">{item.title}</div>
        <div className="description">{item.description}</div>
      </div>
      <span className="card__date">
        {new Date(item.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
};