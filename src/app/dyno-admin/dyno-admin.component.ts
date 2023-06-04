import { Component, OnInit } from '@angular/core';
import { DarkmodeService } from './services/darkmode.service';

@Component({
  selector: 'app-dyno-admin',
  templateUrl: './dyno-admin.component.html',
  styleUrls: ['./dyno-admin.component.scss']
})
export class DynoAdminComponent{

  navlist:any[]=[
    {name:"Tableau de bord",navigation:"overview",icon:"dashboard"},
    {name:"Clients",navigation:"clients",icon:"person_pin"},
    {name:"Demandes",navigation:"demandes",icon:"mail_outline"}
  ];
}
