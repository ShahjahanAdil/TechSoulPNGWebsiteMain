import React, { useEffect, useRef, useState } from 'react';
import './CardSlider.css';
import card1 from '../../assets/images/s1.jpg';
import card2 from '../../assets/images/s4.jpg';
import card3 from '../../assets/images/s5.jpg';
import card4 from '../../assets/images/s5.jpg';
import card5 from '../../assets/images/clothes.png';

const Card = ({ category, title, author, imageUrl, imageCount }) => (
  <article className="card">
    <div className="card__info-hover">
      <svg className="card__trending" viewBox="0 0 24 24" aria-hidden="true">
        <path d="..." />
      </svg>
      <div className="card__clock-info">
        <svg className="card__images" viewBox="0 0 24 24" aria-hidden="true">
          <path d="..." />
        </svg>
        <span className="card__stock-count">{imageCount} images</span>
      </div>
    </div>

    <div className="card__img" style={{ backgroundImage: `url(${imageUrl})` }} />
    <a href="#" className="card_link" aria-label={`View details for ${title}`}>
      <div className="card__img--hover" style={{ backgroundImage: `url(${imageUrl})` }} />
    </a>

    <div className="card__info">
      <span className="card__category">{category}</span>
      <h3 className="card__title">{title}</h3>
      <span className="card__by">
        by{' '}
        <a href="#" className="card__author" title="author">
          {author}
        </a>
      </span>
    </div>
  </article>
);

const CardsSlider = () => {
  const cardsData = [
    {
      id: 1,
      category: 'Nature',
      title: 'Sunset Over the Hills',
      author: 'Alice Green',
      imageUrl: card1,
      imageCount: 10,
    },
    {
      id: 2,
      category: 'Architecture',
      title: 'Modern Cityscape',
      author: 'Bob Brown',
      imageUrl: card2,
      imageCount: 7,
    },
    {
      id: 3,
      category: 'Food',
      title: 'Delicious Pasta',
      author: 'Carol White',
      imageUrl: card3,
      imageCount: 5,
    },
    {
      id: 4,
      category: 'Food',
      title: 'Delicious Pasta',
      author: 'Carol White',
      imageUrl: card4,
      imageCount: 5,
    },
    {
      id: 5,
      category: 'Food',
      title: 'Delicious Pasta',
      author: 'Carol White',
      imageUrl: card5,
      imageCount: 5,
    },
    {
      id: 6,
      category: 'Food',
      title: 'Delicious Pasta',
      author: 'Carol White',
      imageUrl: card3,
      imageCount: 5,
    },
    {
      id: 7,
      category: 'Food',
      title: 'Delicious Pasta',
      author: 'Carol White',
      imageUrl: card3,
      imageCount: 5,
    },
  ];

  const sliderRef = useRef(null);
  const scrollRef = useRef(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const scrollCards = () => {
      const card = slider.querySelector('.card');
      if (!card) return;

      const style = window.getComputedStyle(card);
      const marginLeft = parseFloat(style.marginLeft);
      const marginRight = parseFloat(style.marginRight);
      const cardFullWidth = card.offsetWidth + marginLeft + marginRight;

      let newScroll = scrollRef.current + cardFullWidth;

      if (newScroll > slider.scrollWidth - slider.clientWidth) {
        newScroll = 0;
      }

      slider.scrollTo({
        left: newScroll,
        behavior: 'smooth',
      });

      scrollRef.current = newScroll;
    };

    const interval = setInterval(scrollCards, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="cards" ref={sliderRef}>
      {cardsData.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default CardsSlider;
