/* eslint-disable @typescript-eslint/no-explicit-any */
import Carousel from 'react-spring-3d-carousel';
import { useState, useEffect } from 'react';
import { config } from 'react-spring';
import { cn } from '@/lib/utils';
import { ChevronRightCircle, ChevronLeftCircle } from 'lucide-react';

export default function CardCarousel(props: {
  cards: {
    key: number;
    content: JSX.Element;
  }[];
  offset: number;
  showArrows: boolean;
  width?: any;
  height: any;
  margin: any;
  className?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const table = props.cards.map((element, index) => {
    return { ...element, onClick: () => setGoToSlide(index) };
  });

  const [offsetRadius, setOffsetRadius] = useState(2);
  const [showArrows, setShowArrows] = useState(false);
  const [goToSlide, setGoToSlide] = useState(0);
  const [cards] = useState(table);

  useEffect(() => {
    setOffsetRadius(props.offset);
    setShowArrows(props.showArrows);
  }, [props.offset, props.showArrows]);

  return (
    <div
      style={{ height: props.height, margin: props.margin }}
      className={cn(
        'flex justify-center items-center w-full flex-col md:w-[90%] relative',
        props.className,
      )}
    >
      <Carousel
        slides={cards}
        goToSlide={goToSlide}
        offsetRadius={offsetRadius}
        showNavigation={showArrows}
        animationConfig={config.gentle}
      />
      <div className='absolute pt-2 z-10 w-[calc(75%+10px)] md:w-[calc(75%-75px)] flex justify-between'>
        <button
          className='cursor-pointer'
          onClick={() => {
            setGoToSlide(goToSlide - 1);
          }}
        >
          <ChevronLeftCircle size={30} className='text-emerald-300' />
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <button
          className='cursor-pointer'
          onClick={() => {
            setGoToSlide(goToSlide + 1);
          }}
        >
          <ChevronRightCircle size={30} className='text-emerald-300' />
        </button>
      </div>
    </div>
  );
}
