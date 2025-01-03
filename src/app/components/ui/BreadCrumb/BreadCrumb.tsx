import Link from 'next/link';
import './breadCrumb.scss'
import { Skeleton, Spinner } from "@radix-ui/themes";


interface BreadCrumbArray {
    link: string;
    active: boolean;
    text: string
}

interface BreadCrumbProps {
    items: BreadCrumbArray[]
}

const SKELETON_BREADCRUMB = [1, 2]

const Breadcrumb = ({ items }: BreadCrumbProps) => {

    const isLoading = items.length === 0;

    return <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb-list">

            {isLoading && SKELETON_BREADCRUMB.map((index) => {
                return <li key={index} className="breadcrumb-item">
                    <Skeleton width={'100px'} height={'20px'} />
                    {index < items.length - 1 && (
                        <span aria-hidden="true" className="breadcrumb-separator">/</span>
                    )}
                </li>
            })}

            {items.map((item, index) => (
                <li key={index} className="breadcrumb-item">
                    <Link
                        href={item.link || "#"}
                        className={`breadcrumb-link ${item.active ? "active" : ""}`}
                        aria-current={item.active ? "page" : undefined}
                    >
                        {item.text}
                    </Link>
                    {index < items.length - 1 && (
                        <span aria-hidden="true" className="breadcrumb-separator">/</span>
                    )}
                </li>
            ))}
        </ol>
    </nav>
};


export default Breadcrumb;