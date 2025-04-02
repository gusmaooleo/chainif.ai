export default function FoundDataElement({
  title,
  classname = '',
  children,
}: {
  title?: string;
  classname?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`flex flex-col gap-2 ${classname}`}>
      {!!title && <p className="font-medium text-gray-600">{title}</p>}
      {children}
    </div>
  );
}

