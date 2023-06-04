import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-choisir-creation-type',
  templateUrl: './choisir-creation-type.component.html',
  styleUrls: ['./choisir-creation-type.component.scss']
})
export class ChoisirCreationTypeComponent {
  constructor(private router: Router, private route: ActivatedRoute ){

  }
  Redirect(path:string){
    this.router.navigate([path], {relativeTo: this.route}); 
}
}
