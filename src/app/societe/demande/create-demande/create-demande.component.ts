import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmdemandeComponent } from '../../utilisateur/confirmdemande/confirmdemande.component';
import { demandeTransaction } from '../../Models/demandeTransaction';
import jwt_decode from 'jwt-decode';
import { AddServiceService } from '../../_http/add-service.service';
import { SnackbarService } from '../../service/snackbar.service';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { PhantomProviderService } from 'src/app/shared/services/phantom-provider.service';
import { ListUsersService } from 'src/app/dyno-admin/http/list-users.service';
import { ListService } from '../../_http/list.service';

@Component({
  selector: 'app-create-demande',
  templateUrl: './create-demande.component.html',
  styleUrls: ['./create-demande.component.scss']
})
export class CreateDemandeComponent implements OnInit{
  EmployerForm! :FormGroup ;
  lamport = LAMPORTS_PER_SOL
  balance:any;
  
  async ngOnInit() {
  
      this.EmployerForm = this.fb.group(
        {
         
        
          coins : this.fb.control(0,[Validators.min(1) ])

        }
      )
      this.getDemandes()
      this.getUtilisateurs()
    }
    
      
    
 
  
  constructor(
    private listservice:ListUsersService ,
    private solana:PhantomProviderService,
    private snackbar:SnackbarService,
    private router: Router,
    private fb:FormBuilder , 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service:AddServiceService,private List:ListService
    ){
    this.route.url.subscribe((res:any)=> this.type = res[0].path );
      this.inputs =  [
      {label:"nomentreprise",name:"nom entreprise"},
      {label:"mail",name:"mail"},
    ];
  }

 
 
  openDialog(): void {
    let dialogRef = this.dialog.open(ConfirmdemandeComponent, {
      width: '800px',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result)
          this.addDemande()
    });
  }

  demande = new demandeTransaction();
  list=["one","deux"]
  list2=["one","deux"]
  titre:any;
  type:any;
  inputs:any[]=[]
  val:any;
  val2:any;
  demandes:any
  getDemandes(){
    var token = localStorage.getItem('Token');
    if(token)
    {
      var decodedToken:any = jwt_decode(token);  
      console.log(decodedToken) 
      this.listservice.getdemandes(decodedToken.Id).subscribe(
        {
          next :(v)=>this.demandes = v,
          error:(err) => console.log(err)
        }
      );
    }
      
  }
  utilisateurs:any;
  Id:any;
  getUtilisateurs(){
    var token = localStorage.getItem('Token');
    if(token)
    {
      var decodedToken:any = jwt_decode(token);
      this.Id = decodedToken.Id  
      this.List.getUtilisateurs(this.Id).subscribe({
        next:(v) => this.utilisateurs = v,
        error:(err) => console.log(err)
      })
    }
  }
  async addDemande(){
    console.log(this.utilisateurs.length);
    
    console.log(this.EmployerForm.invalid)
    console.log(this.EmployerForm);
    if(!this.EmployerForm.invalid)
    {
          var token = localStorage.getItem('Token');
          if(token)
            var decodedToken:any = jwt_decode(token?.toString()); 
          this.demande.idEmployer = decodedToken.Id;
          if(this.EmployerForm.value.coins.toString()>0){
            this.demande.amount = (Math.ceil(Number(this.EmployerForm.value.coins.toString())+(this.utilisateurs.length*6600/10000))).toString();
          }else if (this.EmployerForm.value.montant.toString()>0){
            this.demande.amount = (Math.ceil(Number(this.EmployerForm.value.coins.toString())+(this.utilisateurs.length*6600/10000))).toString();
          }else {
            this.snackbar.openSnackBarError(this.EmployerForm.value.montant.toString());
          }

          this.service.addDemandeTransaction(this.demande).subscribe(
            {
              next: (v) => console.log(v),
              error: (e) => console.error(e),
              complete: () => {
                this.router.navigate(['..'],{relativeTo:this.route});
                this.snackbar.openSnackBarSuccess()
              }
            }
          );
    }
  }
}
