import { Component } from '@angular/core';

@Component({
  selector: 'app-societe',
  templateUrl: './societe.component.html',
  styleUrls: ['./societe.component.scss']
})
export class SocieteComponent {
  navlist:any[]=[
    {name:"Tableau de bord",navigation:"overview",icon:"dashboard"},
    {name:"Catégorie",navigation:"categorie",icon:"group"},
    {name:"Rôles",navigation:"roles",icon:"vpn_key"},
    {name:"Utilisateurs",navigation:"utilisateurs",icon:"person_pin"},
    {name:"Demandes",navigation:"demande",icon:"mail_outline"},
  ];
}
