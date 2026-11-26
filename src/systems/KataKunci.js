// Boss integration interface. Scene timers, physics and input stop for the modal lifetime.
export function kataKunci(overlay,variant,{boss,wallet,...options}={}){
 return overlay.open(variant,{...options,boss:true,wallet,onCorrect:model=>{boss?.stun?.();options.onCorrect?.(model)},onWrong:model=>{boss?.buff?.();options.onWrong?.(model)}});
}
