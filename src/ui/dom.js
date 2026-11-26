import {palette} from '../theme/palette.js';
export function el(tag,text,parent,cls){const node=document.createElement(tag);if(text!==undefined&&text!==null)node.textContent=text;if(cls)node.className=cls;parent?.append(node);return node}
export function button(parent,text,fn){const b=el('button',text,parent);b.type='button';b.addEventListener('click',fn);return b}
export function theme(node){for(const [key,value] of Object.entries(palette))if(typeof value==='string')node.style.setProperty('--'+key,value)}
export function panel(scene,title){const root=el('section',null,document.getElementById('ui'),'panel');theme(root);el('h1',title,root);scene.events.once('shutdown',()=>root.remove());return root}
