import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-creation-error',
  templateUrl: './creation-error.component.html',
  styleUrls: ['./creation-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreationErrorComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { this.log() }    
  errors :any = Object.values(this.data);
  result:any;
  log(){
    console.log(this.errors)
    this.errors.forEach((element:any) => {
      this.result=Object.values(element)
    });
  }
}
