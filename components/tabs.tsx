import React, { useState } from "react";

export function Tabs({ defaultValue, value, onValueChange, children, className }:{
  defaultValue?:string; value?:string; onValueChange?:(v:string)=>void; children:any; className?:string
}){
  const [v,setV]=useState(value||defaultValue||"");
  const C=(c:any)=>React.cloneElement(c,{active:v,setActive:(x:string)=>{setV(x);onValueChange&&onValueChange(x)}});
  return <div className={className}>{React.Children.map(children,C)}</div>;
}
export function TabsList({ children, className }:{children:any; className?:string}){
  return <div className={"grid "+(className||"")} style={{gap:".5rem"}}>{children}</div>;
}
export function TabsTrigger({ value, children, active, setActive }:{
  value:string; children:any; active?:string; setActive?:(v:string)=>void
}){
  const a=active===value;
  return <button className={'rounded-xl px-3 py-2 '+(a?'border':'border')} onClick={()=>setActive&&setActive(value)}>{children}</button>;
}
export function TabsContent({ value, active, children, className }:{
  value:string; active?:string; children:any; className?:string
}){
  return active===value ? <div className={className}>{children}</div> : null;
}
