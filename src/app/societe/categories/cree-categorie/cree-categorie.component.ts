import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddServiceService } from '../../_http/add-service.service';
import { ConfirmdemandeComponent } from '../../utilisateur/confirmdemande/confirmdemande.component';
import { demandeTransaction } from '../../Models/demandeTransaction';
import jwt_decode from 'jwt-decode';
import { ListService } from '../../_http/list.service';
import { tap } from 'rxjs';
import { SnackbarService } from '../../service/snackbar.service';
import { fadeinout } from 'src/app/core/service/animation.service';
@Component({
  selector: 'app-cree-categorie',
  templateUrl: './cree-categorie.component.html',
  styleUrls: ['./cree-categorie.component.scss'],
  animations:[fadeinout]
})
export class CreeCategorieComponent implements OnInit {
  categorieForm! :FormGroup ;
  TicketForm!:FormGroup;
  ngOnInit(): void {
      this.categorieForm = this.fb.group(
        {
          nomCategorie : this.fb.control("",Validators.required),
          nomTicket :this.fb.control("",Validators.required)
        }
      )
      this.TicketForm = this.fb.group(
        {
          nomTicket : this.fb.control("",Validators.required),
          montant :this.fb.control("",Validators.required),
          idEmployer :this.fb.control(""),

        }
      )

      var token = localStorage.getItem("Token");
    
      if(token){
        var decodedToken:any = jwt_decode(token); 
        
        this.id = decodedToken.Id;
      }
      this.getTicket()

      this.TicketForm.patchValue({
        idEmployer:this.id , 
      }); 
    }
    
      
    
 
  
  constructor(
    private snackbar:SnackbarService,
    private router: Router,
    private fb:FormBuilder , 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private serviceAdd:AddServiceService,
    private serviceList:ListService,
    private cdr: ChangeDetectorRef,
    ){
    this.route.url.subscribe((res:any)=> this.type = res[0].path );
      this.inputs =  [
      {label:"nomCategorie",name:"nomCategorie"},
    ];
    this.inputsTicket=[
      {label:"nomTicket",name:"nomTicket"},
      {label:"montant",name:"montant"},
    ]
  }
 
  openDialog(): void {
    
    let dialogRef = this.dialog.open(ConfirmdemandeComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      if(result)
          this.addCategorie()
          this.snackbar.openSnackBarSuccess()
    });
  }

  demande = new demandeTransaction();
  list:any=[]
  titre:any;
  type:any;
  inputs:any=[]
  inputsTicket:any=[];
  val:any;
  val2:any;
  toggle=false;
  drop=false;
  selected:any;
  id:any;


getFromlist(i:any){
  console.log(i.nameTicket)
  this.categorieForm.patchValue({
    nomTicket:i.nameTicket , 
  }); 
  this.drop = !this.drop
  this.selected = i;
}

getTicket(){
  this.list =[];
    this.serviceList.getAllTicket(this.id).pipe(
      tap((data:any)=>{
          data.map((data:any) => this.list.push(data))  
          this.cdr.detectChanges(); // Trigger change detection
          console.log(data)
      })
     ).subscribe();
  }
addTicket(){
  if(!this.TicketForm.invalid){
    this.serviceAdd.addTicket(this.TicketForm.value).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => {
          console.log(e);
          this.snackbar.openSnackBarErrorSimple("ticket existant ")
        },
        complete:()=>{
          this.getTicket();
          this.toggle= ! this.toggle
          this.snackbar.openSnackBarSuccess()      
        }
      }
    )
  }
}
  addCategorie(){
    console.log(this.categorieForm)
    if(!this.categorieForm.invalid)
    {
        this.serviceAdd.addCategorie(this.categorieForm.value,this.id).subscribe(
          {
            next: (v) => console.log(v),
            error: (e) => {
              console.log(e)
              this.snackbar.openSnackBarErrorSimple("Categorie existant ");
            },
            complete:()=>{
              this.router.navigate(['..'],{relativeTo:this.route});
              this.snackbar.openSnackBarSuccess();
            }
          }
        )
    }else{
      this.snackbar.openSnackBarErrorSimple("Remplir Formulaire")
    }
  }
}
