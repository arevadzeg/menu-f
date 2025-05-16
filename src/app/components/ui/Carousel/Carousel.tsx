import React from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import MainCategoriesCard from '../../product/MainCategories/Components/MainCategoriesDroppableCard/MainCategoriesDroppabeCard';
import { useParams, useRouter } from 'next/navigation';
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons"


type PropType = {
    slides: any[];
    options?: EmblaOptionsType;
};

const Carousel: React.FC<PropType> = ({ slides, options }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const { appName, categoryId } = useParams();
    const router = useRouter();

    const handleNavigateToCategory = (categoryId: string) => {
        router.push(`/${appName}/${categoryId}`);
    };


    const scrollPrev = () => {
        if (!emblaApi) return;
        const currentIndex = emblaApi.selectedScrollSnap();
        const targetIndex = Math.max(currentIndex - 2, 0);
        emblaApi.scrollTo(targetIndex);
    };
    const scrollNext = () => {
        if (!emblaApi) return;
        const currentIndex = emblaApi.selectedScrollSnap();
        const maxIndex = emblaApi.scrollSnapList().length - 1;
        const targetIndex = Math.min(currentIndex + 2, maxIndex);
        emblaApi.scrollTo(targetIndex);
    };

    // TODO PROBABLY NEED TO REMOVE THIS SHIT
    return (
        <section className="embla relative">
            <button
                style={{
                    position: "absolute",
                    left: "-40px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    border: "1px solid #ebebeb",
                    borderRadius: 8

                }}
                className="left-2 top-1/2 transform -translate-y-1/2"
                onClick={scrollPrev}
            >
                <ChevronLeftIcon />

            </button>
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className="embla__slide" key={index.id}>
                            <MainCategoriesCard
                                category={index}
                                isSelected={categoryId === index.id}
                                handleNavigateToCategory={handleNavigateToCategory}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button
                style={{
                    position: "absolute",
                    right: "-40px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "30px",
                    height: "30px",
                    border: "1px solid #ebebeb",
                    borderRadius: 8

                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                onClick={scrollNext}
            >
                <ChevronRightIcon />
            </button>
        </section>
    );
};

export default Carousel;


