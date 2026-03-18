import Link from "next/link";

export interface ReportCardProps {
  title: string;
  description: string;
  href: string;
  className?: string;
}

export default function ReportCard({
  title,
  description,
  href,
  className,
}: ReportCardProps) {
  const classNames = [
    "block",
    "p-6",
    "bg-white",
    "border",
    "border-gray-200",
    "rounded-lg",
    "shadow-sm",
    "hover:bg-gray-50",
    "active:bg-gray-100",
    "transition-colors",
    "min-w-[280px]",
  ];

  if (className) {
    classNames.push(className);
  }

  return (
    <Link href={href} className={classNames.join(" ")}>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-lg text-gray-600">{description}</p>
    </Link>
  );
}
