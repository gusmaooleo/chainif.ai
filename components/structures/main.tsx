export default function MainWrapper({ children }: React.PropsWithChildren) {
  return (
    <main className="flex-grow w-screen my-10">
      <div className="flex flex-col h-full items-center w-screen">
        {children}
      </div>
    </main>
  )
}