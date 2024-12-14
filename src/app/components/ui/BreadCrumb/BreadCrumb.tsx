import Link from 'next/link';
import './breadCrumb.scss'

interface BreadCrumbArray {
    link: string;
    active: boolean;
    text: string
}

interface BreadCrumbProps {
    items: BreadCrumbArray[]
}


const Breadcrumb = ({ items }: BreadCrumbProps) => (
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
        <ol className="breadcrumb-list">
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
);


export default Breadcrumb;