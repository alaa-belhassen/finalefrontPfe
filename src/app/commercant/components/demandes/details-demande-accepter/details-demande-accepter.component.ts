import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { AddUsersService } from 'src/app/dyno-admin/http/add-users.service';
import { UpdateService } from 'src/app/dyno-admin/http/update.service';
import { TransactionModel } from 'src/app/dyno-admin/models/Transaction';
import { PhantomProviderService } from 'src/app/shared/services/phantom-provider.service';
import { ShareProviderService } from 'src/app/shared/services/share-provider.service';
import { ListService } from 'src/app/societe/_http/list.service';
import { SnackbarService } from 'src/app/societe/service/snackbar.service';
import jwt_decode from 'jwt-decode';
import { GetMethodesService } from 'src/app/commercant/http/get-methodes.service';

@Component({
  selector: 'app-details-demande-accepter',
  templateUrl: './details-demande-accepter.component.html',
  styleUrls: ['./details-demande-accepter.component.scss']
})
export class DetailsDemandeAccepterComponent {
  constructor(private get:GetMethodesService,private modif:UpdateService, private add:AddUsersService,private snackbar:SnackbarService,private route:ActivatedRoute,private router:Router,private list:ListService  ,private transaction:PhantomProviderService,private shareData:ShareProviderService,){
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
  demandeById:any=[];
  ngOnInit(){
    this.route.params.subscribe(params => {
      this.demande = params['id']
    });
   
  
    this.nombre = this.route.snapshot.paramMap.get('somme');
    this.id = this.route.snapshot.paramMap.get('user');
    if(this.id){
      this.getByUserId();
      this.getDemandeById()

      this.refreshdata()
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
  async makeTransaction(amount:any){
    console.log(this.demandeById)
    var sender = sessionStorage.getItem('wallet');
    if(this.provider!="initialProvider"){

    if (sender){
      console.log(this.provider)

    
      try { 
        var signature = await this.transaction.transaction(sender,this.demandeById[0].walletValidateur,this.provider,parseFloat(amount)-0.66);
        console.log(signature)
        if( signature){
          let valeur = new TransactionModel();
          valeur.IdEmployer = this.id ;
          valeur.Idverificateur = this.verificateur;
          valeur.montant = parseFloat(this.nombre);
          valeur.iddemande = this.demande;
          this.router.navigate(['/commercant']);
          this.modifDemande("valid");
        }
      } catch(e:any) {
        console.log(e)
        if(e.message=="User rejected the request."){
          this.router.navigate(['/commercant']);
          this.snackbar.openSnackBarErrorSimple("User rejected the request.")
        }
     }
    } 
  }else{
    this.snackbar.openSnackBarErrorSimple("il faut se connecter a un portefeuille");
  } 
      
  }


  modifDemande(etat:any){

    this.modif.modifDemandePayement(this.demande,etat,this.demandeById[0].idValidateur).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      
    });
  }
  redirect(){
    this.snackbar.openSnackBarSuccess()
    this.router.navigate(["/dynoAdmin/demandes"]);
  }
  getByUserId(){
    this.user$ = this.list.getUserById(this.id);
   }

   getDemandeById(){
     this.get.getdemandePayementById(this.demande).subscribe({
      next : ( v) => this.demandeById = v 
    })
   }
}
