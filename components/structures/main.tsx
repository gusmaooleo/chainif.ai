export default function MainWrapper({ children }: React.PropsWithChildren) {
  return (
    <main className="flex flex-grow w-screen">     
      {children}
    </main>
  )
}