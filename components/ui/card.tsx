export function Card({ className='', children }:{className?:string;children:any}) {
  return <div className={'border rounded-2xl '+className}>{children}</div>
}
export function CardContent({ className='', children }:{className?:string;children:any}) {
  return <div className={'p-4 '+className}>{children}</div>
}