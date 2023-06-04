import { Component } from '@angular/core';

@Component({
  selector: 'app-private',
  templateUrl: './Commercant.component.html',
  styleUrls: ['./Commercant.component.scss']
})
export class PrivateComponent {
  navlist:any[]=[
    {name:"Tableau de bord",navigation:"overview",icon:"dashboard"},
    {name:"Demandes",navigation:"demande",icon:"mail_outline"},
  ];
}
