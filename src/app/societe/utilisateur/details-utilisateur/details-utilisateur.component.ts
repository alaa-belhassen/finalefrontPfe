import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListService } from '../../_http/list.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { PhantomProviderService } from 'src/app/shared/services/phantom-provider.service';
import { ShareProviderService } from 'src/app/shared/services/share-provider.service';
import { SnackbarService } from '../../service/snackbar.service';
import { AddServiceService } from '../../_http/add-service.service';
import jwt_decode from 'jwt-decode';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

@Component({
  selector: 'app-details-utilisateur',
  templateUrl: './details-utilisateur.component.html',
  styleUrls: ['./details-utilisateur.component.scss']
})
export class DetailsUtilisateurComponent implements OnInit {
  constructor(private PhantomProviderService:PhantomProviderService,private router:Router,private route:ActivatedRoute,private add: AddServiceService,
    private snackbar:SnackbarService,private transaction:PhantomProviderService,private shareData:ShareProviderService,private list:ListService){
    this.shareData.data$.subscribe((res:any)=>{
      this.provider=res;
      console.log(res);
    })
    
  }
  private destroy$ = new Subject<void>();
  idemployee:any;
  user$:any;
  user:any=[];
  categorie:any=[];
  nombre:any=30;
  provider:any;
  idemployer:any;
  balance:any;
  lamport=LAMPORTS_PER_SOL;
  rent :any;
   async ngOnInit(){
    this.route.params.subscribe(params => {
      this.idemployee = params['id']
    });
    var token = localStorage.getItem('Token');
    if(token){
      var decodedToken:any = jwt_decode(token); 
      console.log(decodedToken);
      this.idemployer = decodedToken.Id
    }
    if(this.idemployee){
      this.getByUserId();
      this.refreshdata();
      console.log(this.user)
      console.log(this.categorie)

    }
    var key = sessionStorage.getItem('wallet');
    this.balance = await this.PhantomProviderService.getAccountBalance(key);
    this.rent = await this.PhantomProviderService.getRentExeptionValue(key)
    console.log(this.balance)
    

     
  }
  submit(){

  }
  getByUserId(){
   this.user$ = this.list.getUserById2(this.idemployee,this.idemployer);
    
  }

 
  async makeTransaction(receiver:any,amount:any){
    if(((this.balance*this.lamport/10000)-this.nombre*this.categorie[0]?.ticket.prixTicket)-((this.rent+100000+10000)/10000) >=0){
      
    var sender = sessionStorage.getItem('wallet');
    if (sender ){
      if (this.provider!="initialProvider"){

      try{
      var signature = await this.transaction.transaction(sender,receiver,this.provider,amount);
      console.log(signature)
      if ( signature ){
        this.add.addPayement(this.idemployer,this.idemployee,this.nombre,String(this.nombre*this.categorie[0]?.ticket.prixTicket)).subscribe(
          {
            next: (v) => console.log(v),
              error: (e) => console.error(e),
              complete :() => {
                this.snackbar.openSnackBarSuccess()
                this.router.navigate(["/societe/utilisateurs"]);
              }
          }
        )
        }
    } catch(e:any) {
      console.log(e)
      if(e.message=="User rejected the request."){
        this.router.navigate(['/societe/utilisateurs']);
        this.snackbar.openSnackBarErrorSimple("Transaction Annuler.")
      }
   }}else{
    this.snackbar.openSnackBarErrorSimple("Il faut se connecter a un portefeuille")
   }
    }
  }else{
    this.snackbar.openSnackBarErrorSimple("Pas assez d'argent");
    this.router.navigate(['/societe/demande']);
  }
  }

  
  refreshdata(){
    this.user$.pipe(
      takeUntil(this.destroy$),
      tap(data => {
        this.user.push(data)
        this.getCategorieById(this.user[0]?.employment[0].idCategorie);

      })
    ).subscribe();
  
  }
  getCategorieById(id:any){

    this.list.getCategorieById(id).subscribe(
      {
        next : (value) =>{
          this.categorie.push(value);
        },
        error : (err) =>{
            console.log(err);
        },
      }
    )
  }
}
