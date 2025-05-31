import Link from 'next/link';
import { Skeleton } from '@radix-ui/themes';

interface BreadCrumbArray {
  link: string;
  active: boolean;
  text: string;
}

interface BreadCrumbProps {
  items: BreadCrumbArray[];
}

const SKELETON_BREADCRUMB = [1, 2];

function Breadcrumb({ items }: BreadCrumbProps) {
  const isLoading = items.length === 0;

  return (
    <nav aria-label="breadcrumb" className="flex items-center text-sm">
      <ol className="flex space-x-1 p-0 m-0 list-none">
        {isLoading
          && SKELETON_BREADCRUMB.map((index) => (
            <li key={index} className="flex items-center">
              <Skeleton width="100px" height="20px" />
              {index < items.length - 1 && (
                <span aria-hidden="true" className="text-primaryText">
                  /
                </span>
              )}
            </li>
          ))}

        {items.map((item, index) => (
          <li key={item.link} className="flex items-center">
            <Link
              href={item.link || '#'}
              className={`transition-colors px-2 rounded-md ${!item.active && 'text-primaryText'} hover:bg-secondary hover:text-background ${item.active ? 'text-primary pointer-events-none' : ''}`}
              aria-current={item.active ? 'page' : undefined}
            >
              {item.text}
            </Link>
            {index < items.length - 1 && (
              <span aria-hidden="true" className="text-primaryText">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
