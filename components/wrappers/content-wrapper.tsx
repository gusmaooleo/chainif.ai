export default function ContentWrapper({
  children,
  classname_f,
  classname_c,
}: {
  children: React.ReactNode;
  classname_f?: string;
  classname_c?: string;
}) {
  return (
    <div className={`flex items-center w-screen flex-col ${classname_f}`}>
      <div className={`flex flex-col items-center ${classname_c}`}>
        {children}
      </div>
    </div>
  );
}
