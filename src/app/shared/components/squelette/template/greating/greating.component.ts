import { ChangeDetectionStrategy, Component } from '@angular/core';
import { local } from 'd3-selection';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-greating',
  templateUrl: './greating.component.html',
  styleUrls: ['./greating.component.scss'],
})
export class GreatingComponent {
  message:any;
  name:any;
  public now: Date = new Date();

    constructor(){
      var token = localStorage.getItem('Token')
      if ( token ){
        var decodedToken:any = jwt_decode(token);
        this.name = decodedToken.userName;
        console.log(decodedToken)
        if ( decodedToken.role.includes('superuser') ){
          this.message =  "Admin"
        } else if (decodedToken.role.includes('employer') ){
          this.message =  "société"
        } else if (decodedToken.role.includes('shopowner') ){
          this.message =  "commercant"
        }
      }
      setInterval(() => {
        this.now = new Date();
      }, 1);

    }
}
