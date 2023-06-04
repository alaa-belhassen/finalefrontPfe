import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Keypair, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { LoginService } from 'src/app/core/service/login.service';
import { AddUsersService } from 'src/app/dyno-admin/http/add-users.service';
import { Employer } from 'src/app/dyno-admin/models/Employer';
import { IEmployer } from 'src/app/dyno-admin/models/IEmployer';
import { shopowner } from 'src/app/dyno-admin/models/shopowner';
import { ModelCreationService } from 'src/app/dyno-admin/services/model-creation.service';
import  {encode} from 'bs58'
import { SnackbarService } from 'src/app/societe/service/snackbar.service';
import { ShareProviderService } from 'src/app/shared/services/share-provider.service';
import { PhantomProviderService } from 'src/app/shared/services/phantom-provider.service';
import { DeleteUsersService } from 'src/app/dyno-admin/http/delete-users.service';
import { PublicKeyService } from 'src/app/dyno-admin/services/public-key.service';
@Component({
  selector: 'app-newsociete',
  templateUrl: './newsociete.component.html',
  styleUrls: ['./newsociete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewsocieteComponent implements OnInit {

  EmployerForm! :FormGroup ;
  phoneNumberPattern = /^[+]?[0-9]{8,15}$/;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;

  ngOnInit(): void {
    if ( this.type.toString() =="newclientsociete"){
      this.EmployerForm = this.fb.group(
        {
         
          raisonsociale : this.fb.control("",Validators.required),
          password  : this.fb.control("",[Validators.required,Validators.pattern(this.passwordPattern)]),
          walletpublickey  : this.fb.control("",Validators.required),
          adressefacturation : this.fb.control("",Validators.required),
          numeroTelEntreprise : this.fb.control("",[Validators.required,Validators.pattern(this.phoneNumberPattern)]),
          codeTVA : this.fb.control("",Validators.required),
          matriculefiscale : this.fb.control("",Validators.required),
          mailRH : this.fb.control("",[Validators.required,Validators.email]),
          adressemail : this.fb.control("",[Validators.required,Validators.email]),
          numeroRH :this.fb.control("",[Validators.required,Validators.pattern(this.phoneNumberPattern)]),
          paymentMethode : this.fb.control("",Validators.required),
          adresseEntreprise : this.fb.control("",Validators.required),

        }
      )
    }
    else {
      this.EmployerForm = this.fb.group(
        {
          raisonsociale : this.fb.control("",Validators.required),
          password: this.fb.control("",[Validators.required,Validators.pattern(this.passwordPattern)]),
          email : this.fb.control("",[Validators.required,Validators.email]),
          adresseFacturation : this.fb.control("",Validators.required),
          adressecommercant : this.fb.control("",Validators.required),
          numeroTel : this.fb.control("",[Validators.required,Validators.pattern(this.phoneNumberPattern)]),
          delaipayement : this.fb.control("",[Validators.required,Validators.max(10)]),
          codeTVA : this.fb.control("",Validators.required),
          matriculefiscale : this.fb.control("",Validators.required),
          commission : this.fb.control("",[Validators.required,Validators.max(10)]),
          paymentMethode : this.fb.control("",Validators.required),
          walletpublickey : this.fb.control("",Validators.required),
        }  
      )
    }
    this.createAccount()
  }
  constructor(
    private share:PublicKeyService,
    private snackbar:SnackbarService,
    public snackBar: SnackbarService,
    private router: Router,
    private fb:FormBuilder , 
    private route: ActivatedRoute, 
    private AddUsersService:AddUsersService,
    private CreateModel:ModelCreationService,
    private shareData:ShareProviderService,
    private transaction:PhantomProviderService,
    private deleteService : DeleteUsersService){

      this.shareData.data$.subscribe((res:any)=>{
        this.provider=res;
        console.log(res);
      }
      )

    this.route.url.subscribe((res:any)=> this.type = res[0].path );
    if ( this.type.toString() =="newclientsociete"){
      this.titre="societe"
      this.inputs =  [
      {label:"raisonsociale",name:"raison Sociale(nom société)"},
      {label:"password",name:"mot de passe"},
      {label:"numeroTelEntreprise",name:"numeroTelephone"},
      {label:"adressefacturation",name:"adresseFacturation"},
      {label:"adressemail",name:"adresseMail",type:"email"},
      {label:"codeTVA",name:"codeT.V.A"},
      {label:"matriculefiscale",name:"matricule Fiscale"},
      {label:"mailRH",name:"adresse mail Rh",type:"email"},
      {label:"numeroRH",name:"numero Telephone RH"},
      {label:"adresseEntreprise",name:"adresseEntreprise"},
    ];
    } else if ( this.type.toString() =="newclientcomercant"){
      this.titre="commercant";
      this.inputs =  [
        {label:"raisonsociale",name:"raison Sociale (nom commercant)"},
        {label:"password",name:"mot de passe"},
        {label:"email",name:"AdresseMail",type:"email"},
        {label:"adresseFacturation",name:"adresseFacturation",type:"text"},
        {label:"adressecommercant",name:"adressecommercant",type:"text"},
        {label:"numeroTel",name:"numeroTelephone"},
        {label:"delaipayement",name:"delai Payement(jours)",type:"number"},
        {label:"codeTVA",name:"code T.V.A"},
        {label:"matriculefiscale",name:"matriculeFiscale"},
        {label:"commission",name:"pourcentage de commission",type:"number"},
      ];
    }
  }
  provider:any;
  Account:any;
  titre:any;
  type:any;
  inputs:any[]=[];
  Employer:IEmployer = new Employer();
  shopOwner  = new shopowner()
  address:any;
  rent:any;
  open(){
    this.snackBar.openSnackBarinProgress()
  }
  async makeTransaction(){
    console.log(this.inputs[1].label+""+this.EmployerForm.get(this.inputs[0].label)?.invalid)
    
    if(!this.EmployerForm.invalid){
    var sender = sessionStorage.getItem('wallet');
    console.log(sender)
    console.log(this.provider);

    if (this.provider!="initialProvider"){
      
      if(sender){
      this.rent = await this.transaction.getRentExeptionValue(this.Account.publicKey)
      console.log(this.rent/10000)
      console.log(this.provider)
      try { 
        var signature = await this.transaction.transaction(sender,this.Account.publicKey,this.provider,Math.ceil((this.rent+100000)/10000));
        console.log(signature)
       return signature;
      } catch(e:any) {
        console.log(e)
        if(e.message=="User rejected the request." || e.message == "Something went wrong."){
          this.router.navigate(['/dynoAdmin/clients']);
          this.share.verif("null");
          this.snackbar.openSnackBarErrorSimple("Transaction annuler.")
        }
     }
    }
    }

 
}
return null;

  }


  Register(){
    console.log(this.EmployerForm);

    if(!this.EmployerForm.invalid  ){
      if(this.provider!="initialProvider"){
        if(this.type.toString() =="newclientcomercant"){
        
          this.RegisterShopOwner();
      
        }else{
            this.RegisterEmployer();
        
        }
      }else
      {
        this.snackbar.openSnackBarErrorSimple("Il faut se connecté a un portefeuille")
      }
  }else{
   this.snackbar.openSnackBarErrorSimple("Formulaire invalide")
  }
  
  }
 
  RegisterEmployer(){
   this.CreateModel.CreateEmployer(this.EmployerForm,this.Employer)
   //const myCheckboxValues = Object.assign(new Employer(), this.EmployerForm.value);
   //console.log(myCheckboxValues)
   console.log(this.Employer)
   this.AddUsersService.addEmployer(this.Employer).subscribe({
    next: (v) => console.log(v),
    error: async (e) => {
      console.log(e.status)  
      if (e.status == 200 ){
        this.router.navigate(['..'],{relativeTo:this.route});
        this.snackbar.openSnackBarSuccess()
        let signature = await this.makeTransaction();
        console.log(signature);
        this.share.verif(signature);
        if(signature){
          this.addAccount(this.address,this.EmployerForm.value.adressemail);
        }else{
          this.deleteService.AnnulerEmployer(this.Employer.Email).subscribe({
            next:(v)=> console.log(v)
            ,error : (err) => console.log(err)
          }
          
          );
        }
      }else{
        this.snackbar.openSnackBarError(e.error.errors)
      }
     
    },
    complete: () => {

    }
   }   
  )}

  addAccount(address:any,mail:any){
    this.AddUsersService.addAccount(address,mail).subscribe({
      next:(v)=>{
        console.log(v)
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  createAccount(){
    this.Account = new Keypair();
    console.log(this.Account)
      this.EmployerForm.patchValue({
        walletpublickey:this.Account.publicKey
      }); 
  this.address = encode(this.Account.secretKey)
      console.log(this.address);
      
  }

  RegisterShopOwner(){
    this.CreateModel.CreateShopwowner(this.EmployerForm,this.shopOwner);
    console.log(this.shopOwner);
    this.AddUsersService.addShopowner(this.shopOwner).subscribe({
     next: (v) => console.log(v),
     error: async (e) => {
      console.log(e.status)  
      if (e.status == 200 ){
        this.router.navigate(['..'],{relativeTo:this.route});
        this.snackbar.openSnackBarSuccess()
        let signature = await this.makeTransaction();
        console.log(signature);
        if(signature){
          this.addAccount(this.address,this.EmployerForm.value.email);
        }else{
          this.deleteService.AnnulerShopowner(this.shopOwner.email).subscribe({
            next:(v)=> console.log(v)
            ,error : (err) => console.log(err)
          });
        }
      }else{
        this.snackbar.openSnackBarError(e.error.errors)
      }
    },
     complete: () => {
     }
    }   
   )}
  }

