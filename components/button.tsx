export function Button({ className='', style, onClick, children }:{
  className?:string; style?:React.CSSProperties; onClick?:()=>void; children:any
}) {
  return <button onClick={onClick} style={style} className={'rounded-xl border px-4 py-2 '+className}>{children}</button>;
}
