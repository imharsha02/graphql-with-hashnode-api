export function TypographySmall({children, className}:{className?:string,children:React.ReactNode}) {
    return (
      <small className={`text-sm font-medium leading-none ${className}`}>{children}</small>
    )
  }
  