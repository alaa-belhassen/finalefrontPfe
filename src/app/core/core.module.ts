import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from './service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { animation } from '@angular/animations';
import { AnimationService } from './service/animation.service';
import { ClickOutSideDirective } from './Directive/click-out-side.directive';



@NgModule({
  declarations: [
    ClickOutSideDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports:[
    ClickOutSideDirective
  ],
  providers:[
    LoginService,
    AnimationService,
    
  ]
})
export class CoreModule { }
