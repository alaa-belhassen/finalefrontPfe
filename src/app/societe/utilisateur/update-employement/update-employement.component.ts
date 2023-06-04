import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { addEmploymentDto } from '../../Models/addEmpoymentDto';
import { AddServiceService } from '../../_http/add-service.service';
import { ListService } from '../../_http/list.service';
import { SnackbarService } from '../../service/snackbar.service';
import jwt_decode from 'jwt-decode';
import { UpdateService } from '../../_http/update.service';

@Component({
  selector: 'app-update-employement',
  templateUrl: './update-employement.component.html',
  styleUrls: ['./update-employement.component.scss']
})
export class UpdateEmployementComponent implements OnInit,OnDestroy {
  utilisateurForm! :FormGroup ;
  
  ngOnInit(): void {
      this.utilisateurForm = this.fb.group(
        {
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
    private fb:FormBuilder , 
    public dialog: MatDialog,
    public service:ListService,
    private cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<UpdateEmployementComponent>,
    public updateService:UpdateService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data)
      this.inputs =  [
      {label:"mailEmployee",name:"mail"},
    ];
  }
  ngOnDestroy(): void {
    
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


    onNoClick(): void {
      this.dialogRef.close();
    }
    onYESClick(): void {
      this.dialogRef.close("updated");
    }
    getCategorie(id:any){
      this.service.getAllCategorie(id).pipe(
        tap((data:any)=>{
            data.map((data:any) => this.list2.push(data))  
            this.cdr.detectChanges(); // Trigger change detection
            console.log(data)
        })
       ).subscribe();
      
    }

    addEmployment(){
      const Utilisateur = Object.assign(new addEmploymentDto(), this.utilisateurForm.value);
      Utilisateur.idEmployer= this.id
      console.log(Utilisateur)
      this.updateService.updateEmployement(Utilisateur,this.data).subscribe({
        next:(v)=>{
          console.log(v)
          this.snackbar.openSnackBarSuccess()
          this.onYESClick()
        },
        error:(err)=> console.log(err)
      })
    }
}
