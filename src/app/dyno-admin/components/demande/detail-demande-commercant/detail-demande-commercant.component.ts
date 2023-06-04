import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import jwt_decode from 'jwt-decode';
import { Subject, takeUntil, tap } from 'rxjs';
import { AddUsersService } from 'src/app/dyno-admin/http/add-users.service';
import { ListUsersService } from 'src/app/dyno-admin/http/list-users.service';
import { UpdateService } from 'src/app/dyno-admin/http/update.service';
import { PhantomProviderService } from 'src/app/shared/services/phantom-provider.service';
import { ListService } from 'src/app/societe/_http/list.service';
import { SnackbarService } from 'src/app/societe/service/snackbar.service';

@Component({
  selector: 'app-detail-demande-commercant',
  templateUrl: './detail-demande-commercant.component.html',
  styleUrls: ['./detail-demande-commercant.component.scss']
})
export class DetailDemandeCommercantComponent {
  constructor(private service:ListUsersService  ,private modif:UpdateService, private add:AddUsersService,private snackbar:SnackbarService,private route:ActivatedRoute,private router:Router,private list:ListService  ,private solana:PhantomProviderService,){
  
  }
  private destroy$ = new Subject<void>();
  user$:any;
  id:any;
  user:any=[];
  nombre:any;
  provider:any;
  verificateur:any;
  demande:any;
  balance:any;
  demande$:any;
  demandes:any=[];
  somme:any;
  rent:any;
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

    this.demande$.pipe(
      takeUntil(this.destroy$),
      tap(data => {
        this.demandes.push(data);
      })
    ).subscribe();
  }

  cleanData(){
    this.somme = 0;
    this.demandes.map((element:any) => {
      console.log(element)
      element.map((element:any) => {
        console.log(element)

        if (element.etat == 'accepter'){
          this.somme += Number(element?.amount*10000);
        }
      })
    });
  }

 async  modifDemande(etat:any){
    this.cleanData();

    this.balance =await this.solana.getAccountBalance(this.user[0]?.employer.walletPublicKey)
    this.rent = await this.solana.getRentExeptionValue(this.user[0]?.employer.walletPublicKey)
    console.log((this.balance*LAMPORTS_PER_SOL)-this.rent-this.somme);
    console.log(this.somme);
    console.log(this.rent);


    
    if(etat=="rejected" || ((this.balance*LAMPORTS_PER_SOL)-this.rent-this.somme) >= Number(this.nombre*10000))
  {
    this.modif.modifDemandePayement(this.demande,etat,this.verificateur).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete :() => this.redirect()
    });
  }else{
    this.modif.modifDemandePayement(this.demande,"rejected",this.verificateur).subscribe({
      next: (v) => console.log(v),
      error: (e) => console.error(e),
      complete :() => {
        this.router.navigate(["/dynoAdmin"]);
        this.snackbar.openSnackBarErrorSimple("Demande rejecté pas assez d'argent")
      }
    });
    
  }
  }
  redirect(){
    this.router.navigate(["/dynoAdmin"]);
    this.snackbar.openSnackBarSuccess()

  }
  getByUserId(){
    this.user$ = this.list.getUserById(this.id);
    this.demande$ = this.service.getAllDemandesPayement();

   }
}
