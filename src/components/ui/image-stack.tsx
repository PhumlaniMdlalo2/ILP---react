'use client'
import { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface Card {
  id: number;
  src: string;
  zIndex: number;
}

interface ImgStackProps {
  images: string[];
}

export default function ImgStack({ images }: ImgStackProps) {
  const [cards, setCards] = useState<Card[]>(
    images.map((src, index) => ({
      id: index,
      src,
      zIndex: 50 - index * 10,
    }))
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const minDragDistance = 50;

  const getCardStyles = (index: number) => ({
    x: index * -12,
    y: index * -8,
    rotate: index === 0 ? 0 : -(2 + index * 3),
    scale: 1,
    transition: { duration: 0.5 },
  });

  const handleDragStart = (_: unknown, info: PanInfo) => {
    dragStartPos.current = { x: info.point.x, y: info.point.y };
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const dist = Math.abs(info.point.x - dragStartPos.current.x);
    if (isAnimating || dist < minDragDistance) return;

    setIsAnimating(true);
    setCards(prev => {
      const next = [...prev];
      const moved = next.shift()!;
      next.push(moved);
      return next.map((card, i) => ({ ...card, zIndex: 50 - i * 10 }));
    });
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative flex items-center justify-center w-72 h-56 md:w-96 md:h-72 my-8 ml-8 md:ml-0">
      {cards.map((card, index) => {
        const isTop = index === 0;
        return (
          <motion.div
            key={card.id}
            className="absolute w-56 md:w-64 overflow-hidden rounded-xl shadow-xl bg-white cursor-grab active:cursor-grabbing border border-gray-100"
            style={{ zIndex: card.zIndex, aspectRatio: '4/3' }}
            animate={getCardStyles(index)}
            drag={isTop && !isAnimating ? "x" : false}
            dragElastic={0.2}
            dragConstraints={{ left: -150, right: 150 }}
            dragSnapToOrigin
            dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            whileHover={isTop ? { scale: 1.05, transition: { duration: 0.2 } } : {}}
            whileDrag={{
              scale: 1.1,
              rotate: 0,
              zIndex: 100,
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              transition: { duration: 0.1 },
            }}
          >
            <img
              src={card.src}
              alt={`Crop ${card.id + 1}`}
              draggable={false}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover rounded-lg pointer-events-none"
            />
          </motion.div>
        );
      })}
    </div>
  );
}
