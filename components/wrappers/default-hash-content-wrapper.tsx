export default function DefaultHashContentWrapper({children}: React.PropsWithChildren) {  
  return (
    <div className="flex items-center w-screen flex-col h-full w-[30rem]">
      <div className="flex flex-col items-center h-full">
        {children}
      </div>
    </div>
  );
}
