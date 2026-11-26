import economy from '../config/economy.json?v=z2-1' with {type:'json'};
export class AdProvider{async showRewarded(){throw Error('Implement showRewarded')}}
export class MockAdProvider extends AdProvider{
 async showRewarded({container,strings,signal}={}){return new Promise(resolve=>{
  const panel=document.createElement('div');panel.className='mock-ad';panel.setAttribute('role','dialog');panel.setAttribute('aria-label',strings.mockAd);container.append(panel);
  const message=document.createElement('p'),close=document.createElement('button');close.type='button';panel.append(message,close);close.disabled=true;let left=economy.setia.mockAdSeconds;const tick=()=>{message.textContent=`${strings.mockAd} · ${left}`;close.textContent=left?strings.adWaiting:strings.adClose;close.disabled=left>0};tick();
  let settled=false;const finish=completed=>{if(settled)return;settled=true;clearInterval(timer);panel.remove();resolve(completed)};const timer=setInterval(()=>{left=Math.max(0,left-1);tick()},economy.setia.adTickMs);close.addEventListener('click',()=>finish(true));signal?.addEventListener('abort',()=>finish(false),{once:true});if(signal?.aborted)finish(false)
 })}
}
export class PurchaseProvider{isAdFree(){throw Error('Implement isAdFree')}}
export class MockPurchaseProvider extends PurchaseProvider{constructor(settings){super();this.settings=settings}isAdFree(){return Boolean(this.settings.purchases?.adFree)}}
