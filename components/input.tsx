export function Input(props:any){
  return <input {...props} className={'border rounded-xl px-3 py-2 w-full '+(props.className||'')} />;
}
