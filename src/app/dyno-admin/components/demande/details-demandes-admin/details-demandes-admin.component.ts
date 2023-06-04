import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from '@solana/web3.js';
import { Subject, takeUntil, tap } from 'rxjs';
import { AddUsersService } from 'src/app/dyno-admin/http/add-users.service';
import { TransactionModel } from 'src/app/dyno-admin/models/Transaction';
import { PhantomProviderService } from 'src/app/shared/services/phantom-provider.service';
import { ShareProviderService } from 'src/app/shared/services/share-provider.service';
import { ListService } from 'src/app/societe/_http/list.service';
import { SnackbarService } from 'src/app/societe/service/snackbar.service';
import jwt_decode from 'jwt-decode';
import { UpdateService } from 'src/app/dyno-admin/http/update.service';

@Component({
  selector: 'app-details-demandes-admin',
  templateUrl: './details-demandes-admin.component.html',
  styleUrls: ['./details-demandes-admin.component.scss']
})
export class DetailsDemandesAdminComponent implements OnInit {
  constructor(private modif:UpdateService, private add:AddUsersService,private snackbar:SnackbarService,private route:ActivatedRoute,private router:Router,private list:ListService  ,private transaction:PhantomProviderService,private shareData:ShareProviderService,){
    this.shareData.data$.subscribe((res:any)=>{
      this.provider=res;
      console.log(res);
    })
  }
  private destroy$ = new Subject<void>();
  user$:any;
  id:any;
  user:any=[];
  nombre:any;
  provider:any;
  verificateur:any;
  demande:any;
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.demande = params['id']
    });
   
    this.nombre = this.route.snapshot.paramMap.get('somme');
    this.id = this.route.snapshot.paramMap.get('user');
    if(this.id){
      this.getByUserId();
      this.refreshdata();
      console.log(this.user)
    }
    var token = localStorage.getItem('Token');
    if(token){
      var decodedToken:any = jwt_decode(token); 
      console.log(decodedToken);
      this.verificateur = decodedToken.Id
    }

  }

  refreshdata(){
    this.user$.pipe(
      takeUntil(this.destroy$),
      tap(data => {
        this.user.push(data)

      })
    ).subscribe();
  
  }
  async makeTransaction(receiver:any,amount:any){
    var sender = sessionStorage.getItem('wallet');
    if(this.provider != "initialProvider"){

    if (sender ){
      try { 
        var signature = await this.transaction.transaction(sender,receiver,this.provider,Math.ceil(amount));
        console.log(signature)
        if( signature){
          let valeur = new TransactionModel();
          valeur.IdEmployer = this.id ;
          valeur.Idverificateur = this.verificateur;
          valeur.montant = parseFloat(this.nombre);
          valeur.iddemande = this.demande;

          this.add.addTransaction(valeur).subscribe(
            { 
              next: (v) => console.log(v),
              error: (e) => console.error(e),
              complete :() => {
                this.redirect()
                this.modifDemande("valid");
              }
            }
          )
        }
      } catch(e:any) {
        console.log(e)
        if(e.message=="User rejected the request."){
          this.router.navigate(['/dynoAdmin']);
          this.snackbar.openSnackBarErrorSimple("Transaction annuler")
        }
     } 
    }
    }else{
      this.snackbar.openSnackBarErrorSimple("Il faut se connecté a un portefeuille")
     }
  }


  modifDemande(etat:any){

    this.modif.modifDemandeTransaction(this.demande,etat).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      
    });
  }
  redirect(){
    this.snackbar.openSnackBarSuccess()
    this.router.navigate(["/dynoAdmin"]);
  }
  getByUserId(){
    this.user$ = this.list.getUserById(this.id);
   }
}
