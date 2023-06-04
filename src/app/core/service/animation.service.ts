import { animate, style, transition, trigger } from '@angular/animations';
import { Injectable } from '@angular/core';

export const  fadeinout = trigger('fadeinout',[
  transition(':enter',[
    style({opacity:0,transform:'translateX(30px)'}),
    animate(
      '200ms ease-in-out',
      style({opacity:1,transform:'translateX(0)'})
    )
  ]), 
  transition(':leave',[
    animate(
      '100ms ease-in-out',
      style({opacity:0,transform:'translateX(30px)'})
     )
  ])
]);

@Injectable({
  providedIn: 'root'
})


export class AnimationService {

  constructor() { }

  
}
