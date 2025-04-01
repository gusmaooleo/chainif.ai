export default function ContentWrapper({children}: React.PropsWithChildren) {  
  return (
    <div className="flex items-center w-screen flex-col h-full">
      <div className="flex flex-col items-center h-full">
        {children}
      </div>
    </div>
  );
}
