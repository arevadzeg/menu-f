import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { useParams, useRouter } from 'next/navigation';
import useGetCategories from '<root>/app/api/hooks/category/useGetCategories';
import MainCategoriesCard from '../../product/MainCategories/Components/MainCategoriesDroppableCard/MainCategoriesDroppabeCard';
import CarouselSkeleton from './CarouselSkeleton';
import './carousel.scss';

const Carousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const { appName, categoryId } = useParams<{
    appName: string;
    categoryId?: string;
  }>();
  const router = useRouter();
  const { data: slides, isLoading } = useGetCategories();

  const handleNavigateToCategory = useCallback(
    (id: string) => {
      if (!appName) return;
      router.push(`/${appName}/${id}`);
    },
    [appName, router],
  );

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    const currentIndex = emblaApi.selectedScrollSnap();
    emblaApi.scrollTo(Math.max(currentIndex - 2, 0));
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    const currentIndex = emblaApi.selectedScrollSnap();
    const maxIndex = emblaApi.scrollSnapList().length - 1;
    emblaApi.scrollTo(Math.min(currentIndex + 2, maxIndex));
  }, [emblaApi]);

  if (!slides || isLoading) return <CarouselSkeleton />;

  return (
    <section id="carousel" className="carousel">
      <button
        className="carousel__nav carousel__nav--left"
        onClick={scrollPrev}
      >
        <ChevronLeftIcon />
      </button>

      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((category) => (
            <div className="embla__slide" key={category.id}>
              <MainCategoriesCard
                category={category}
                isSelected={categoryId === category.id}
                handleNavigateToCategory={handleNavigateToCategory}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        className="carousel__nav carousel__nav--right"
        onClick={scrollNext}
      >
        <ChevronRightIcon />
      </button>
    </section>
  );
};

export default Carousel;
