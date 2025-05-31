import React from 'react';
import { Skeleton } from '@radix-ui/themes';

import './carousel.scss';

const SKELETON_CARDS_COUNT = [1, 2, 3, 4];

const CarouselSkeleton: React.FC = () => (
  <section id="carousel" className="carousel">
    <div className="embla__viewport">
      <div className="embla__container">
        <button type="button">
          <Skeleton width="30px" height="30px" />
        </button>
        {SKELETON_CARDS_COUNT.map((item) => (
          <div className="embla__slide" key={item}>
            <div className="carousel-skeleton-card">
              <Skeleton width="100%" height="100px" />
              <div className="carousel-skeleton-card-text">
                <Skeleton width="80%" height="10px" />
                <Skeleton width="60%" height="10px" />
              </div>
            </div>
          </div>
        ))}
        <button type="button">
          <Skeleton width="30px" height="30px" />
        </button>
      </div>
    </div>
  </section>
);

export default CarouselSkeleton;
