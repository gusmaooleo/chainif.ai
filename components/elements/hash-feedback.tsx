export default function HashFeedback({children}: React.PropsWithChildren) {
  return (
    <div className="flex items-center w-screen flex-col">
      <div className="flex items-center flex-col w-[20rem] my-20 gap-2">
        {children}
      </div>
    </div>
  );
}
