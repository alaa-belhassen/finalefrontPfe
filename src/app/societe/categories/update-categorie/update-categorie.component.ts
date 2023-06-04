import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateService } from '../../_http/update.service';
import { SnackbarService } from '../../service/snackbar.service';
import { ListService } from '../../_http/list.service';
import { tap } from 'rxjs';
import { fadeinout } from 'src/app/core/service/animation.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-update-categorie',
  templateUrl: './update-categorie.component.html',
  styleUrls: ['./update-categorie.component.scss'],
  animations:[fadeinout]
})
export class UpdateCategorieComponent implements OnInit {
constructor(private fb:FormBuilder,private listservice:ListService ,private update:UpdateService,private snackbar:SnackbarService,
  public dialogRef: MatDialogRef<UpdateCategorieComponent>,
  @Inject(MAT_DIALOG_DATA) public data: any) { }
categorieForm! :FormGroup ;
  ngOnInit(): void {
    console.log(this.data)
    this.categorieForm = this.fb.group(
      {
        namecategorie : this.fb.control("",Validators.required),
        nameTicket : this.fb.control("",Validators.required),
      }
    )
    var token = localStorage.getItem("Token");
    
    if(token){
      var decodedToken:any = jwt_decode(token); 
      
      this.id = decodedToken.Id;
    }
    this.getTicket()

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onYesClick(): void {
    if ( !this.categorieForm.invalid){
    this.update.updateCategorie(this.data.id,this.id,this.categorieForm.value).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => {
          console.log(e);
          this.snackbar.openSnackBarErrorSimple("failed to update")
        },
        complete:()=>{
          this.snackbar.openSnackBarSuccess()
        }
    }
  )
  this.dialogRef.close("updated");
}
    
  }
  id:any;
  drop=false;
  list:any;
  selected:any;
  inputs =  [
    {label:"namecategorie",name:"Nomcatégorie"}
  ];

  getFromlist(i:any){
    console.log(i.nameTicket)
    this.categorieForm.patchValue({
      nameTicket:i.nameTicket , 
    }); 
    this.drop = !this.drop
    this.selected = i;
  }

  getTicket(){
    this.list =[];
      this.listservice.getAllTicket(this.id).pipe(
        tap((data:any)=>{
            data.map((data:any) => this.list.push(data))  
            console.log(data)
        })
       ).subscribe();
    }
}
