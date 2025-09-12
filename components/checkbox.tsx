export function Checkbox({ checked, onCheckedChange }:{checked:boolean; onCheckedChange:(v:boolean)=>void}){
  return <input type="checkbox" checked={checked} onChange={()=>onCheckedChange?.(!checked)} />;
}
