

export default function FoundDataElement({ title, children }: {title: string, children: React.ReactNode}) {
  return (
    <div className="flex flex-col gap-2">
      <p>{title}</p>
      {children}
    </div>
  )
}