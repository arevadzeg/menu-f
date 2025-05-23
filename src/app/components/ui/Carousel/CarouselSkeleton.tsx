import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@radix-ui/themes";

import './carousel.scss';

const SKELETON_CARDS_COUNT = 4;

export const CarouselSkeleton: React.FC = () => {
    return (
        <section id="carousel" className="carousel">

            <div className="embla__viewport">
                <div className="embla__container">
                    <button >
                        <Skeleton width={'30px'} height="30px" />
                    </button>
                    {Array.from({ length: SKELETON_CARDS_COUNT }).map((_, index) => (
                        <div className="embla__slide" key={index}>
                            <div className="carousel-skeleton-card">
                                <Skeleton width="100%" height="100px" />
                                <div className="carousel-skeleton-card-text">
                                    <Skeleton width="80%" height="10px" />
                                    <Skeleton width="60%" height="10px" />
                                </div>
                            </div>
                        </div>
                    ))}
                    <button  >
                        <Skeleton width={'30px'} height="30px" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CarouselSkeleton;
