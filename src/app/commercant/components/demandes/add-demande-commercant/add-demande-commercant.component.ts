import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { ListUsersService } from 'src/app/dyno-admin/http/list-users.service';
import { PhantomProviderService } from 'src/app/shared/services/phantom-provider.service';
import { SnackbarService } from 'src/app/societe/service/snackbar.service';
import { ConfirmdemandeComponent } from 'src/app/societe/utilisateur/confirmdemande/confirmdemande.component';
import jwt_decode from 'jwt-decode';
import { GetMethodesService } from 'src/app/commercant/http/get-methodes.service';
import { demandePayement } from 'src/app/commercant/models/demandepayement';

@Component({
  selector: 'app-add-demande-commercant',
  templateUrl: './add-demande-commercant.component.html',
  styleUrls: ['./add-demande-commercant.component.scss']
})
export class AddDemandeCommercantComponent {
  EmployerForm! :FormGroup ;
  lamport = LAMPORTS_PER_SOL
  balance:any;
  
  async ngOnInit() {
  
      this.EmployerForm = this.fb.group(
        {
         
        
          coins : this.fb.control(0,[Validators.min(1) ]),

        }
      )
      this.getDemandes()
    }
    
      
    
 
  
  constructor(
    private listservice:ListUsersService ,
    private solana:PhantomProviderService,
    private snackbar:SnackbarService,
    private router: Router,
    private fb:FormBuilder , 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private service:GetMethodesService){
    this.route.url.subscribe((res:any)=> this.type = res[0].path );
      this.inputs =  [
      {label:"nomentreprise",name:"nom entreprise"},
      {label:"mail",name:"mail"},
    ];
  }

 
 
  

  demande = new demandePayement();
  list=["one","deux"]
  list2=["one","deux"]
  titre:any;
  type:any;
  inputs:any[]=[]
  val:any;
  val2:any;
  demandes:any;
  rent:any;
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
  async addDemande(){
    console.log(this.EmployerForm.invalid)
    console.log(this.EmployerForm);
    var key = sessionStorage.getItem('wallet');
      var fees:any=0;
      this.balance =await this.solana.getAccountBalance(key)
      this.rent = await this.solana.getRentExeptionValue(key)
      console.log(this.rent)
      console.log(Number(this.EmployerForm.value.coins.toString()*10000))
     console.log((this.balance*LAMPORTS_PER_SOL)-this.rent-100000-10000)
    if( !this.EmployerForm.invalid && (this.balance*LAMPORTS_PER_SOL)-(this.rent+100000) >= Number(this.EmployerForm.value.coins.toString()*10000))
    {
          var token = localStorage.getItem('Token');
          if(token)
            var decodedToken:any = jwt_decode(token?.toString()); 
          this.demande.idShopowner = decodedToken.Id;
          if(this.EmployerForm.value.coins.toString()>0){
            this.demande.amount = (Number(this.EmployerForm.value.coins.toString())).toString();
          }else {
            this.snackbar.openSnackBarError(this.EmployerForm.value.montant.toString());
          }

          this.service.adddemandePayement(this.demande).subscribe(
            {
              next: (v:any) => console.log(v),
              error: (e:any) => console.error(e),
              complete: () => {
                this.router.navigate(['..'],{relativeTo:this.route});
                this.snackbar.openSnackBarSuccess()
              }
            }
          );
    }else{
      this.snackbar.openSnackBarErrorSimple("pas assez d'argent");
      this.router.navigate(["/commercant/demande/"])
    }
  }
}
