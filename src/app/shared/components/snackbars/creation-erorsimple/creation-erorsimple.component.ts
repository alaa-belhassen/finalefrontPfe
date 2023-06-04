import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creation-erorsimple',
  templateUrl: './creation-erorsimple.component.html',
  styleUrls: ['./creation-erorsimple.component.scss']
})
export class CreationErorsimpleComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { this.log()}    
  log(){
    console.log(this.data)
  }
}
