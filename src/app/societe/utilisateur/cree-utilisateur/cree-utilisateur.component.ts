import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmdemandeComponent } from '../confirmdemande/confirmdemande.component';
import { MatDialog } from '@angular/material/dialog';
import { ListService } from '../../_http/list.service';
import { addEmploymentDto } from '../../Models/addEmpoymentDto';
import { AddServiceService } from '../../_http/add-service.service';
import jwt_decode from 'jwt-decode';
import { SnackbarService } from '../../service/snackbar.service';
import { tap } from 'rxjs';


@Component({
  selector: 'app-cree-utilisateur',
  templateUrl: './cree-utilisateur.component.html',
  styleUrls: ['./cree-utilisateur.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreeUtilisateurComponent implements OnInit,AfterViewInit{
  utilisateurForm! :FormGroup ;
  
  ngOnInit(): void {
      this.utilisateurForm = this.fb.group(
        {
         
          mailEmployee  : this.fb.control("",[Validators.required,Validators.email]),
          role  : this.fb.control("",Validators.required),
          idcategorie : this.fb.control("",Validators.required),
        }
        
      )
      console.log(this.list)
      var token = localStorage.getItem("Token");
      
      if(token){
        var decodedToken:any = jwt_decode(token); 
        
        this.id = decodedToken.Id;
      }
    }

  
  constructor(
    private snackbar :SnackbarService,
    private router: Router,
    private fb:FormBuilder , 
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public service:ListService,
    private cdr: ChangeDetectorRef,
    private addService:AddServiceService){
    this.route.url.subscribe((res:any)=> this.type = res[0].path );
      this.inputs =  [
      {label:"mailEmployee",name:"mail"},
    ];
  }
  ngAfterViewInit(): void {
    
    this.getRoles(this.id)
    this.getCategorie(this.id);
  }
 

  update(data:any){
    console.log(data)
    this.utilisateurForm.patchValue({
      role:data.name , 
    }); 
  }
  update2(data:any){
    console.log(data)
    this.utilisateurForm.patchValue({
      idcategorie:data.IdCategorie , 
    }); 
  }
  openDialog(): void {
    if (!this.utilisateurForm.invalid){
      let dialogRef = this.dialog.open(ConfirmdemandeComponent, {
      width: '800px',
      data:{ 
         Email:this.utilisateurForm.value.mailEmployee 
        , role:this.utilisateurForm.value.role
      , categorie:this.utilisateurForm.value.idcategorie
      
    }
    });
    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(result)
      if(result)
      //fix the add problem
          this.addEmployment();

    });
  }else{
    this.snackbar.openSnackBarErrorSimple("fill form")
  }
  }

  id:any;
  list:any=[]
  list2:any=[]
  titre:any;
  type:any;
  inputs:any[]=[]
  getRoles(id:any){
     this.service.getRoles(id).pipe(
      tap((data:any)=>{
          var data2 = data.filter((x:any) => x.name !="employer" && x.name !="superuser" && x.name !="shopowner" && x.name !="employee")
          data2.map((data:any) => this.list.push(data) )  
          this.cdr.detectChanges(); // Trigger change detection

      })
     ).subscribe();
    
    }

   /* doTransaction(mail:string,role:string) {
      this.addEmployment().pipe(
        switchMap((response1: any) => {
          console.log(response1)
          if (response1.Result== false) {
            throw new Error('Request 1 failed');
          }
          return this.addToPost(mail,role);
        }),

        catchError((error: any) => {
          console.log(error)
          this.snackbar.openSnackBarErrorSimple("Employmee with this email already exist")
          return throwError('Transaction failed');
        })
      ).subscribe((response3: any) => {
        if (response3.result) {
          console.log('Transaction succeeded');
        } else {
          console.error('Request 3 failed');
        }
      });
    }*/

    getCategorie(id:any){
      this.service.getAllCategorie(id).pipe(
        tap((data:any)=>{
            data.map((data:any) => this.list2.push(data))  
            this.cdr.detectChanges(); // Trigger change detection
            console.log(data)
        })
       ).subscribe();
      
    }
   /* addToPost(mail:string,role:string){
      return this.addService.addEmployeeToPost(mail,role).subscribe(
        {
          next: (v) => console.log(v),
          error: (e) => console.error(e),
          complete:()=>{
            this.snackbar.openSnackBarSuccess();
          }
        }
      )
    }*/
    addEmployment(){
      const Utilisateur = Object.assign(new addEmploymentDto(), this.utilisateurForm.value);
      var token = localStorage.getItem('Token');
      if(token)
      {
        var decodedToken:any = jwt_decode(token);    
        Utilisateur.idEmployer= decodedToken.Id;
      };
      console.log(Utilisateur)
      return this.addService.addEmployment(Utilisateur).subscribe(
        {
          next: (v) => console.log(v),
          error: (e) => {
            console.error(e)
            this.snackbar.openSnackBarErrorSimple(e.error)
          }, 
          complete:()=>{
            this.snackbar.openSnackBarSuccess()
            this.router.navigate(["/societe/utilisateurs/"]);
          }
        }
      )
      
    }
}

