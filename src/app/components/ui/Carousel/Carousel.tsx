import React from 'react'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import MainCategoriesCard from "../../product/MainCategories/Components/MainCategoriesDroppableCard/MainCategoriesDroppabeCard";
import { useParams, useRouter } from 'next/navigation';


type PropType = {
    slides: any[]
    options?: EmblaOptionsType
}

const Carousel: React.FC<PropType> = (props) => {
    const { slides, options } = props
    const [emblaRef, emblaApi] = useEmblaCarousel({

    })

    const { appName, categoryId } = useParams();
    const router = useRouter();


    const handleNavigateToCategory = (categoryId: string) => {
        router.push(`/${appName}/${categoryId}`);
    };


    console.log('slides', slides)

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {slides.map((index) => (
                        <div className="embla__slide" key={index.id}>

                            <div className="embla__slide__number">

                                <MainCategoriesCard
                                    category={index}
                                    isSelected={categoryId === index.id}
                                    handleNavigateToCategory={handleNavigateToCategory}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Carousel
