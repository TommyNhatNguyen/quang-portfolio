import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="breadcrumbs">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          let content;
          if (item.href) {
            content = <Link href={item.href}>{item.label}</Link>;
          } else if (item.onClick) {
            content = (
              <button type="button" onClick={item.onClick}>
                {item.label}
              </button>
            );
          } else {
            content = <span>{item.label}</span>;
          }

          return (
            <li key={index} aria-current={isLast ? "page" : undefined}>
              {content}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
