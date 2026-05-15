import { useEffect, useMemo, useState, useCallback } from 'react';

import { Card } from './Card';
import { cardsFetching } from './mockApi';

import { CardItem, SortOrder } from './types';

import './CardsGrid.css';

export const CardsGrid = () => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  if (loading) return <div className="cards-grid__loading">Загрузка...</div>

  useEffect(() => {
    const loadCards = async () => {
      setLoading(true);

      try {
        const response = await cardsFetching();
        const cards = response.sort((a, b) => {
        const firstDate = new Date(a.createdAt).getTime();
        const secondDate = new Date(b.createdAt).getTime();

        if (sortOrder === 'asc') {
          return firstDate - secondDate;
        }

        return secondDate - firstDate;
        });

        setCards(cards);
      } finally {
        setLoading(false);
      }
    };

    loadCards();

    setInterval(() => {
      loadCards();
    }, 60000);

    const handleScroll = () => {
      localStorage.setItem(
        'scroll-position',
        window.scrollY.toString(),
      );
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = useCallback(
    (cardId: string) => {
      setSelectedCardId(cardId);
    },
    [],
  );

  const arr = useMemo(() => {
    return [...cards].sort((a, b) => {
      const firstDate = new Date(a.createdAt).getTime();
      const secondDate = new Date(b.createdAt).getTime();

      if (sortOrder === 'asc') {
        return firstDate - secondDate;
      }

      return secondDate - firstDate;
    });
  }, [cards, sortOrder]);

    useEffect(() => {
      if (!selectedCardId) {
        return;
      }

     const updatedCards = cards.map((card) => {
      if (card.id === selectedCardId) {
        return {
          ...card,
          title: `${card.title} 🔥`,
        };
      }

      return card;
    });

    setCards(updatedCards);
  }, [selectedCardId, cards]);

  return (
    <section className="cards-grid">
      <div className="title">Список новостей</div>
      <div className="controls">
        <div
          onClick={() => setSortOrder('asc')}
          className={sortOrder === 'asc' ? 'active' : ''}
        >
          Сначала старые
        </div>
        <div
          onClick={() => setSortOrder('desc')}
          className={sortOrder === 'desc' ? 'active' : ''}
        >
          Сначала новые
        </div>
      </div>
      <div className="content">
        {arr.map((card, i) => (
          <Card key={i} item={card} onClick={handleCardClick} />
        ))}
      </div>
    </section>
  );
};
